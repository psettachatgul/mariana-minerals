import 'reflect-metadata';

import { AsyncLocalStorage } from 'async_hooks';
import { injectable } from 'inversify';
import { Auth } from '../../auth';
import { MockAuth } from '../../auth/MockAuth';
import { MockUserManagement } from '../../auth/MockUserManagement';
import { UserManagement } from '../../auth/UserManagement';
import { SessionContext, TRunInContextOptions } from './context';
import { TSessionContextStore } from './store';

const asyncLocalStorage = new AsyncLocalStorage<TSessionContextStore>();

@injectable()
export class ServerContextBase extends SessionContext {

  public readonly authProvider: Auth = new MockAuth();
  public readonly userManagementProvider: UserManagement = new MockUserManagement();

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
