import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Search, } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router"
import { useStoresContext } from "@/providers/stores/useStoresContext"
import { DocumentData, QueryDocumentSnapshot, WhereFilterOp } from "firebase/firestore"
import { Loading } from "@/components/loading"
import { ErrorPage } from "@/components/errorPage"
import { LoadingPage } from "@/components/loadingPage"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { TypePageStatus } from "@/types/PageStatus"
import { TypeOsViewList } from "@/types/Os"
import { DB } from "@/functions/database"
import { ItemList } from "@/components/screens/os/itemList"
import { EmptData } from "../../components/emptyData"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { subDays, addDays } from "date-fns"
import { ptBR } from "date-fns/locale";
import { toast } from "../../hooks/use-toast"
import { slugify } from "../../functions/utils/slugify"
import TYPE_STATUS from "../../consts/TYPE_STATUS"
import dateToServer from "../../functions/utils/dateToServer"
import { Checkbox } from "../../components/ui/checkbox"
import { MAX_DAYS_TO_BE_LATE } from "../../functions/os/isLate"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip"

const LIMIT = 10

const FormSchema = z.object({
  numberOs: z.string().optional(),
  status: z.string().optional(),
  dateStart: z.date().optional(),
  dateEnd: z.date().optional(),
  name: z.string().optional(),
  isLate: z.boolean().optional()
})

const OrdensServicos = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numberOs: '',
      status: '',
      dateStart: undefined,
      dateEnd: undefined,
      name: '',
      isLate: false
    },
  })
  const [searchStatus, setSearchStatus] = useState(false)
  const { db } = useFirebaseContext()
  const [pageData, setPageData] = useState<TypeOsViewList[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')
  const { store } = useStoresContext()
  const [lastDocumentSnapshot, setLastDocumentSnapshot] = useState<QueryDocumentSnapshot<DocumentData> | undefined>(undefined)
  const [loadMoreStatus, setLoadMoreStatus] = useState(true)
  const [statusLoading, setStatusLoading] = useState(false)
  const [editingNumberOs, setEditingNumberOs] = useState(false)

  useEffect(() => {
    if (!db) return
    const load = async () => {
      const result = await DB.views.os.list({ db, orderBy: [['createdAt', 'desc']] })
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

  async function loadMoreHandler() {
    if (!db || !store) return

    const result = await DB.views.os.list({ db, limit: LIMIT, lastDocument: lastDocumentSnapshot, wheres: [['_storeId', '==', store._id]] })
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
    const { name, numberOs, dateEnd, dateStart, status, isLate } = values

    if (!store) {
      return
    }

    if (!name && !numberOs && !dateEnd && !dateStart && !status && !isLate) {
      toast({
        duration: 4000,
        variant: "destructive",
        title: "Atenção",
        description: "Para uma busca avançada, escolha ao menos um item do formulário"
      })
      return
    }

    const wheres: [string, WhereFilterOp, any][] = [['_storeId', '==', store._id]]

    if (name) wheres.push([`query.${slugify(name)}`, '==', true])
    if (numberOs) wheres.push([`numberOs`, '==', Number(numberOs)])
    if (status) wheres.push([`status`, '==', status])
    if (dateStart) wheres.push([`createdAt`, '>=', dateToServer(dateStart)])
    if (dateEnd) wheres.push([`createdAt`, '<=', dateToServer(dateEnd)])
    if (isLate) {
      const date = new Date()
      wheres.push([`status`, '==', TYPE_STATUS.created.value])
      wheres.push([`createdAt`, '<=', dateToServer(subDays(addDays(date, 1), MAX_DAYS_TO_BE_LATE))])
      console.log(subDays(addDays(date, 1), MAX_DAYS_TO_BE_LATE))
    }

    const result = await DB.views.os.list({ db, wheres })
    setLoadMoreStatus(false)
    setStatusLoading(true)
    if (result.docs && Object.keys(result.docs).length) {
      setPageData([...Object.values(result.docs)])
    } else {
      toast({
        duration: 4000,
        title: "Atenção",
        description: "A busca não retornou nenhum dado"
      })
    }
    setStatusLoading(false)
  }

  async function resetFieldsHandler() {
    const result = await DB.views.os.list({ db, orderBy: [['createdAt', 'desc']] })
    if (result.docs) {
      setPageData(Object.values(result.docs))
    }
    form.reset()
    setLoadMoreStatus(true)
  }

  function numberOsHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    const { value } = evt.currentTarget
    form.setValue('numberOs', value)

    setEditingNumberOs(!!value)
  }

  if (pageStatus === 'loading') {
    return <LoadingPage />
  }

  if (pageStatus === 'error') {
    return <ErrorPage />
  }

  return <>
    {statusLoading && <Loading />}
    <HeaderPage title="Ordens de Serviços">
      <Link to={'/dashboard/ordens-servicos/novo'}>
        <Button variant={"primary"}>Nova OS</Button>
      </Link>
    </HeaderPage>
    <PageContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <div className=" flex pr-4 pt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1 mr-6">
                  <FormControl>
                    <Input placeholder="Digite o nome do cliente" {...field} disabled={editingNumberOs} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={"outlinePrimary"}><Search /></Button>
            <Button className="ml-4" type="button" onClick={() => setSearchStatus(!searchStatus)} variant={"outlinePrimary"}>Busca avançada</Button>
          </div>
          {searchStatus && <div> <div className=" py-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4 pt-6">

            <FormField
              control={form.control}
              name="numberOs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nº da OS</FormLabel>
                  <FormControl>
                    <Input placeholder="Numero da OS" {...field} onChange={evt => numberOsHandler(evt)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} disabled={editingNumberOs}>
                      <SelectTrigger className="flex w-full text-left font-normal">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(TYPE_STATUS).map(status => <SelectItem value={status.value}>{status.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-10">
              <FormField
                control={form.control}
                name="isLate"
                render={({ field }) => (
                  <FormItem className="flex space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={editingNumberOs}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                      <FormLabel className="">
                        Os em atraso
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="dateStart"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data início</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button disabled={editingNumberOs}
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateEnd"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data fim</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={editingNumberOs}
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />



          </div>
            <div className='flex gap-4 justify-end pt-3 w-full'>
              <div>
                <Button type="button" onClick={resetFieldsHandler} variant={"outline"}>Limpar filtro</Button>
              </div>

              <div >
                <Button type="submit" variant={"primary"}>buscar</Button>
              </div>
            </div>
          </div>
          }
        </form>
      </Form>
      <div className=" pt-6 hidden lg:block">
        {pageData.length === 0 && <EmptData />}
        {pageData.length > 0 && <table className=" w-full lg:table " >
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Nº OS
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Cliente
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Aparelho
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-4 text-left text-sm font-semibold text-gray-900"
              >
                Início
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Fim
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        Atraso <QuestionMarkCircleIcon className="size-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-center">Ordens de serviço criadas a mais de {MAX_DAYS_TO_BE_LATE} dias <br />que estão esperando por análise técnica</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              </th>

              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className=" bg-white">
            {pageData.map((data) => <ItemList key={data._id} data={data} />)}
          </tbody>
        </table>}
      </div>
      {pageData.length >= LIMIT && loadMoreStatus && <div className='py-4 text-center'>
        <Button onClick={loadMoreHandler} variant={'outline'}>Carregar mais</Button>
      </div>}
    </PageContent>
  </>
}
export default OrdensServicos