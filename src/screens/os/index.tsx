import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
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
import { ErrorPage } from "@/components/errorPage"
import { LoadingPage } from "@/components/loadingPage"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { TypePageStatus } from "@/types/PageStatus"
import { TypeOsViewList } from "@/types/Os"
import { DB } from "@/functions/database"
import { ItemList } from "@/components/screens/os/itemList"




const OrdensServicos = () => {
  const form = useForm()
  const [date, setDate] = useState<Date>()
  const [searchStatus, setSearchStatus] = useState(false)
  const { db } = useFirebaseContext()
  const [pageData, setPageData] = useState<TypeOsViewList[]>([])
  const [pageStatus, setPageStatus] = useState<TypePageStatus>('loading')

  useEffect(() => {
    if (!db) return
    const load = async () => {
      const result = await DB.views.os.list({ db })
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
    <HeaderPage title="Ordens de Serviços">
      <Link to={'/dashboard/ordens-servicos/novo'}>
        <Button variant={"primary"}>Nova OS</Button>
      </Link>
    </HeaderPage>
    <PageContent>
      <Form {...form}>
        <form onSubmit={() => { }} >
          <div className=" flex pr-4 pt-6">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="flex-1 mr-6">
                  <FormControl>
                    <Input placeholder="Digite o nome do cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant={"outlinePrimary"}><Search /></Button>
            <Button className="ml-4" type="button" onClick={() => setSearchStatus(!searchStatus)} variant={"outlinePrimary"}>Busca avançada</Button>
          </div>
          {searchStatus && <div> <div className=" py-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 pt-6">
            <FormField
              control={form.control}
              name="CPF"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite aqui seu CPF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nº da OS</FormLabel>
                  <FormControl>
                    <Input placeholder="Numero da OS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex  gap-4">
              <div className="flex-1 space-y-2">
                <FormLabel>Data de início</FormLabel>
                <Popover >
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "flex w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1 space-y-2">
                <FormLabel>Data fim</FormLabel>
                <Popover >
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "flex w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <FormLabel>Status do pedido</FormLabel>
              <Select>
                <SelectTrigger className="flex w-full text-left font-normal">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Status"></SelectItem>
                  <SelectItem value="Recebido">Recebido</SelectItem>
                  <SelectItem value="Em Reparo">Em Reparo</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                  <SelectItem value="Entregue">Entregue</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
            <div className='flex gap-4 justify-end pt-3 w-full'>
              <div>
                <Button variant={"outlinePrimary"}>Fechar</Button>
              </div>
              <div >
                <Button variant={"outlinePrimary"}>buscar</Button>
              </div>
            </div>
          </div>
          }
        </form>
      </Form>


      <div className=" pt-6 hidden lg:block">
        <table className=" w-full lg:table " >
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
                Atraso
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Aparelho
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
        </table>
      </div>

    </PageContent>
  </>
}
export default OrdensServicos