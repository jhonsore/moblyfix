import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from "../../components/ui/button"
import { Link } from "react-router"

const transactions = [
    {
        id: 'Jhonnatan Soares Rebuli',
        commission: '(xx) xxxxx-xxxx',

    },

]
const Lojas = () => {
    return <>
        <HeaderPage title="Lojas">
            <Link to={'/dashboard/dados-da-loja'}>
                <Button variant={"primary"}>Novo item</Button>
            </Link>

        </ HeaderPage>
        <PageContent>

            <div className=" py-6 hidden lg:block">
                <table className=" w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Nome
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Whatsapp
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody className=" bg-white">
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className='border-b border-gray-200'>
                                <td className="whitespace-nowrap py-4 text-sm text-gray-900 ">
                                    {transaction.id}
                                </td>
                                <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.commission}</td>
                                <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-indigo-900">
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

            <div className=" bg-white m-w-full py-6 lg:hidden">
                <table className=" w-full">

                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className='border-y border-gray-200'>
                            <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                                Nome
                            </td>
                            <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900 border-gray-200">
                                {transaction.id}
                            </td>

                            <td rowSpan={2} className="text-center border">
                                <Link to={'/dashboard/ordem-servico/analise-tecnica'}>
                                    <span className="material-symbols-outlined text-gray-400 hover:text-indigo-900 mr-2">
                                        visibility
                                    </span>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className='border-b-4 border-gray-200'>
                            <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                                Whatsapp
                            </td>
                            <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900">
                                {transaction.commission}
                            </td>

                        </tr>
                    ))}



                </table>
            </div>
            <div className='py-4 flex justify-end'>
                <button
                    type="button"
                    className=" inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-500 focus:z-10 focus:outline-none focus:ring-1 hover:text-white"
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                    type="button"
                    className=" ml-3 inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500  focus:z-10 focus:outline-none focus:ring-1 hover:bg-indigo-500 hover:text-white "
                >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>

        </PageContent>
    </>
}
export default Lojas