import React, { FC, createContext } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { initializeApp } from 'firebase/app'
import firebaseConfig from '../../config/firebase';
import { getStorage } from "firebase/storage";

const fir = initializeApp(firebaseConfig)
const db = getFirestore(fir);
const auth = getAuth(fir);
const functions = getFunctions(fir)
const storage = getStorage();
const values = { db, auth, functions, app: fir, storage }
const FirebaseContext = createContext(values);

const FirebaseProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <FirebaseContext.Provider
      value={values}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext };
export default FirebaseProvider;