import PageContent from "../../components/layout/pageContent"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import HeaderPage from '@/components/headerPage'
import { useParams } from "react-router"


const DadosDaVenda = () => {
    const form = useForm()
    const { id } = useParams()
    return <>
        <PageContent>
            <HeaderPage title={id ? "Editar" : "Novo item"} />


            <Form {...form}>
                <form onSubmit={() => { }} className="pb-4 pt-4">
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
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