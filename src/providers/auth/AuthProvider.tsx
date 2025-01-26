import React, { FC, useEffect, useState } from 'react';
import AuthContext from './AuthContext'
import { onAuthStateChanged, ParsedToken, User } from 'firebase/auth';
import { useFirebaseContext } from '../firebase/useFirebaseContext';

export const AuthProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>()
  const { auth } = useFirebaseContext()
  const [idToken, setIdToken] = useState('')
  const [claims, setClaims] = useState<ParsedToken>()

  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const idToken = await auth.currentUser?.getIdToken()

      auth.currentUser?.getIdTokenResult()
        .then((idTokenResult) => {
          setClaims(idTokenResult.claims)
        })

      if (idToken) setIdToken(idToken)
      if (currentUser) setUser(currentUser)
      else { setUser(null) }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, [])

  const value = { user, idToken, claims };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};