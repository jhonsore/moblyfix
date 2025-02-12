import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { Link } from "react-router"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Badge } from "../../components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@headlessui/react"
import { JSX, useState } from "react"
import OSDados from "./sections/dados"
import OSAnexos from "./sections/anexos"
import OSAcompanhamentos from "./sections/acompanhamentos"
import OSRelatosTecnicos from "./sections/relatosTecnicos"
import OSPecasServicos from "./sections/pecasServicos"

const tabs = [
    { name: 'Dados da OS', href: 'about', current: true, section: <OSDados /> },
    { name: 'Anexos', href: 'attachments', current: false, section: <OSAnexos /> },
    { name: 'Relatos técnicos', href: 'technicalReport', current: false, section: <OSRelatosTecnicos /> },
    { name: 'Peças/Serviços', href: 'pices_services', current: false, section: <OSPecasServicos /> },
    { name: 'Acompanhamento', href: 'followup', current: false, section: <OSAcompanhamentos /> },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



const PageOs = () => {
    const form = useForm()
    const [currentSection, setCurrentSection] = useState(0)

    const openSectionHandler = (index: number) => {
        setCurrentSection(index)
    }

    return <>
        <HeaderPage title="OS - 123456">
            <Badge variant="cyan">Em atendimento</Badge>
            <div className="flex items-center gap-4">

                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Técnico responsável" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Jhonnatan</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant={"destructive"}>Cancelar </Button>
                <Button variant={"primary"}>Finalizar</Button>
            </div>
        </HeaderPage>
        <PageContent>
            <div className='flex justify-between items-center pt-7'>
                <div className='flex gap-4'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"outlinePrimary"}>Adicionar relato técnico</Button>
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
                            <DialogFooter>

                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Sheet>
                        <SheetTrigger>
                            <Button variant={"outlinePrimary"}>Adicionar  peça/serviço</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Adicionar peça/serviço</SheetTitle>
                                <SheetDescription>

                                    <Form {...form}>
                                        <form onSubmit={() => { }} >
                                            <div className="flex justify-betwee items-end pb-4 pt-6">
                                                <div className="space-y-2 flex-1 mr-10">
                                                    <FormLabel>Peça/serviço</FormLabel>
                                                    <FormField
                                                        control={form.control}
                                                        name="search"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl className="w-full">
                                                                    <Input placeholder="Digite aqui" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <Button variant={"outlinePrimary"}>Novo item</Button>
                                            </div>
                                            <div className="space-y-2">
                                                <FormLabel>Peça/serviço</FormLabel>
                                                <FormField
                                                    control={form.control}
                                                    name="search"
                                                    render={({ field }) => (
                                                        <FormItem>

                                                            <FormControl>
                                                                <Input placeholder="Digite aqui" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className='grid grid-cols-2 gap-4 mt-4'>
                                                <div className="space-y-2">
                                                    <FormLabel>Venda à vista</FormLabel>
                                                    <FormField
                                                        control={form.control}
                                                        name="number"
                                                        render={({ field }) => (
                                                            <FormItem>

                                                                <FormControl>
                                                                    <Input placeholder="R$" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <FormLabel>Venda à prazo</FormLabel>
                                                    <FormField
                                                        control={form.control}
                                                        name="number"
                                                        render={({ field }) => (
                                                            <FormItem>

                                                                <FormControl>
                                                                    <Input placeholder="R$" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-4 pt-6">
                                                <Button variant={"outlinePrimary"}>Fechar</Button>
                                                <Button variant={"primary"}>Adicionar</Button>
                                            </div>
                                            <div className="space-y-2">
                                                <FormLabel>Quantidade</FormLabel>
                                                <FormField
                                                    control={form.control}
                                                    name="number"
                                                    render={({ field }) => (
                                                        <FormItem>

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
                <div className='flex justify-end items-center'>
                    <span className="text-sm text-gray-500 pr-3">Aberto em: 10/10/2024</span>
                    <Link to={'/dashboard/ordem-servico/inicio-reparo'}>
                        <Button variant={"orange"}>Finalizar análise técnica</Button>
                    </Link>
                </div>
            </div>
            <div className='border-b pt-7'>

                <div className="flex justify-between items-center">
                    <nav className="flex-1 gap-2 flex pr-8" aria-label="Tabs">
                        {tabs.map((tab, tabIdx) => (
                            <button
                                key={tab.name}
                                className={classNames(
                                    currentSection === tabIdx ? ' bg-blue-600 hover:text-blue-600 border-x rounded-t-lg' : 'text-gray-500 hover:text-gray-700 border-x rounded-t-lg border-t',
                                    tabIdx === tabs.length - 1 ? 'rounded-t-lg' : '',
                                    'group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                                onClick={() => openSectionHandler(tabIdx)}
                            >
                                <span>{tab.name}</span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        currentSection === tabIdx ? 'bg-indigo-500' : 'bg-transparent',
                                        'absolute inset-x-0 bottom-0 h-0.5'
                                    )}
                                />
                            </button>
                        ))}
                    </nav>
                    <div className='flex gap-3 text-gray-500 text-right'>
                        <button>
                            <span className="material-symbols-outlined hover:text-blue-500">
                                attachment
                            </span>
                        </button>
                        <button>
                            <span className="material-symbols-outlined hover:text-blue-500">
                                mail
                            </span>
                        </button>
                        <button>
                            <span className="material-symbols-outlined hover:text-blue-500">
                                print
                            </span>
                        </button>
                        <button>
                            <span className='img-whts inline-block '>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="pb-10 px-4">
                {tabs[currentSection].section}
            </div>

        </PageContent>
    </>
}

export default PageOs



