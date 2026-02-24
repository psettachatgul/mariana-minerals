import 'reflect-metadata';

import { injectable } from 'inversify';
import { Auth } from '../../../auth';
import { Auth0NextJsClient } from '../../../auth/auth0NextJs/Client';
import { SessionContext, TRunInContextOptions } from '../context';
import { TSessionContextStore } from '../store';


@injectable()
export class Auth0NextJsBrowserContext extends SessionContext {

  public readonly sessionContextKey: string = '__X_ClientSession';

  public readonly authProvider: Auth = new Auth0NextJsClient();

  private readonly sessionCache:
    { [key: string]: TSessionContextStore | undefined; } = {};

  constructor() {
    super();
  }

  public getContext() {

    const context = this.sessionCache[this.sessionContextKey];

    return context;
  }

  public runInContext<R, TArgs extends unknown[]>(
    options: TRunInContextOptions<R, TArgs>,
    ...args: TArgs): R {

    const { initialValues, cb } = options;

    this.sessionCache[this.sessionContextKey] = {
      ...initialValues,
      authProvider: this.authProvider,
    };

    return cb(...args);
  }

  public updateStore(): void {
    throw new Error('Method not implemented.');
  }
}
