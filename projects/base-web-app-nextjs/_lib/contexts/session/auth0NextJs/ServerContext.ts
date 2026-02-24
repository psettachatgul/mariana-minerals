import 'reflect-metadata';

import { AsyncLocalStorage } from 'async_hooks';
import { injectable } from 'inversify';
import { Auth } from '../../../auth';
import { UserManagement } from '../../../auth/UserManagement';
import { Auth0NextJsServer } from '../../../auth/auth0NextJs/Server';
import { Auth0NextJsUserManagement } from '../../../auth/auth0NextJs/UserManagement';
import { SessionContext, TRunInContextOptions } from '../context';
import { TSessionContextStore } from '../store';

const asyncLocalStorage = new AsyncLocalStorage<TSessionContextStore>();

@injectable()
export class Auth0NextJsServerContext extends SessionContext {

  public readonly authProvider: Auth = new Auth0NextJsServer();
  public readonly userManagementProvider: UserManagement = new Auth0NextJsUserManagement();

  public getContext() {
    const store = asyncLocalStorage.getStore();

    return store;
  }

  public runInContext<R, TArgs extends unknown[]>(
    options: TRunInContextOptions<R, TArgs>,
    ...args: TArgs): R {

    const { initialValues, cb } = options;

    return asyncLocalStorage.run(
      {
        ...initialValues,
        authProvider: this.authProvider,
        userManagementProvider: this.userManagementProvider,
      },
      cb,
      ...args,
    );
  }

  public updateStore(): void {
    throw new Error('Method not implemented.');
  }
}
