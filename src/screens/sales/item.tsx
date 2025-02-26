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
import SearchSelect from "../../components/seacrhSelect"
import { DB } from "../../functions/database"
import { LoadingPage } from "../../components/loadingPage"
import { useState } from "react"
import { TypePartsServicesProducts } from "../../types/PartsServicesProducts"
import { toast } from "../../hooks/use-toast"
import { Input } from "../../components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatCurrency } from "../../functions/utils/formatCurrency"
import formatToBrazilianReal from "../../functions/utils/formatToBrazilianReal"

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

const PageSales = () => {
    const formItem = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            item: "",
            quantity: 1

        },
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {


        },
    })
    const { db } = useFirebaseContext()
    const { store } = useStoresContext()
    const [items, setItems] = useState<{ quantity: number, _id: string, cashPrice: TypePartsServicesProducts['cashPrice'], costPrice: TypePartsServicesProducts['costPrice'], installmentPrice: TypePartsServicesProducts['installmentPrice'], name: TypePartsServicesProducts['name'], type: TypePartsServicesProducts['type'] }[]>([])

    async function onSubmitItem(values: z.infer<typeof FormSchema>) {
        const { item, quantity } = values
        const result = await DB.partsServicesProducts.read({ db, id: item })
        if (!result.status || !result.doc || !Object.values(result.doc).length) {
            toast({
                duration: 3000,
                title: "Item não encontrado",
                description: "A busca realizada não obteve nenhum resultado"
            })
            return
        }
        const doc = result.doc
        setItems([...items, {
            cashPrice: doc.cashPrice,
            costPrice: doc.costPrice,
            installmentPrice: doc.installmentPrice,
            name: doc.name,
            type: doc.type,
            quantity,
            _id: doc._id
        }])
    }

    if (!store || !db) return <LoadingPage />

    return <>
        <PageContent>
            <HeaderPage title="Nova Venda">
                <Button variant={"primary"}>Salvar</Button>

            </ HeaderPage>
            <Form {...formItem}>
                <form onSubmit={formItem.handleSubmit(onSubmitItem)} className="py-4">
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
                                            <Input type="number" placeholder="Insira aqui" {...field} onChange={e => formItem.setValue('quantity', +e.target.value)} />
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
                <form onSubmit={() => { }} className="py-4">
                    <div className="flex gap-8">
                        <div>
                            <Label>Selecione o tipo de pagamento</Label>
                            <RadioGroup name="paymentType" className="pt-4" defaultValue="cash">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cash" id="cash" />
                                    <Label htmlFor="cash">Pagamento a vista</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="installment" id="installment" />
                                    <Label htmlFor="installment">Pagamento a prazo</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="free" id="free" />
                                    <Label htmlFor="free">Serviço gratuito</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div>
                            <Label>Selecione o tipo de desconto</Label>
                            <RadioGroup name="discount" className=" pt-4" defaultValue="cash">
                                <div className="flex items-center space-x-2 pr-36">
                                    <RadioGroupItem value="cash" id="cash" />
                                    <Label htmlFor="cash">Dinheiro</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="percent" id="percent" />
                                    <Label htmlFor="percent">Porcentagem</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="my-8">
                        <Label>Parcelamento</Label>
                        <Select>
                            <div className=" py-1">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Parcelas" />
                                </SelectTrigger>
                            </div>
                            <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => <SelectItem key={`item-${value}`} value={value.toString()}>{value.toString()}x</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="pb-6">
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
                                        Valor a vista
                                    </th>
                                    <th scope="col"
                                        className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Valor a prazo
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => <tr key={item._id} className='border-b border-gray-200'>
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
                                </tr>)}
                            </tbody>
                        </table>
                        <div>
                            <div className="py-4 text-base font-bold text-gray-900 border-b border-gray-200 flex justify-between">
                                <h2>
                                    Total a prazo
                                </h2>
                                <span>
                                    R$ 00,00
                                </span>
                            </div>
                            <div className="py-4 text-base font-bold text-gray-900 border-b border-gray-200 flex justify-between">
                                <h2>
                                    Total a vista
                                </h2>
                                <span>
                                    R$ 00,00
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className=" pt-7 mb-2">
                            <Label>Observações</Label>
                        </div>
                        <Textarea />
                    </div>
                    <div>
                        <div className="border-b-2 w-full pt-20 mb-2">
                            <Label>Assinatura do cliente</Label>
                        </div>
                        <Button className="w-full" variant={"outlinePrimary"}>Adicionar assinatura</Button>
                    </div>


                </form>
            </Form>

        </PageContent >
    </>
}

export default PageSales