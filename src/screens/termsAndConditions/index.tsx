import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { TypeTermsAndConditionsViewList } from "../../types/TermsAndConditions"
import { DB } from "../../functions/database"
import { TypePageStatus } from "../../types/PageStatus"
import { LoadingPage } from "../../components/loadingPage"
import { ErrorPage } from "../../components/errorPage"
import { EmptData } from "../../components/emptyData"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import { ItemList } from "../../components/screens/termsAndConditions/itemList"

const PageTermsandConditions = () => {
  const { db } = useFirebaseContext()
  const { store } = useStoresContext()
  const [termsAndConditions, setTermsAndConditions] = useState<TypeTermsAndConditionsViewList[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')

  useEffect(() => {
    if (!db || !store || termsAndConditions.length > 0) return
    const load = async () => {
      const result = await DB.views.termsAndConditions.list({ db, orderBy: [['createdAt', 'asc']], wheres: [['_storeId', '==', store._id]] })
      let status: typeof pageStatus = 'success'
      console.log(result)
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
  }, [store])

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
            {termsAndConditions.map((data) => <ItemList key={data._id} data={data} />)}
          </tbody>
        </table>}
      </div>
    </PageContent>
  </>
}
export default PageTermsandConditions