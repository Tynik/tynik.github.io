import React, { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import { useQuery } from 'react-query';
import { useEth } from '~/hooks';
import { authRequest } from '~/api';

type UserContextValue = {
  ethAccount: string | null;
  isAuthenticated: boolean;
};

const UserContext = createContext<UserContextValue>({
  ethAccount: null,
  isAuthenticated: false,
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { ethAccount } = useEth();

  const { data: auth } = useQuery(['auth'], () => authRequest(ethAccount!), {
    enabled: Boolean(ethAccount),
  });

  const contextValue = useMemo<UserContextValue>(
    () => ({
      ethAccount,
      isAuthenticated: auth?.status === 'ok',
    }),
    [ethAccount, auth]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
