import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
const transactions = [
  {
    id: '1234567',
    company: 'Jhonnatan Soares Rebuli',
    share: '10/03/24',
    commission: '10/03/24',
    price: '10 dias',
    quantity: 'Iphone X',
    netAmount: 'Finalizado',
    netAmount2: 'Encerrado',
    netAmount3: 'Aguardando',
    netAmount4: 'Em atendimento',
    netAmount5: 'Retirada',
    netAmount6: 'Reparo',
  },

]

const OrdensServicos = () => {
  const form = useForm()
  const [date, setDate] = useState<Date>()
  return <>
    <HeaderPage title="Ordens de Serviços">
      <Button>Nova OS</Button>
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
      <div className=" py-4">
        <Form {...form}>
          <form onSubmit={() => { }} className=" grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 pt-6">
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
          </form>
        </Form>
        <Form {...form}>
          <form onSubmit={() => { }} className=" grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 pt-6">
          <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
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
          </form>
        </Form>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Data de início
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="início"
              id="date"
              autoComplete="data"
              className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label htmlFor="status-pedido" className="block text-sm font-medium text-gray-700">
            Status do pedido
          </label>
          <div className="mt-2">
            <select
              name="status-pedido"
              id="status-pedido"
              autoComplete="status"
              className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            >
              <option></option>
              <option>Recebido</option>
              <option>Em Reparo</option>
              <option>finalizado</option>
              <option>Entregue</option>
            </select>
          </div>
        </div>
        <div className='flex gap-4 justify-end pt-3'>
          <div>
            <a
              href="#"
              className="ml-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-indigo-500 bg-white border border-indigo-500 hover:bg-indigo-500 hover:text-white"
            >
              Fechar
            </a>
          </div>
          <div >
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-white hover:text-indigo-500 hover:border-indigo-600  "
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div >
        <div className="mt-4">
          <div className=" w-full">
            <div className="py-2 align-middle ">
              <div className=" bg-white m-w-full py-6">
                <table className=" w-full">
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
                        <td className="inline-flex rounded-full bg-[#21965413] px-3 mt-4 text-xs font-semibold leading-5 text-[#219653]">{transaction.netAmount}</td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-indigo-900">
                            <span className="material-symbols-outlined">
                              delete
                            </span><span className="sr-only">, {transaction.id}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
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
                        <td className="inline-flex rounded-full bg-[#d3405321] px-3 mt-4 text-xs font-semibold leading-5 text-[#D34053]">{transaction.netAmount2}</td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-indigo-900">
                            <span className="material-symbols-outlined">
                              delete
                            </span><span className="sr-only">, {transaction.id}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
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
                        <td className="inline-flex rounded-full bg-[#ffa60b1e] px-3 mt-4 text-xs font-semibold leading-5 text-[#FFA70B]">{transaction.netAmount3}</td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-indigo-900">
                            <span className="material-symbols-outlined">
                              delete
                            </span><span className="sr-only">, {transaction.id}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
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

                        <td className="inline-flex rounded-full bg-[#3c4fe025] px-3 mt-4 text-xs font-semibold leading-5 text-indigo-500">{transaction.netAmount4}</td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-indigo-900">
                            <span className="material-symbols-outlined">
                              delete
                            </span><span className="sr-only">, {transaction.id}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
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

                        <td className="inline-flex rounded-full bg-[#541dab11] px-3 mt-4 text-xs font-semibold leading-5 text-[#531DAB]">{transaction.netAmount5}</td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-indigo-900">
                            <span className="material-symbols-outlined">
                              delete
                            </span><span className="sr-only">, {transaction.id}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
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

                        <td className="inline-flex rounded-full bg-[#d46b0854] px-3  mt-4 text-xs font-semibold leading-5 text-[#D46B08]">{transaction.netAmount6}</td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </a>
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
            </div>
          </div>
        </div>
      </div>

      <div className='px-10 py-4'>
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