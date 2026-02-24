import { injectable } from 'inversify';
import 'reflect-metadata';
import { Auth } from '../../../auth';
import { MockAuth } from '../../../auth/MockAuth';
import { SessionContext, TRunInContextOptions } from '../context';
import { TSessionContextStore } from '../store';


@injectable()
export class BrowserContext extends SessionContext {

  public readonly sessionContextKey: string = '__PatsonClientSession';

  public readonly authProvider: Auth = new MockAuth();

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
