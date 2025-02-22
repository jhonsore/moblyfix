import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    AdjustmentsHorizontalIcon,
    ArrowRightStartOnRectangleIcon,
    CalendarIcon,
    // CalendarIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    HomeIcon,
    ListBulletIcon,
    UserGroupIcon,
    UsersIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { Link, useNavigate } from "react-router"
import { Users } from "../../functions/users"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { ChartArea } from "lucide-react"
import { useAuthContext } from "../../providers/auth/useAuthContext"
import TYPE_USERS from "../../consts/TYPE_USERS"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useStoresContext } from "../../providers/stores/useStoresContext"
import TYPE_OF_USERS from "../../consts/TYPE_USERS"

//https://ui.shadcn.com/docs/components/sidebar
const USERS = [
    { title: 'Dashboard', href: '', icon: ChartBarIcon, current: true },
    { title: 'Relatórios', href: 'relatorios', icon: ChartArea, current: true },
    { title: 'Ordens de serviço', href: 'ordens-servicos', icon: AdjustmentsHorizontalIcon, current: false },
    { title: 'Vendas', href: 'vendas', icon: CurrencyDollarIcon, current: false },
    { title: 'Clientes', href: 'clientes', icon: UserGroupIcon, current: false },
    { title: 'Usuários', href: 'usuarios', icon: UsersIcon, current: false },
    // { title: 'Agendamentos', href: 'agendamentos', icon: CalendarIcon, current: false },
    { title: 'Lojas', href: 'lojas', icon: HomeIcon, current: false },
    { title: 'Peças/Serviços/Produtos', href: 'pecas-servicos', icon: WrenchScrewdriverIcon, current: false },
    { title: 'Condições de serviço', href: 'condicoes-de-servicos', icon: ListBulletIcon, current: false },
    { title: 'Estoque', href: 'estoque', icon: ListBulletIcon, current: false },
]

const ADMIN = [
    { title: 'Dashboard', href: '', icon: ChartBarIcon, current: true },
    { title: 'Novo headquarter', href: 'new-headquarter', icon: ChartBarIcon },
    { title: 'Novo master', href: 'new-master', icon: ChartBarIcon },
    { title: 'Condições de Serviços', href: 'condicoes-de-servicos', icon: WrenchScrewdriverIcon, current: false },
]

export function AppSidebar() {
    const navigate = useNavigate()
    const { open } = useSidebar()
    const { auth } = useFirebaseContext()
    const { claims } = useAuthContext()
    const { stores, store, setStore } = useStoresContext()
    const items = claims?.type === TYPE_USERS.master ? ADMIN : USERS
    const showSelectStores = stores && claims && (claims.type === TYPE_OF_USERS.financial1._id || claims.type === TYPE_OF_USERS.admin._id) && store && Object.keys(stores).length

    function storeChangeHandler(storeId: string) {
        if (stores?.[storeId] && setStore && stores) {
            setStore(stores[storeId])
            navigate('/dashboard/')
        }
    }

    return (
        <Sidebar collapsible='icon' className="z-30">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center flex-shrink-0 px-2 my-4">
                            {open && <img
                                className="h-8 w-auto"
                                src="/img/logo-dash.svg"
                                alt="logo"
                            />}
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {showSelectStores && <Select defaultValue={store._id} onValueChange={storeChangeHandler}>
                                <SelectTrigger className="mb-4 bg-white text-black">
                                    <SelectValue placeholder="Selecione uma loja" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Object.values(stores).map(store => <SelectItem key={store._id} value={store._id}>{store.name}</SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>}
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.href}>
                                            <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>


            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <div className="cursor-pointer" onClick={() => Users.logout({ auth })}>
                                <ArrowRightStartOnRectangleIcon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" />
                                Sair
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

        </Sidebar>
    )
}
