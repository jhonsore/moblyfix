import PageContent from "../../components/layout/pageContent"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../../components/ui/button"
import HeaderPage from "@/components/headerPage"
import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { useStoresContext } from "@/providers/stores/useStoresContext"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { TypePageStatus } from "@/types/PageStatus"
import { DB } from "@/functions/database"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import STATES from "@/consts/STATES"
import { Loading } from "@/components/loading"
import { StoreNotFoundAlert } from "@/components/storeNotFoundAlert"
import { ItemCreatedAlert } from "@/components/itemCreatedAlert"
import { Timestamp } from "firebase/firestore"
import cleanValue from "../../functions/utils/cleanValue"
import { getCep } from "../../functions/cep"
import { CalendarIcon, Search } from "lucide-react"
import formatCep from "../../functions/utils/formatCep"
import formatCpfCnpj from "../../functions/utils/formatCpfCnpj"
import formatPhone from "../../functions/utils/formatPhone"
import { useToast } from "@/hooks/use-toast"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import MandatoryLabel from "@/components/ui/mandatoryLabel"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Calendar } from "../../components/ui/calendar"
import { cn } from "@/lib/utils"
import { ptBR } from "date-fns/locale";
import { format } from "date-fns"
import dateToServer from "../../functions/utils/dateToServer"

const FormSchema = z.object({
    birthdate: z.date().nullable(),
    name: z
        .string().min(1, {
            message: "Preencha o nome do cliente",
        }),
    cpfCnpj: z
        .string().min(1, {
            message: "Preencha o CPF do cliente",
        }),
    email: z
        .string(),
    whatsapp: z
        .string().min(1, {
            message: "Preencha o whatsapp do cliente",
        }),
    phone: z
        .string(),
    phone2: z
        .string(),
    phone3: z
        .string(),
    city: z
        .string().min(1, {
            message: "Preencha a cidade do cliente",
        }),
    neighborhood: z
        .string().min(1, {
            message: "Preencha o bairro do cliente",
        }),
    address: z
        .string().min(1, {
            message: "Preencha o endereço do cliente",
        }),
    zipcode: z
        .string().min(1, {
            message: "Preencha o CEP do cliente",
        }),
    number: z
        .string().min(1, {
            message: "Preencha o numero do cliente",
        }),
    state: z
        .string().min(1, {
            message: "Preencha o estado do cliente",
        }),
    complement: z
        .string()

})

const DadosDoCliente = () => {

    const { db } = useFirebaseContext()
    const { store } = useStoresContext()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            cpfCnpj: "",
            email: "",
            whatsapp: "",
            phone: "",
            phone2: "",
            phone3: "",
            state: "",
            city: "",
            neighborhood: "",
            address: "",
            zipcode: "",
            number: "",
            complement: "",
            birthdate: null
        },
    })
    const { id } = useParams()
    const [statusStore, setStatusStore] = useState(false)
    const [statusCreated, setStatusCreated] = useState(false)
    const [pageStatus, setPageStatus] = useState<TypePageStatus>(id ? 'loading' : 'success')
    const navigate = useNavigate()
    const [statusLoading, setStatusLoading] = useState(false)
    const [statusDeleting, setStatusDeleting] = useState(false)
    const [cepStatus, setCepStatus] = useState(false)


    useEffect(() => {
        if (!id) return
        const load = async () => {
            const result = await DB.customers.read({ db, id })
            let status: typeof pageStatus = 'success'
            if (!result.status) {
                status = 'error'
                return
            }

            setPageStatus(status)
            const { doc } = result
            if (doc) {
                form.setValue('name', doc.name || '')
                form.setValue('cpfCnpj', doc.cpfCnpj || '')
                form.setValue('email', doc.email || '')
                form.setValue('whatsapp', formatPhone(doc.whatsapp) || '')
                form.setValue('phone', formatPhone(doc.phone) || '')
                form.setValue('phone2', formatPhone(doc.phone2) || '')
                form.setValue('phone3', formatPhone(doc.phone3) || '')
                form.setValue('state', doc.state || '')
                form.setValue('city', doc.city || '')
                form.setValue('neighborhood', doc.neighborhood || '')
                form.setValue('address', doc.address || '')
                form.setValue('zipcode', doc.zipcode || '')
                form.setValue('number', doc.number || '')
                form.setValue('complement', doc.complement || '')
                form.setValue('birthdate', doc.birthdate?.toDate() || null)
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
        const { name, email, whatsapp, birthdate, phone, phone2, phone3, state, city, neighborhood, address, zipcode, number, complement, cpfCnpj, } = values
        const _birthdate = birthdate ? dateToServer(birthdate) : null
        const result = !id ?
            await DB.customers.create({
                db,
                data: { createdAt: Timestamp.now(), birthdate: _birthdate, name, email, whatsapp: cleanValue(whatsapp), phone: cleanValue(phone), phone2: cleanValue(phone2), phone3: cleanValue(phone3), state, city, neighborhood, address, zipcode: cleanValue(zipcode), number, complement, cpfCnpj: cleanValue(cpfCnpj), _headquarterId: store._headquarterId, _storeId: store._id }
            }) :
            await DB.customers.update({
                db,
                id,
                data: { name, email, birthdate: _birthdate, whatsapp: cleanValue(whatsapp), phone: cleanValue(phone), phone2: cleanValue(phone2), phone3: cleanValue(phone3), state, city, neighborhood, address, zipcode: cleanValue(zipcode), number, complement, cpfCnpj: cleanValue(cpfCnpj) }
            })
        if (result.status) {
            setStatusCreated(true)
        }
        setStatusLoading(false)
    }

    const onCreateHandler = () => {
        setStatusCreated(false)
        form.reset()
        if (id) navigate('/dashboard/clientes/novo')

    }


    async function zipcodeHandler() {
        const cep = cleanValue(form.getValues('zipcode'))
        setCepStatus(true)
        const response = await getCep(cep)
        setCepStatus(false)

        if (response) {
            form.setValue('state', response?.state || '')
            form.setValue('city', response?.city || '')
            form.setValue('neighborhood', response?.neighborhood || '')
            form.setValue('address', response?.street || '')
        }
    }

    async function removeHandler() {
        if (!id) return
        const response = await DB.customers.delete({ db, id: id })

        if (!response.status) {
            toast({
                variant: "destructive",
                title: "Remoção de peças,serviços ou produtos",
                description: "Ocorreu um erro ao remover o item, tente novamente!"
            })
            return
        }
        toast({
            description: "Item removido com sucesso",
        })
        setStatusDeleting(true)
        navigate(`/dashboard/clientes/?deleted=${id}`)

    }

    if (pageStatus === 'loading') {
        return <LoadingPage />
    }

    if (pageStatus === 'error') {
        return <ErrorPage />
    }



    return <>
        <PageContent>

            <HeaderPage title={id ? "Editar" : 'Novo item'}></HeaderPage>

            {statusLoading && <Loading />}
            <StoreNotFoundAlert open={statusStore} />
            <ItemCreatedAlert type={id ? 'update' : 'create'} open={statusCreated} closeHandler={() => setStatusCreated(false)} confirmHandler={onCreateHandler} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cliente<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome do cliente" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="birthdate"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Data de nascimento</FormLabel>
                                    <div className="w-full">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            " pl-3 text-left font-normal w-full",
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
                                                    selected={field.value || undefined}
                                                    onSelect={field.onChange}
                                                    locale={ptBR}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 py-4'>

                        <FormField
                            control={form.control}
                            name="cpfCnpj"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF/CNPJ<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Input maxLength={14} placeholder="Digite aqui o CPF" {...field} onChange={(e) => form.setValue("cpfCnpj", formatCpfCnpj(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="whatsapp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Whatsapp<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} onChange={(e) => form.setValue("whatsapp", formatPhone(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contato 1</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} onChange={(e) => form.setValue("phone", formatPhone(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contato 2</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} onChange={(e) => form.setValue("phone2", formatPhone(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone3"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contato 3</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} onChange={(e) => form.setValue("phone3", formatPhone(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className="flex">
                        <FormField
                            control={form.control}
                            name="zipcode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cep:<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="xx.xxx-xxx" {...field} onChange={(e) => form.setValue("zipcode", formatCep(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="ml-4 mt-8">
                            <Button disabled={cepStatus} onClick={zipcodeHandler} type="button" variant={'outline'}>
                                {!cepStatus && <Search />}
                                {cepStatus && <svg className="mx-auto size-10 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                            </Button>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UF<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <SelectTrigger className="flex w-full text-left font-normal">
                                                <SelectValue placeholder="Escolha seu estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {STATES.map(state => <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cidade<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui a cidade" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="neighborhood"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bairro<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui o bairro" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Endereço<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="End:" {...field} />
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
                                    <FormLabel>Nº<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui o numero" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="complement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Complemento</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='py-6 flex justify-end gap-4'>
                        {
                            id &&
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant={'destructive'}>Deletar</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Você realmente quer remover esse item?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta ação não pode ser desfeita. Ao clicar no botão "Remover" você apagará o item permanentemente.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <Button disabled={statusDeleting} onClick={removeHandler} variant={'destructive'}>
                                            {!statusDeleting && <span>Remover</span>}
                                            {statusDeleting && <span><svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>}
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        }

                        <Button type="submit" variant={'primary'}>Salvar</Button>
                    </div>
                </form>
            </Form>

        </PageContent>
    </>
}

export default DadosDoCliente