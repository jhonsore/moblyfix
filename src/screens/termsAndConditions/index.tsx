import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { Link, useSearchParams } from "react-router"
import { useEffect, useState } from "react"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { TypeTermsAndConditionsViewList } from "../../types/TermsAndConditions"
import { DB } from "../../functions/database"
import { TypePageStatus } from "../../types/PageStatus"
import { LoadingPage } from "../../components/loadingPage"
import { ErrorPage } from "../../components/errorPage"
import { EmptData } from "../../components/emptyData"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import { ItemList } from "../../components/screens/termsAndConditions/itemList"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { Loading } from "@/components/loading"

const LIMIT = 10

const PageTermsandConditions = () => {
  const { db } = useFirebaseContext()
  const { store } = useStoresContext()

  const [termsAndConditions, setTermsAndConditions] = useState<TypeTermsAndConditionsViewList[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')
  const [loadMoreStatus, setLoadMoreStatus] = useState(true)
  const [statusLoading, setStatusLoading] = useState(false)
  const [lastDocumentSnapshot, setLastDocumentSnapshot] = useState<QueryDocumentSnapshot<DocumentData> | undefined>(undefined)

  let [searchParams] = useSearchParams();
  const removed = searchParams.get('deleted')

  useEffect(() => {
    if (!db || !store || termsAndConditions.length > 0) return
    const load = async () => {
      const result = await DB.views.termsAndConditions.list({ db, orderBy: [['createdAt', 'asc']], wheres: [['_storeId', '==', store._id]] })
      let status: typeof pageStatus = 'success'

      if (!result.status) {
        status = 'error'
        return
      }

      setPageStatus(status)
      if (result.docs) {
        setTermsAndConditions(Object.values(result.docs))
      }

    }
    load()
  }, [store])

  async function loadMoreHandler() {
    if (!db || !store) return

    const result = await DB.views.termsAndConditions.list({ db, limit: 2, lastDocument: lastDocumentSnapshot, wheres: [['_storeId', '==', store._id]] })
    setStatusLoading(true)
    if (result.docs && Object.keys(result.docs).length) {
      setTermsAndConditions([...termsAndConditions, ...Object.values(result.docs)])
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
    <HeaderPage title="Condições de serviços">
      {termsAndConditions.length <= 0 && <Link to={'/dashboard/condicoes-de-servicos/novo'}>
        <Button variant={"primary"}>Novo item</Button>
      </Link>}
    </ HeaderPage>
    <PageContent>
      <div className=" m-w-full py-6">
        {termsAndConditions.length === 0 && <EmptData />}
        {termsAndConditions.length > 0 && <table className=" w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Título
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className=" bg-white">
            {termsAndConditions.filter(item => removed ? item._id !== removed : true).map((data) => <ItemList key={data._id} data={data} />)}
          </tbody>
        </table>}
      </div>
      {termsAndConditions.length >= LIMIT && loadMoreStatus && <div className='py-4 text-center'>
        <Button onClick={loadMoreHandler} variant={'outline'}>Carregar mais</Button>
      </div>}
    </PageContent>
  </>
}
export default PageTermsandConditions