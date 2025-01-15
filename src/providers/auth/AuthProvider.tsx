import React, { FC, useEffect, useState } from 'react';
import AuthContext from './AuthContext'
import { onAuthStateChanged, User } from 'firebase/auth';
import { useFirebaseContext } from '../firebase/useFirebaseContext';

export const AuthProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>()
  const { auth } = useFirebaseContext()
  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser)
      else { setUser(null) }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, [])

  const value = { user };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};