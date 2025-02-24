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
import HeaderPage from '@/components/headerPage'
import { useNavigate, useParams } from "react-router"
import STATES from "../../consts/STATES"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { useStoresContext } from "@/providers/stores/useStoresContext"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { TypePageStatus } from "@/types/PageStatus"
import { DB } from "@/functions/database"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { Loading } from "@/components/loading"
import { StoreNotFoundAlert } from "@/components/storeNotFoundAlert"
import { ItemCreatedAlert } from "@/components/itemCreatedAlert"
import { Timestamp } from "firebase/firestore"
import formatPhone from "../../functions/utils/formatPhone"
import formatCpfCnpj from "../../functions/utils/formatCpfCnpj"
import { Search } from "lucide-react"
import formatCep from "../../functions/utils/formatCep"
import cleanValue from "../../functions/utils/cleanValue"
import { getCep } from "../../functions/cep"

const FormSchema = z.object({
    name: z
        .string().min(1, {
            message: "Preencha o nome da loja",
        }),
    cpfCnpj: z
        .string().min(1, {
            message: "Preencha o CPF/CNPJ da loja",
        }),
    email: z
        .string().email().min(1, {
            message: "Preencha o Email",
        }),
    whatsapp: z
        .string().min(1, {
            message: "Preencha o whatsapp",
        }),
    phone: z
        .string(),
    phone2: z
        .string(),
    phone3: z
        .string(),
    city: z
        .string().min(1, {
            message: "Preencha a cidade",
        }),
    neighborhood: z
        .string().min(1, {
            message: "Preencha o bairro",
        }),
    address: z
        .string().min(1, {
            message: "Preencha o endereço",
        }),
    zipcode: z
        .string().min(1, {
            message: "Preencha o endereço",
        }),
    number: z
        .string().min(1, {
            message: "Preencha o número",
        }),
    state: z
        .string().min(1, {
            message: "Preencha o número",
        }),
    complement: z
        .string(),
})

const DadosDaLoja = () => {

    const { db } = useFirebaseContext()
    const { store } = useStoresContext()
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
            city: "",
            neighborhood: "",
            address: "",
            zipcode: "",
            state: "",
            number: "",
            complement: "",

        },
    })


    const { id } = useParams()
    const [statusStore, setStatusStore] = useState(false)
    const [statusCreated, setStatusCreated] = useState(false)
    const [pageStatus, setPageStatus] = useState<TypePageStatus>(id ? 'loading' : 'success')
    const navigate = useNavigate()
    const [statusLoading, setStatusLoading] = useState(false)
    const [cepStatus, setCepStatus] = useState(false)

    useEffect(() => {
        if (!id) return
        const load = async () => {
            const result = await DB.stores.read({ db, id })
            let status: typeof pageStatus = 'success'
            if (!result.status) {
                status = 'error'
                return
            }

            setPageStatus(status)
            const { doc } = result
            if (doc) {
                form.setValue('name', doc.name)
                form.setValue('cpfCnpj', doc.cpfCnpj)
                form.setValue('email', doc.email)
                form.setValue('whatsapp', doc.whatsapp)
                form.setValue('phone', doc.phone)
                form.setValue('phone2', doc.phone2)
                form.setValue('phone3', doc.phone3)
                form.setValue('city', doc.city)
                form.setValue('neighborhood', doc.neighborhood)
                form.setValue('zipcode', doc.zipcode)
                form.setValue('address', doc.address)
                form.setValue('state', doc.state)
                form.setValue('number', doc.number)
                form.setValue('complement', doc.complement)
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
        const { name, cpfCnpj, email, whatsapp, phone, phone2, phone3, city, neighborhood, address, zipcode, number, state, complement } = values
        const result = !id ?
            await DB.stores.create({
                db,
                data: { _id: "", createdAt: Timestamp.now(), lastOsNumber: 0, name, cpfCnpj, email, whatsapp, phone, phone2, phone3, city, neighborhood, address, zipcode, number, state, complement, _headquarterId: store._headquarterId, _storeId: store._id }
            }) :
            await DB.stores.update({
                db,
                id,
                data: { name, cpfCnpj, email, whatsapp, phone, phone2, phone3, city, neighborhood, address, zipcode, number, state, complement }
            })
        if (result.status) {
            setStatusCreated(true)
        }
        setStatusLoading(false)
    }

    const onCreateHandler = () => {
        setStatusCreated(false)
        form.reset()
        if (id) navigate('/dashboard/lojas/novo')
    }

    async function zipcodeHandler() {
        const cep = cleanValue(form.getValues('zipcode'))
        setCepStatus(true)
        const response = await getCep(cep)
        setCepStatus(false)
        console.log(response)
        if (response) {
            form.setValue('state', response?.state || '')
            form.setValue('city', response?.city || '')
            form.setValue('neighborhood', response?.neighborhood || '')
            form.setValue('address', response?.street || '')
        }
    }

    if (pageStatus === 'loading') {
        return <LoadingPage />
    }

    if (pageStatus === 'error') {
        return <ErrorPage />
    }
    return <>
        <PageContent>

            <HeaderPage title={id ? "Editar" : "Novo item"}></HeaderPage>
            {statusLoading && <Loading />}
            <StoreNotFoundAlert open={statusStore} />
            <ItemCreatedAlert type={id ? 'update' : 'create'} open={statusCreated} closeHandler={() => setStatusCreated(false)} confirmHandler={onCreateHandler} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome do loja" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="cpfCnpj"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF/CNPJ</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui o CPF/CNPJ" {...field} onChange={(e) => form.setValue("cpfCnpj", formatCpfCnpj(e.target.value))} />
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui seu Email" {...field} />
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
                                    <FormLabel>Whatsapp</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} onChange={(e) => form.setValue("whatsapp", formatPhone(e.target.value))} />
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
                                    <FormLabel>Cep:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="xx.xxx-xxx" {...field} onChange={(e) => form.setValue("zipcode", formatCep(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="ml-4 mt-8">
                            <Button disabled={cepStatus} onClick={zipcodeHandler} type="button" variant={"outline"}>
                                {!cepStatus && <Search />}
                                {cepStatus && <svg className="mx-auto size-10 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                            </Button>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UF</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <SelectTrigger className="flex w-full text-left font-normal">
                                                <SelectValue placeholder="Escolha o estado" />
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
                                    <FormLabel>Cidade</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui sua cidade" {...field} />
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
                                    <FormLabel>Bairro</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui seu bairro" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Endereço</FormLabel>
                                <FormControl>
                                    <Input placeholder="End:" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-4'>

                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nº</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui seu numero" {...field} />
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
                    <div className='py-6 flex justify-end'>
                        <Button type="submit" variant={'primary'}>Salvar</Button>
                    </div>
                </form>

            </Form>


        </PageContent>
    </>
}

export default DadosDaLoja