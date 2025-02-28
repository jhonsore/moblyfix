
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
import { useNavigate, useParams } from "react-router"
import TYPE_OF_USERS from "../../consts/TYPE_USERS"
import { LoadingPage } from "@/components/loadingPage"
import { ErrorPage } from "@/components/errorPage"
import { DB } from "@/functions/database"
import { useEffect, useState } from "react"
import { TypePageStatus } from "@/types/PageStatus"
import { useFirebaseContext } from "@/providers/firebase/useFirebaseContext"
import { useStoresContext } from "@/providers/stores/useStoresContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loading } from "@/components/loading"
import { StoreNotFoundAlert } from "@/components/storeNotFoundAlert"
import { ItemCreatedAlert } from "@/components/itemCreatedAlert"
import STATES from "../../consts/STATES"
import formatCpfCnpj from "../../functions/utils/formatCpfCnpj"
import formatPhone from "../../functions/utils/formatPhone"
import { Search } from "lucide-react"
import cleanValue from "../../functions/utils/cleanValue"
import { getCep } from "../../functions/cep"
import formatCep from "../../functions/utils/formatCep"
import { Users } from "../../functions/users"
import { useAuthContext } from "../../providers/auth/useAuthContext"


const FormSchema = z.object({
    name: z
        .string().min(1, {
            message: "Preencha o nome do usuário",
        }),
    type: z
        .string().min(1, {
            message: "Escolha o tipo de usuário",
        }),
    cpf: z
        .string().min(1, {
            message: "Preencha o CPF do usuário",
        }),
    email: z
        .string().email('Email inválido').min(1, {
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
            message: "Preencha o CEP",
        }),
    number: z
        .string().min(1, {
            message: "Preencha o número",
        }),
    state: z
        .string().min(1, {
            message: "Preencha o estado",
        }),
    complement: z
        .string(),
    password: z
        .string().min(1, {
            message: "Preencha a senha",
        })

})

const DadosDoUsuario = () => {
    const { db } = useFirebaseContext()
    const { store } = useStoresContext()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
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
            password: "",
            cpf: '',
            type: ''
        },
    })
    const { id } = useParams()
    const [statusStore, setStatusStore] = useState(false)
    const [statusCreated, setStatusCreated] = useState(false)
    const [pageStatus, setPageStatus] = useState<TypePageStatus>(id ? 'loading' : 'success')
    const navigate = useNavigate()
    const [statusLoading, setStatusLoading] = useState(false)
    const [cepStatus, setCepStatus] = useState(false)
    const { idToken } = useAuthContext()

    useEffect(() => {
        if (!id) return
        const load = async () => {
            const result = await DB.users.read({ db, id })
            let status: typeof pageStatus = 'success'
            if (!result.status) {
                status = 'error'
                return
            }

            setPageStatus(status)
            const { doc } = result
            if (doc) {
                form.setValue('name', doc.name)
                form.setValue('email', doc.email)
                form.setValue('whatsapp', doc.whatsapp)
                form.setValue('phone', doc.phone)
                form.setValue('phone2', doc.phone2)
                form.setValue('phone3', doc.phone3)
                form.setValue('state', doc.state)
                form.setValue('city', doc.city)
                form.setValue('neighborhood', doc.neighborhood)
                form.setValue('address', doc.address)
                form.setValue('zipcode', doc.zipcode)
                form.setValue('number', doc.number)
                form.setValue('complement', doc.complement)
                form.setValue('password', doc.password)
                form.setValue('cpf', doc.cpf)
                form.setValue('type', doc.type)
            }
        }
        load()
    }, [id])

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        if (!store || !idToken) {
            setStatusStore(true)
            return
        }
        setStatusLoading(true)
        const userData = { ...values, _headquarterId: store._headquarterId, _storeId: store._id, type: values.type as keyof typeof TYPE_OF_USERS }
        const _values = { ...values, _headquarterId: store._headquarterId, _storeId: store._id, }
        if (id) {
            await DB.users.update({
                db,
                id,
                data: { ..._values, type: values.type as keyof typeof TYPE_OF_USERS }
            })
            setStatusCreated(true)
            setStatusLoading(false)
            return
        }

        try {
            const response = await Users.create(idToken, userData);
            setStatusCreated(true)
            if (!response.status) {
                alert('Ocorreu um erro ao cadastrar o usuário! (1001)')
            }

        } catch (error) {
            alert('Ocorreu um erro ao cadastrar o usuário! (1002)')
        }
        setStatusLoading(false)
    }

    const onCreateHandler = () => {
        setStatusCreated(false)
        form.reset()
        if (id) navigate('/dashboard/usuarios/novo')
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de usuário</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <SelectTrigger className="flex w-full text-left font-normal">
                                                <SelectValue placeholder="Escolha o tipo de usuário" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(TYPE_OF_USERS).filter(user => user._id !== TYPE_OF_USERS.master._id).map(user => <SelectItem key={user._id} value={user._id}>{user.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome do usuário" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail/Usuário</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Digite aqui" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF</FormLabel>
                                    <FormControl>
                                        <Input maxLength={14} placeholder="Digite aqui o CPF" {...field} onChange={(e) => form.setValue("cpf", formatCpfCnpj(e.target.value))} />
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
                                    <FormLabel>UF</FormLabel>
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
                                    <FormLabel>Cidade</FormLabel>
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
                                    <FormLabel>Bairro</FormLabel>
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
                                    <FormLabel>Endereço</FormLabel>
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
                                    <FormLabel>Nº</FormLabel>
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
                        {id && <Button variant={'destructive'}>Deletar</Button>}
                        <Button type="submit" variant={'primary'}>Salvar</Button>
                    </div>
                </form>
            </Form>


        </PageContent>
    </>
}

export default DadosDoUsuario