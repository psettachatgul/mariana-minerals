import { User } from '@auth0/nextjs-auth0/types';
import { TAuthUser } from '../_schemas';

/**
   * Helper method to map Auth0 user object to TAuthUser
   */
export const mapAuth0UserToAuthUser = (auth0User: User): TAuthUser => {
  return {
    _id: auth0User.sub || auth0User.user_id || '',
    email: auth0User.email || '',
  };
};
