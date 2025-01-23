import { XMarkIcon as XIcon, } from '@heroicons/react/24/solid'
import PageContent from "../../components/layout/pageContent"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"

const Condicoes = () => {
    const form = useForm()
    return <>
        <PageContent>
            <div className='flex justify-between items-center py-7'>
                <h1 className="font-bold text-xl ">
                    Condições
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
                                <FormLabel>Título da condição</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite aqui" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-2 pt-4">
                        <FormLabel>Condição</FormLabel>
                        <Textarea />
                    </div>
                    <FormField
                        control={form.control}
                        name="endereco"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Endereço</FormLabel>
                                <FormControl>
                                    <Input placeholder="End:" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <div className='py-6 flex justify-end'>
                <Button variant={'primary'}>Salvar</Button>
            </div>

        </PageContent>
    </>
}

export default Condicoes