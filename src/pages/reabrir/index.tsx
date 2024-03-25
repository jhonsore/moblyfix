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

const transactions = [
  {
    id: 'Em atendimento',

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
                          item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
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
        <div className="md:pl-64 flex flex-col">
          <div className="bg-white px-4 py-2 border-b border-gray-200 sm:px-6">
            <div className=" flex items-center justify-between">
              <div className=" flex">
                <h3 className="text-lg leading-6 font-bold text-black mr-4">OS - 123456</h3>
                {transactions.map((transaction) => (
                  <div key={transaction.id} className=''>
                    <p className='text-xs text-gray-400'>Aberto em: 10/10/2024</p>
                    <span className="inline-flex items-center rounded-full bg-indigo-200 px-3 text-xs font-semibold leading-5 text-indigo-600">{transaction.id} </span>
                  </div>
                ))}
              </div>
              <div className='flex items-center'>
                <div className="mr-4 mt-">
                  <label className='text-xs' htmlFor="Tecnico responsavel">Técnico responsável</label>
                  <select
                    name="Tecnico responsavel"
                    id="Tecnico responsavel"
                    
                    autoComplete="status"
                    className=" py-1 px-10 block shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                  >
                    
                    <option>Jhonnatan</option>
                    <option>Gileson</option>
                  </select>
                </div>
                <div className="mr-2 mt-4">

                  <button
                    type="button"
                    className="  px-4 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#EFF4FB] bg-[#D34053] hover:bg-[#3C50E0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0] mr-4"
                  >
                    Cancelar
                  </button>
                  <button
                
                    type="button"
                    className=" px-10 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3C50E0] hover:bg-[#D34053] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0]"
                  >
                    Finalizar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <main className='bg-[#F1F5F9]'>

            <div className='flex justify-end mt-5 mx-8'>
              
              <div className='flex'>
                <div className="flex">
                  <label htmlFor="Produto" className='text-sm mt-2'>
                    Aberto em:
                  </label>
                  <div className="mr-6">
                    <input
                      id="date"
                      name="data-inicio"
                      className="block w-full bg-[#F1F5F9]  py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400   sm:text-sm"
                      type="date"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="  px-6 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#EFF4FB] bg-[#F9983A] hover:bg-[#3C50E0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0]"
                >
                  Finalizar reparo 
                </button>
              </div>
            </div>
            <div className=" px-4 sm:px-6 lg:px-8">
              <div className=" mx-auto bg-white mt-6 pb-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div>
                    <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                      <div className='border-b border-[#EFF4FB] pt-6 flex justify-between'>
                        <div className='flex gap-2'>
                          <button
                            type="button"
                            className="relative inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#64748B] bg-white active-page focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0]"
                          >
                            Dados da OS
                          </button>
                          <button
                            type="button"
                            className="relative inline-flex items-center px-10 py-2 border border-[#EFF4FB] shadow-sm text-sm font-medium rounded-md text-[#64748B] bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0]"
                          >
                            Anexos
                          </button>
                          <button
                            type="button"
                            className="relative inline-flex items-center px-6 py-2 border border-[#EFF4FB] shadow-sm text-sm font-medium rounded-md text-[#64748B] bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0]"
                          >
                            Relatos técnicos
                          </button>
                          <button
                            type="button"
                            className="relative inline-flex items-center px-6 py-2 border border-[#EFF4FB] shadow-sm text-sm font-medium rounded-md text-[#64748B] bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0]"
                          >
                            Peças/Serviços
                          </button>
                          <button
                            type="button"
                            className="relative inline-flex items-center px-6 py-2 border border-[#EFF4FB] shadow-sm text-sm font-medium rounded-md text-[#64748B] bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0]"
                          >
                            Acompanhamento
                          </button>
                          
                        </div>
                        <div className='flex gap-3 text-[#64748B]'>
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

          </main>
        </div>
      </div>
    </>
  )
}