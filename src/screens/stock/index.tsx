import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"

const transactions = [
  {
    id: 'peça 1',
    commission: '20',

  },

]



const Stock = () => {

  return <>
    <HeaderPage title="Estoque">
      <Link to={'/dashboard/estoque/item'}>
        <Button variant={"primary"}>Novo item</Button>
      </Link>
    </HeaderPage>
    <PageContent>

      <div className=" m-w-full py-6 hidden lg:block">
        <table className=" w-full">
          <thead className="bg-gray-50 hidden lg:table-header-group w-full">
            <tr className="bg-gray-50">
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
                Itens
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
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
                <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">
                  <div className="flex justify-between">
                    <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                      Itens
                    </div>
                    <div className="text-sm text-gray-900 p-4 lg:p-0">
                      {transaction.commission}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap pl-3 text-center lg:text-right text-sm font-medium sm:pr-6">
                  <Link to={''}>
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
export default Stock