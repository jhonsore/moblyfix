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
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "../../components/ui/checkbox"
import { Link, useNavigate } from "react-router"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorPage } from "@/components/errorPage"
import { LoadingPage } from "@/components/loadingPage"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { useStoresContext } from "@/providers/stores/useStoresContext"
import { useParams } from "react-router"
import { TypePageStatus } from "@/types/PageStatus"
import { DB } from "@/functions/database"
import { Loading } from "@/components/loading"
import { StoreNotFoundAlert } from "@/components/storeNotFoundAlert"
import { ItemCreatedAlert } from "@/components/itemCreatedAlert"
import SearchSelect from "../../components/searchSelect"
import { ptBR } from "date-fns/locale";
import dateToServer from "../../functions/utils/dateToServer"
import { toast } from "../../hooks/use-toast"

const FormSchema = z.object({
  positionInCabinet: z.string().optional(),
  serialNumber: z.string().optional(),
  observation: z.string().optional(),
  customer: z
    .string().min(1, {
      message: "Escolha o cliente",
    }),
  accessories: z
    .string().optional(),
  product: z
    .string().min(1, {
      message: "Preencha o produto",
    }),
  guarantee: z
    .boolean(),
  date: z.date({
    required_error: "A data de abertura é obrigatória",
  }),
})

const PageNewOs = () => {
  const { db } = useFirebaseContext()
  const { store } = useStoresContext()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      customer: '',
      positionInCabinet: '',
      product: "",
      guarantee: false,
      serialNumber: '',
      date: new Date(),
      observation: '',
      accessories: ''
    },
  })
  const { id } = useParams()
  const [statusStore, setStatusStore] = useState(false)
  const [statusCreated, setStatusCreated] = useState(false)
  const [pageStatus, setPageStatus] = useState<TypePageStatus>(id ? 'loading' : 'success')
  const navigate = useNavigate()
  const [statusLoading, setStatusLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    const load = async () => {
      const result = await DB.os.read({ db, id })
      let status: typeof pageStatus = 'success'
      if (!result.status) {
        status = 'error'
        return
      }

      setPageStatus(status)
      const { doc } = result
      if (doc) {
        form.setValue('customer', doc.customer.name)
        form.setValue('product', doc.product)
        form.setValue('guarantee', doc.guarantee)
      }
    }
    load()
  }, [id])

  async function onSubmit(values: z.infer<typeof FormSchema>) {

    if (!store) {
      setStatusStore(true)
      return
    }

    setStatusLoading(true)
    const { accessories, date, guarantee, observation, positionInCabinet, product, serialNumber, customer } = values

    //carrega dados do cliente
    const resultCustomer = await DB.customers.read({ db, id: customer })

    if (!resultCustomer.status || !resultCustomer.doc) {
      setStatusLoading(false)
      toast({
        duration: 4000,
        variant: "destructive",
        title: "Cliente não encontrado",
        description: "Os dados do cliente não foram encontrados, tente recarregar a página e tentar novamente."
      })
      return
    }
    const _customer = { name: resultCustomer.doc.name, _id: resultCustomer.doc._id, cpfCnpj: resultCustomer.doc.cpfCnpj }

    const result = await DB.os.create({
      db, data: { accessories, product, date: dateToServer(date), observation, serialNumber, positionInCabinet, guarantee, customer: _customer, _headquarterId: store._headquarterId, _storeId: store._id }
    })

    if (result.status) {
      setStatusCreated(true)
    }
    setStatusLoading(false)
  }

  const onCreateHandler = () => {
    setStatusCreated(false)
    form.reset()
    if (id) navigate('/dashboard/ordem-servico/novo')
  }

  if (pageStatus === 'loading') {
    return <LoadingPage />
  }

  if (pageStatus === 'error') {
    return <ErrorPage />
  }
  if (!store || !db) return <LoadingPage />

  return <>

    <HeaderPage title="Nova OS"></HeaderPage>
    {statusLoading && <Loading />}
    <StoreNotFoundAlert open={statusStore} />
    <ItemCreatedAlert type={id ? 'update' : 'create'} open={statusCreated} closeHandler={() => setStatusCreated(false)} confirmHandler={onCreateHandler} />
    <PageContent>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <div className=" flex pt-6 pb-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <SearchSelect onChange={e => {
                        field.onChange(e.value)
                      }} store={store} db={db} requisition={DB.views.customers.list} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pl-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="mt-8" variant={"outlinePrimary"}>Novo cliente</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Dados do cliente</SheetTitle>

                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>

          </div>
          <div className=" grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
            <div className='col-span-2'>
              <FormField
                control={form.control}
                name="product"
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
                name="positionInCabinet"
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
                    name="serialNumber"
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
                  <FormField
                    control={form.control}
                    name="guarantee"
                    render={({ field }) => (
                      <FormItem className="flex space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Garantia
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de abertura</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
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
          </div>
          <div className=" py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <FormField
              control={form.control}
              name="accessories"
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
            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <div className='flex items-center justify-between pt-7'>
            <FormLabel>Fotos do aparelho</FormLabel>
            <div className=" ml-4 pb-4 md:mt-2 flex">
              <Button type="button" variant={'primary'}><span className="material-symbols-outlined sm:mr-2">
                add_a_photo
              </span> <span className="hidden sm:block">Nova foto</span></Button>
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
          <div className="space-y-2 pt-6">
            <FormLabel>Assinatura do cliente</FormLabel>
            <div>
              <Button variant={"outlinePrimary"}>Adicionar assinatura</Button>
            </div>
          </div>
          <div className='py-6 flex justify-end border-t-2 border-solid pt-4 mt-8 pb-8'>
            <Button type="submit" variant="primary">Salvar</Button>
          </div>
        </form>
      </Form>
      <Dialog>
        <DialogTrigger asChild>

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
                <form onSubmit={() => { }} className="">
                  <FormItem>
                    <FormLabel>Whatsapp</FormLabel>
                    <FormControl>
                      <Input placeholder="(xx) xxxxx-xxxx" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <div className="pt-3 pb-6">
                    <FormLabel>Mensagem</FormLabel>
                    <Textarea placeholder="Digite a mensagem" />
                  </div>
                  <div className="text-right">
                    <Button variant={"outlinePrimary"}>Enviar</Button>
                  </div>
                </form>
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



    </PageContent>
  </>
}
export default PageNewOs