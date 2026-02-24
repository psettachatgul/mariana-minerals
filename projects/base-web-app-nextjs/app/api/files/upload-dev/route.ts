import { uploadJsonStream } from '@patson/utils/jsonStreamHelpers';
import { NextResponse } from 'next/server';
import { Readable } from 'node:stream';
import { handleRoute } from '../../../../_lib/routes';
import { TUploadFileParams, ZUploadFileParams } from '../upload/_schemas';

export const maxDuration = 300;

// this is just to handle log file imports for dev as vercel would need to do a callback to the host
export const POST = handleRoute<'/api/files/upload-dev', TUploadFileParams>(
  async (
    request,
    { params: { fileName } },
  ) => {

    const body = request.body;

    if (!!body) {
      console.log(`Parsing ${fileName}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodeReadableStream = Readable.fromWeb(body as any);
      await uploadJsonStream(nodeReadableStream, {
        onData: async ({ key, value }) => {
          console.log('onData fired', key, value);
        },
        onEnd: async () => {
          console.log('onEnd fired');
        },
        onError: async () => {
          console.log('onError fired');
        },
      });
    }


    return NextResponse.json(
      { success: true },
      { status: 200 },
    );
  },
  {
    paramsParser: ZUploadFileParams.parse,
  },
);
