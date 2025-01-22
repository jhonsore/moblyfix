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


const tabs = [
    { name: 'Dados da OS', href: '/dashboard/ordem-servico/dados', current: true },
    { name: 'Anexos', href: '/dashboard/ordem-servico/anexos', current: false },
    { name: 'Relatos técnicos', href: '#', current: false },
    { name: 'Peças/Serviços', href: '#', current: false },
    { name: 'Acompanhamento', href: '/dashboard/ordem-servico/acompanhamento', current: false },

]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



const InicioReparo = () => {
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
                    <Button variant={"outlinePrimary"}>Adicionar relato técnico</Button>
                    <Button variant={"outlinePrimary"}>Adicionar  peça/serviço</Button>
                </div>
                <div className='flex justify-end items-center'>
                    <span className="text-sm text-gray-500 pr-3">Aberto em: 10/10/2024</span>
                    <Link to={'/dashboard/ordem-servico/finalizar-reparo'}>
                        <Button variant={"orange"}>Inicar reparo</Button>
                    </Link>
                </div>
            </div>
            <div className='border-b pt-7'>

                <div className="flex justify-between items-center">
                    <nav className="flex-1 gap-2 flex pr-8" aria-label="Tabs">
                        {tabs.map((tab, tabIdx) => (
                            <Link to={tab.href}>
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current ? ' bg-blue-600 hover:text-blue-600 border-x rounded-t-lg' : 'text-gray-500 hover:text-gray-700 border-x rounded-t-lg border-t',
                                    tabIdx === 0 ? '' : '',
                                    tabIdx === tabs.length - 1 ? 'rounded-t-lg' : '',
                                    'group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                <span>{tab.name}</span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        tab.current ? 'bg-indigo-500' : 'bg-transparent',
                                        'absolute inset-x-0 bottom-0 h-0.5'
                                    )}
                                />
                            </a>
                            </Link>
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
<div className="pb-10">

</div>
                       
        </PageContent>
    </>
}

export default InicioReparo



