import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { Link } from "react-router"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { TypeSalesViewList } from "@/types/Sales"
import { useEffect, useState } from "react"
import { TypePageStatus } from "@/types/PageStatus"
import { DB } from "@/functions/database"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { ItemList } from "../../components/screens/sales/itemList"
import { EmptData } from "../../components/emptyData"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import { Loading } from "../../components/loading"
const LIMIT = 10
const PageSales = () => {
    const { db } = useFirebaseContext()
    const [pageData, setPageData] = useState<TypeSalesViewList[]>([])
    const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')
    const [loadMoreStatus, setLoadMoreStatus] = useState(true)
    const [statusLoading, setStatusLoading] = useState(false)
    const [lastDocumentSnapshot, setLastDocumentSnapshot] = useState<QueryDocumentSnapshot<DocumentData> | undefined>(undefined)
    const { store } = useStoresContext()

    useEffect(() => {
        if (!db) return
        const load = async () => {
            const result = await DB.views.sales.list({ db })
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

        const result = await DB.views.sales.list({ db, limit: 2, lastDocument: lastDocumentSnapshot, wheres: [['_storeId', '==', store._id]] })
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
        <HeaderPage title="Vendas">
            <Link to={'/dashboard/vendas/novo'}>
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
                                className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                                Cliente
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Valor
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap px-2 py-4 text-left text-sm font-semibold text-gray-900"
                            >
                                Pagamento
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Data
                            </th>

                        </tr>
                    </thead>
                    <tbody className=" bg-white">
                        {pageData.map((data) => <ItemList key={data._id} data={data} />)}
                    </tbody>
                </table>}
            </div>
            {pageData.length >= LIMIT && loadMoreStatus && <div className='py-4 text-center'>
                <Button onClick={loadMoreHandler} variant={'outline'}>Carregar mais</Button>
            </div>}


        </PageContent>
    </>
}
export default PageSales