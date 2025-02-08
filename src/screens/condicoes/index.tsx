import { XMarkIcon as XIcon, } from '@heroicons/react/24/solid'
import PageContent from "../../components/layout/pageContent"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import HeaderPage from '@/components/headerPage'

const Condicoes = () => {
    const form = useForm()
    return <>
        <PageContent>
            <HeaderPage title="Condições">
            </HeaderPage>

            <Form {...form}>
                <form onSubmit={() => { }} className="py-4">
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
                </form>
            </Form>
            <div className='py-6 flex justify-end'>
                <Button variant={'primary'}>Salvar</Button>
            </div>

        </PageContent>
    </>
}

export default Condicoes