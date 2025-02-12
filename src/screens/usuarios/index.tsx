import { Link } from "react-router"
import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from "@/components/ui/button"
import { DB } from "@/functions/database"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { useEffect, useState } from "react"
import { TypePageStatus } from "@/types/PageStatus"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { TypeUsers } from "@/types/Users"



const Usuarios = () => {
  const { db } = useFirebaseContext()
  const [pageData, setPageData] = useState<TypeUsers[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')

  useEffect(() => {
    if (!db) return
    const load = async () => {
      const result = await DB.views.users.list({ db })
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
    <HeaderPage title="Usuários">
      <Link to={'/dashboard/usuarios/novo'}>
        <Button variant={"primary"}>Novo item</Button>
      </Link>
    </HeaderPage>
    <PageContent>

      <div className=" py-6">
        <table className=" w-full">
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
                Tipo
              </th>

              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
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
                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b-4 border-gray-200 lg:border-none">
                  <div className="flex justify-between">
                    <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                      Tipo
                    </div>
                    <div className="text-sm text-gray-900 p-4 lg:p-0">
                      {data.name}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap pl-3 text-center lg:text-right text-sm font-medium sm:pr-6 p-0">
                  <Link to={'/dashboard/usuarios/1'}>
                    <span className="material-symbols-outlined text-gray-400 hover:text-indigo-900 mr-2 hidden lg:inline">
                      edit
                    </span>
                    <span className="text-gray-400 hover:text-indigo-900 lg:hidden flex justify-center">
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </Link>
                  <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2 hidden lg:inline">
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
          className=" ml-3 inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500  focus:z-10 focus:outline-none focus:ring-1 hover:bg-indigo-500 hover:text-white "
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

    </PageContent>
  </>
}
export default Usuarios