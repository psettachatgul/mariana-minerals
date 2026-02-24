import 'reflect-metadata';

import { injectable } from 'inversify';
import { TAuthUser } from './_schemas';
import { UserManagement } from './UserManagement';

@injectable()
export class MockUserManagement extends UserManagement {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public init(options?: any): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Create a new user
   * @param user
   * @param password
   */
  public createUser(user: TAuthUser, password?: string): Promise<TAuthUser> {
    throw new Error('Method not implemented.');
  };

  /**
   * get id token for given user
   * @param user
   */
  public getIdToken(user: TAuthUser): Promise<string | undefined> {
    throw new Error('Method not implemented.');
  };

  /**
   * get user by email
   */
  public getUserByEmail(email: string): Promise<Partial<TAuthUser>> {
    throw new Error('Method not implemented.');
  };

  /**
   * get user by id
   */
  public getUserById(uid: string): Promise<TAuthUser | undefined> {
    throw new Error('Method not implemented.');
  };

}
