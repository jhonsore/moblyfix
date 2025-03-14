import { MailIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { Textarea } from "../../../components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useOsContext } from "../provider/useOsContext"
import { useFirebaseContext } from "../../../providers/firebase/useFirebaseContext"
import { TypeOs } from "../../../types/Os"
import { Timestamp } from "firebase/firestore"
import { useAuthContext } from "../../../providers/auth/useAuthContext"
import { DB } from "../../../functions/database"
import { EmptData } from "../../../components/emptyData"
import { format } from "date-fns"
import { useState } from "react"
import CreateOsFollowup from "../../../functions/os/followup"
import { toast } from "../../../hooks/use-toast"

const FormSchema = z.object({
    description: z.string().min(1, {
        message: "A descrição é obrigatória",
    }),
})

const OSRelatosTecnicos = () => {
    const { db } = useFirebaseContext()
    const { os, setOs } = useOsContext()
    const { user } = useAuthContext()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            description: "",
        },
    })
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    function onSubmit(data: z.infer<typeof FormSchema>) {

        if (!setOs || !os || !user) return

        const newTechnicalReports: TypeOs['technicalReports'][0] = {
            createdAt: Timestamp.now(),
            description: data.description,
            createdBy: {
                name: user.data.name || '',
                _id: user.user.uid
            }
        }

        const technicalReports = os.technicalReports ? [newTechnicalReports, ...os.technicalReports] : [newTechnicalReports]
        const followup = CreateOsFollowup({ followup: os.followup, description: newTechnicalReports.description, type: 'OsTechnicianAdded', createdBy: { _id: user.user.uid, name: user.data.name } });
        setLoading(true)
        const _data = { technicalReports, followup }
        DB.os.update({
            db,
            id: os._id,
            data: _data
        })
        setOs({ ...os, ..._data })
        setLoading(false)
        setOpen(false)
        form.reset()
        toast({
            duration: 4000,
            title: "Relato adicionado",
            description: "O relato foi inserido com sucesso"
        })
    }

    if (!os || !setOs) {
        return <div>Erro ao carregar os relatos</div>
    }

    return <div className="pt-8">
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <div className="flex justify-end">
                <DialogTrigger asChild>
                    <div className="">
                        <Button variant={"outlinePrimary"}>Adicionar relato técnico</Button>
                    </div>
                </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Relato técnico</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Relato</FormLabel>
                                    <FormControl>
                                        <Textarea className="w-full" placeholder="Insira o relato aqui" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button className="mt-4" variant={'primary'} type="submit">
                                {loading && <svg className="mr-2 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                {!loading ? "Salvar" : "Salvando"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
        <div className="mt-6">
            {(!os?.technicalReports || os?.technicalReports?.length === 0) && <EmptData />}
            {
                os?.technicalReports?.map(relato => <div key={relato.createdAt.toMillis().toString()} className="py-6 mb-4 px-4 bg-gray-50 border-b-4 border-gray-200">
                    <div className="flex justify-between items-center pb-4">
                        <span>
                            Jhonnatan
                        </span>
                        <span>
                            {format(relato.createdAt.toDate(), "dd/MM/yyyy hh:mm")}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>
                            {relato.description}
                        </span>
                        <span className="text-green-300 hover:text-indigo-900">
                            <MailIcon className="w-6" />
                        </span>
                    </div>
                </div>)
            }
        </div>
    </div>
}

export default OSRelatosTecnicos