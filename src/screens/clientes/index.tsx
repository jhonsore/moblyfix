import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { useForm } from "react-hook-form"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Link } from "react-router"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { useEffect, useState } from "react"
import { TypeCustomers } from "@/types/Customers"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { TypePageStatus } from "@/types/PageStatus"
import { DB } from "@/functions/database"



const Clientes = () => {
  const form = useForm()
  const { db } = useFirebaseContext()
  const [pageData, setPageData] = useState<TypeCustomers[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')

  useEffect(() => {
    if (!db) return
    const load = async () => {
      const result = await DB.views.customers.list({ db })
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

    <HeaderPage title="Clientes">
      <Link to={'/dashboard/clientes/novo'}>
        <Button variant={"primary"}>Novo item</Button>
      </Link>
    </HeaderPage>

    <PageContent>

      <div className="flex justify-betwee items-center pt-6">
        <Form {...form}>
          <form onSubmit={() => { }} className=" flex-1 pr-4">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Digite o nome do cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button variant={"outlinePrimary"}>Busca avançada</Button>
      </div>
      <div className="py-6">
        <table className=" w-full">
          <thead className="bg-gray-50 hidden lg:table-header-group w-full">
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
            {pageData.map((data) => (
              <tr key={data._id} className='lg:border-b border-gray-200'>
                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
                  <div className="flex justify-between">
                    <div className="lg:hidden w-2/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                      Cliente
                    </div>
                    <div className="text-sm text-gray-900 p-4 lg:p-0">
                      {data.name}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
                  <div className="flex justify-between">
                    <div className="lg:hidden w-2/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                      Email
                    </div>
                    <div className="text-sm text-gray-900 p-4 lg:p-0">
                      {data.email}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
                  <div className="flex justify-between">
                    <div className="lg:hidden w-2/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                      Cpf
                    </div>
                    <div className="text-sm text-gray-900 p-4 lg:p-0">
                      {data.cpfCnpj}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b-4 border-gray-200 lg:border-none">
                  <div className="flex justify-between">
                    <div className="lg:hidden w-2/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                      Whatsapp
                    </div>
                    <div className="text-sm text-gray-900 p-4 lg:p-0">
                      {data.whatsapp}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap pl-3 text-center lg:text-right text-sm font-medium sm:pr-6">
                  <Link to={'/dashboard/clientes/1'}>
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
                    </span><span className="sr-only">, {data._id}</span>
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
    </PageContent>
  </>
}
export default Clientes