import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from "../../components/ui/button"
import { Link } from "react-router"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { TypeSales } from "@/types/Sales"
import { useEffect, useState } from "react"
import { TypePageStatus } from "@/types/PageStatus"
import { DB } from "@/functions/database"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"


const transactions = [
    {
        id: 'Peça 1',
        company: 'R$xx.xx',
        share: 'R$xx.xx',
        commission: 'R$xx.xx',

    },

]



const PageSales = () => {
    const { db } = useFirebaseContext()
    const [pageData, setPageData] = useState<TypeSales[]>([])
    const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')

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

    if (pageStatus === 'loading') {
        return <LoadingPage />
    }

    if (pageStatus === 'error') {
        return <ErrorPage />
    }
    return <>
        <HeaderPage title="Vendas">
            <Link to={'/dashboard/vendas/novo'}>
                <Button variant={"primary"}>Novo item</Button>
            </Link>
        </ HeaderPage>
        <PageContent>


            <div className="py-6">
                <table className=" w-full">
                    <thead className="bg-gray-50 hidden lg:table-header-group w-full">
                        <tr>
                            <th
                                scope="col"
                                className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
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
                                className="whitespace-nowrap px-2 py-4 text-left text-sm font-semibold text-gray-900"
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
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className='lg:border-b border-gray-200'>
                                <td className="whitespace-nowrap lg:px-2 lg:pl-6 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
                                    <div className="flex justify-between">
                                        <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                                            Nome
                                        </div>
                                        <div className="text-sm text-gray-900 p-4 lg:p-0">
                                            {transaction.id}
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
                                    <div className="flex justify-between">
                                        <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                                            Preço de custo
                                        </div>
                                        <div className="text-sm text-gray-900 p-4 lg:p-0">
                                            {transaction.company}
                                        </div>
                                    </div>

                                </td>
                                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
                                    <div className="flex justify-between">
                                        <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                                            Venda à vista
                                        </div>
                                        <div className="text-sm text-gray-900 p-4 lg:p-0">
                                            {transaction.share}
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b-4 border-gray-200 lg:border-none">
                                    <div className="flex justify-between">
                                        <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                                            Venda à prazo
                                        </div>
                                        <div className="text-sm text-gray-900 p-4 lg:p-0">
                                            {transaction.commission}
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap pl-3 text-center lg:text-right text-sm font-medium sm:pr-6">
                                    <Link to={'/dashboard/pecas-servicos/1'}>
                                        <span className="material-symbols-outlined text-gray-400 hover:text-indigo-900 mr-2 hidden lg:inline">
                                            edit
                                        </span>
                                        <span className="text-gray-400 hover:text-indigo-900 lg:mr-2 lg:hidden flex justify-center ">
                                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    </Link>
                                    <a href="#" className="text-gray-400 hover:text-indigo-900 hidden lg:inline">
                                        <span className="material-symbols-outlined">
                                            delete
                                        </span><span className="sr-only">, {transaction.id}</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='py-4 flex justify-end'>
                <button
                    type="button"
                    className="inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-500 focus:z-10 focus:outline-none focus:ring-1 hover:text-white"
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                    type="button"
                    className="ml-3 inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500  focus:z-10 focus:outline-none focus:ring-1 hover:bg-indigo-500 hover:text-white "
                >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>


        </PageContent>
    </>
}
export default PageSales