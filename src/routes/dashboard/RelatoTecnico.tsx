
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import { useForm } from "react-hook-form"
import { Form, FormLabel } from "../../components/ui/form"



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
                            <DialogTitle>Relato técnico</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={() => { }} className="">
                                <div className="pt-3 pb-6">
                                    <FormLabel>Relato</FormLabel>
                                    <Textarea placeholder="Digite a mensagem" />
                                </div>
                                <div className="text-right">
                                    <Button variant={"outlinePrimary"}>Enviar</Button>
                                </div>
                            </form>
                        </Form>
                        <DialogFooter>
                            {/* <Button type="submit">Save changes</Button> */}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            
        </PageContent>
    </>
}
export default Dashboard