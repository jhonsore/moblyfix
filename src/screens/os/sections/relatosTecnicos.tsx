import { MailIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Form, FormLabel } from "../../../components/ui/form"
import { Textarea } from "../../../components/ui/textarea"
import { useForm } from "react-hook-form"

const OSRelatosTecnicos = () => {
    const form = useForm()

    return <div className="pt-8">
        <Dialog>
            <DialogTrigger asChild>
                <div className="text-right">
                    <Button variant={"outlinePrimary"}>Adicionar relato técnico</Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Relato técnico</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={() => { }} className="">
                        <div className="pt-3 pb-6 space-y-2">
                            <FormLabel>Relato</FormLabel>
                            <Textarea placeholder="Digite a mensagem" />
                        </div>
                        <div className="text-right">
                            <Button variant={"outlinePrimary"}>Enviar</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
        <div className="mt-6">
            {
                [1, 2, 3, 4, 5].map(i => <div className="py-6 mb-4 px-4 bg-gray-50 border-b-4 border-gray-200">
                    <div className="flex justify-between items-center pb-4">
                        <span>
                            Jhonnatan
                        </span>
                        <span>
                            11/02/2025  15:00hs
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>
                            Relato
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