/* eslint-disable @typescript-eslint/no-unused-vars */
import { TAuthUser } from './_schemas';
import { Auth } from './index';

/**
 * This is a mock auth implmentation -- this should be replaced by a real implementation
 */
export class MockAuth extends Auth {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public init(options?: any): void {
    throw new Error('Method not implemented.');
  }
  public isLoggedIn(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  public getCurrentUser(): Promise<TAuthUser | null> {
    throw new Error('Method not implemented.');
  }
  public getIdTokenOfCurrentUser(): Promise<string | undefined> {
    throw new Error('Method not implemented.');
  }
  public getUserByEmail(email: string): Promise<Partial<TAuthUser>> {
    throw new Error('Method not implemented.');
  }
  public getUserById(uid: string): Promise<TAuthUser | undefined> {
    throw new Error('Method not implemented.');
  }
  public signOut(): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
