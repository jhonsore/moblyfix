import React, { FC, useEffect, useState } from 'react';
import AuthContext from './OsContext'
import { TypeOs } from '../../../types/Os';
import { useParams } from 'react-router';
import { DB } from '../../../functions/database';
import { useFirebaseContext } from '../../../providers/firebase/useFirebaseContext';
import { TypePageStatus } from '../../../types/PageStatus';

export const OsProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [os, setOs] = useState<TypeOs>()
  const { id } = useParams()
  const { db } = useFirebaseContext()
  const [pageStatus, setPageStatus] = useState<TypePageStatus>(id ? 'loading' : 'success')

  useEffect(() => {
    if (!id) return
    const load = async () => {
      const result = await DB.os.read({ db, id })
      const { doc } = result

      let status: typeof pageStatus = 'success'
      if (!result.status || !result.doc) {
        setPageStatus('error')
        return
      }

      setPageStatus(status)

      setOs(doc)
    }
    load()
  }, [id])
  const value = { os, setOs, pageStatus };
  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};