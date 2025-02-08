import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { TypeTermsAndConditions } from "../../types/TermsAndConditions"
import { DB } from "../../functions/database"
import { TypePageStatus } from "../../types/PageStatus"
import { LoadingPage } from "../../components/loadingPage"
import { ErrorPage } from "../../components/errorPage"
import { EmptData } from "../../components/emptyData"

const PageTermsandConditions = () => {
  const { db } = useFirebaseContext()
  const [termsAndConditions, setTermsAndConditions] = useState<TypeTermsAndConditions[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')

  useEffect(() => {
    if (!db) return
    const load = async () => {
      const result = await DB.views.termsAndConditions.list({ db })
      let status: typeof pageStatus = 'success'
      if (!result.status) {
        status = 'error'
        return
      }

      setPageStatus(status)
      if (result.docs) {
        setTermsAndConditions(Object.values(result.docs))
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
    <HeaderPage title="Condições de serviços">
      <Link to={'/dashboard/condicoes-de-servicos/novo'}>
        <Button variant={"primary"}>Novo item</Button>
      </Link>
    </ HeaderPage>
    <PageContent>

      <div className=" m-w-full py-6">

        {termsAndConditions.length === 0 && <EmptData />}
        {termsAndConditions.length > 0 && <table className=" w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Título
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className=" bg-white">

            {termsAndConditions.map((transaction) => (
              <tr key={transaction._id} className='border-b border-gray-200'>
                <td className="whitespace-nowrap py-4 pl-2 pr-2 text-sm text-gray-900 ">
                  {transaction.title}
                </td>
                <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium ">
                  <Link to={`/dashboard/condicoes-de-servicos/${transaction._id}`}>
                    <span className="text-gray-400 hover:text-indigo-900 mr-2">
                      <span className="material-symbols-outlined">
                        edit
                      </span>
                    </span>
                  </Link>
                  <a href="#" className="text-gray-400 hover:text-indigo-900">
                    <span className="material-symbols-outlined">
                      delete
                    </span><span className="sr-only">, {transaction._id}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </PageContent>
  </>
}
export default PageTermsandConditions