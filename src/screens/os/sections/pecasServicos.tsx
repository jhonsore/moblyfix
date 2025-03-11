import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "../../../components/ui/button"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { useOsContext } from "../provider/useOsContext"
import SearchSelect from "../../../components/searchSelect"
import { DB } from "../../../functions/database"
import { useStoresContext } from "../../../providers/stores/useStoresContext"
import { useFirebaseContext } from "../../../providers/firebase/useFirebaseContext"
import { LoadingPage } from "../../../components/loadingPage"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "../../../hooks/use-toast"
import { useEffect, useState } from "react"
import { TypeOs } from "../../../types/Os"
import formatToBrazilianReal from "../../../functions/utils/formatToBrazilianReal"

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
const OSPecasServicos = () => {
    const { os, setOs } = useOsContext()
    const formItem = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            item: "",
            quantity: 1
        },
    })
    const { db } = useFirebaseContext()
    const { store } = useStoresContext()
    const [items, setItems] = useState<TypeOs['partsServicesProducts']>([])
    const [total, setTotal] = useState({ cash: 0, installment: 0 })
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!os || !os.partsServicesProducts) return
        setItems(os.partsServicesProducts)
        getTotal(os.partsServicesProducts)
    }, [os])

    async function onSubmitItem(values: z.infer<typeof FormSchema>) {
        if (!os || !setOs) {
            toast({
                duration: 4000,
                variant: "destructive",
                title: "Erro ao adicionar item",
                description: "Erro ao adicionar item, tente novamente (1005)"
            })
            return

        }
        const { item, quantity } = values

        const checkProduct = os?.partsServicesProducts?.filter(_item => _item._id === item)

        if (checkProduct && checkProduct.length > 0) {
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
        const items = os?.partsServicesProducts || []
        const products: typeof items = [...items, {
            quantity,
            _id: doc._id,
            name: doc.name,
            cashPrice: doc.cashPrice, // preço a vista
            installmentPrice: doc.installmentPrice, // preço a prazo
            costPrice: doc.costPrice, // preço de custo
            type: doc.type, // define se o item é um produto
        }]
        getTotal(products)
        formItem.clearErrors()
        setOpen(false)
        updateData(products)
    }

    function removeProduct(item: typeof items[0]) {
        const _items = items.filter(product => product._id !== item._id)
        getTotal(_items)
        updateData(_items)
        if (!_items.length) formItem.setValue('item', '')
    }

    async function updateData(products: typeof items) {
        if (!os || !setOs) return
        setOs({ ...os, partsServicesProducts: products })
        setItems(products)
        await DB.os.update({
            db,
            id: os._id,
            data: { partsServicesProducts: products }
        })
    }

    function getTotal(products: typeof items) {
        if (!os || !setOs) return
        const sum = products.reduce((prev, cur) => {
            return ({ cash: prev.cash + (cur.quantity * cur.cashPrice), installment: prev.installment + (cur.quantity * cur.installmentPrice) })
        }, { cash: 0, installment: 0 })
        setTotal(sum)

    }

    if (!os || !setOs) return <div>Erro ao carregar anexos</div>

    if (!store || !db) return <LoadingPage />


    return <div className="pt-8">
        <Dialog open={open} onOpenChange={value => setOpen(value)}>
            <div className="text-right">
                <DialogTrigger asChild>
                    <Button variant={"outlinePrimary"}>Adicionar  peça/serviço</Button>
                </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...formItem}>
                    <form onSubmit={formItem.handleSubmit(onSubmitItem)} >
                        <DialogHeader>
                            <DialogTitle>Adicionar peça/serviço</DialogTitle>
                            <DialogDescription>
                                Inclua peças/serviços a OS
                            </DialogDescription>
                        </DialogHeader>

                        <div className="pt-6">
                            <div className="mb-4">
                                <FormLabel>Peça/serviço/Produto</FormLabel>
                                <FormField
                                    control={formItem.control}
                                    name="item"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <SearchSelect onChange={e => field.onChange(e.value)} store={store} db={db} requisition={DB.views.partsServicesProducts.list} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="">
                                <FormLabel>Quantidade</FormLabel>
                                <FormField
                                    control={formItem.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>
                                                <Input type="string" placeholder="Insira aqui" {...field} onChange={e => formItem.setValue('quantity', +e.target.value)} />

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button className="mt-6" type="submit" variant={"primary"}>Adicionar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

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
                    {items.length === 0 && <tr>
                        <td colSpan={4} className="text-center py-8">Nenhum item selecionado</td>
                    </tr>}
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
                        <td>
                            <span onClick={() => removeProduct(item)} className="material-symbols-outlined text-gray-400 hover:text-indigo-900 hidden lg:inline cursor-pointer">
                                delete
                            </span>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            {items.length > 0 && <div>
                <div className="py-4 text-base font-bold text-gray-900 border-b border-gray-200 flex justify-between">
                    <h2>
                        Total à vista
                    </h2>
                    <span>
                        {formatToBrazilianReal(total.cash)}
                    </span>
                </div>
                <div className="py-4 text-base font-bold text-gray-900 border-b border-gray-200 flex justify-between">
                    <h2>
                        Total à prazo
                    </h2>
                    <span>
                        {formatToBrazilianReal(total.installment)}
                    </span>
                </div>
            </div>}
        </div>
    </div>


}

export default OSPecasServicos