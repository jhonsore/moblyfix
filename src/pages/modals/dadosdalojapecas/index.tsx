import { Fragment, useState } from 'react'
import { PlusSmIcon as PlusSmIconSolid, StarIcon } from '@heroicons/react/solid'

import { PlusSmIcon as PlusSmIconOutline, Bars2Icon as MenuAlt2Icon, XMarkIcon as XIcon, MagnifyingGlassIcon as SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'



const Modals = () => {




  return <div>



    <div className=" flex flex-col justify-center sm:px-6 lg:px-8 bg-[#F1F5F9] py-8">
      <div className=" sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white  shadow sm:rounded-lg px-4 py-2">
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
          <div className=''>
            <h1 className="font-bold text-xl ">
              Dados do usuário
            </h1>
          </div>

          <div className="flex justify-between items-center py-2 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <div className=" flex-1">
              <label htmlFor="text" className='text-sm mt-2'>
              Peça/serviço
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="text"
                  name="pecas"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Digite aqui"
                  type="text"
                />
              </div>
            </div>
          </div>
          
          


          <div className='grid grid-cols-3 gap-4 mt-4'>
            
            
            
            <div className="">
              <label htmlFor="text" className='text-sm mt-2'>
              Preço de custo
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="text"
                  name="preco"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="R$"
                  type="text"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="text" className='text-sm mt-2'>
              Venda à vista
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="text"
                  name="preco"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="R$"
                  type="text"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="text" className='text-sm mt-2'>
              Venda à prazo
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="text"
                  name="preco"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="R$"
                  type="text"
                />
              </div>
            </div>
            
            
            
          </div>

          

          
          <div className='py-6 flex justify-end'>
            <button
              type="button"
              className=" inline-flex items-center px-14 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3C50E0] hover:bg-[#3c4fe05e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0]"
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