import React, { FC, useEffect, useState } from 'react';
import AuthContext, { IAuthContext } from './AuthContext'
import { onAuthStateChanged, ParsedToken } from 'firebase/auth';
import { useFirebaseContext } from '../firebase/useFirebaseContext';
import { DB } from '../../functions/database';
import { TypeUsers } from '../../types/Users';

export const AuthProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IAuthContext['user'] | null>()
  const { auth, db } = useFirebaseContext()
  const [idToken, setIdToken] = useState('')
  const [claims, setClaims] = useState<ParsedToken>()

  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const idToken = await auth.currentUser?.getIdToken()

      const idTokenResult = await auth.currentUser?.getIdTokenResult()
      if (idTokenResult) setClaims(idTokenResult.claims)
      if (idToken) setIdToken(idToken)
      if (currentUser) {
        const result = await DB.users.read({ db, id: currentUser.uid })
        if (result.status) setUser({ user: currentUser, data: result.doc as TypeUsers })

      }
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