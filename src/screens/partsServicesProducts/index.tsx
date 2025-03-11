import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { Link, useSearchParams } from "react-router"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { TypePageStatus } from "@/types/PageStatus"
import { useEffect, useState } from "react"
import { DB } from "@/functions/database"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { TypePartsServicesProductsViewList } from "@/types/PartsServicesProducts"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import { EmptData } from "../../components/emptyData"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { Loading } from "../../components/loading"
import { ItemList } from "../../components/screens/partsServicesProducts/itemList"

const LIMIT = 10

const PagePartsServicesProducts = () => {
  const { db } = useFirebaseContext()
  const [pageData, setPageData] = useState<TypePartsServicesProductsViewList[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')
  const { store } = useStoresContext()
  const [lastDocumentSnapshot, setLastDocumentSnapshot] = useState<QueryDocumentSnapshot<DocumentData> | undefined>(undefined)
  const [loadMoreStatus, setLoadMoreStatus] = useState(true)
  const [statusLoading, setStatusLoading] = useState(false)
  let [searchParams] = useSearchParams();
  const removed = searchParams.get('deleted')

  useEffect(() => {
    if (!db || !store || pageData.length > 0) return

    const load = async () => {
      const result = await DB.views.partsServicesProducts.list({ db, limit: LIMIT, wheres: [['_storeId', '==', store._id]] })
      let status: typeof pageStatus = 'success'
      if (!result.status) {
        status = 'error'
        return
      }

      setPageStatus(status)
      if (result.docs) {
        setPageData(Object.values(result.docs))
        setLastDocumentSnapshot(result.lastDocument);
      }

    }
    load()
  }, [store])

  async function loadMoreHandler() {
    if (!db || !store) return

    const result = await DB.views.partsServicesProducts.list({ db, limit: 2, lastDocument: lastDocumentSnapshot, wheres: [['_storeId', '==', store._id]] })
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
    <HeaderPage title="Peças/serviços/produtos">
      <Link to={'/dashboard/pecas-servicos/novo'}>
        <Button variant={"primary"}>Novo item</Button>
      </Link>
    </ HeaderPage>
    <PageContent>
      <div className="py-6">
        {pageData.length === 0 && <EmptData />}
        {pageData.length > 0 && <table className=" w-full">
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
                Preço de custo
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Venda à vista
              </th>
              <th
                colSpan={2}
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Venda à prazo
              </th>
            </tr>
          </thead>
          <tbody className=" bg-white">

            {pageData.filter(item => removed ? item._id !== removed : true).map((data) => <ItemList key={data._id} data={data} />)}
          </tbody>
        </table>}
      </div>
      {pageData.length >= LIMIT && loadMoreStatus && <div className='py-4 text-center'>
        <Button onClick={loadMoreHandler} variant={'outline'}>Carregar mais</Button>
      </div>}
    </PageContent>
  </>
}
export default PagePartsServicesProducts