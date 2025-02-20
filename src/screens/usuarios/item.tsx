
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
import { Timestamp } from "firebase/firestore"


const FormSchema = z.object({
    name: z
        .string().min(1, {
            message: "Preencha o nome do usuário",
        }),
    cpf: z
        .string().min(1, {
            message: "Preencha o CPF do usuário",
        }),
    email: z
        .string().min(1, {
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
        .string().min(1, {
            message: "Preencha o complemento",
        }),
    password: z
        .string().min(1, {
            message: "Preencha a senha",
        }),
    username: z
        .string().min(1, {
            message: "Preencha o usuário",
        }),

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
            username: "",
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
                form.setValue('username', doc.username)
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
        const { name, email, whatsapp, phone, phone2, phone3, cpf, state, city, neighborhood, address, zipcode, number, complement, password, username, } = values
        const result = !id ?
            await DB.users.create({
                db,
                data: { _id: "", createdAt: Timestamp.now(), name, email, whatsapp, phone, phone2, phone3, cpf, state, city, neighborhood, address, zipcode, number, complement, password, username, _headquarterId: store._headquarterId, _storeId: store._id }
            }) :
            await DB.users.update({
                db,
                id,
                data: { name, email, whatsapp, phone, phone2, phone3, cpf, state, city, neighborhood, address, zipcode, number, complement, password, username, }
            })
        if (result.status) {
            setStatusCreated(true)
        }
        setStatusLoading(false)
    }

    const onCreateHandler = () => {
        setStatusCreated(false)
        form.reset()
        if (id) navigate('/dashboard/usuarios/novo')

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

                    <div className="space-y-2 py-4">
                        <FormLabel>Tipo de usuário</FormLabel>
                        <Select>
                            <SelectTrigger className="flex w-full text-left font-normal">
                                <SelectValue placeholder="Selecione a loja" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={TYPE_OF_USERS.admin._id}>{TYPE_OF_USERS.admin.label}</SelectItem>
                                <SelectItem value={TYPE_OF_USERS.attendant._id}>{TYPE_OF_USERS.attendant.label}</SelectItem>
                                <SelectItem value={TYPE_OF_USERS.financial1._id}>{TYPE_OF_USERS.financial1.label}</SelectItem>
                                <SelectItem value={TYPE_OF_USERS.financial2._id}>{TYPE_OF_USERS.financial2.label}</SelectItem>
                                <SelectItem value={TYPE_OF_USERS.manager._id}>{TYPE_OF_USERS.manager.label}</SelectItem>
                                <SelectItem value={TYPE_OF_USERS.technical._id}>{TYPE_OF_USERS.technical.label}</SelectItem>
                            </SelectContent>
                        </Select>
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

                    <div className='grid grid-cols-3 gap-4'>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuário</FormLabel>
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
                                        <Input placeholder="Digite aqui" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='grid grid-cols-3 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="cpf"
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
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} />
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
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} />
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
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} />
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
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UF</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="flex w-full text-left font-normal">
                                                <SelectValue placeholder="Escolha seu estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {STATES.map(state => <SelectItem value={state.value}>{state.label}</SelectItem>)}
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
                    <div className='grid grid-cols-3 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="zipcode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CEP</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui seu CEP" {...field} />
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

export default DadosDoUsuario