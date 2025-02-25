import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { useForm } from "react-hook-form"
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Link } from "react-router"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { useEffect, useState } from "react"
import { TypeCustomersViewList } from "@/types/Customers"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { TypePageStatus } from "@/types/PageStatus"
import { DB } from "@/functions/database"
import formatPhone from "../../functions/utils/formatPhone"
import formatCpfCnpj from "../../functions/utils/formatCpfCnpj"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import { Loading } from "../../components/loading"
import { Search } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { slugify } from "../../functions/utils/slugify"
import { toast } from "../../hooks/use-toast"
const LIMIT = 10
const FormSchema = z.object({
  name: z
    .string().min(1, {
      message: "Preencha o nome do cliente",
    })
})


const Clientes = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ""
    },
  })
  const { db } = useFirebaseContext()
  const [pageData, setPageData] = useState<TypeCustomersViewList[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')
  const [lastDocumentSnapshot, setLastDocumentSnapshot] = useState<QueryDocumentSnapshot<DocumentData> | undefined>(undefined)
  const [loadMoreStatus, setLoadMoreStatus] = useState(true)
  const [statusLoading, setStatusLoading] = useState(false)
  const { store } = useStoresContext()

  useEffect(() => {
    if (!db || !store || pageData.length > 0) return

    const load = async () => {
      const result = await DB.views.customers.list({ db, limit: LIMIT, wheres: [['_storeId', '==', store._id]] })
      let status: typeof pageStatus = 'success'
      if (!result.status) {
        status = 'error'
        return
      }

      setPageStatus(status)
      if (result.docs) {
        setPageData(Object.values(result.docs))
        setLastDocumentSnapshot(result.lastDocument);
      }

    }
    load()
  }, [])

  async function loadMoreHandler() {
    if (!db || !store) return

    const result = await DB.views.customers.list({ db, limit: LIMIT, lastDocument: lastDocumentSnapshot, wheres: [['_storeId', '==', store._id]] })
    setStatusLoading(true)

    if (result.docs && Object.keys(result.docs).length) {
      setPageData([...pageData, ...Object.values(result.docs)])
      setLastDocumentSnapshot(result.lastDocument);
    } else {
      setLoadMoreStatus(false)
    }
    setStatusLoading(false)
  }

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (!store) return
    const result = await DB.views.customers.list({ db, wheres: [['_storeId', '==', store._id], [`query.${slugify(values.name)}`, '==', true]] })
    if (!result.docs || !Object.values(result.docs).length) {
      toast({
        duration: 3000,
        title: "Busca não encontrada",
        description: "A busca realizada não obteve nenhum resultado"
      })
      return
    }
    setPageData([...Object.values(result.docs)])
  }

  if (pageStatus === 'loading') {
    return <LoadingPage />
  }

  if (pageStatus === 'error') {
    return <ErrorPage />
  }


  return <>
    {statusLoading && <Loading />}
    <HeaderPage title="Clientes">
      <Link to={'/dashboard/clientes/novo'}>
        <Button variant={"primary"}>Novo item</Button>
      </Link>
    </HeaderPage>

    <PageContent>

      <div className="flex justify-betwee items-center pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" flex pr-4 w-full">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Digite o nome do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="ml-4">
              <Button type="submit" variant={'outline'}>
                <Search />
              </Button>
            </div>
          </form>
        </Form>
        {/* <Button variant={"outlinePrimary"}>Busca avançada</Button> */}
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
                      {formatCpfCnpj(data?.cpfCnpj || '-')}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b-4 border-gray-200 lg:border-none">
                  <div className="flex justify-between">
                    <div className="lg:hidden w-2/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                      Whatsapp
                    </div>
                    <div className="text-sm text-gray-900 p-4 lg:p-0">
                      {formatPhone(data?.whatsapp || '-')}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap pl-3 text-center lg:text-right text-sm font-medium sm:pr-6">
                  <Link to={`/dashboard/clientes/${data._id}`}>
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
      {pageData.length >= LIMIT && loadMoreStatus && <div className='py-4 text-center'>
        <Button onClick={loadMoreHandler} variant={'outline'}>Carregar mais</Button>
      </div>}
    </PageContent>
  </>
}
export default Clientes