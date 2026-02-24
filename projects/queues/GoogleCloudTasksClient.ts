import { CloudTasksClient, protos } from '@google-cloud/tasks';
import { credentials } from '@grpc/grpc-js';
import { isDev } from '@patson/utils/env';
import { CallOptions } from 'google-gax';
import get from 'lodash/get';
import omit from 'lodash/omit';

export interface IHttpRequestTask extends protos.google.cloud.tasks.v2.IHttpRequest {
  jsonPayload?: object,
  doNotUseServiceAccount?: boolean;
}

export interface IRequestTask extends protos.google.cloud.tasks.v2.ITask {
  httpRequest: IHttpRequestTask;
  taskName?: string;
}

export type TEnqueueFunc = (task: IRequestTask, options?: CallOptions) =>
  Promise<[protos.google.cloud.tasks.v2.ITask,
    protos.google.cloud.tasks.v2.ICreateTaskRequest | undefined,
    object | undefined]>;

export const getEnqueuer = async (queueName: string): Promise<TEnqueueFunc> => {

  if (!process.env.GOOGLE_CLOUD_PROJECT) {
    throw new Error('Request cannot be processed.  Missing GOOGLE_CLOUD_PROJECT');
  }

  const useEmulator = isDev() || process.env.CLOUD_EMULATOR_HOST;

  const clientOptions = (() => {
    if (useEmulator) {
      return {
        port: 8123,
        servicePath: process.env.CLOUD_EMULATOR_HOST || '127.0.0.1',
        sslCreds: credentials.createInsecure(),
      };
    } else {
      return {
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
        credentials: {
          type: 'service_account',
          private_key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
        },
      };
    }
  })();

  // create a task queue client
  const client = new CloudTasksClient(clientOptions);
  const queuePath = client.queuePath(
    process.env.GOOGLE_CLOUD_PROJECT,
    process.env.GOOGLE_CLOUD_REGION ?? 'us-west1',
    queueName,
  );

  if (useEmulator) {
    // if you're using the emulator, you can change how the queue processes tasks here
    // if you're on production, assume the queue is created and managed thru gcp
    const locationPath = client.locationPath(
      process.env.GOOGLE_CLOUD_PROJECT,
      process.env.GOOGLE_CLOUD_REGION ?? 'us-west1',
    );
    const queueExists = await (async () => {
      try {
        return !!(await client.getQueue({ name: queuePath }));
      } catch {
        console.info(`queue ${queuePath} does not exist yet`);
        return false;
      }
    })();

    if (!queueExists) {
      await client.createQueue({
        parent: locationPath,
        queue: {
          name: queuePath,
          rateLimits: {
            // throttling for local processing
            maxConcurrentDispatches: 1,
            maxDispatchesPerSecond: 1,
            maxBurstSize: 1,
          },
          retryConfig: {
            maxAttempts: 1,
            maxDoublings: 1,
            minBackoff: { seconds: 10 },
          },
        },
      });

      console.info(`queue ${queuePath} created`);
    }


  }

  // return a function you can use to enqueue a task
  return (
    task: IRequestTask,
    options?: CallOptions) => {

    if (!process.env.GOOGLE_CLOUD_PROJECT) {
      throw new Error('Request cannot be processed.  Missing GOOGLE_CLOUD_PROJECT');
    }

    const taskPath = !!task.taskName ?
      client.taskPath(
        process.env.GOOGLE_CLOUD_PROJECT,
        process.env.GOOGLE_CLOUD_REGION ?? 'us-west1',
        queueName,
        task.taskName) :
      undefined;

    const request: protos.google.cloud.tasks.v2.ICreateTaskRequest = {
      parent: queuePath,
      task: {
        ...task,
        ...(!!taskPath && {
          name: taskPath,
        }),
        ...(task.httpRequest && {
          httpRequest: {
            ...(omit(task.httpRequest, 'jsonPayload', 'doNotUseServiceAccount')),
            ...(!task.httpRequest.doNotUseServiceAccount && {
              oidcToken: {
                serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                audience: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
              },
            }),
            ...(task.httpRequest.jsonPayload && {
              body: prepPayload(task.httpRequest.jsonPayload),
            }),
          },
        }),
      },
    };

    // if using emulator locally via docker, the task needs to hit an endpoint on the host (local) machine
    if (isDev()) {
      if (request?.task?.httpRequest?.url) {
        request.task.httpRequest.url =
          request.task.httpRequest.url.replace('http://localhost:', 'http://host.docker.internal:');
      }
    }

    try {
      return client.createTask(request, options);
    }
    catch (err) {
      if (get(err, 'code') !== 6) {
        // if it's some error other than ALREADY_EXISTS
        throw err;
      }

      // ALREADY_EXISTS
      return client.getTask({ name: taskPath });

    }

  };
};

const prepPayload = (jsonPayload: object) => {
  return Buffer.from(JSON.stringify(jsonPayload)).toString('base64');
};

