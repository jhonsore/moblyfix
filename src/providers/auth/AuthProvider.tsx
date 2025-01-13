import React, { FC } from 'react';
import AuthContext from './AuthContext'

export const AuthProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const user = 1
  const value = { user };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};