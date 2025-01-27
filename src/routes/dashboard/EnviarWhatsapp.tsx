
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"

import { Input } from "@/components/ui/input"

import { Textarea } from "../../components/ui/textarea"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"



const Dashboard = () => {
    const form = useForm()
    return <>

        <HeaderPage title="Dashboard" />
        <PageContent>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Salvar</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Atendimento iniciado</DialogTitle>
                            <DialogDescription className="pt-4 text-center text-black">
                                O que deseja fazer agora?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 px-14">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant={"primary"}>Enviar whatsapp</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Enviar whatsapp</DialogTitle>
                                        <DialogDescription className="pt-4 text-center text-black">
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...form}>
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
                                    </Form>
                                    <DialogFooter>

                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Button variant={"outlinePrimary"}>Fechar</Button>
                        </div>
                        <DialogFooter>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>




        </PageContent>
    </>
}
export default Dashboard