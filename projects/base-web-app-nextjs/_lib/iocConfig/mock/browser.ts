import { Container } from 'inversify';
import { Auth } from '../../auth';
import { MockAuth } from '../../auth/MockAuth';
import { SessionContext } from '../../contexts/session/context';
import { BrowserContext } from '../../contexts/session/mock/BrowserContext';
import { containerIsLoaded, getIocContainer, setIocContainer } from '../containers';

const container = (() => {

  if (!containerIsLoaded()) {
    const newContainer = new Container();
    newContainer.bind<SessionContext>(SessionContext).to(BrowserContext).inSingletonScope();
    newContainer.bind<Auth>(Auth).to(MockAuth).inSingletonScope();


    setIocContainer(newContainer);
  }

  return getIocContainer();
})();

export default container;
