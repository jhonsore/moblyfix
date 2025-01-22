import { Button } from "../../components/ui/button"
import PageContent from "@/components/layout/pageContent"
import HeaderPage from "../../components/headerPage"

import { Badge } from "../../components/ui/badge"
import { Link } from "react-router"
import { Textarea } from "../../components/ui/textarea"

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
import { Checkbox } from "../../components/ui/checkbox"


const tabs = [
  { name: 'Dados da OS', href: '#', current: true },
  { name: 'Anexos', href: '/dashboard/ordem-servico/anexos', current: false },
  { name: 'Acompanhamento', href: '/dashboard/ordem-servico/acompanhamento', current: false },

]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const OrdemServico = () => {
const form = useForm()
    const [date, setDate] = useState<Date>()
  return <>

    <HeaderPage title="OS - 123456">
      <Badge variant="orange">Aguardando atendimento</Badge>
      <Button variant={"destructive"}>Cancelar OS </Button>
      <Button variant={"primary"}>Finalizar</Button>
    </HeaderPage>


    <PageContent>

      <div className='flex justify-end pt-5 items-center'>
        <span className="text-sm text-gray-500 pr-3">Aberto em: 10/10/2024</span>
        <Link to={'/dashboard/ordem-servico/analise-tecnica'}>
        <Button variant={"orange"}>Iniciar análise técnica</Button>
      </Link>
        
      </div>
      <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6 pt-4">
        <div className='border-b'>
          <div className="flex justify-between">
            <nav className="flex-1 flex max-w-lg gap-4" aria-label="Tabs">
              {tabs.map((tab, tabIdx) => (
                <Link to={tab.href} className="">
                
                <a
                  key={tab.name}
                  
                  className={classNames(
                    tab.current ? ' bg-blue-600  hover:text-blue-600 border-x rounded-t-lg' : 'text-gray-500 hover:text-gray-700 border-x rounded-t-lg border-t',
                    tabIdx === 0 ? '' : '',
                    tabIdx === tabs.length - 1 ? 'rounded-t-lg' : '',
                    'group relative z-10 min-w-0 flex-1 overflow-hidden bg-white p-3 text-sm font-medium text-center hover:bg-gray-50 '
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  <span>{tab.name}</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      tab.current ? 'bg-indigo-500 ' : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5'
                    )}
                  />
                </a>
                </Link>
              ))}
            </nav>
            <div className='flex gap-3 text-gray-500 text-right'>
              <button>
                <span className="material-symbols-outlined hover:text-blue-500">
                  attachment
                </span>
              </button>
              <button>
                <span className="material-symbols-outlined hover:text-blue-500">
                  mail
                </span>
              </button>
              <button>
                <span className="material-symbols-outlined hover:text-blue-500">
                  print
                </span>
              </button>
              <button>
                <span className='img-whts inline-block '>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={() => { }} className="">
            <div className="border-b border-gray-200 py-4">
                <div className="w-2/4">
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Posição na Colméia</FormLabel>
                                <div className="flex items-center justify-around">
                                    <FormControl className="mr-5">
                                        <Input placeholder="Digite aqui" {...field} />
                                    </FormControl>
                                    <Button variant={"outlinePrimary"}>Salvar</Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="flex items-end px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">

                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="flex-1 pr-6">
                            <FormLabel>Cliente</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o nome do cliente" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button variant={"outlinePrimary"}>Visualizar dados</Button>
            </div>
            <div className='w-8/12'>
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Produto</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite aqui seu CPF" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className=" grid items-center grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4 pt-6">
                <div className='col-span-2'>
                    <div className='flex items-center space-x-2'>
                        <div className='flex-1'>
                            <FormField
                                control={form.control}
                                name="number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Serial</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite aqui" {...field} />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center space-x-2 pt-7 px-8">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Garantia
                            </label>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <FormLabel>Data de abertura</FormLabel>
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
                </div>
            </div>

            <div className="px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Acessórios</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite aqui" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
        </form>
        <div className="pt-3">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 pb-2">
            Observações
          </label>
          <Textarea />
        </div>
        <div className="pt-3">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 pb-2">
            Relato do problema
          </label>
          <Textarea />
        </div>
        <div className="pt-3 w-48">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 pb-2">
            Assinatura do cliente
          </label>
          <Button variant={"outlinePrimary"}>Adicionar assinatura</Button>
          <Textarea className="mt-3" />
        </div>
        <div className='pb-10'>
          <div className="   mt-8">
            <div className='flex items-center justify-between'>
              <h2>
                Fotos do aparelho
              </h2>

            </div>
            <div className='flex gap-4'>
              <div className='relative bg-img-add w-32 h-32'>
                <button>
                  <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                    delete
                  </span>
                </button>
              </div>
              <div className='relative bg-img-add w-32 h-32'>
                <button>
                  <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                    delete
                  </span>
                </button>
              </div>
              <div className='relative bg-img-add w-32 h-32'>
                <button>
                  <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </Form>
      

    </PageContent >
  </>
}
export default OrdemServico

