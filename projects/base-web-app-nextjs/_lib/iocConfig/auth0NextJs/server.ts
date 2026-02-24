import { Container } from 'inversify';
import { Auth0NextJsServerContext } from '../../contexts/session/auth0NextJs/ServerContext';
import { SessionContext } from '../../contexts/session/context';
import { containerIsLoaded, getIocContainer, setIocContainer } from '../containers';

const container = (() => {

  if (!containerIsLoaded()) {
    const newContainer = new Container();
    newContainer.bind<SessionContext>(SessionContext).to(Auth0NextJsServerContext).inRequestScope();

    setIocContainer(newContainer);
  }

  return getIocContainer();
})();

export default container;
