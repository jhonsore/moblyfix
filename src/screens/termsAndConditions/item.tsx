import PageContent from "../../components/layout/pageContent"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import HeaderPage from '@/components/headerPage'
import { useNavigate, useParams } from "react-router"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { DB } from "../../functions/database"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import { StoreNotFoundAlert } from "../../components/storeNotFoundAlert"
import { useEffect, useState } from "react"
import { ItemCreatedAlert } from "../../components/itemCreatedAlert"
import { TypePageStatus } from "../../types/PageStatus"
import { LoadingPage } from "../../components/loadingPage"
import { ErrorPage } from "../../components/errorPage"
import { Loading } from "../../components/loading"
import { useToast } from "@/hooks/use-toast"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import MandatoryLabel from "../../components/ui/mandatoryLabel"


const FormSchema = z.object({
    title: z
        .string().min(1, {
            message: "Preencha o título da Condição",
        }),
    text: z
        .string().min(1, {
            message: "Preencha o texto da Condição",
        }),
})

const PageTermAndCondition = () => {
    const { db } = useFirebaseContext()
    const { store } = useStoresContext()
    const { toast } = useToast()
    const [statusDeleting, setStatusDeleting] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            text: ""
        },
    })
    const { id } = useParams()
    const [statusStore, setStatusStore] = useState(false)
    const [statusCreated, setStatusCreated] = useState(false)
    const [pageStatus, setPageStatus] = useState<TypePageStatus>(id ? 'loading' : 'success')
    const navigate = useNavigate()
    const [statusLoading, setStatusLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        const load = async () => {
            const result = await DB.termsAndConditions.read({ db, id })
            let status: typeof pageStatus = 'success'
            if (!result.status) {
                status = 'error'
                return
            }

            setPageStatus(status)
            const { doc } = result
            if (doc) {
                form.setValue('text', doc.text)
                form.setValue('title', doc.title)
            }
        }
        load()
    }, [id])

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        if (!store) {
            setStatusStore(true)
            return
        }
        setStatusLoading(true)
        const { title, text } = values
        const result = !id ?
            await DB.termsAndConditions.create({
                db,
                data: { title, text, _headquarterId: store._headquarterId, _storeId: store._id }
            }) :
            await DB.termsAndConditions.update({
                db,
                id,
                data: { title, text }
            })
        if (result.status) {
            setStatusCreated(true)
        }
        setStatusLoading(false)
    }

    const onCreateHandler = () => {
        setStatusCreated(false)
        form.reset()
        if (id) navigate('/dashboard/condicoes-de-servicos/novo')

    }

    async function removeHandler() {
        if (!id) return
        const response = await DB.termsAndConditions.delete({ db, id: id })

        if (!response.status) {
            toast({
                variant: "destructive",
                title: "Remoção de peças,serviços ou produtos",
                description: "Ocorreu um erro ao remover o item, tente novamente!"
            })
            return
        }
        toast({
            description: "Item removido com sucesso",
        })
        setStatusDeleting(true)
        navigate(`/dashboard/condicoes-de-servicos/?deleted=${id}`)

    }

    if (pageStatus === 'loading') {
        return <LoadingPage />
    }

    if (pageStatus === 'error') {
        return <ErrorPage />
    }

    return <>
        <PageContent>
            <HeaderPage title={id ? "Editar" : "Novo item"}></HeaderPage>
            {statusLoading && <Loading />}
            <StoreNotFoundAlert open={statusStore} />
            <ItemCreatedAlert type={id ? 'update' : 'create'} open={statusCreated} closeHandler={() => setStatusCreated(false)} confirmHandler={onCreateHandler} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título da condição<MandatoryLabel /></FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite aqui" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-2 pt-4">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Texto da condição <MandatoryLabel /></FormLabel>
                                    <FormControl>
                                        <Textarea rows={20} placeholder="Digite aqui" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='py-6 flex justify-end gap-4'>
                        {
                            id &&
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant={'destructive'}>Deletar</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Você realmente quer remover esse item?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta ação não pode ser desfeita. Ao clicar no botão "Remover" você apagará o item permanentemente.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <Button disabled={statusDeleting} onClick={removeHandler} variant={'destructive'}>
                                            {!statusDeleting && <span>Remover</span>}
                                            {statusDeleting && <span><svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>}
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        }
                        <Button type="submit" variant={'primary'}>Salvar</Button>
                    </div>
                </form>
            </Form>


        </PageContent>
    </>
}

export default PageTermAndCondition