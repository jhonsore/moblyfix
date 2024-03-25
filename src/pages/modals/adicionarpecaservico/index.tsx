import { Fragment, useState } from 'react'
import { PlusSmIcon as PlusSmIconSolid, StarIcon } from '@heroicons/react/solid'

import { PlusSmIcon as PlusSmIconOutline, Bars2Icon as MenuAlt2Icon, XMarkIcon as XIcon, MagnifyingGlassIcon as SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'






const Modals = () => {



  return <div>



    <div className=" flex flex-col justify-center sm:px-6 lg:px-8 py-4 bg-[#F1F5F9]">

      <div className=" sm:mx-auto sm:w-full sm:max-w-3xl mt-7">
        <div className="bg-white  shadow sm:rounded-lg px-6 py-4">
          <div className='flex justify-end'>
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-4 w-4 text-black " aria-hidden="true" />
            </button>
          </div>
          <div>

            <h1 className="font-bold text-2xl ">
              Adicionar peça/serviço
            </h1>
          </div>
          <div className="pt-4 flex items-center">
            <div className='flex-1 mr-4'>
              <label htmlFor="text" className='text-sm mt-2'>
                Peça/serviço
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="text"
                  name="text"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Digite aqui"
                  type="text"
                />
              </div>
            </div>

            <div className=" lg:flex lg:items-center lg:justify-end mt-8">
              <a
                href="#"
                className=" inline-flex items-center justify-center py-2 px-8 text-sm font-medium rounded-md text-indigo-600 bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
              >
                Novo item
              </a>
            </div>
          </div>
          <div className='bg-[#F5F5F5] mt-4  rounded-lg p-6'>

            <label htmlFor="text" className='text-sm mt-2'>
              Peça/serviço
            </label>
            <div className=" mt-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              </div>
              <input
                id="text"
                name="text"
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Digite aqui"
                type="text"
              />
            </div>
            <div className='flex justify-between mt-4'>
              <div>
                <label htmlFor="text" className='text-sm mt-2'>
                  Venda à vista
                </label>
                <div className=" mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  </div>
                  <input
                    id="text"
                    name="text"
                    className="block w-80 bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Digite aqui"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="text" className='text-sm mt-2'>
                  Venda à prazo
                </label>
                <div className=" mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  </div>
                  <input
                    id="text"
                    name="text"
                    className="block w-80 bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Digite aqui"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-end mt-4'>
              <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4 ">
                <a
                  href="#"
                  className=" inline-flex items-center justify-center py-2 px-16 text-sm font-medium rounded-md text-indigo-600 bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
                >
                  Fechar
                </a>
              </div>
              <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4 ml-4">
                <a
                  href="#"
                  className=" inline-flex items-center justify-center py-2 px-12 text-sm font-medium rounded-md text-white bg-indigo-500 border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
                >
                  Adicionar
                </a>
              </div>
            </div>
          </div>

          <div className='mt-2'>
            <label htmlFor="number" className='text-sm '>
              Quantidade
            </label>
            <div className="relative mt-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              </div>
              <input
                id="number"
                name="number"
                className="block  bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Digite aqui"
                type="number"
              />
            </div>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4 pb-4">
            <a
              href="#"
              className="  items-center justify-center py-2 px-12 text-sm font-medium rounded-md text-white bg-indigo-500 border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
            >
              Salvar
            </a>
          </div>






        </div>
      </div>
    </div>


  </div>
}
export default Modals