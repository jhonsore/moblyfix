import React, { FC, useEffect, useState } from 'react';
import AuthContext from './AuthContext'
import { onAuthStateChanged, User } from 'firebase/auth';
import { useFirebaseContext } from '../firebase/useFirebaseContext';

export const AuthProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>()
  const { auth } = useFirebaseContext()
  const [idToken, setIdToken] = useState('')
  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const idToken = await auth.currentUser?.getIdToken()

      // get custom claims
      //     firebase.auth().currentUser.getIdTokenResult()
      // .then((idTokenResult) => {
      //    // Confirm the user is an Admin.
      //    if (!!idTokenResult.claims.admin) {
      //      // Show admin UI.
      //      showAdminUI();
      //    } else {
      //      // Show regular user UI.
      //      showRegularUI();
      //    }
      // })
      // .catch((error) => {
      //   console.log(error);
      // });

      if (idToken) setIdToken(idToken)
      if (currentUser) setUser(currentUser)
      else { setUser(null) }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, [])

  const value = { user, idToken };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};