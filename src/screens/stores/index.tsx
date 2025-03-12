import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { Link, useSearchParams } from "react-router"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { useEffect, useState } from "react"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { TypeStoresViewList } from "@/types/Stores"
import { TypePageStatus } from "@/types/PageStatus"
import { DB } from "@/functions/database"
import { useAuthContext } from "../../providers/auth/useAuthContext"
import { ItemList } from "@/components/screens/stores/itemList"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { useStoresContext } from "@/providers/stores/useStoresContext"
import { Loading } from "@/components/loading"

const LIMIT = 10

const PageStores = () => {
    const { db } = useFirebaseContext()
    const { claims } = useAuthContext()
    const { store } = useStoresContext()
    const [pageData, setPageData] = useState<TypeStoresViewList[]>([])
    const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')
    const [loadMoreStatus, setLoadMoreStatus] = useState(true)
    const [statusLoading, setStatusLoading] = useState(false)
    const [lastDocumentSnapshot, setLastDocumentSnapshot] = useState<QueryDocumentSnapshot<DocumentData> | undefined>(undefined)
    let [searchParams] = useSearchParams();
    const removed = searchParams.get('deleted')

    useEffect(() => {
        if (!db || !claims) return
        const load = async () => {
            const result = await DB.views.stores.list({ db, orderBy: [['createdAt', 'desc']], wheres: [['_headquarterId', '==', claims.headquarterId]] })
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
    }, [claims])

    async function loadMoreHandler() {
        if (!db || !store) return

        const result = await DB.views.stores.list({ db, limit: 2, lastDocument: lastDocumentSnapshot, wheres: [['_storeId', '==', store._id]] })
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
        <HeaderPage title="Lojas">
            <Link to={'/dashboard/lojas/novo'}>
                <Button variant={"primary"}>Novo item</Button>
            </Link>

        </ HeaderPage>
        <PageContent>

            <div className=" py-6 ">
                <table className=" w-full">
                    <thead className="bg-gray-50 hidden lg:table-header-group w-full">
                        <tr>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Nome
                            </th>

                        </tr>
                    </thead>
                    <tbody className=" bg-white">

                        {pageData.filter(item => removed ? item._id !== removed : true).map((data) => <ItemList key={data._id} data={data} />)}
                    </tbody>
                </table>
            </div>
            {pageData.length >= LIMIT && loadMoreStatus && <div className='py-4 text-center'>
                <Button onClick={loadMoreHandler} variant={'outline'}>Carregar mais</Button>
            </div>}
        </PageContent>
    </>
}
export default PageStores