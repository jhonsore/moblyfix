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
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className=" flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="ml-4 flex items-center">
                <h3 className="text-lg leading-6 font-bold text-black mr-4">OS - 123456</h3>
                {transactions.map((transaction) => (
                  <div key={transaction.id} className=''>
                    <span className="inline-flex rounded-full bg-[#ffa60b28] px-3 text-xs font-semibold leading-5 text-[#FFA70B]">{transaction.id} </span>
                  </div>
                ))}
              </div>
              <div className="mr-2 flex-shrink-0 flex">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#EFF4FB] bg-[#D34053] hover:bg-[#3C50E0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0] mr-4"
                >
                  Cancelar OS
                </button>
                <button
                  type="button"
                  className="relative inline-flex items-center px-10 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3C50E0] hover:bg-[#D34053] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0]"
                >
                  Finalizar
                </button>
              </div>
            </div>
          </div>
          <main className='bg-[#F1F5F9]'>
            <div className='flex justify-end mt-5 mr-8'>
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
                className="relative inline-flex items-center px-6 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#EFF4FB] bg-[#F9983A] hover:bg-[#3C50E0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0]"
              >
                Iniciar análise técnica
              </button>
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
                  <div className="flex items-center py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0 mt-6 border-b border-gray-200">
                    <div className=" ">
                      <label htmlFor="Produto" className='text-sm mt-2'>
                        Posição na Colméia
                      </label>
                      <div className="relative mt-2">
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-24 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Digite aqui"
                          type="search"
                        />
                      </div>
                    </div>
                    <div className="ml-4 hidden lg:flex lg:items-center lg:justify-end mt-8">
                      <a
                        href="#"
                        className="inline-flex items-center px-6 py-2 border-transparent text-sm font-medium rounded-md shadow-sm text-[#3C50E0] bg-white border border-indigo-300  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-300 hover:text-white"
                      >
                        Salvar
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-5/12 mr-6 flex-1">
                      <label htmlFor="Produto" className='text-sm mt-2'>
                        Cliente
                      </label>
                      <div className="relative mt-2">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Nome do cliente"
                          type="search"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="ml-4 hidden lg:flex lg:items-center lg:justify-end mt-8">
                        <a
                          href="#"
                          className="inline-flex items-center px-6 py-2 border-transparent text-sm font-medium rounded-md shadow-sm text-[#3C50E0] bg-white border border-indigo-300  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-300 hover:text-white"
                        >
                          Visualizar dados
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex  items-center py-2 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div>
                      <label htmlFor="Produto" className='text-sm mt-2'>
                        Produto
                      </label>
                      <div className="relative mt-2">
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-96 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Digite aqui"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center py-2 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-5/12 mr-6 inline-block">
                      <label htmlFor="Produto" className='text-sm mt-2'>
                        Serial
                      </label>
                      <div className="relative mt-2">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Digite aqui"
                          type="search"
                        />
                      </div>
                    </div>
                    <div className="flex mt-8 mr-20">
                      <div className="flex items-center h-5">
                        <input
                          id="comments"
                          aria-describedby="comments-description"
                          name="comments"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="comments" className="font-medium text-gray-700">
                          Garantia
                        </label>
                      </div>
                    </div>
                    <div className="flex-1 items-center py-2 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                      <div className="">
                        <label htmlFor="Produto" className='text-sm mt-2'>
                          Data de abertura
                        </label>
                        <div className="relative mt-2">
                          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          </div>
                          <input
                            id="date"
                            name="search"
                            className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                            type="date"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 items-center py-2 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div>
                      <label htmlFor="Produto" className='text-sm mt-2'>
                        Acessórios
                      </label>
                      <div className="relative mt-2">

                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Digite aqui"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mt-4">
                      Observações
                    </label>
                    <div className="mt-2">
                      <textarea
                        placeholder='Digite aqui'
                        rows={4}
                        name="comment"
                        id="comment"
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        defaultValue={''}
                      />
                    </div>
                  </div>
                  <div className='pb-10'>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mt-4">
                      Relato do problema
                    </label>
                    <div className="mt-2">
                      <textarea
                        placeholder='Digite aqui'
                        rows={4}
                        name="comment"
                        id="comment"
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        defaultValue={''}
                      />
                    </div>
                    <div className="   mt-8">
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mt-4">
                        Assinatura do cliente
                      </label>
                      <div className="mt-2">
                        <textarea

                          rows={4}
                          name="comment"
                          id="comment"
                          className="block  bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          defaultValue={''}
                        />
                      </div>
                      <div className='flex items-center justify-between mt-4 mb-2'>
                        <h2>
                          Fotos do aparelho
                        </h2>
                      </div>
                      <div className='flex gap-4'>
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