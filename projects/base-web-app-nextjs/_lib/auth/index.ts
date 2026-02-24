import 'reflect-metadata';

import { injectable } from 'inversify';
import { SessionContext } from '../contexts/session/context';
import { getIocContainer } from '../iocConfig/containers';
import { TAuthUser } from './_schemas';

@injectable()
export abstract class Auth {

  public onSignOut: () => Promise<void> = () => { return Promise.resolve(); };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract init(options?: any): void;

  /**
   * Is the current user logged in
   */
  public abstract isLoggedIn(): Promise<boolean>;

  /**
   * Get the current user or null if current user is not set
   */
  public abstract getCurrentUser(): Promise<TAuthUser | null>;

  /**
   * get id token of current user
   */
  public abstract getIdTokenOfCurrentUser(): Promise<string | undefined>;

  /**
   * sign out and revoke token
   */
  public abstract signOut(): Promise<void>;
}


export const auth = () => {

  const container = getIocContainer();

  const session = container.get(SessionContext);

  // if there's no context, check to see if there's an auth binding and use that
  const authProvider = session.getContext()?.authProvider ?? container.get<Auth>(Auth);

  if (!authProvider) {
    throw new Error('An auth provider has not been set yet');
  }

  return authProvider;
};
