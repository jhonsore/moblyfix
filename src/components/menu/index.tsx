import {
    AdjustmentsHorizontalIcon,
    CalendarIcon,
    ChartBarIcon,
    HomeIcon,
    UserGroupIcon,
    UsersIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import classNames from '../../utils/classnames'
import { Link } from 'react-router'
import { useLocation } from 'react-router'
import { User, UserCircle } from 'lucide-react'

const navigation = [
    { name: 'Dashboard', href: '', icon: ChartBarIcon, current: true },
    { name: 'Ordens de serviço', href: 'ordens-servico', icon: AdjustmentsHorizontalIcon, current: false },
    { name: 'Clientes', href: 'clientes', icon: UserGroupIcon, current: false },
    { name: 'Usuários', href: 'usuarios', icon: UsersIcon, current: false },
    { name: 'Agendamentos', href: 'agendamentos', icon: CalendarIcon, current: false },
    { name: 'Lojas', href: 'lojas', icon: HomeIcon, current: false },
    { name: 'Técnicos', href: 'tecnicos', icon: User, current: false },
    { name: 'Atendentes', href: 'atendentes', icon: UserCircle, current: false },
    { name: 'Peças/Serviços', href: 'pecas-servicos', icon: WrenchScrewdriverIcon, current: false },
]

const Menu = () => {
    const location = useLocation();
    const { pathname } = location;
    const currentUrl = pathname.replace('/dashboard', '').replace('/', '')

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
                        <Link to={item.href} key={item.name}>
                            <span
                                className={classNames(
                                    currentUrl === `${item.href}` ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                )}
                            >
                                <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                                {item.name}
                            </span>
                        </Link>
                    ))}
                    <Link to={'teste'} key={'teste'}>
                        <span

                            className={classNames(
                                'text-indigo-100 hover:bg-indigo-600',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                            )}
                        >
                            Teste
                        </span>
                    </Link>
                </nav>
            </div>
        </div>
    </div>
}

export default Menu