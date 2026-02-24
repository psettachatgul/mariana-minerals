import { Container } from 'inversify';
import { SessionContext } from '../../contexts/session/context';
import { ServerContext } from '../../contexts/session/mock/ServerContext';
import { containerIsLoaded, getIocContainer, setIocContainer } from '../containers';

const container = (() => {

  if (!containerIsLoaded()) {
    const newContainer = new Container();
    newContainer.bind<SessionContext>(SessionContext).to(ServerContext).inRequestScope();

    setIocContainer(newContainer);
  }

  return getIocContainer();
})();

export default container;
