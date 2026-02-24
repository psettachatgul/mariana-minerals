import 'reflect-metadata';

import { injectable } from 'inversify';
import { SessionContext } from '../contexts/session/context';
import { getIocContainer } from '../iocConfig/containers';
import { TAuthUser } from './_schemas';

@injectable()
export abstract class UserManagement {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract init(options?: any): void;

  /**
   * Create a new user
   * @param user
   * @param password
   */
  public abstract createUser(user: TAuthUser, password?: string): Promise<TAuthUser>;

  /**
   * get id token for given user
   * @param user
   */
  public abstract getIdToken(user: TAuthUser): Promise<string | undefined>;

  /**
   * get user by email
   */
  public abstract getUserByEmail(email: string): Promise<Partial<TAuthUser>>;

  /**
   * get user by id
   */
  public abstract getUserById(uid: string): Promise<TAuthUser | undefined>;

}


export const userManagement = () => {

  const container = getIocContainer();

  const session = container.get(SessionContext);

  // if there's no context, check to see if there's an auth binding and use that
  const userManagementProvider = session.getContext()?.userManagementProvider ??
    container.get<UserManagement>(UserManagement);

  if (!userManagementProvider) {
    throw new Error('A user management provider has not been set yet');
  }

  return userManagementProvider;
};
