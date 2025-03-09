import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "../../components/ui/checkbox"
import { Link, useNavigate } from "react-router"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoadingPage } from "@/components/loadingPage"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { useStoresContext } from "@/providers/stores/useStoresContext"
import { useParams } from "react-router"
import { DB } from "@/functions/database"
import { Loading } from "@/components/loading"
import { StoreNotFoundAlert } from "@/components/storeNotFoundAlert"
import { ItemCreatedAlert } from "@/components/itemCreatedAlert"
import SearchSelect from "../../components/searchSelect"
import { ptBR } from "date-fns/locale";
import dateToServer from "../../functions/utils/dateToServer"
import { toast } from "../../hooks/use-toast"
import { ImageUploader } from "../../components/imageUploader"
import { Label } from "../../components/ui/label"
import resizeImage from "../../functions/utils/resizeImage"
import uploadImageToFirebase from "../../functions/utils/uploadImageToFirebase"
import deleteFileFromStorage from "../../functions/utils/deleteFileFromStorage"
import { TypeOs } from "../../types/Os"
import TYPE_STATUS from "../../consts/TYPE_STATUS"
import TYPE_SUBSTATUS from "../../consts/TYPE_SUBSTATUS"
import { ErrorPage } from "../../components/errorPage"
import { useOsContext } from "./provider/useOsContext"
import SignUploader from "../../components/signUploader"
import MandatoryLabel from "../../components/ui/mandatoryLabel"

const FormSchema = z.object({
  positionInCabinet: z.string().optional(),
  serialNumber: z.string().optional(),
  observation: z.string().optional(),
  customer: z
    .string().min(1, {
      message: "Escolha o cliente",
    }),
  report: z
    .string().min(1, {
      message: "O relato do problema é obrigatório",
    }),
  signFile: z.string().optional(),
  photos: z.any().optional(),
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
const PATH_IMAGES = 'os/images'

const PageOsForm = () => {
  const { db, storage } = useFirebaseContext()
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
      accessories: '',
      signFile: '',
      photos: [],
      report: ''
    },
  })
  const { id } = useParams()
  const [statusStore, setStatusStore] = useState(false)
  const [statusCreated, setStatusCreated] = useState(false)
  const navigate = useNavigate()
  const [statusLoading, setStatusLoading] = useState(false)
  const [signFile, setSignFile] = useState<{ url: string, path: string } | null>()
  const [imageUrl, setImageUrl] = useState<TypeOs['photos']>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customerData, setCustomerData] = useState<TypeOs['customer']>()
  const { os, pageStatus, setOs } = useOsContext()

  useEffect(() => {
    if (!id) return
    if (pageStatus === 'error') return
    if (!os) return
    form.setValue('customer', os.customer.name)
    form.setValue('positionInCabinet', os.positionInCabinet)
    form.setValue('product', os.product)
    form.setValue('guarantee', os.guarantee)
    form.setValue('serialNumber', os.serialNumber)
    form.setValue('date', os.date.toDate())
    form.setValue('accessories', os.accessories)
    form.setValue('observation', os.observation)
    form.setValue('signFile', os?.signFile?.url)
    form.setValue('report', os.report)
    setImageUrl(os.photos || [])
    setSignFile(os?.signFile)
    setCustomerData(os.customer)
  }, [os])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        setStatusLoading(true)
        const resizedImage = await resizeImage({ file, maxWidth: 1000, maxHeight: Infinity });
        const url = await uploadImageToFirebase({ file: resizedImage, storage, path: PATH_IMAGES });
        const _imageUrl = [...imageUrl, url]
        setImageUrl(_imageUrl);
        setImageUrl(_imageUrl)

        if (id) {
          DB.os.update({
            db,
            id,
            data: { photos: _imageUrl }
          })
        }

      } catch (error) {
        toast({
          duration: 4000,
          variant: "destructive",
          title: "Erro",
          description: "Ocorreu um erro ao realizar o upload da imagem"
        })
      }
      setStatusLoading(false)
    }
  };

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (!store) {
      setStatusStore(true)
      return
    }

    setStatusLoading(true)
    const { accessories, date, report, guarantee, observation, positionInCabinet, product, serialNumber, customer } = values

    //carrega dados do cliente
    const resultCustomer = await DB.customers.read({ db, id: (id && customerData) ? customerData._id : customer })

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
    const _signFile = signFile || null
    const lastOs = await DB.os.list({ db, limit: 1, orderBy: [['createdAt', 'desc']] })
    const _customer = { name: resultCustomer.doc.name, _id: resultCustomer.doc._id, cpfCnpj: resultCustomer.doc.cpfCnpj }
    const numberOs = lastOs && lastOs.status && lastOs.docs && Object.values(lastOs.docs).length > 0 ? Number(Object.values(lastOs.docs)[0].numberOs) + 1 : 1
    const _data = { report, substatus: TYPE_SUBSTATUS.waitingForTechnicalAnalysis.value as keyof typeof TYPE_SUBSTATUS, status: TYPE_STATUS.created.value as keyof typeof TYPE_STATUS, photos: imageUrl, signFile: _signFile, numberOs, accessories, product, date: dateToServer(date), observation, serialNumber, positionInCabinet, guarantee, customer: _customer, _headquarterId: store._headquarterId, _storeId: store._id }

    const result = !id ?
      await DB.os.create({
        db,
        data: _data
      }) :
      await DB.os.update({
        db,
        id,
        data: _data
      })

    if (!result.status) {
      toast({
        duration: 4000,
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao salvar a OS"
      })

    }

    if (result.status && !id && result.doc) {
      setStatusCreated(true)
      navigate(`/dashboard/ordens-servicos/${result.id}`)
    }
    if (result.status && id && setOs) {
      setOs({ ...os, ..._data } as TypeOs)
      toast({
        duration: 4000,
        title: "Item atualizado",
        description: "A OS foi atualizada com sucesso"
      })
    }
    setStatusLoading(false)
  }

  const onCreateHandler = () => {
    setStatusCreated(false)
    form.reset()
    if (id) navigate('/dashboard/ordem-servico/novo')
  }

  function removeImage(image: typeof imageUrl[0]) {
    const newImages = imageUrl.filter(item => item.url !== image.url)
    setImageUrl(newImages)
    deleteFileFromStorage({ filePath: image.path, storage })
  }

  function signatureHandler({ url, path }: { url: string, path: string }) {
    form.setValue('signFile', url)
    setSignFile({ url, path })

    if (id) {
      DB.os.update({
        db,
        id,
        data: { signFile: { url, path } }
      })
    }
  }


  if (pageStatus === 'loading') {
    return <LoadingPage />
  }

  if (pageStatus === 'error') {
    return <ErrorPage />
  }

  if (!store || !db) return <LoadingPage />

  return <>

    {statusLoading && <Loading />}
    <StoreNotFoundAlert open={statusStore} />
    <ItemCreatedAlert type={id ? 'update' : 'create'} open={statusCreated} closeHandler={() => setStatusCreated(false)} confirmHandler={onCreateHandler} />

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <div className=" flex pt-6 pb-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente <MandatoryLabel /></FormLabel>
                  <FormControl>
                    <div>
                      {!id && <SearchSelect onChange={e => {
                        field.onChange(e.value)
                      }} store={store} db={db} requisition={DB.views.customers.list} />}
                      {
                        id && form.getValues().customer && <Input value={form.getValues().customer} disabled />
                      }
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!id && <div className="pl-4">
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
          </div>}

        </div>
        <div className=" grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
          <div className='col-span-2'>
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produto <MandatoryLabel /></FormLabel>
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
                  <FormLabel>Data de abertura <MandatoryLabel /></FormLabel>
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
        <div className="py-4">
          <FormField
            control={form.control}
            name="report"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relato do problema <MandatoryLabel /></FormLabel>
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

        </div>
        <div className='flex gap-4 mt-4 flex-wrap'>
          {
            imageUrl.map(item => <div key={item.url} className={`relative w-32 h-32`}>
              <img src={item.url} alt="Imgem do aparelho" />
              <button onClick={() => removeImage(item)}>
                <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                  delete
                </span>
              </button>
            </div>)
          }
          <div className=" flex relative cursor-pointer">
            <Button type="button" variant={'primary'}><span className="material-symbols-outlined sm:mr-2 cursor-pointer">
              add_a_photo
            </span> <span className="hidden sm:block">Nova foto</span></Button>
            <input className="absolute top-0 left-0 w-full h-full opacity-0  cursor-pointer " type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
          </div>
        </div>
        <div>
          <div className=" w-full pt-20 mb-2">
            <Label>Assinatura do cliente</Label>
            <div className="mt-5">
              {signFile && <img className="max-w-80" src={signFile.url} />}
            </div>
          </div>
          <SignUploader path='os/signatures' onCreate={signatureHandler} />
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
  </>
}
export default PageOsForm