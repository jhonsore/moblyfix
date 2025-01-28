import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
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
import { Link } from "react-router"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


const NovaOs = () => {
  const form = useForm()
  const [date, setDate] = useState<Date>()
  return <>
    <HeaderPage title="Nova OS">

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary">Salvar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>OS nº 000005 criada</DialogTitle>
            <DialogDescription className="pt-4 text-center text-black">
              O que deseja fazer agora?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 px-14">
            <Button variant={"outlinePrimary"}>Imprimir</Button>


            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outlinePrimary"}>Enviar whatsapp</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Enviar whatsapp</DialogTitle>
                  <DialogDescription className="pt-4 text-center text-black">
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={() => { }} className="">
                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Whatsapp</FormLabel>
                          <FormControl>
                            <Input placeholder="(xx) xxxxx-xxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-3 pb-6">
                      <FormLabel>Mensagem</FormLabel>
                      <Textarea placeholder="Digite a mensagem" />
                    </div>
                    <div className="text-right">
                      <Button variant={"outlinePrimary"}>Enviar</Button>
                    </div>
                  </form>
                </Form>
                <DialogFooter>

                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Link to={'/dashboard/ordem-servico/criar'}>
              <Button className="w-full" variant={"outlinePrimary"}>Nova OS</Button>
            </Link>
            <Button variant={"outlinePrimary"}>Nova OS do mesmo cliente</Button>
          </div>
        </DialogContent>
      </Dialog>

    </HeaderPage>
    <PageContent>

      <Form {...form}>
        <form onSubmit={() => { }} >
          <div className=" flex pt-6 pb-4">
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
            <Link to={'/dashboard/dados-do-cliente'}>
              <Button variant={"outlinePrimary"}>Novo cliente</Button>
            </Link>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-3 sm:gap-x-4">
            <div className='col-span-2'>
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite aqui" {...field} />
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
          </div>
          <div className=" grid items-center grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4 pt-4">
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
          <div className="space-y-2">
            <FormLabel>Observações</FormLabel>
            <Textarea />
          </div>

          <div className="space-y-2 pt-3">
            <FormLabel>Assinatura do cliente</FormLabel>
            <div>
              <Button variant={"outlinePrimary"}>Adicionar assinatura</Button>
            </div>
          </div>
        </form>
      </Form>



      <div className='flex items-center justify-between pt-7'>
        <h2>
          Fotos do aparelho
        </h2>
        <div className="ml-4 mt-2 flex">
          <Button variant={'primary'}><span className="material-symbols-outlined mr-2">
            add_a_photo
          </span> Nova foto</Button>
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
    </PageContent>
  </>
}
export default NovaOs