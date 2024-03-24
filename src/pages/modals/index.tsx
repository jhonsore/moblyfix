import { Fragment, useState } from 'react'
import { PlusSmIcon as PlusSmIconSolid, StarIcon } from '@heroicons/react/solid'

import { PlusSmIcon as PlusSmIconOutline, Bars2Icon as MenuAlt2Icon, XMarkIcon as XIcon, MagnifyingGlassIcon as SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'






const Modals = () => {



  return <div>



    <div className=" h-svh flex flex-col justify-center sm:px-6 lg:px-8 bg-[#F1F5F9]">

      <div className=" sm:mx-auto sm:w-full sm:max-w-md mt-7">
        <div className="bg-white  shadow sm:rounded-lg ">
          <div className='flex justify-end pt-2 pr-2'>
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-6 w-6 text-black " aria-hidden="true" />
            </button>
          </div>
          <div className='text-center'>

            <h1 className="font-bold text-3xl ">
              OS nº 000005 criada
            </h1>

            <p className='text-base'>
              O que deseja fazer agora?
            </p>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-7">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center py-2 border-transparent text-sm font-medium rounded-md text-[#3C50E0] bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
            >
              Imprimir
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center py-2 border-transparent text-sm font-medium rounded-md text-[#3C50E0] bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
            >
              Enviar whatsapp
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center py-2 border-transparent text-sm font-medium rounded-md text-[#3C50E0] bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
            >
              Nova OS
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center py-2 border-transparent text-sm font-medium rounded-md text-[#3C50E0] bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
            >
              Nova OS do mesmo cliente
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3 pb-4 ">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center  py-2 border-transparent text-sm font-medium rounded-md text-[#3C50E0] bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
            >
              Fechar
            </a>
          </div>



        </div>
      </div>
    </div>


  </div>
}
export default Modals