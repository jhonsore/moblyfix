import PageContent from "../../components/layout/pageContent"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import HeaderPage from '@/components/headerPage'


const DadosDaVenda = () => {
    const form = useForm()
    return <>
        <PageContent>
            <HeaderPage title="Dados da Venda">
            </HeaderPage>

            <Form {...form}>
                <form onSubmit={() => { }} className="pb-4">
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Peça/serviço</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite aqui" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-3 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço de custo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="R$" {...field} />
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
                                    <FormLabel>Venda à vista</FormLabel>
                                    <FormControl>
                                        <Input placeholder="R$" {...field} />
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
                                    <FormLabel>Venda à prazo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="R$" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
            <div className='py-6 flex justify-end'>
                <Button variant={'primary'}>Salvar</Button>
            </div>

        </PageContent>
    </>
}

export default DadosDaVenda