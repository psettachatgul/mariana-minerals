import { Container } from 'inversify';
import { Auth } from '../../auth';
import { Auth0NextJsClient } from '../../auth/auth0NextJs/Client';
import { Auth0NextJsBrowserContext } from '../../contexts/session/auth0NextJs/BrowserContext';
import { SessionContext } from '../../contexts/session/context';
import { containerIsLoaded, getIocContainer, setIocContainer } from '../containers';

const container = (() => {

  if (!containerIsLoaded()) {
    const newContainer = new Container();
    newContainer.bind<SessionContext>(SessionContext).to(Auth0NextJsBrowserContext).inSingletonScope();
    newContainer.bind<Auth>(Auth).to(Auth0NextJsClient).inSingletonScope();


    setIocContainer(newContainer);
  }

  return getIocContainer();
})();

export default container;
