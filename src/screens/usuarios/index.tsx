import { Link } from "react-router"
import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "@/components/ui/button"
import { DB } from "@/functions/database"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { useEffect, useState } from "react"
import { TypePageStatus } from "@/types/PageStatus"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { TypeUsersViewList } from "@/types/Users"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import ItemList from "../../components/screens/users/itemList"
import { Loading } from "@/components/loading"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

const LIMIT = 10

const Usuarios = () => {
  const { db } = useFirebaseContext()
  const [pageData, setPageData] = useState<TypeUsersViewList[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')
  const { store } = useStoresContext()
  const [lastDocumentSnapshot, setLastDocumentSnapshot] = useState<QueryDocumentSnapshot<DocumentData> | undefined>(undefined)
  const [loadMoreStatus, setLoadMoreStatus] = useState(true)
  const [statusLoading, setStatusLoading] = useState(false)


  useEffect(() => {
    // if (!db || !store || pageData.length > 0) return
    const load = async () => {
      const result = await DB.views.users.list({ db })//, wheres: [['_storeId', '==', store._id]]
      let status: typeof pageStatus = 'success'
      if (!result.status) {
        status = 'error'
        return
      }

      setPageStatus(status)
      if (result.docs) {
        setPageData(Object.values(result.docs))
      }

    }
    load()
  }, [])

  async function loadMoreHandler() {
    if (!db || !store) return

    const result = await DB.views.users.list({ db, limit: 2, lastDocument: lastDocumentSnapshot, wheres: [['_storeId', '==', store._id]] })
    setStatusLoading(true)
    if (result.docs && Object.keys(result.docs).length) {
      setPageData([...pageData, ...Object.values(result.docs)])
      setLastDocumentSnapshot(result.lastDocument);
    } else {
      setLoadMoreStatus(false)
    }
    setStatusLoading(false)
  }

  if (pageStatus === 'loading') {
    return <LoadingPage />
  }

  if (pageStatus === 'error') {
    return <ErrorPage />
  }
  return <>
    {statusLoading && <Loading />}
    <HeaderPage title="Usuários">
      <Link to={'/dashboard/usuarios/novo'}>
        <Button variant={"primary"}>Novo item</Button>
      </Link>
    </HeaderPage>
    <PageContent>

      <div className=" py-6">
        <table className=" w-full">
          <thead className="bg-gray-50 hidden lg:table-header-group w-full">
            <tr>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Nome
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Tipo
              </th>

              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
              </th>
            </tr>
          </thead>
          <tbody className=" bg-white">
            {pageData.map((data) => <ItemList key={data._id} data={data} />)}
          </tbody>
        </table>
      </div>

      {pageData.length >= LIMIT && loadMoreStatus && <div className='py-4 text-center'>
        <Button onClick={loadMoreHandler} variant={'outline'}>Carregar mais</Button>
      </div>}
    </PageContent>
  </>
}
export default Usuarios