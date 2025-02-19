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
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Link, useNavigate } from "react-router"
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

const FormSchema = z.object({
    name: z
        .string().min(1, {
            message: "Preencha o nome do usuário",
        }),
    cpfCnpj: z
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

})

const DadosDoCliente = () => {

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
            state: "",
            city: "",
            neighborhood: "",
            address: "",
            zipcode: "",
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
                form.setValue('name', doc.name)
                form.setValue('cpfCnpj', doc.cpfCnpj)
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
        const { name, email, whatsapp, phone, phone2, phone3, state, city, neighborhood, address, zipcode, number, complement, cpfCnpj, } = values
        const result = !id ?
            await DB.customers.create({
                db,
                data: { _id: "", createdAt: Timestamp.now(), name, email, whatsapp, phone, phone2, phone3, state, city, neighborhood, address, zipcode, number, complement, cpfCnpj, _headquarterId: store._headquarterId, _storeId: store._id }
            }) :
            await DB.customers.update({
                db,
                id,
                data: { name, email, whatsapp, phone, phone2, phone3, state, city, neighborhood, address, zipcode, number, complement, cpfCnpj, }
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
                    <FormField
                        control={form.control}
                        name="name"
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
                    <div className='grid grid-cols-3 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="cpfCnpj"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF/CNPJ</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite aqui o CPF/CNPJ  " {...field} />
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
                                        <Input placeholder="Digite aqui email" {...field} />
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
                                        <Input placeholder="Digite aqui o CEP" {...field} />
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
                    <div className="py-6 flex justify-end">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button type="submit" variant={'primary'}>Salvar</Button>
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
                    </div>
                </form>
            </Form>

        </PageContent>
    </>
}

export default DadosDoCliente