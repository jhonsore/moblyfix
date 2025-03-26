import React, { FC, useEffect, useState } from 'react';
import AuthContext from './StoresContext'
import { useFirebaseContext } from '../firebase/useFirebaseContext';
import { useAuthContext } from '../auth/useAuthContext';
import { TypeStoresViewList } from '../../types/Stores';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { COLLECTIONS_VIEWS } from '../../types/Collections';

export const StoresProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { db } = useFirebaseContext()
  const { claims } = useAuthContext()
  const [stores, setStores] = useState<{ [id: string]: TypeStoresViewList }>({})
  const [store, setStore] = useState<TypeStoresViewList>()

  useEffect(() => {
    if (!claims || Object.keys(stores).length > 0) return

    const q = query(collection(db, COLLECTIONS_VIEWS._viewStoresList), orderBy('createdAt', 'desc'), where('_headquarterId', '==', claims.headquarterId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: typeof stores = {};
      querySnapshot.forEach((doc) => {
        docs[doc.id] = doc.data() as TypeStoresViewList;
      });

      setStores(docs)
      setStore(Object.values(docs).sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis())[0])
    });
    () => unsubscribe()
  }, [claims])

  const value = { stores, store, setStore };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};