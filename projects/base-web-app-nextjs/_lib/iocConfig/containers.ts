import { Container } from 'inversify';

let __iocContainer: Container | undefined = undefined;

export const getIocContainer = () => {

  if (!__iocContainer) {
    throw new Error('IOC container has not been set.  Make sure you have imported a iocConfig');
  }

  return __iocContainer;

};

export const containerIsLoaded = () => {
  return !!__iocContainer;
};

export const setIocContainer = (container: Container) => {
  __iocContainer = container;
};
