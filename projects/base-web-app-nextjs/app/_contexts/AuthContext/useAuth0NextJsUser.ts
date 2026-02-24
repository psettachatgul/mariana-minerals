import { useUser } from '@auth0/nextjs-auth0';
import { mapAuth0UserToAuthUser } from '../../../_lib/auth/auth0NextJs/utils';

export const useAuth0NextJsUser = () => {

  const { user, isLoading } = useUser();

  return {
    user: user ? mapAuth0UserToAuthUser(user) : undefined,
    isLoading,
  };
};
