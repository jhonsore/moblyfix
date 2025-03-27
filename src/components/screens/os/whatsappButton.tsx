import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import { Button } from "../../ui/button"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useOsContext } from "../../../screens/os/provider/useOsContext"
import { DB } from "../../../functions/database"
import { useFirebaseContext } from "../../../providers/firebase/useFirebaseContext"
import { TypeCustomers } from "../../../types/Customers"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import formatPhone from "../../../functions/utils/formatPhone"
import cleanValue from "../../../functions/utils/cleanValue"
import sendWhatsappMesage from "../../../functions/utils/sendWhatsappMessage"
import SETTINGS from "../../../consts/SETTINGS"

const FormSchema = z.object({
    whatsapp: z
        .string().min(1, {
            message: "Digite o whatsapp",
        }),
    message: z
        .string().min(1, {
            message: "Digite a mensagem",
        }),
})

const WhatsappButton = () => {
    const { os } = useOsContext()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            whatsapp: '',
            message: ''
        },
    })
    const { db } = useFirebaseContext()
    const [customer, setCustomer] = useState<TypeCustomers>()

    async function onOpenChange(status: boolean) {
        if (!status || customer) return
        if (!os?.customer._id) {
            alert('O cliente da OS não foi encontrado!')
            return
        }
        const resultCustomer = await DB.customers.read({ db, id: os.customer._id })
        if (!resultCustomer.status) {
            alert('Dados do cliente não encontrados!')
            return
        }
        setCustomer(resultCustomer.doc)
        if (resultCustomer.doc?.whatsapp) form.setValue("whatsapp", formatPhone(resultCustomer.doc?.whatsapp))
        const url = `https://${SETTINGS.host}/imprimir/os/entrada/${os._id}`
        form.setValue("message", `Aqui está o contrato da sua Ordem de serviço: ${url}`)
    }

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        sendWhatsappMesage({ phone: `55${cleanValue(values.whatsapp)}`, message: values.message })
    }

    return <Dialog onOpenChange={onOpenChange}>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <DialogTrigger asChild>
                        <span className='img-whts inline-block ' />
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Enviar OS por whatsapp</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Enviar OS por whatsapp</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
                    <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Whatsapp</FormLabel>
                                <FormControl>
                                    <Input placeholder="(xx) xxxxx-xxxx" {...field} onChange={(e) => form.setValue("whatsapp", formatPhone(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-3 pb-6">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mensagem</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Digite aqui" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="text-right">
                        <Button type="submit" variant={"outlinePrimary"}>Enviar</Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}

export default WhatsappButton