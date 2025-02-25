import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from "../../components/ui/button"
import { Link } from "react-router"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { TypePageStatus } from "@/types/PageStatus"
import { useEffect, useState } from "react"
import { DB } from "@/functions/database"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { TypePartsServicesProducts } from "@/types/PartsServicesProducts"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import { EmptData } from "../../components/emptyData"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { Loading } from "../../components/loading"
import formatToBrazilianReal from "../../functions/utils/formatToBrazilianReal"

const LIMIT = 10

const PagePartsServicesProducts = () => {
  const { db } = useFirebaseContext()
  const [pageData, setPageData] = useState<TypePartsServicesProducts[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')
  const { store } = useStoresContext()
  const [lastDocumentSnapshot, setLastDocumentSnapshot] = useState<QueryDocumentSnapshot<DocumentData> | undefined>(undefined)
  const [loadMoreStatus, setLoadMoreStatus] = useState(true)
  const [statusLoading, setStatusLoading] = useState(false)

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
            {pageData.map((data) => (
              <tr key={data._id} className='lg:border-b border-gray-200'>
                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200">
                  <div className="flex justify-between">
                    <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                      Nome
                    </div>
                    <div className="text-sm text-gray-900 p-4 lg:p-0">
                      {data.name}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200">
                  <div className="flex justify-between">
                    <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                      Preço de custo
                    </div>
                    <div className="text-sm text-gray-900 p-4 lg:p-0">
                      {formatToBrazilianReal(data.costPrice.toString()) || '-'}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200">
                  <div className="flex justify-between">
                    <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                      Venda à vista
                    </div>
                    <div className="text-sm text-gray-900 p-4 lg:p-0">
                      {formatToBrazilianReal(data.cashPrice.toString()) || '-'}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b-4 border-gray-200 lg:border-none">
                  <div className="flex justify-between">
                    <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                      Venda à prazo
                    </div>
                    <div className="text-sm text-gray-900 p-4 lg:p-0">
                      {formatToBrazilianReal(data.installmentPrice.toString()) || '-'}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap pl-3 text-center lg:text-right text-sm font-medium sm:pr-6 ">
                  <Link to={`/dashboard/pecas-servicos/${data._id}`}>
                    <span className="material-symbols-outlined text-gray-400 hover:text-indigo-900 mr-2 hidden lg:inline">
                      edit
                    </span>
                    <span className="text-gray-400 hover:text-indigo-900 lg:hidden flex justify-center ">
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </Link>

                  <a href="#" className="text-gray-400 hover:text-indigo-900">
                    <span className="material-symbols-outlined text-gray-400 hover:text-indigo-900 mr-2 hidden lg:inline">
                      delete
                    </span><span className="sr-only">, {data._id}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
      {pageData.length > LIMIT && loadMoreStatus && <div className='py-4 text-center'>
        <Button onClick={loadMoreHandler} variant={'outline'}>Carregar mais</Button>
      </div>}
    </PageContent>
  </>
}
export default PagePartsServicesProducts