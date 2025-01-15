import { Fragment, useState } from 'react'
import { PlusSmIcon as PlusSmIconSolid, StarIcon } from '@heroicons/react/solid'

import { PlusSmIcon as PlusSmIconOutline, Bars2Icon as MenuAlt2Icon, XMarkIcon as XIcon, MagnifyingGlassIcon as SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'


const projects = [
  { id: 1, name: 'Placa mãe', hours: '1', rate: '2.500', price: '3.000' },
  // More projects...
]

const notificationMethods = [
  { id: 'Pagamento', title: 'pagamento á vista' },
  { id: 'Pagamento', title: 'pagamento á prazo' },
  { id: 'pagamento', title: 'Serviço gratuito' },



]

const sides = [
  { id: null, name: 'Dinheiro' },
  { id: 1, name: 'Porcentagem' },


]



const Modals = () => {

  return <div>
    <div className=" flex flex-col justify-center sm:px-6 lg:px-8 pb-14 bg-[#F1F5F9]">

      <div className=" sm:mx-auto sm:w-full sm:max-w-4xl mt-7">
        <div className="bg-white sm:rounded-lg mx-4 max-[639px]:rounded-lg">
          <div className='flex items-center shadow-md border-b border-transparent sw'>
            <h1 className="font-bold text-base m-auto pt-4 pb-2">
              Finalizar venda
            </h1>
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 pr-2 "
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-4 w-4 text-blue-600 " aria-hidden="true" />
            </button>
          </div>
          <div>
            <div className="flex items-center px-4 ">
              <div className=" flex-1 pt-4">
                <label htmlFor="text" className='text-sm font-medium mt-2'>
                  Adicionar Peça/Serviço
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  </div>
                  <input
                    id="text"
                    name="cliente"
                    className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Nome do cliente"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
              <table className="min-w-full ">
                <thead>
                  <tr className='border-b-4 border-gray-400'>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                    >
                      Peça/Serviço
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Qtd
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Venda á vista R$  <br />(débito/dinheiro)
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-3 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                    >
                      Venda á prazo (R$)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b-2 border-gray-200">
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                        <div className="font-medium text-gray-900">{project.name}</div>
                        <div className="mt-0.5 text-gray-500 sm:hidden">
                          {project.hours} hours at {project.rate}
                        </div>
                      </td>
                      <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">{project.hours}</td>
                      <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">{project.rate}</td>
                      <td className="py-4 pl-3 pr-4 text-center text-sm text-gray-500 sm:pr-6 md:pr-0">{project.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className='border-y border-gray-300'>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pl-6 pr-3 pt-6 pb-2 text-left  text-sm font-bold text-gray-900 sm:table-cell md:pl-0"
                    >
                      Total á Prazo
                    </th>
                    <th scope="row" className="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden ">
                      Subtotal
                    </th>
                    <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">3.000</td>
                  </tr>
                  <tr className='border-y border-gray-300'>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pl-6 pr-3 pt-4 pb-2 text-left text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                    >
                      Desconto
                    </th>
                    <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">
                      desconto
                    </th>
                    <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">500</td>
                  </tr>
                  <tr className='border-y border-gray-300'>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pl-6 pr-3 pt-4 pb-2 text-left text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
                    >
                      Total á vista
                    </th>
                    <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">
                      Total
                    </th>
                    <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                      2.500
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className='px-6 pt-8 sm:px-6 lg:px-8'>
            <div>
              <label className="text-sm font-medium text-gray-900">Selecione o método de pagamento</label>

              <fieldset className="mt-2">
                <legend className="sr-only">pagamento</legend>
                <div className="space-y-4 sm:flex gap-32 sm:gap-20 sm:items-center sm:space-y-0 sm:space-x-10">
                  {notificationMethods.map((notificationMethod) => (
                    <div key={notificationMethod.id} className="flex items-center">
                      <input
                        id={notificationMethod.id}
                        name="notification-method"
                        type="radio"
                        defaultChecked={notificationMethod.id === 'pagamento'}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                        {notificationMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className='mt-6 sm:px-6 lg:px-8'>
              <fieldset>
                <label className="text-sm font-medium text-gray-900">Selecione o tipo de desconto</label>
                <div className="space-y-4 sm:flex gap-32 sm:items-center sm:space-y-0 sm:space-x-10 mt-2  ">
                  {sides.map((side, sideIdx) => (
                    <div key={sideIdx} className="flex items-center">
                      <div className="min-w-0 flex-1 max-[639px]:flex-none text-sm">
                      </div>
                      <div className="ml-3 flex items-center h-5">
                        <input
                          id={`side-${side.id}`}
                          name="plan"
                          type="radio"
                          defaultChecked={side.id === null}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor={`side-${side.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                          {side.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
          <div className='py-14 px-6'>
            <h3 className='text-sm font-medium border-b border-gray-600'>
              Assinatura do Cliente
            </h3>
          </div>
          <div className="px-6 flex">
            <button
              type="button"
              className=" flex-1 items-center  py-2 border border-indigo-400 shadow-sm text-sm font-medium rounded-md text-indigo-300 bg-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Adicionar Assinatura
            </button>
          </div>
          <div className='px-6 pb-6'>
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
          <div className="px-6 flex pb-4">
            <button
              type="button"
              className=" flex-1 items-center  py-2 border border-indigo-400 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-300 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}
export default Modals