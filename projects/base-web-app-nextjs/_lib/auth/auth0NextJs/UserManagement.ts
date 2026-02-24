import { TAuthUser } from '../_schemas';
import { UserManagement } from '../UserManagement';

export class Auth0NextJsUserManagement extends UserManagement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public init(options?: any): void {
    throw new Error('Method not implemented.');
  }
  public createUser(user: TAuthUser, password?: string): Promise<TAuthUser> {
    throw new Error('Method not implemented.');
  }
  public getIdToken(user: TAuthUser): Promise<string | undefined> {
    throw new Error('Method not implemented.');
  }
  public getUserByEmail(email: string): Promise<Partial<TAuthUser>> {
    throw new Error('Method not implemented.');
  }
  public getUserById(uid: string): Promise<TAuthUser | undefined> {
    throw new Error('Method not implemented.');
  }

}
