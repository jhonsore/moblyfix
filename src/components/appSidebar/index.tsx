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
import { User, UserCircle } from 'lucide-react'
import {
    AdjustmentsHorizontalIcon,
    ArrowRightStartOnRectangleIcon,
    CalendarIcon,
    ChartBarIcon,
    HomeIcon,
    UserGroupIcon,
    UsersIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { Link } from "react-router"


//https://ui.shadcn.com/docs/components/sidebar
const items = [
    { title: 'Dashboard', href: '', icon: ChartBarIcon, current: true },
    { title: 'Ordens de serviço', href: 'ordens-servicos', icon: AdjustmentsHorizontalIcon, current: false },
    { title: 'Clientes', href: 'clientes', icon: UserGroupIcon, current: false },
    { title: 'Usuários', href: 'usuarios', icon: UsersIcon, current: false },
    { title: 'Agendamentos', href: 'agendamentos', icon: CalendarIcon, current: false },
    { title: 'Lojas', href: 'lojas', icon: HomeIcon, current: false },
    { title: 'Técnicos', href: 'tecnicos', icon: User, current: false },
    { title: 'Atendentes', href: 'atendentes', icon: UserCircle, current: false },
    { title: 'Peças/Serviços', href: 'pecas-servicos', icon: WrenchScrewdriverIcon, current: false },
]

export function AppSidebar() {
    const { open } = useSidebar()
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
                            <div className="cursor-pointer">
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
