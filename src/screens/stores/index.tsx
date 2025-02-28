import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from "../../components/ui/button"
import { Link } from "react-router"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { useEffect, useState } from "react"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { TypeStoresViewList } from "@/types/Stores"
import { TypePageStatus } from "@/types/PageStatus"
import { DB } from "@/functions/database"
import { useAuthContext } from "../../providers/auth/useAuthContext"
import { ItemList } from "@/components/screens/stores/itemList"

const PageStores = () => {
    const { db } = useFirebaseContext()
    const { claims } = useAuthContext()
    const [pageData, setPageData] = useState<TypeStoresViewList[]>([])
    const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')

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

    if (pageStatus === 'loading') {
        return
        <LoadingPage />
    }

    if (pageStatus === 'error') {
        return
        <ErrorPage />
    }
    return <>
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
                                scope="col"
                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Nome
                            </th>

                        </tr>
                    </thead>
                    <tbody className=" bg-white">

                        {pageData.map((data) => <ItemList key={data._id} data={data} />)}
                    </tbody>
                </table>
            </div>
        </PageContent>
    </>
}
export default PageStores