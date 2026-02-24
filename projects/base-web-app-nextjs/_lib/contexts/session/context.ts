import { injectable } from 'inversify';
import 'reflect-metadata';
import { TSessionContextStore } from './store';

export type TRunInContextOptions<R, TArgs extends unknown[]> = {
  initialValues: Omit<TSessionContextStore, 'authProvider' | 'userManagementProvider'>,
  cb: (...args: TArgs) => R,
};

@injectable()
export abstract class SessionContext {

  public abstract getContext(): TSessionContextStore | undefined;

  public abstract runInContext<R, TArgs extends unknown[]>(
    options: TRunInContextOptions<R, TArgs>, ...cbArgs: TArgs): R;

  public abstract updateStore(newValues: TSessionContextStore): void;
}
