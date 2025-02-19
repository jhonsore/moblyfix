import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from "../../components/ui/button"
import { Link } from "react-router"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { useEffect, useState } from "react"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { TypeStoresViewList } from "@/types/Stores"
import { TypePageStatus } from "@/types/PageStatus"
import { DB } from "@/functions/database"
import { useStoresContext } from "@/providers/stores/useStoresContext"




const PageStores = () => {
    const { db } = useFirebaseContext()
    const [pageData, setPageData] = useState<TypeStoresViewList[]>([])
    const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')
    const { store } = useStoresContext()

    useEffect(() => {
        if (!db) return
        const load = async () => {
            const result = await DB.views.stores.list({ db })
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
    }, [store])

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
                        {pageData.map((data) => (
                            <tr key={data._id} className='lg:border-b border-gray-200 '>
                                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
                                    <div className="flex justify-between">
                                        <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                                            Nome
                                        </div>
                                        <div className="text-sm text-gray-900 p-4 lg:p-0">
                                            {data.name}
                                        </div>
                                    </div>
                                </td>

                                <td className=" whitespace-nowrap pl-3 text-center lg:text-right text-sm font-medium sm:pr-6">
                                    <Link to={'/dashboard/lojas/1'}>
                                        <span className="text-gray-400 hover:text-indigo-900 mr-2 hidden lg:inline">
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </span>
                                        <span className="text-gray-400 hover:text-indigo-900 lg:mr-2 lg:hidden flex justify-center ">

                                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />

                                        </span>
                                    </Link>
                                    <a href="#" className="text-gray-400 hover:text-indigo-900 hidden lg:inline">
                                        <span className="material-symbols-outlined">
                                            delete
                                        </span><span className="sr-only">, {data._id}</span>
                                    </a>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </PageContent>
    </>
}
export default PageStores