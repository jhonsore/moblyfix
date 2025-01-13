import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { Functions } from 'firebase/functions';
import { createContext } from 'react';

export interface IFirebaseContext {
  firebase: {
    app: FirebaseApp
    db: Firestore
    auth: Auth
    functions: Functions
  }
}

const FirebaseContext = createContext<Partial<IFirebaseContext>>({});

export default FirebaseContext;
