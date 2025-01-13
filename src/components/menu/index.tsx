import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import classNames from '../../utils/classnames'

const navigation = [
    { name: 'Ordens de serviço', href: 'ordens-servico', icon: InboxIcon, current: true },
    { name: 'OS em atraso', href: 'ordens-atraso', icon: CalendarIcon, current: false },
    { name: 'Clientes', href: 'clientes', icon: FolderIcon, current: false },
    { name: 'Usuários', href: 'usuarios', icon: UsersIcon, current: false },
    { name: 'Lojas', href: 'lojas', icon: HomeIcon, current: false },
    { name: 'Técnicos', href: 'tecnicos', icon: ChartBarIcon, current: false },
    { name: 'Atendentes', href: 'atendentes', icon: ChartBarIcon, current: false },
    { name: 'Peças/Serviços', href: 'pecas-servicos', icon: ChartBarIcon, current: false },
]

const Menu = () => {
    return <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
                <img
                    className="h-8 w-auto"
                    src="/img/logo-dash.svg"
                    alt="logo"
                />
            </div>
            <div className="mt-5 flex-1 flex flex-col">
                <nav className="flex-1 px-2 pb-4 space-y-1">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                            )}
                        >
                            <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    </div>
}

export default Menu