'use client';
import { createContext } from 'react';
import { TAuthUser } from '../../../_lib/auth/_schemas';

export type TAuthContext = {
  user: TAuthUser | undefined,
};

const AuthContext = createContext<TAuthContext>({ user: undefined });

export default AuthContext;
