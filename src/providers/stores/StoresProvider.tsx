import React, { FC, useEffect, useState } from 'react';
import AuthContext from './StoresContext'
import { useFirebaseContext } from '../firebase/useFirebaseContext';
import { useAuthContext } from '../auth/useAuthContext';
import { DB } from '../../functions/database';
import { TypeStoresViewList } from '../../types/Stores';

export const StoresProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { db } = useFirebaseContext()
  const { claims } = useAuthContext()
  const [stores, setStores] = useState<{ [id: string]: TypeStoresViewList }>({})
  const [store, setStore] = useState<TypeStoresViewList>()

  useEffect(() => {
    if (!claims || Object.keys(stores).length > 0) return
    const load = async () => {
      const response = await DB.views.stores.list({ db, orderBy: [['createAt', 'desc']], wheres: [['_headquarterId', '==', claims.headquarterId]] })
      if (response.status && response.docs) {
        setStores(response.docs)
        setStore(Object.values(response.docs)[0])
      }
    }
    load()
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