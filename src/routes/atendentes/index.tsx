import { useForm } from "react-hook-form"
import PageContent from "../../components/layout/pageContent"
import HeaderPage from "@/components/headerPage"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"


const Atendentes = () => {
    const form = useForm()

    return <>
        <PageContent>
            <HeaderPage title="Finalizar venda">


            </ HeaderPage>
            <Form {...form}>
                <form onSubmit={() => { }} className="py-4">
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adicionar Peça/Serviço</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite aqui" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <div className=" pb-6">
                <table className=" w-full">
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
                                className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Qtd
                            </th>
                            <th scope="col"
                                className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                                Venda á vista R$ <br /> (débito/dinheiro)
                            </th>
                            <th scope="col"
                                className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                                Venda á prazo (R$)
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b border-gray-200'>
                            <td className="whitespace-nowrap pl-2 py-4 text-sm font-semibold text-gray-900">
                                Peça-1
                            </td>
                            <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                                20
                            </td>
                            <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                                R$: 20,00
                            </td>
                            <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                                R$: 30,00
                            </td>
                        </tr>
                        <tr className='border-b border-gray-200'>
                            <td className="whitespace-nowrap py-4 text-base font-bold text-gray-900">
                                Total á prazo
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                R$ 00,00
                            </td>
                        </tr>
                        <tr className='border-b border-gray-200'>
                            <td className="whitespace-nowrap py-4 text-base font-bold text-gray-900">
                                Total á prazo
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                R$ 00,00
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <Form {...form}>
                <form onSubmit={() => { }} className="py-4">
                    <Label>Selecione o tipo de desconto</Label>
                    <RadioGroup className="flex justify-evenly pt-4" defaultValue="option-one">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id="option-one" />
                            <Label htmlFor="option-one">Pagamento á vista</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="option-two" />
                            <Label htmlFor="option-two">Pagamento á prazo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-three" id="option-two" />
                            <Label htmlFor="option-two">Serviço gratuito</Label>
                        </div>
                    </RadioGroup>
                    <div className="my-14">
                        <Label>Parcelamento</Label>
                        <Select>
                            <div className=" border-y border-gray-200 py-1">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Parcelas" />
                                </SelectTrigger>
                            </div>
                            <SelectContent>
                                <SelectItem value="1">1 x</SelectItem>
                                <SelectItem value="2">2 x</SelectItem>
                                <SelectItem value="3">3 x</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Label>Selecione o tipo de desconto</Label>
                    <RadioGroup className="flex pt-4" defaultValue="option-one">
                        <div className="flex items-center space-x-2 pr-36">
                            <RadioGroupItem value="option-one" id="option-one" />
                            <Label htmlFor="option-one">Dinheiro</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="option-two" />
                            <Label htmlFor="option-two">Porcentagem</Label>
                        </div>

                    </RadioGroup>
                    <div>
                        <div className="border-b-2 w-full pt-20 mb-2">
                            <Label>Assinatura do cliente</Label>
                        </div>
                        <Button className="w-full" variant={"outlinePrimary"}>Adicionar assinatura</Button>
                    </div>
                    <div>
                        <div className=" pt-7 mb-2">
                            <Label>Observações</Label>
                        </div>
                        <Textarea />
                    </div>
                    
                </form>
            </Form>

        </PageContent >
    </>
}

export default Atendentes