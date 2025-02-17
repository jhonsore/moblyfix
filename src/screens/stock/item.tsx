import { useForm } from "react-hook-form"
import PageContent from "../../components/layout/pageContent"
import HeaderPage from "@/components/headerPage"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"



const Stock = () => {
    const form = useForm()

    return <>
        <PageContent>
            <HeaderPage title="Nova item">
                <Button variant={"primary"}>Salvar</Button>
            </ HeaderPage>

            <Form {...form}>
                <form onSubmit={() => { }} className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <FormLabel>Produto</FormLabel>
                        <Select>
                            <SelectTrigger className="flex w-full text-left font-normal">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="item">item-1</SelectItem>
                                <SelectItem value="item">item-2</SelectItem>
                                <SelectItem value="item">item-3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantidade</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite aqui" {...field} />
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
                                <FormLabel>Itens por caixa</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite aqui" {...field} />
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
                                <FormLabel>Rendimento por unidade</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite aqui" {...field} />
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
                                <FormLabel>Consumido</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
                <div className="space-y-2 pb-6">
                    <div className=" pt-7">
                        <Label>Observações</Label>
                    </div>
                    <Textarea />
                </div>
            </Form>




        </PageContent >
    </>
}

export default Stock