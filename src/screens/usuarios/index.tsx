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
import { TypeUsersViewList } from "@/types/Users"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import ItemList from "../../components/screens/users/itemList"

const Usuarios = () => {
  const { db } = useFirebaseContext()
  const [pageData, setPageData] = useState<TypeUsersViewList[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')
  const { store } = useStoresContext()

  useEffect(() => {
    // if (!db || !store || pageData.length > 0) return
    const load = async () => {
      const result = await DB.views.users.list({ db })//, wheres: [['_storeId', '==', store._id]]
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
            {pageData.map((data) => <ItemList key={data._id} data={data} />)}
          </tbody>
        </table>
      </div>


    </PageContent>
  </>
}
export default Usuarios