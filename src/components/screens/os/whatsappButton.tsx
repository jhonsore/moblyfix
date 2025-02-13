import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import { Button } from "../../ui/button"
import { useForm } from "react-hook-form"
import { useState } from "react"

const WhatsappButton = () => {
    const form = useForm()
    const [typeSend, setTypeSend] = useState(0)
    return <Dialog>

        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <DialogTrigger asChild>
                        <button>
                            <span className='img-whts inline-block ' />
                        </button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Enviar whatsapp</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>O que deseja fazer agora?</DialogTitle>
            </DialogHeader>
            <div className="gap gap-4 flex flex-col">
                <Button onClick={() => setTypeSend(1)} variant={"primary"}>Enviar mensagem de texto</Button>
                <Button onClick={() => setTypeSend(2)} variant={'outlinePrimary'}>Enviar entrada por whatsapp</Button>
            </div>
            {typeSend === 1 && <Form {...form}>
                <form onSubmit={() => { }} className="">
                    <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Whatsapp</FormLabel>
                                <FormControl>
                                    <Input placeholder="(xx) xxxxx-xxxx" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-3 pb-6">
                        <FormLabel>Mensagem</FormLabel>
                        <Textarea placeholder="Digite a mensagem" />
                    </div>
                    <div className="text-right">
                        <Button variant={"outlinePrimary"}>Enviar</Button>
                    </div>
                </form>
            </Form>}
        </DialogContent>
    </Dialog>
}

export default WhatsappButton