import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { z } from "zod"
import { Separator } from "@/components/ui/separator"

import { Badge } from "../../components/ui/badge"
import { useForm } from "react-hook-form"
import { useState } from "react"
import OSDados from "./sections/dados"
import OSAnexos from "./sections/anexos"
import OSAcompanhamentos from "./sections/acompanhamentos"
import OSRelatosTecnicos from "./sections/relatosTecnicos"
import OSPecasServicos from "./sections/pecasServicos"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "../../components/ui/label"
import WhatsappButton from "../../components/screens/os/whatsappButton"
import { OsProvider } from "./provider/OsProvider"
import { useOsContext } from "./provider/useOsContext"
import { LoadingPage } from "../../components/loadingPage"
import { ErrorPage } from "../../components/errorPage"
import PageOsDetail from "./detail"
import { ItemNotFoundPage } from "../../components/itemNotFound"

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

const FormSchema = z.object({
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
})

const PageOs = () => {
    return <>
        <HeaderPage title="OS - 123456">
            <div className="flex items-center gap-4">
                <Button variant={"orange"}>
                    Finalizar análise técnica
                    {/* Inicar reparo */}
                    {/* Finalizar reparo */}
                    {/* Reabrir reparo */}
                </Button>
                <Separator orientation="vertical" />
                <Button variant={"destructive"}>Cancelar </Button>
                <Button variant={"primary"}>Finalizar</Button>
            </div>
        </HeaderPage>
        <div className="mb-6 ">
            <PageContent>
                <div className="py-4">
                    <div className="flex gap-4 items-center">
                        <div className="w-2/12">
                            <Label>Abertura:</Label>
                            <span className="block">00/00/00</span>
                        </div>
                        <div className="w-1/12 h-10">
                            <Separator orientation="vertical" />
                        </div>
                        <div className="w-2/12">
                            <Label>Aparelho</Label>
                            <span className="block">Iphone x</span>
                        </div>
                        <div className="w-1/12 h-10">
                            <Separator orientation="vertical" />
                        </div>
                        <div className="w-2/12">
                            <Label className="block">Status:</Label>
                            <Badge variant={'lime'}>Venda realizada</Badge>
                        </div>
                        <div className="w-1/12 h-10">
                            <Separator orientation="vertical" />
                        </div>
                        <div className="w-3/12">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} >
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Técnico responsável:</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione o técnico responsável" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </PageContent>
        </div>
        <PageContent>
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
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <button>
                                        <span className="material-symbols-outlined hover:text-blue-500">
                                            attachment
                                        </span>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Inserir anexo</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <button>
                                        <span className="material-symbols-outlined hover:text-blue-500">
                                            mail
                                        </span>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Enviar entrada para o cliente por email</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <button>
                                        <span className="material-symbols-outlined hover:text-blue-500">
                                            print
                                        </span>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Imprimir entrada</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <WhatsappButton />

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



