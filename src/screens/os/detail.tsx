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
import { Separator } from "@/components/ui/separator"

import { Badge } from "../../components/ui/badge"
import { useEffect, useState } from "react"
import OSDados from "./sections/dados"
import OSAnexos from "./sections/anexos"
import OSAcompanhamentos from "./sections/acompanhamentos"
import OSRelatosTecnicos from "./sections/relatosTecnicos"
import OSPecasServicos from "./sections/pecasServicos"
import { Label } from "../../components/ui/label"
import WhatsappButton from "../../components/screens/os/whatsappButton"
import { useOsContext } from "./provider/useOsContext"
import { LoadingPage } from "../../components/loadingPage"
import { ErrorPage } from "../../components/errorPage"
import { ItemNotFoundPage } from "../../components/itemNotFound"
import formatDate from "../../functions/utils/formatDate"
import getLabelByStatus from "../../functions/os/getLabelByStatus"
import TYPE_STATUS from "../../consts/TYPE_STATUS"
import TYPE_SUBSTATUS from "../../consts/TYPE_SUBSTATUS"
import { DB } from "../../functions/database"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import TYPE_OF_USERS from "../../consts/TYPE_USERS"
import { TypeUsersViewList } from "../../types/Users"
import CreateOsFollowup from "../../functions/os/followup"
import { useAuthContext } from "../../providers/auth/useAuthContext"
import OSSale from "./sections/sale"
import OS from "../../functions/os"
import { Loading } from "../../components/loading"
import { toast } from "../../hooks/use-toast"

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

const PageOsDetail = () => {
    const { os, pageStatus, setOs } = useOsContext()
    const { db } = useFirebaseContext()
    const { store } = useStoresContext()
    const [currentSection, setCurrentSection] = useState(0)
    const [technicalUsers, setTechnicalUsers] = useState<{ [id: string]: TypeUsersViewList }>({})
    const { user, idToken } = useAuthContext()
    const [finishStatus, setFinishStatus] = useState(false)
    const [statusLoading, setStatusLoading] = useState(false)

    useEffect(() => {
        async function load() {
            if (store && db) {
                const result = await DB.views.users.list({ db, wheres: [['_storeId', '==', store._id], ['type', '==', TYPE_OF_USERS.technical._id]] })
                if (result.status && result.docs) {
                    setTechnicalUsers(result.docs)
                }
            }
        }
        load()
    }, [store, db])

    const openSectionHandler = (index: number) => {
        setCurrentSection(index)
    }

    function responsavelTecnicoHandler(id: string) {
        if (!setOs || !id || !os || !user) return
        const responsibleTechnician = { name: technicalUsers[id].name, _id: id }
        DB.os.update({
            db,
            id: os?._id,
            data: { responsibleTechnician }
        })
        const followup = CreateOsFollowup({ description: responsibleTechnician.name, followup: os.followup, type: 'OsTechnicianChanged', createdBy: { _id: user.user.uid, name: user.data.name } });
        setOs({ ...os, responsibleTechnician, followup })

    }

    function updateStatusHandler() {
        if (!os || !setOs || !user) return
        let status = TYPE_STATUS.created.value as keyof typeof TYPE_STATUS
        let substatus = TYPE_SUBSTATUS.waitingForTechnicalAnalysis.value as keyof typeof TYPE_SUBSTATUS
        if (os.status === TYPE_STATUS.created.value && os.substatus === TYPE_SUBSTATUS.waitingForTechnicalAnalysis.value) {
            status = TYPE_STATUS.inService.value as keyof typeof TYPE_STATUS
            substatus = TYPE_SUBSTATUS.inTechnicalAnalysis.value as keyof typeof TYPE_SUBSTATUS
        }
        if (os.status === TYPE_STATUS.inService.value && os.substatus === TYPE_SUBSTATUS.inTechnicalAnalysis.value) {
            status = TYPE_STATUS.inService.value as keyof typeof TYPE_STATUS
            substatus = TYPE_SUBSTATUS.technicalAnalysisCompleted.value as keyof typeof TYPE_SUBSTATUS
        }
        if (os.status === TYPE_STATUS.inService.value && (os.substatus === TYPE_SUBSTATUS.technicalAnalysisCompleted.value)) {
            status = TYPE_STATUS.inService.value as keyof typeof TYPE_STATUS
            substatus = TYPE_SUBSTATUS.inRepair.value as keyof typeof TYPE_SUBSTATUS
        }
        if (os.status === TYPE_STATUS.inService.value && os.substatus === TYPE_SUBSTATUS.inRepair.value) {
            status = TYPE_STATUS.inService.value as keyof typeof TYPE_STATUS
            substatus = TYPE_SUBSTATUS.repairCompleted.value as keyof typeof TYPE_SUBSTATUS
        }
        const followup = CreateOsFollowup({ description: `${TYPE_STATUS[status].label} - ${TYPE_SUBSTATUS[substatus].label}`, followup: os.followup, type: 'OsStatusUpdate', createdBy: { _id: user.user.uid, name: user.data.name } });
        setOs({ ...os, status, substatus, followup })
        DB.os.update({
            db,
            id: os?._id,
            data: { status, substatus, followup }
        })

    }

    function finishHandler() {
        setFinishStatus(true)
    }

    function cancelHandler() {
        if (!os || !setOs || !user) return
        const followup = CreateOsFollowup({ followup: os.followup, type: 'OsCancelled', createdBy: { _id: user.user.uid, name: user.data.name } });

        setOs({ ...os, status: TYPE_STATUS.canceled.value, substatus: null, followup })
        DB.os.update({
            db,
            id: os?._id,
            data: { status: TYPE_STATUS.canceled.value, substatus: null }
        })
    }

    const buttonLabels = new Map<string, Map<string, string> | string>([
        [TYPE_STATUS.created.value, new Map([[TYPE_SUBSTATUS.waitingForTechnicalAnalysis.value, 'Iniciar análise técnica']])],
        [TYPE_STATUS.inService.value, new Map([
            [TYPE_SUBSTATUS.inTechnicalAnalysis.value, 'Finalizar análise técnica'],
            [TYPE_SUBSTATUS.technicalAnalysisCompleted.value, 'Iniciar reparo'],
            [TYPE_SUBSTATUS.inRepair.value, 'Finalizar reparo'],
            [TYPE_SUBSTATUS.repairCompleted.value, 'Reiniciar análise']
        ])],
        [TYPE_STATUS.finished.value, new Map([[TYPE_SUBSTATUS.repairCompleted.value, 'Reabrir OS']])],
        [TYPE_STATUS.canceled.value, new Map([[TYPE_SUBSTATUS.repairCompleted.value, 'Reabrir OS']])]
    ]);

    const getButtonLabel = () => {
        if (!os) return '';
        const statusLabel = buttonLabels.get(os.status);

        if (statusLabel instanceof Map) {
            return os.substatus ? statusLabel.get(os.substatus) : 'Reabrir OS';
        }
        return statusLabel || '';
    };

    const onOpenFinishModal = (open: boolean) => {
        setFinishStatus(open)
    }

    const sendOsByEmail = async () => {
        if (!idToken || !os) {
            return
        }
        setStatusLoading(true)
        try {
            await OS.sendOsByEmail(idToken, { osId: os._id });
            toast({
                duration: 4000,
                title: "Email enviado",
                description: "O email foi enviado com sucesso ao cliente"
            })
        } catch (error: unknown) {
            const _error = error as { response: { data: string } }
            toast({
                duration: 4000,
                variant: "destructive",
                title: "Email não enviado",
                description: _error?.response?.data || "Ocorreu um erro ao enviar o email, tente novamente mais tard."
            })
        }
        setStatusLoading(false)
    }

    // TODO: fazer deploy na firebase e criar url para ser enviado a msg de zap com url da os ao cliente

    if (pageStatus === 'loading') {
        return <LoadingPage />
    }

    if (!os) {
        return <ItemNotFoundPage />
    }

    if (pageStatus === 'error') {
        return <ErrorPage />
    }

    if (!store || !db) return <LoadingPage />

    return <>
        {statusLoading && <Loading />}
        <OSSale open={finishStatus} onOpenChange={onOpenFinishModal} />
        <HeaderPage title="OS - 123456">
            <div className="flex items-center gap-4">
                <Button variant={"orange"} onClick={updateStatusHandler}>
                    {getButtonLabel()}
                </Button>
                <Separator className="h-7" orientation="vertical" />

                {(os.status !== TYPE_STATUS.finished.value && os.status !== TYPE_STATUS.canceled.value) && <div className="flex items-center gap-4">
                    <Button onClick={cancelHandler} variant={"destructive"}>Cancelar </Button>
                </div>}
                <Button variant={"primary"} onClick={finishHandler}>{`${os.status === TYPE_STATUS.finished.value ? 'Dados da venda' : 'Finalizar'}`}</Button>
            </div>
        </HeaderPage>
        <div className="mb-6 ">
            <PageContent>
                <div className="py-4">
                    <div className="flex gap-4 items-center">
                        <div className="w-2/12">
                            <Label>Abertura:</Label>
                            <span className="block">{formatDate(os?.createdAt.toDate())}</span>
                        </div>
                        <div className="w-1/12 h-10">
                            <Separator orientation="vertical" />
                        </div>
                        <div className="w-2/12">
                            <Label>Aparelho</Label>
                            <span className="block">{os.product}</span>
                        </div>
                        <div className="w-1/12 h-10">
                            <Separator orientation="vertical" />
                        </div>
                        <div className="w-2/12">
                            <Label className="block">Status:</Label>
                            <Badge variant={getLabelByStatus(os.status)}>{TYPE_STATUS[os.status].label}</Badge>
                            {os.substatus && <span className="block text-[8px] text-gray-500">{TYPE_SUBSTATUS[os.substatus].label}</span>}
                        </div>
                        <div className="w-1/12 h-10">
                            <Separator orientation="vertical" />
                        </div>
                        <div className="w-3/12">
                            <Select onValueChange={responsavelTecnicoHandler} defaultValue={os?.responsibleTechnician?._id}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o responsável" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(technicalUsers) && Object.values(technicalUsers).map(item => <SelectItem key={item._id} value={item._id}>{item.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
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
                                    <button onClick={sendOsByEmail}>
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
                                    <a target="_blank" href={`/imprimir/os/entrada/${os._id}`}>
                                        <span className="material-symbols-outlined hover:text-blue-500">
                                            print
                                        </span>
                                    </a>
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

export default PageOsDetail



