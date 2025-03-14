import PageContent from "../../components/layout/pageContent"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import HeaderPage from '@/components/headerPage'
import { data, useNavigate, useParams } from "react-router"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import { useEffect, useState } from "react"
import { TypePageStatus } from "../../types/PageStatus"
import { DB } from "../../functions/database"
import { LoadingPage } from "../../components/loadingPage"
import { ErrorPage } from "../../components/errorPage"
import { Loading } from "../../components/loading"
import { StoreNotFoundAlert } from "../../components/storeNotFoundAlert"
import { ItemCreatedAlert } from "../../components/itemCreatedAlert"
import { TypePartsServicesProducts } from "../../types/PartsServicesProducts"
import { formatCurrency } from "../../functions/utils/formatCurrency"
import { currencyToNumber } from "../../functions/utils/currencyToNumber"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import formatToBrazilianReal from "../../functions/utils/formatToBrazilianReal"
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



const FormSchema = z.object({
    name: z
        .string().min(1, {
            message: "Preencha o nome",
        }),
    type: z.enum(["part", "service", "product"], {
        required_error: "You need to select a notification type.",
    }),
    cashPrice: z
        .string()
        .min(1, "O valor é obrigatório"),
    installmentPrice: z
        .string()
        .min(1, "O valor é obrigatório"),
    costPrice: z
        .string()
        .min(1, "O valor é obrigatório"),
})

const PartsServicesProductsItem = () => {
    const { db } = useFirebaseContext()
    const { store } = useStoresContext()
    const { toast } = useToast()
    const [statusDeleting, setStatusDeleting] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            cashPrice: '',
            installmentPrice: '',
            costPrice: '',
            type: 'part'
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
            const result = await DB.partsServicesProducts.read({ db, id })
            let status: typeof pageStatus = 'success'
            if (!result.status) {
                status = 'error'
                return
            }

            setPageStatus(status)
            const { doc } = result
            if (doc) {
                form.setValue('name', doc.name)
                form.setValue('cashPrice', formatToBrazilianReal(doc.cashPrice.toString()))
                form.setValue('installmentPrice', formatToBrazilianReal(doc.installmentPrice.toString()))
                form.setValue('costPrice', formatToBrazilianReal(doc.costPrice.toString()))
                form.setValue('type', doc.type)
                console.log(doc)
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
        const { name, cashPrice, costPrice, installmentPrice, type } = values
        const _cashPrice = currencyToNumber(cashPrice);
        const _costPrice = currencyToNumber(costPrice);
        const _installmentPrice = currencyToNumber(installmentPrice);
        const result = !id ?
            await DB.partsServicesProducts.create({
                db,
                data: { type: type as TypePartsServicesProducts['type'], name, cashPrice: _cashPrice, costPrice: _costPrice, installmentPrice: _installmentPrice, _headquarterId: store._headquarterId, _storeId: store._id }
            }) :
            await DB.partsServicesProducts.update({
                db,
                id,
                data: { type: type as TypePartsServicesProducts['type'], name, cashPrice: _cashPrice, costPrice: _costPrice, installmentPrice: _installmentPrice }
            })
        if (result.status) {
            setStatusCreated(true)
        }
        setStatusLoading(false)
    }

    const onCreateHandler = () => {
        setStatusCreated(false)
        form.reset()
        if (id) navigate('/dashboard/pecas-servicos/novo')

    }

    async function removeHandler() {
        if (!id) return
        const response = await DB.partsServicesProducts.delete({ db, id: id })

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
        navigate(`/dashboard/pecas-servicos/?deleted=${id}`)
        

    }


    if (pageStatus === 'loading') {
        return <LoadingPage />
    }

    if (pageStatus === 'error') {
        return <ErrorPage />
    }

    




    return <>
        <PageContent>
            <HeaderPage title={id ? "Editar" : "Novo item"} />
            {statusLoading && <Loading />}
            <StoreNotFoundAlert open={statusStore} />
            <ItemCreatedAlert type={id ? 'update' : 'create'} open={statusCreated} closeHandler={() => setStatusCreated(false)} confirmHandler={onCreateHandler} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>Escolha o tipo</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex  space-x-4">
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="part" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Peças
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="service" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Serviços
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="product" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Produtos
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome<MandatoryLabel /></FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite aqui" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="costPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço de custo<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="R$ 0,00" {...field} onChange={(e) => form.setValue("costPrice", formatCurrency(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cashPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Venda à vista<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="R$ 0,00" {...field} onChange={(e) => form.setValue("cashPrice", formatCurrency(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="installmentPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Venda à prazo<MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="R$ 0,00" {...field} onChange={(e) => form.setValue("installmentPrice", formatCurrency(e.target.value))} />
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

export default PartsServicesProductsItem