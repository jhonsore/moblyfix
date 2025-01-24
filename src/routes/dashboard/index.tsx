
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"


const Dashboard = () => {
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
                            <DialogTitle>OS nº 000005 criada</DialogTitle>
                            <DialogDescription className="pt-4 text-center text-black">
                            O que deseja fazer agora?
                            </DialogDescription>
                        </DialogHeader>
                        {/* <p>
                            O que deseja fazer agora?
                            </p> */}
                        <div className="grid gap-4 py-4 px-14">
                        <Button variant={"outlinePrimary"}>Imprimir</Button>
                        <Button variant={"outlinePrimary"}>Enviar whatsapp</Button>
                        <Button variant={"outlinePrimary"}>Nova OS</Button>
                        <Button variant={"outlinePrimary"}>Nova OS do mesmo cliente</Button>
                        <Button variant={"outlinePrimary"}>Iniciar análise técnica</Button>
                        </div>
                        {/* <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter> */}
                    </DialogContent>
                </Dialog>
            </div>
            <div className="pt-8">
            <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Dados do cliente</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
            </div>
        </PageContent>
    </>
}
export default Dashboard