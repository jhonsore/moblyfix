<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

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
    id: '1234567',
    company: 'Jhonnatan Soares Rebuli',
    share: '10/03/24',
    commission: '10/03/24',
    price: '10 dias',
    quantity: 'Iphone X',
    netAmount: 'Finalizado',
    netAmount2: 'Encerrado',
    netAmount3: 'Aguardando',
    netAmount4: 'Em atendimento',
    netAmount5: 'Retirada',
    netAmount6: 'Reparo',
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
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-bold text-black">Ordens de serviço</h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Novo item
                </button>
              </div>

            </div>
          </div>

          <main className='bg-[#F1F5F9] '>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between ">

                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                          placeholder="Digite o nome do cliente"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-4 hidden lg:flex lg:items-center lg:justify-end ">
                  <a
                    href="#"
                    className="inline-flex items-center px-6 py-2 text-base font-medium rounded-md shadow-sm text-indigo-500 bg-white border border-blue-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Busca avançada
                  </a>
                </div>
              </div>
            </div>
            <div className=" px-4 sm:px-6 lg:px-8">
              <div className=" mx-auto bg-white">
                <div className=" py-4 px-4">
                  <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 ">
                        CPF/CNPJ
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="cpf"
                          id="cpf"

                          className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="OS" className="block text-sm font-medium text-gray-700">
                        Nº da OS
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="OS"
                          id="OS"

                          className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Data de início
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="início"
                          id="date"
                          autoComplete="data"
                          className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="status-pedido" className="block text-sm font-medium text-gray-700">
                        Status do pedido
                      </label>
                      <div className="mt-2">
                        <select
                          type="text"
                          name="status-pedido"
                          id="status-pedido"
                          autoComplete="status"
                          className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                        >
                          <option></option>
                          <option>Recebido</option>
                          <option>Em Reparo</option>
                          <option>finalizado</option>
                          <option>Entregue</option>
                        </select>
                      </div>
                    </div>
                  </form>
                  <div className='flex gap-4 justify-end pt-3'>
                    <div className="">
                      <a
                        href="#"
                        className="ml-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-indigo-500 bg-white border border-indigo-500 hover:bg-indigo-500 hover:text-white"
                      >
                        Fechar
                      </a>
                    </div>
                    <div className="">
                      <button
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-white hover:text-indigo-500 hover:border-indigo-600  "
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className=" sm:px-1 lg:px-1">

              <div className="mt-4">
                <div className=" w-full">
                  <div className="py-2 align-middle md:px-4 lg:px-7">
                    <div className=" bg-white m-w-full py-6 px-4">
                      <table className=" w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Nº OS
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Cliente
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-2 py-4 text-left text-sm font-semibold text-gray-900"
                            >
                              Início
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Fim
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Atraso
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Aparelho
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Status
                            </th>
                            <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className=" bg-white">
                          {transactions.map((transaction) => (
                            <tr key={transaction.id} className='border-b border-gray-200'>
                              <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900 sm:pl-6">
                                {transaction.id}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                                {transaction.company}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.commission}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.price}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.quantity}</td>
                              <td className="inline-flex rounded-full bg-[#21965413] px-3 mt-4 text-xs font-semibold leading-5 text-[#219653]">{transaction.netAmount}</td>
                              <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                                  <span className="material-symbols-outlined">
                                    visibility
                                  </span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-indigo-900">
                                  <span className="material-symbols-outlined">
                                    delete
                                  </span><span className="sr-only">, {transaction.id}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tbody className=" bg-white">
                          {transactions.map((transaction) => (
                            <tr key={transaction.id} className='border-b border-gray-200'>
                              <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900 sm:pl-6">
                                {transaction.id}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                                {transaction.company}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.commission}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.price}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.quantity}</td>
                              <td className="inline-flex rounded-full bg-[#d3405321] px-3 mt-4 text-xs font-semibold leading-5 text-[#D34053]">{transaction.netAmount2}</td>
                              <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                                  <span className="material-symbols-outlined">
                                    visibility
                                  </span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-indigo-900">
                                  <span className="material-symbols-outlined">
                                    delete
                                  </span><span className="sr-only">, {transaction.id}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tbody className=" bg-white">
                          {transactions.map((transaction) => (
                            <tr key={transaction.id} className='border-b border-gray-200'>
                              <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900 sm:pl-6">
                                {transaction.id}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                                {transaction.company}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.commission}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.price}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.quantity}</td>
                              <td className="inline-flex rounded-full bg-[#ffa60b1e] px-3 mt-4 text-xs font-semibold leading-5 text-[#FFA70B]">{transaction.netAmount3}</td>
                              <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                                  <span className="material-symbols-outlined">
                                    visibility
                                  </span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-indigo-900">
                                  <span className="material-symbols-outlined">
                                    delete
                                  </span><span className="sr-only">, {transaction.id}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tbody className=" bg-white">
                          {transactions.map((transaction) => (
                            <tr key={transaction.id} className='border-b border-gray-200'>
                              <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900 sm:pl-6">
                                {transaction.id}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                                {transaction.company}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.commission}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.price}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.quantity}</td>

                              <td className="inline-flex rounded-full bg-[#3c4fe025] px-3 mt-4 text-xs font-semibold leading-5 text-indigo-500">{transaction.netAmount4}</td>
                              <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                                  <span className="material-symbols-outlined">
                                    visibility
                                  </span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-indigo-900">
                                  <span className="material-symbols-outlined">
                                    delete
                                  </span><span className="sr-only">, {transaction.id}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tbody className=" bg-white">
                          {transactions.map((transaction) => (
                            <tr key={transaction.id} className='border-b border-gray-200'>
                              <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900 sm:pl-6">
                                {transaction.id}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                                {transaction.company}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.commission}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.price}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.quantity}</td>

                              <td className="inline-flex rounded-full bg-[#541dab11] px-3 mt-4 text-xs font-semibold leading-5 text-[#531DAB]">{transaction.netAmount5}</td>
                              <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                                  <span className="material-symbols-outlined">
                                    visibility
                                  </span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-indigo-900">
                                  <span className="material-symbols-outlined">
                                    delete
                                  </span><span className="sr-only">, {transaction.id}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tbody className=" bg-white">
                          {transactions.map((transaction) => (
                            <tr key={transaction.id} className='border-b border-gray-200'>
                              <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900 sm:pl-6">
                                {transaction.id}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
                                {transaction.company}
                              </td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.share}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.commission}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.price}</td>
                              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{transaction.quantity}</td>

                              <td className="inline-flex rounded-full bg-[#d46b0854] px-3  mt-4 text-xs font-semibold leading-5 text-[#D46B08]">{transaction.netAmount6}</td>
                              <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-gray-400 hover:text-indigo-900 mr-2">
                                  <span className="material-symbols-outlined">
                                    visibility
                                  </span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-indigo-900">
                                  <span className="material-symbols-outlined">
                                    delete
                                  </span><span className="sr-only">, {transaction.id}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='px-10 py-4'>
              <button
                type="button"
                className="inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-500 focus:z-10 focus:outline-none focus:ring-1 hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="ml-3 inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500  focus:z-10 focus:outline-none focus:ring-1 hover:bg-indigo-500 hover:text-white "
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>






          </main>
        </div>
      </div>
    </>
  )
}