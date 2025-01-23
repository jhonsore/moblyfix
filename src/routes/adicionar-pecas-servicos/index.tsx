import { useForm } from "react-hook-form"
import PageContent from "../../components/layout/pageContent"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { XMarkIcon as XIcon, } from '@heroicons/react/24/solid'




const AdicionarPecasServicos = () => {
    const form = useForm()

    return <>
        <PageContent>
            <div className='flex justify-between items-center py-7'>
                <h1 className="font-bold text-xl ">
                    Adicionar peça/serviço
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
                <form onSubmit={() => { }} >
                    <div className="flex justify-betwee items-end pb-4">
                        <FormField
                            control={form.control}
                            name="search"
                            render={({ field }) => (
                                <FormItem className="flex-1 mr-10">
                                    <FormLabel>Peça/serviço</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome do cliente" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant={"outlinePrimary"}>Novo item</Button>
                    </div>
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Peça/serviço</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite o nome do cliente" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-2 gap-4 mt-4'>
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
                    <div className="flex justify-end gap-4 pt-6">
                        <Button variant={"outlinePrimary"}>Ver menos dados</Button>
                        <Button variant={"primary"}>Ver menos dados</Button>
                    </div>
                    <div >
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Produto</FormLabel>
                                    <FormControl className="w-2/12">
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

export default AdicionarPecasServicos