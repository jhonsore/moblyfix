import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
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
export default function Example() {
  const form = useForm()
  const [date, setDate] = useState<Date>()

  return (
    <>



      <div className="  px-4 sm:px-6 lg:px-16">
        <div >
          <div >
            <div className="flex items-end px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
              <Form {...form}>
                <form onSubmit={() => { }} className=" flex-1 pr-4">
                  <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cliente</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o nome do cliente" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <Button variant={"outlinePrimary"}>Novo cliente</Button>
            </div>
            <div className=" ">
              <Form {...form}>
                <form onSubmit={() => { }} className=" grid grid-cols-1 sm:grid-cols-3 sm:gap-x-4">
                  <div className='col-span-2'>
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
                  <div>
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Posição na Colméia</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite aqui" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
              <Form {...form}>
                <form onSubmit={() => { }} className=" grid items-center grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4 pt-6">
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
                </form>
              </Form>
              <div className="px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                <Form {...form}>
                  <form onSubmit={() => { }} >
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
                  </form>
                </Form>

              </div>
            </div>
          </div>
        </div>
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
        </div>
        <div className='pb-10'>
          <div className="   mt-8">
            <div className='flex items-center justify-between'>
              <h2>
                Fotos do aparelho
              </h2>
              <div className="ml-4 mt-2 flex">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="material-symbols-outlined mr-2">
                    add_a_photo
                  </span>
                  Nova foto
                </button>
              </div>
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
      </div>

    </>
  )
}