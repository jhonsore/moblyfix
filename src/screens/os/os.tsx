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
        <OsProvider>
            <PageOsDetail />
        </OsProvider>
    </>
}

export default PageOs



