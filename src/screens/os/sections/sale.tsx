import { Button } from "../../../components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "../../../components/ui/textarea"
import { useFirebaseContext } from "../../../providers/firebase/useFirebaseContext"
import { useStoresContext } from "../../../providers/stores/useStoresContext"
import SearchSelect from "../../../components/searchSelect"
import { DB } from "../../../functions/database"
import { useEffect, useState } from "react"
import { Input } from "../../../components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatCurrency } from "../../../functions/utils/formatCurrency"
import formatToBrazilianReal from "../../../functions/utils/formatToBrazilianReal"
import formatNumber from "../../../functions/utils/formatNumber"
import { useParams } from "react-router"
import PAYMENT_METHODS from "../../../consts/PAYMENT_METHODS"
import { TypeSales } from "../../../types/Sales"
import { currencyToNumber } from "../../../functions/utils/currencyToNumber"
import DISCOUNT_TYPES from "../../../consts/DISCOUNT_TYPES"
import { useToast } from "@/hooks/use-toast"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import SignUploader from "../../../components/signUploader"
import { useOsContext } from "../provider/useOsContext"
import { Loading } from "../../../components/loading"
import CreateOsFollowup from "../../../functions/os/followup"
import { useAuthContext } from "../../../providers/auth/useAuthContext"
import TYPE_STATUS from "../../../consts/TYPE_STATUS"

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
    product: z.string().min(1, { message: 'Escolha ao menos um produto/serviço/peça' }),
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


const OSSale = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
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
        },
    })
    const [_open, setOpen] = useState(open)
    const { db } = useFirebaseContext()
    const { store } = useStoresContext()
    const [items, setItems] = useState<TypeSales['items']>([])
    const [paymentType, setPaymentType] = useState('cash')
    const [discountType, setdiscountType] = useState('none')
    const [statusLoading, setStatusLoading] = useState(false)
    const { id } = useParams()
    const [total, setTotal] = useState(0)
    const [signFile, setSignFile] = useState<{ url: string, path: string } | null>()
    const { toast } = useToast()
    const { os, setOs } = useOsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        if (!os) return
        const load = async () => {
            const result = await DB.sales.read({ db, id: os._saleId })
            if (!result.status) {
                alert('Venda não encontrada')
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
                form.setValue('signFile', doc.signFile?.url || undefined)
                form.setValue('product', doc._id)// colocamos o id da venda apenas para ter algum valor no porducto e permitir que a venda seja atualizada
                setItems(doc.items)
                setSignFile(doc.signFile)
                setdiscountType(doc.discountType || '')
                getTotal({ products: doc.items, discount: doc?.discount, discountType: doc.discountType || '' })
            }
        }
        if (os._saleId) load()

        if (!os._saleId) {
            getTotal({ products: os.partsServicesProducts, discount: null, discountType: '' })
            setItems(os.partsServicesProducts)
            form.setValue('product', os._id)// colocamos o id da venda apenas para ter algum valor no porducto e permitir que a venda seja atualizada
        }
    }, [os, open])

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
        if (!os || !setOs || !user) return
        setStatusLoading(true)

        const _data = {
            customer: {
                _id: os.customer._id || '',
                name: os.customer.name || ''
            },
            _headquarterId: os._headquarterId,
            _storeId: os._storeId,
            total,
            _osId: os._id,
            'paymentType': data.paymentType as TypeSales['paymentType'],
            'discountType': data.discountType as TypeSales['discountType'],
            'paymentMethod': data.paymentMethod as TypeSales['paymentMethod'] || null,
            'signFile': signFile || null,
            'observation': data.observation || '',
            items,
            status: TYPE_STATUS.finished.value, substatus: '',
            'installments': data.installments ? parseInt(data.installments) : null,
            'discount': data.discount ? data.discountType === 'cash' ? currencyToNumber(data.discount) : parseInt(data.discount) : null,
        }

        const result = !os._saleId ?
            await DB.sales.create({
                db,
                data: _data
            }) :
            await DB.sales.update({
                db,
                id: os._saleId,
                data: _data
            })
        const followup = CreateOsFollowup({ description: '', followup: os.followup, type: 'OsEnded', createdBy: { _id: user.user.uid, name: user.data.name } });
        const updateData = { followup, substatus: null, _saleId: os._saleId ? os._saleId : (result.id || ''), status: TYPE_STATUS.finished.value }
        setOs({ ...os, ...updateData })

        DB.os.update({
            db,
            id: os._id,
            data: updateData
        })

        if (result.status) {
            toast({
                duration: 4000,
                title: "Venda finalizada com sucesso",
                description: "A venda foi realizada com sucesso e a OS finalizada"
            })
        }
        setStatusLoading(false)
        setOpen(false)
        onOpenChange(false)
    }

    function getTotal({ products, discount, discountType }: { discountType: string, discount?: number | null, products: typeof items }) {
        if (!products) {
            return
        }
        const sum = products.reduce((prev, cur) => {
            return prev + (form.getValues().paymentType === 'cash' ? cur.cashPrice * cur.quantity : cur.installmentPrice * cur.quantity)
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

    function discountHandler(e: React.ChangeEvent<HTMLInputElement>) {
        form.setValue("discount", discountType === 'cash' ? formatCurrency(e.target.value) : formatNumber(e.target.value))
        getTotal({ products: items, discountType, discount: discountType === 'cash' ? currencyToNumber(formatCurrency(e.target.value)) : +formatNumber(e.target.value) })
    }

    function imageUploadHandler({ url, path }: { url: string, path: string }) {
        form.setValue('signFile', url)
        setSignFile({ url, path })

        if (id) {
            DB.sales.update({
                db,
                id,
                data: { signFile: { url, path } }
            })
        }
    }


    function removeProduct(item: typeof items[0]) {
        const _items = items.filter(product => product._id !== item._id)
        setItems(_items)
        if (!_items.length) form.setValue('product', '')
        getTotal({ products: _items, discount: form.getValues().discount ? Number(form.getValues().discount) : null, discountType: form.getValues().discountType || '' })

    }

    if (!store || !db) return

    return <Sheet open={open} onOpenChange={onOpenChange}>
        {statusLoading && <Loading />}
        <SheetContent>
            <SheetHeader>
                <SheetTitle>{os?._saleId ? 'Dados da venda' : 'Finalizar OS'}</SheetTitle>
                <SheetDescription>
                    {os?._saleId ? '' : 'Preencha os campos abaixo para finalizar a venda'}
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
                <div className="">
                    <Form {...formItem}>
                        <form onSubmit={formItem.handleSubmit(onSubmitItem)} className="pt-4">
                            <div className="flex gap-4">
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
                                                    <Input type="string" placeholder="Insira aqui" {...field} onChange={e => formItem.setValue('quantity', +e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Button type="submit" variant={'primary'} className="mt-8">Adicionar</Button>
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

                            <div className="flex gap-8 pt-4">
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
                                                            getTotal({ products: items, discount: form.getValues().discount ? Number(form.getValues().discount) : null, discountType: form.getValues().discountType || '' })
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



                            <div className="pb-6 mt-8">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b-4 border-gray-300">
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
                                            <th scope="col"
                                                className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Valor à prazo
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(!items || items.length === 0) && <tr>
                                            <td colSpan={4} className="text-center py-8">Nenhum item selecionado</td>
                                        </tr>}
                                        {items && items.map(item => <tr key={item._id} className='border-b border-gray-200'>
                                            <td className="whitespace-nowrap pl-2 py-4 text-sm font-semibold text-gray-900">
                                                {item.name}
                                            </td>
                                            <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                                                {item.quantity}
                                            </td>
                                            <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                                                {formatToBrazilianReal(item.cashPrice.toString())}
                                            </td>
                                            <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                                                {formatToBrazilianReal(item.installmentPrice.toString())}
                                            </td>
                                            <td>
                                                <span onClick={() => removeProduct(item)} className="material-symbols-outlined text-gray-400 hover:text-indigo-900 hidden lg:inline cursor-pointer">
                                                    delete
                                                </span>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                                {items && items.length > 0 && <div>
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
                                        {signFile && <img className="max-w-80" src={signFile.url} />}
                                    </div>
                                </div>
                                <SignUploader onCreate={imageUploadHandler} path={`sales/signatures`} />
                            </div>
                            <div className='py-6 flex justify-end gap-4'>


                                <Button type="submit" variant={'primary'}>Salvar</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

        </SheetContent>
    </Sheet>
}

export default OSSale