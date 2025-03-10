import { useForm } from "react-hook-form"
import PageContent from "../../components/layout/pageContent"
import HeaderPage from "@/components/headerPage"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import SearchSelect from "../../components/searchSelect"
import { DB } from "../../functions/database"
import { LoadingPage } from "../../components/loadingPage"
import { useEffect, useState } from "react"
import { toast } from "../../hooks/use-toast"
import { Input } from "../../components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatCurrency } from "../../functions/utils/formatCurrency"
import formatToBrazilianReal from "../../functions/utils/formatToBrazilianReal"
import formatNumber from "../../functions/utils/formatNumber"
import { Loading } from "../../components/loading"
import { useNavigate, useParams } from "react-router"
import { StoreNotFoundAlert } from "../../components/storeNotFoundAlert"
import { ItemCreatedAlert } from "../../components/itemCreatedAlert"
import PAYMENT_METHODS from "../../consts/PAYMENT_METHODS"
import { TypeSales } from "../../types/Sales"
import { currencyToNumber } from "../../functions/utils/currencyToNumber"
import { ImageUploader } from "../../components/imageUploader"
import { TypePageStatus } from "../../types/PageStatus"
import DISCOUNT_TYPES from "../../consts/DISCOUNT_TYPES"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"



const FormSchema = z.object({
    item: z
        .string().min(1, {
            message: "Escolha o item",
        }),
    quantity: z
        .number().min(1, {
            message: "Escolha a quantidade",
        })
})

const FormSchemaVendas = z.object({
    paymentType: z.enum(["cash", "installment", "free"], {
        required_error: "Selecione ao menos um tipo de pagamento",
    }),
    signFile: z.string().optional(),
    paymentMethod: z.string().optional(),
    observation: z.string().optional(),
    discountType: z.enum(["cash", "percent", "none"]),
    product: z.string().min(1, { message: 'Escolha ao mesmo um produto/serviço/peça' }),
    customer: z.string().min(1, { message: 'Escolha o cliente' }),
    installments: z.string().nullable().optional(),
    discount: z
        .string()
        .optional(),
}).superRefine((val, ctx) => {
    if (val.paymentType === 'installment' && !val.installments) {
        ctx.addIssue({
            message: `Escolha a quantidade de parcelas`,
            path: ['installments'],
            code: z.ZodIssueCode.custom,
        });
    }
    if (val.discountType !== 'none' && !val.discount) {
        ctx.addIssue({
            message: `Digite o desconto`,
            path: ['discount'],
            code: z.ZodIssueCode.custom,
        });
    }
})

const PageSales = () => {
    const formItem = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            item: "",
            quantity: 1
        },
    })
    const form = useForm<z.infer<typeof FormSchemaVendas>>({
        resolver: zodResolver(FormSchemaVendas),
        defaultValues: {
            paymentType: 'cash',
            discountType: 'none',
            installments: null,
            discount: '',
            product: '',
            observation: '',
            paymentMethod: '',
            signFile: '',
            customer: ''
        },
    })
    const navigate = useNavigate()
    const { db } = useFirebaseContext()
    const { store } = useStoresContext()
    const [items, setItems] = useState<TypeSales['items']>([])
    const [paymentType, setPaymentType] = useState('cash')
    const [discountType, setdiscountType] = useState('none')
    const [statusLoading, setStatusLoading] = useState(false)
    const [statusStore, setStatusStore] = useState(false)
    const { id } = useParams()
    const [statusCreated, setStatusCreated] = useState(false)
    const [customer, setCustomer] = useState<{ value?: string, label?: string }>()
    const [total, setTotal] = useState(0)
    const [signFile, setSignFile] = useState('')
    const [pageStatus, setPageStatus] = useState<TypePageStatus>(id ? 'loading' : 'success')

    useEffect(() => {
        if (!id) return
        const load = async () => {
            const result = await DB.sales.read({ db, id })
            let status: typeof pageStatus = 'success'
            if (!result.status) {
                status = 'error'
                return
            }

            const { doc } = result
            if (doc) {
                form.setValue('paymentType', doc.paymentType)
                form.setValue('discountType', doc.discountType as keyof typeof DISCOUNT_TYPES)
                form.setValue('installments', doc.installments?.toString() || null)
                const _discount = doc.discount?.toString() || ''
                form.setValue("discount", doc.discountType === 'cash' ? formatCurrency(formatToBrazilianReal(_discount)) : formatNumber(_discount))
                form.setValue('observation', doc.observation)
                form.setValue('paymentMethod', doc.paymentMethod as keyof typeof PAYMENT_METHODS || '')
                form.setValue('signFile', doc.signFile || undefined)
                form.setValue('customer', doc.customer._id)
                form.setValue('product', doc._id)// colocamos o id da venda apenas para ter algum valor no porducto e permitir que a venda seja atualizada
                setItems(doc.items)
                setSignFile(doc.signFile || '')
                setCustomer({ label: doc.customer.name, value: doc.customer._id })
                setdiscountType(doc.discountType || '')
                getTotal({ products: doc.items, discount: doc?.discount, discountType: doc.discountType || '' })
            }
            setPageStatus(status)
        }
        load()
    }, [id])


    async function onSubmitItem(values: z.infer<typeof FormSchema>) {
        const { item, quantity } = values

        const checkProduct = items?.filter(_item => _item._id === item)

        if (checkProduct.length > 0) {
            toast({
                duration: 4000,
                variant: "destructive",
                title: "Produto já inserido",
                description: "O produto selecionado já foi inserido na venda, remova o anterior e insira o novo"
            })
            return
        }

        const result = await DB.partsServicesProducts.read({ db, id: item })
        if (!result.status || !result.doc || !Object.values(result.doc).length) {
            toast({
                duration: 4000,
                variant: "destructive",
                title: "Item não encontrado",
                description: "A busca realizada não obteve nenhum resultado"
            })
            return
        }
        const doc = result.doc
        const products = [...items, {
            cashPrice: doc.cashPrice,
            costPrice: doc.costPrice,
            installmentPrice: doc.installmentPrice,
            name: doc.name,
            type: doc.type,
            quantity,
            _id: doc._id
        }]
        setItems(products)
        form.setValue('product', '1')
        form.clearErrors()
        getTotal({ products, discountType })
    }

    async function onSubmit(data: z.infer<typeof FormSchemaVendas>) {
        if (!store) {
            setStatusStore(true)
            return
        }
        setStatusLoading(true)

        const _data = {
            customer: {
                _id: customer?.value || '',
                name: customer?.label || ''
            },
            _headquarterId: store._headquarterId,
            _storeId: store._id,
            total,
            'paymentType': data.paymentType as TypeSales['paymentType'],
            'discountType': data.discountType as TypeSales['discountType'],
            'paymentMethod': data.paymentMethod as TypeSales['paymentMethod'] || null,
            'signFile': data.signFile || null,
            'observation': data.observation || '',
            items,
            'installments': data.installments ? parseInt(data.installments) : null,
            'discount': data.discount ? data.discountType === 'cash' ? currencyToNumber(data.discount) : parseInt(data.discount) : null,
        }

        const result = !id ?
            await DB.sales.create({
                db,
                data: _data
            }) :
            await DB.sales.update({
                db,
                id,
                data: _data
            })

        if (result.status) {
            setStatusCreated(true)
        }
        setStatusLoading(false)
    }

    function getTotal({ products, discount, discountType }: { discountType: string, discount?: number | null, products: typeof items }) {
        const sum = products.reduce((prev, cur) => {
            return prev + (form.getValues().paymentType === 'cash' ? cur.cashPrice : cur.installmentPrice)
        }, 0)
        let sumTemp = sum

        if (discountType === 'cash' && discount) {
            sumTemp -= discount
        }
        if (discountType === 'percent' && discount) {
            sumTemp -= (sum * discount) / 100
        }

        if (sumTemp < 0 || (discount && discountType === 'percent' && discount > 100)) sumTemp = 0

        setTotal(sumTemp)
    }

    function removeProduct(item: typeof items[0]) {
        const _items = items.filter(product => product._id !== item._id)
        setItems(_items)
        form.setValue('product', '')
    }

    const onCreateHandler = () => {
        setStatusCreated(false)
        form.reset()
        if (id) navigate('/dashboard/vendas/novo')
    }

    function discountHandler(e: React.ChangeEvent<HTMLInputElement>) {
        form.setValue("discount", discountType === 'cash' ? formatCurrency(e.target.value) : formatNumber(e.target.value))
        getTotal({ products: items, discountType, discount: discountType === 'cash' ? currencyToNumber(formatCurrency(e.target.value)) : +formatNumber(e.target.value) })
    }

    function imageUploadHandler(url: string) {
        form.setValue('signFile', url)
        setSignFile(url)
    }

    if (!store || !db) return <LoadingPage />

    return <>
        <PageContent>
            {statusLoading && <Loading />}
            <StoreNotFoundAlert open={statusStore} />
            <ItemCreatedAlert type={id ? 'update' : 'create'} open={statusCreated} closeHandler={() => setStatusCreated(false)} confirmHandler={onCreateHandler} />

            <HeaderPage title="Nova Venda" />
            <Form {...formItem}>
                <form onSubmit={formItem.handleSubmit(onSubmitItem)} className="pt-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <FormField
                                control={formItem.control}
                                name="item"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Peças/Produto/Serviço</FormLabel>
                                        <FormControl>
                                            <SearchSelect onChange={e => field.onChange(e.value)} store={store} db={db} requisition={DB.views.partsServicesProducts.list} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={formItem.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantidade</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Insira aqui" {...field} onChange={e => formItem.setValue('quantity', +e.target.value)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <Button type="submit" variant={'primary'} className="lg:mt-8">Adicionar</Button>
                        </div>
                    </div>
                </form>
            </Form>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="">
                        <FormField
                            control={form.control}
                            name="product"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="hidden" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-4">
                        <FormField
                            control={form.control}
                            name="customer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cliente</FormLabel>
                                    <FormControl>
                                        <div>
                                            {!id && <SearchSelect onChange={e => {
                                                field.onChange(e.value)
                                                setCustomer(e)
                                            }} store={store} db={db} requisition={DB.views.customers.list} />}
                                            {
                                                id && customer && <Input value={customer.label} disabled />
                                            }
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex flex-col lg:flex-row gap-8 pt-4">
                        <div>
                            <FormField
                                control={form.control}
                                name="paymentType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Selecione o tipo de pagamento</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={e => {
                                                    setPaymentType(e)
                                                    field.onChange(e)
                                                }}
                                                value={field.value}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="cash" id="cash" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal" htmlFor='cash'>
                                                        Pagamento à vista
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="installment" id="installment" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal" htmlFor='installment'>
                                                        Pagamento à prazo
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="free" id="free" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal" htmlFor='free'>
                                                        Gratuito
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {paymentType === 'installment' && <div className="mt-8 max-w-48">
                                <FormField
                                    control={form.control}
                                    name="installments"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Parcelas</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Parcelas" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => <SelectItem key={`item-${value}`} value={value.toString()}>{value.toString()}x</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>}

                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name="discountType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Selecione o tipo de desconto</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(e) => {
                                                    setdiscountType(e)
                                                    field.onChange(e)
                                                }}
                                                defaultValue={field.value}
                                                value={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="none" id="none" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal" htmlFor="none">
                                                        Nenhum
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="cash" id="_cash" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal" htmlFor="_cash">
                                                        Dinheiro
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="percent" id="percent" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal" htmlFor="percent">Porcentagem</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {discountType !== 'none' && <div className="mt-8 max-w-48">
                                <FormField
                                    control={form.control}
                                    name="discount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Desconto</FormLabel>
                                            <FormControl>
                                                <Input placeholder={`${discountType === 'cash' ? "R$ 0,00" : 'Ex.: 10%'}`} {...field} onChange={discountHandler} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>}
                        </div>
                    </div>
                    {paymentType === 'cash' && <div className="mt-8 max-w-48">
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Método de pagamento</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Escolha" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(PAYMENT_METHODS).map(value => <SelectItem key={value.value} value={value.value}>{value.label}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>}


                    <div className="pb-6 mt-8">
                        <table className="w-full">
                            <thead className="bg-gray-50 hidden lg:table-header-group w-full">
                                <tr className="align-top">
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap pl-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Peças/Serviços
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap pr-8 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Qtd
                                    </th>
                                    <th scope="col"
                                        className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Valor à vista
                                    </th>
                                    <th colSpan={2}
                                        className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Valor à prazo
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {items.length === 0 && <tr>
                                    <td colSpan={4} className="text-center py-8">Nenhum item selecionado</td>
                                </tr>}
                                {items.map(item => <tr key={item._id} className='lg:border-b border-gray-200'>
                                    <td className="whitespace-nowrap text-sm font-semibold text-gray-900 lg:px-2 lg:pl-6 lg:py-4 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
                                        <div className="flex justify-between">
                                            <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                                                Peças/Serviços
                                            </div>
                                            <div className="text-sm text-gray-900 p-4 lg:p-0">
                                                {item.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap text-sm font-semibold text-gray-900 lg:px-2 lg:pl-6 lg:py-4 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
                                        <div className="flex justify-between">
                                            <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                                                Qtd
                                            </div>
                                            <div className="text-sm text-gray-900 p-4 lg:p-0">
                                                {item.quantity}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap text-sm font-semibold text-gray-900 lg:px-2 lg:pl-6 lg:py-4 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
                                        <div className="flex justify-between">
                                            <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                                                Valor à vista
                                            </div>
                                            <div className="text-sm text-gray-900 p-4 lg:p-0">
                                                {formatToBrazilianReal(item.cashPrice.toString())}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap text-sm font-semibold text-gray-900 lg:px-2 lg:pl-6 lg:py-4 block lg:table-cell p-0 border-b-4 border-gray-200 lg:border-none">
                                        <div className="flex justify-between">
                                            <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                                                Valor à prazo
                                            </div>
                                            <div className="text-sm text-gray-900 p-4 lg:p-0">
                                                {formatToBrazilianReal(item.installmentPrice.toString())}
                                            </div>
                                        </div>
                                    </td>
                                    <td className=" whitespace-nowrap pl-3 text-center lg:text-right text-sm font-medium sm:pr-6">
                                        
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <span className="material-symbols-outlined text-gray-400 hover:text-red-500 cursor-pointer">
                                                    delete
                                                </span>
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
                                                    {/* <Button onClick={removeHandler} variant={'destructive'}>Remover</Button> */}
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                        {items.length > 0 && <div>
                            <div className="py-4 text-base font-bold text-gray-900 border-b border-gray-200 flex justify-between">
                                <h2>
                                    Total
                                </h2>
                                <span>
                                    {formatToBrazilianReal(total)}
                                </span>
                            </div>
                        </div>}
                    </div>
                    <div>
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
                    <div>
                        <div className=" w-full pt-20 mb-2">
                            <Label>Assinatura do cliente</Label>
                            <div className="mt-5">
                                {signFile && <img src={signFile} />}
                            </div>
                        </div>
                        <ImageUploader aspect={6 / 3} buttonText='Adicionar assinatura' onUploaded={imageUploadHandler} folder="sales/signatures" title="Upload de imagem" />
                    </div>
                    <div className="text-right py-10 flex justify-end gap-4">
                        {id && <Button variant={'destructive'}>Deletar</Button>}
                        <Button variant={"primary"} type="submit">Salvar</Button>
                    </div>
                </form>
            </Form>

        </PageContent >
    </>
}

export default PageSales