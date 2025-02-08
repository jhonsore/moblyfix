import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
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
import { Badge } from "../../components/ui/badge"
import { Link } from "react-router"




const transactions = [
  {
    id: '1234567',
    company: 'Jhonnatan Soares Rebuli',
    share: '10/03/24',
    commission: '10/03/24',
    price: '10 dias',
    quantity: 'Iphone X',
    netAmount: 'Finalizado',

  },


]

const OrdensServicos = () => {
  const form = useForm()
  const [date, setDate] = useState<Date>()
  return <>
    <HeaderPage title="Ordens de Serviços">
      <Link to={'/dashboard/ordem-servico/novo'}>
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
            <Button variant={"outlinePrimary"}>Busca avançada</Button>
          </div>
          <div className=" py-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 pt-6">
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
            <div className="space-y-2">
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
        </form>
      </Form>
      <div className='flex gap-4 justify-end pt-3'>
        <div>
          <Button variant={"outlinePrimary"}>Fechar</Button>
        </div>
        <div >
          <Button variant={"outlinePrimary"}>buscar</Button>
        </div>
      </div>

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
            {transactions.map((transaction) => (
              <tr key={transaction.id} className='border-b border-gray-200'>
                <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900 sm:pl-6">
                  {transaction.id}
                </td>
                <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                  {transaction.company}
                </td>
                <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
                <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.commission}</td>
                <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.price}</td>
                <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.quantity}</td>
                <td className="">
                  <Badge variant="destructive">{transaction.netAmount}</Badge>
                </td>
                <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Link to={'/dashboard/ordem-servico/analise-tecnica'}>
                    <span className="material-symbols-outlined text-gray-400 hover:text-indigo-900 mr-2">
                      visibility
                    </span>
                  </Link>
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
      <div className=" bg-white m-w-full py-6 lg:hidden">
        <table className=" w-full">

          {transactions.map((transaction) => (
            <tr key={transaction.id} className='border-y border-gray-200'>
              <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Nº OS
              </td>
              <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900 border-gray-200">
                {transaction.id}
              </td>

              <td rowSpan={7} className="text-center border">
                <Link to={'/dashboard/ordem-servico/analise-tecnica'}>
                  <span className="material-symbols-outlined text-gray-400 hover:text-indigo-900 mr-2">
                    visibility
                  </span>
                </Link>
              </td>
            </tr>
          ))}
          {transactions.map((transaction) => (
            <tr key={transaction.id} className='border-b border-gray-200'>
              <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Cliente
              </td>
              <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900">
                {transaction.company}
              </td>

            </tr>
          ))}
          {transactions.map((transaction) => (
            <tr key={transaction.id} className='border-b border-gray-200'>
              <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Início
              </td>
              <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900">
                {transaction.share}
              </td>

            </tr>
          ))}
          {transactions.map((transaction) => (
            <tr key={transaction.id} className='border-b border-gray-200'>
              <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Fim
              </td>
              <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900">
                {transaction.commission}
              </td>

            </tr>
          ))}
          {transactions.map((transaction) => (
            <tr key={transaction.id} className='border-b border-gray-200'>
              <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Atraso
              </td>
              <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900">
                {transaction.price}
              </td>

            </tr>
          ))}
          {transactions.map((transaction) => (
            <tr key={transaction.id} className='border-b border-gray-200'>
              <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Aparelho
              </td>
              <td className="whitespace-nowrap py-4 pl-3 text-right pr-3 text-sm text-gray-900">
                {transaction.quantity}
              </td>

            </tr>
          ))}
          {transactions.map((transaction) => (
            <tr key={transaction.id} className='border-b-4 border-gray-200'>
              <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Status
              </td>
              <td className="whitespace-nowrap py-4 pl-3 text-right pr-3">
                <Badge variant="destructive">{transaction.netAmount}</Badge>
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
export default OrdensServicos