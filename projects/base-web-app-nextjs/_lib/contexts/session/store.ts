import { NextRequest } from 'next/server';
import { Auth } from '../../auth';
import { UserManagement } from '../../auth/UserManagement';

export type TSessionContextStore = {
  authProvider: Auth;
  userManagementProvider?: UserManagement;
  request?: NextRequest;
};
