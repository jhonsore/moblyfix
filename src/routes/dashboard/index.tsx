
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
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

            {/* <div>
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
                        <p>
                            O que deseja fazer agora?
                            </p>
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
                                        <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Button variant={"outlinePrimary"}>Fechar</Button>

                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div> */}

            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Salvar</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Motivo de reabertura de serviço</DialogTitle>
                            {/* <DialogDescription className="pt-4 text-center text-black">
                            O que deseja fazer agora?
                            </DialogDescription> */}
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={() => { }} className="">


                                <div className="pt-3 pb-6 space-y-2">
                                    <FormLabel>Motivo</FormLabel>
                                    <Textarea placeholder="Digite a mensagem" />
                                </div>
                                <div className="text-right">
                                    <Button variant={"outlinePrimary"}>Enviar</Button>
                                </div>
                            </form>
                        </Form>

                        {/* <p>
                            O que deseja fazer agora?
                            </p> */}
                        {/* <div className="grid gap-4 py-4 px-14">
                        
                        <Button variant={"primary"}>Enviar whatsapp</Button>
                        <Button variant={"outlinePrimary"}>Fechar</Button>
                        
                        </div> */}

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
                                <div className='flex justify-between items-center py-7'>
                                    <h1 className="font-bold text-xl ">
                                        Adicionar peça/serviço
                                    </h1>

                                </div>
                                <Form {...form}>
                                    <form onSubmit={() => { }} >
                                        <div className="flex justify-betwee items-end pb-4">
                                            <FormField
                                                control={form.control}
                                                name="search"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1 mr-10">
                                                        <FormLabel>Peça/serviço</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Digite aqui" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button variant={"outlinePrimary"}>Novo item</Button>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="search"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Peça/serviço</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Digite aqui" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className='grid grid-cols-2 gap-4 mt-4'>
                                            <FormField
                                                control={form.control}
                                                name="number"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Venda à vista</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="R$" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="number"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Venda à prazo</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="R$" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex justify-end gap-4 pt-6">
                                            <Button variant={"outlinePrimary"}>Fechar</Button>
                                            <Button variant={"primary"}>Adicionar</Button>
                                        </div>
                                        <div >
                                            <FormField
                                                control={form.control}
                                                name="number"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Quantidade</FormLabel>
                                                        <FormControl className="w-2/12">
                                                            <Input placeholder="Digite aqui" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </form>
                                </Form>
                                <div className='py-6 flex justify-end'>
                                    <Button variant={'primary'}>Salvar</Button>
                                </div>

                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </PageContent>
    </>
}
export default Dashboard