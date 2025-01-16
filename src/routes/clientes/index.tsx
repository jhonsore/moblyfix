import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { MagnifyingGlassIcon as SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
const transactions = [
  {
    id: 'Jhonnatan Soares Rebuli',
    company: 'jhonnatan@gmail.com',
    share: 'xxx.xxx.xxx-xx',
    commission: '(xx) xxxxx-xxxx',

  },

]

const Clientes = () => {
  return <>
    <HeaderPage title="Clientes" />
    <PageContent>
      <main>
        <div>
          <div className="flex justify-between ">
            <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
              <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                <div className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                      placeholder="Digite o nome do cliente"
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-4 hidden lg:flex lg:items-center lg:justify-end ">
              <a
                href="#"
                className="inline-flex items-center px-6 py-2 text-base font-medium rounded-md shadow-sm text-indigo-500 bg-white border border-blue-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Busca avançada
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-4">
            <div className=" w-full">
              <div >
                <div className=" bg-white m-w-full py-6">
                  <table className=" w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Cliente
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 py-4 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Cpf
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Whatsapp
                        </th>

                        <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" bg-white">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className='border-b border-gray-200'>
                          <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900">
                            {transaction.id}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                            {transaction.company}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
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
                    <tbody className=" bg-white">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className='border-b border-gray-200'>
                          <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900">
                            {transaction.id}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                            {transaction.company}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
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
                    <tbody className=" bg-white">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className='border-b border-gray-200'>
                          <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900">
                            {transaction.id}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                            {transaction.company}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
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
                    <tbody className=" bg-white">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className='border-b border-gray-200'>
                          <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900">
                            {transaction.id}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                            {transaction.company}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
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
                    <tbody className=" bg-white">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className='border-b border-gray-200'>
                          <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900">
                            {transaction.id}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                            {transaction.company}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
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
                    <tbody className=" bg-white">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className='border-b border-gray-200'>
                          <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900 ">
                            {transaction.id}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                            {transaction.company}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
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
              </div>
            </div>
          </div>
        </div>
        <div className='px-10 py-4'>
          <button
            type="button"
            className=" inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-500 focus:z-10 focus:outline-none focus:ring-1 hover:text-white"
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
      </main>
    </PageContent>
  </>
}
export default Clientes