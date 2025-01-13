import React, { FC, useEffect, useMemo } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from 'firebase/functions'
import FirebaseContext from './FirebaseContext'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MENSSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const FirebaseProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  // Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const functions = getFunctions(app)

  useEffect(() => {
    // onAuthStateChanged(auth,async (user) => {

    // });
  }, [auth, db])
  const value = useMemo(() => ({
    firebase: {
      app,
      db,
      auth,
      functions
    }
  }), [app, auth, db, functions]);

  return (
    <FirebaseContext.Provider
      value={value}
    >
      {children}
    </FirebaseContext.Provider>
  );
};