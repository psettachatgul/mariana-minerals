import { getIocContainer } from '../../iocConfig/containers';
import { SessionContext, TRunInContextOptions } from './context';

export const getSessionContext = () => {
  const container = getIocContainer();

  const context = container.get<SessionContext>(SessionContext);

  return context;
};

export const runInSessionContext = <R, TArgs extends unknown[]>(
  options: TRunInContextOptions<R, TArgs>, ...cbArgs: TArgs): R => {

  const container = getIocContainer();

  const context = container.get<SessionContext>(SessionContext);

  return context.runInContext(options, ...cbArgs);

};
