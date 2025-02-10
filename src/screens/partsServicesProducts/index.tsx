import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from "../../components/ui/button"
import { Link } from "react-router"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { TypePageStatus } from "@/types/PageStatus"
import { useEffect, useState } from "react"
import { DB } from "@/functions/database"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { TypePartsServicesProducts } from "@/types/PartsServicesProducts"






const PagePartsServicesProducts = () => {
  const { db } = useFirebaseContext()
    const [pageData, setPageData] = useState<TypePartsServicesProducts[]>([])
    const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')
  
    useEffect(() => {
      if (!db) return
      const load = async () => {
        const result = await DB.views.partsServicesProducts.list({ db })
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
    <HeaderPage title="Peças/serviços/produtos">
      <Link to={'/dashboard/pecas-servicos/novo'}>
        <Button variant={"primary"}>Novo item</Button>
      </Link>
    </ HeaderPage>
    <PageContent>


      <div className="py-6 hidden lg:block">
        <table className=" w-full">
          <thead className="bg-gray-50">
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
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Venda à prazo
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody className=" bg-white">
            {pageData.map((data) => (
              <tr key={data._id} className='border-b border-gray-200'>
                <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900 sm:pl-6">
                  {data.name}
                </td>
                <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                  {data.costPrice}
                </td>
                <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{data.cashPrice}</td>
                <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{data.installmentPrice}</td>
                <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Link to={'/dashboard/pecas-servicos/1'}>
                    <span className="text-gray-400 hover:text-indigo-900 mr-2">
                      <span className="material-symbols-outlined">
                        edit
                      </span>
                    </span>
                  </Link>

                  <a href="#" className="text-gray-400 hover:text-indigo-900">
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

      <div className=" bg-white m-w-full py-6 lg:hidden">
        <table className=" w-full">

          {pageData.map((data) => (
            <tr key={data._id} className='border-y border-gray-200'>
              <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Nome
              </td>
              <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900 border-gray-200">
                {data.name}
              </td>

              <td rowSpan={4} className="text-center border">
                <Link to={'/dashboard/ordem-servico/analise-tecnica'}>
                  <span className="material-symbols-outlined text-gray-400 hover:text-indigo-900 mr-2">
                    visibility
                  </span>
                </Link>
              </td>
            </tr>
          ))}
          {pageData.map((data) => (
            <tr key={data._id} className='border-b border-gray-200'>
              <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Preço de custo
              </td>
              <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900">
                {data.costPrice}
              </td>

            </tr>
          ))}
          {pageData.map((data) => (
            <tr key={data._id} className='border-b border-gray-200'>
              <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Venda à vista
              </td>
              <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900">
                {data.cashPrice}
              </td>

            </tr>
          ))}
          {pageData.map((data) => (
            <tr key={data._id} className='border-b-4 border-gray-200'>
              <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Venda à prazo
              </td>
              <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900">
                {data.installmentPrice}
              </td>

            </tr>
          ))}

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
export default PagePartsServicesProducts