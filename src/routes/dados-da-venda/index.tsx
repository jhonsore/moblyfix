import { XMarkIcon as XIcon, } from '@heroicons/react/24/solid'
import PageContent from "../../components/layout/pageContent"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"


const DadosDaVenda = () => {
    const form = useForm()
    return <>
        <PageContent>
            <div className='flex justify-between items-center py-7'>
                <h1 className="font-bold text-xl ">
                    Dados da Venda
                </h1>
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                >
                    <span className="sr-only">Close</span>
                    <XIcon className="w-5 text-black hover:text-gray-500 " aria-hidden="true" />
                </button>
            </div>
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