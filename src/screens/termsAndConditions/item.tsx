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
                                <FormLabel>Título da condição</FormLabel>
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
                                    <FormLabel>Texto da condição</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Digite aqui" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='py-6 flex justify-end gap-4'>
                        {id && <Button variant={'destructive'}>Deletar</Button>}
                        <Button type="submit" variant={'primary'}>Salvar</Button>
                    </div>
                </form>
            </Form>


        </PageContent>
    </>
}

export default PageTermAndCondition