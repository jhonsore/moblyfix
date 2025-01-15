import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition, Switch } from '@headlessui/react'
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { Bars2Icon as MenuAlt2Icon, XMarkIcon as XIcon, MagnifyingGlassIcon as SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

const navigation = [
  { name: 'Ordens de serviço', href: '#', icon: InboxIcon, current: true },
  { name: 'OS em atraso', href: '#', icon: CalendarIcon, current: false },
  { name: 'Clientes', href: '#', icon: FolderIcon, current: false },
  { name: 'Usuários', href: '#', icon: UsersIcon, current: false },
  { name: 'Lojas', href: '#', icon: HomeIcon, current: false },
  { name: 'Técnicos', href: '#', icon: ChartBarIcon, current: false },
  { name: 'Atendentes', href: '#', icon: ChartBarIcon, current: false },
  { name: 'Peças/Serviços', href: '#', icon: ChartBarIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const tabs = [
  { name: 'Dados da OS', href: '#', current: false },
  { name: 'Anexos', href: '#', current: true },
  { name: 'Acompanhamento', href: '#', current: false },

]

const transactions = [
  {
    id: 'Aguardando atendimento',

  },
  // More transactions...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="./img/logo-dash.svg"
                    alt=""
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-indigo-500  text-white' : 'text-indigo-100 hover:bg-indigo-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="./img/logo-dash.svg"
                alt="Workflow"
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
        <div className="md:pl-64 flex flex-col flex-1">
          <div className=" px-4 sm:px-6 lg:px-8 bg-[#F1F5F9] pt-32">
            <div className=" mx-auto bg-white mt-6 h-svh">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div>
                  <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                    <div className='border-b border-[#EFF4FB]  pt-6 flex justify-between'>
                      <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6 pt-4">
                        <div className='border-b'>
                          <div className="sm:hidden">
                            <label htmlFor="tabs" className="sr-only">
                              Select a tab
                            </label>
                            <select
                              id="tabs"
                              name="tabs"
                              className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              defaultValue={tabs.find((tab) => tab.current).name}
                            >
                              {tabs.map((tab) => (
                                <option key={tab.name}>{tab.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex justify-betwee max-[639px]:block ">
                            <nav className="flex-1 flex max-w-lg" aria-label="Tabs">
                              {tabs.map((tab, tabIdx) => (
                                <a
                                  key={tab.name}
                                  href={tab.href}
                                  className={classNames(
                                    tab.current ? 'text-white active-page bg-blue-600 hover:text-blue-600  border-x mx-2 rounded-t-lg' : 'text-gray-500 hover:text-gray-700 border-x rounded-t-lg border-t',
                                    tabIdx === 0 ? '' : '',
                                    tabIdx === tabs.length - 1 ? 'rounded-t-lg' : '',
                                    'group relative min-w-0 flex-1 overflow-hidden bg-white py-3 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
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
                              ))}

                            </nav>
                            <div className='flex gap-3 text-gray-500 text-right max-[639px]:mt-6'>
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
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-4 pb-4  mt-8 border-b border-[#EFF4FB]'>
                  <div className='relative bg-img-add w-32 h-32'>
                    <button>
                      <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                        delete
                      </span>
                    </button>
                  </div>
                  <div className='relative bg-img-add w-32 h-32'>
                    <button>
                      <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                        delete
                      </span>
                    </button>
                  </div>
                  <div className='relative bg-img-add w-32 h-32'>
                    <button>
                      <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
                <div className='flex justify-end mt-4'>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-indigo-500 shadow-sm text-sm font-medium rounded-md text-indigo-500 bg-white hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Adicionar anexo
                  </button>
                </div>
              </div>
            </div>
          </div>



















        </div>
      </div>
    </>
  )
}