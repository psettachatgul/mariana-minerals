import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { TAuthUser } from '../_schemas';
import { Auth } from '../index';
import { mapAuth0UserToAuthUser } from './utils';

/**
 * Auth0 server-side implementation using the @auth0/nextjs-auth0 SDK
 */
export class Auth0NextJsServer extends Auth {

  private auth0 = new Auth0Client();

  public init(): void {
    // Auth0 client initialization is handled by the SDK
    // No additional setup needed
  }

  public async isLoggedIn(): Promise<boolean> {
    try {
      const session = await this.auth0.getSession();
      return !!session?.user;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  }

  public async getCurrentUser(): Promise<TAuthUser | null> {
    try {
      const session = await this.auth0.getSession();
      if (!session?.user) {
        return null;
      }
      return mapAuth0UserToAuthUser(session.user);
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  public async setCurrentUser(): Promise<void> {
    // Cannot explicitly set current user in Auth0 - session is managed by the SDK
    // This would be a no-op or could involve updating user metadata
    throw new Error('setCurrentUser is not supported with Auth0 - user is managed by the session');
  }

  public async getIdTokenOfCurrentUser(): Promise<string | undefined> {
    try {
      const session = await this.auth0.getSession();
      if (session) {
        return session.accessTokens?.[0].accessToken;
      }
    } catch (error) {
      console.error('Error getting ID token of current user:', error);
      return undefined;
    }
  }

  public async signOut(): Promise<void> {
    throw new Error('Sign out is done through api/auth/logout');
  }


}

