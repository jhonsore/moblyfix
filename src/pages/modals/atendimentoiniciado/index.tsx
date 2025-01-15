import { Fragment, useState } from 'react'
import { PlusSmIcon as PlusSmIconSolid, StarIcon } from '@heroicons/react/solid'

import { PlusSmIcon as PlusSmIconOutline, Bars2Icon as MenuAlt2Icon, XMarkIcon as XIcon, MagnifyingGlassIcon as SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'






const Modals = () => {



  return <div>



    <div className=" h-svh sm:mx-auto flex flex-col justify-center sm:px-6 lg:px-8 bg-[#F1F5F9]">

      <div className=" sm:mx-auto sm:w-full sm:max-w-md mt-7">
        <div className="bg-white sm:mx-auto  shadow sm:rounded-lg mx-8 rounded-md">
          <div className='flex justify-end pt-2 pr-2'>
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-4 w-4 text-black " aria-hidden="true" />
            </button>
          </div>
          <div className='text-center'>
            <h1 className="font-bold text-2xl ">
              Atendimento iniciado
            </h1>
            <p className='text-sm'>
              O que deseja fazer agora?
            </p>
          </div>

          <div className="lg:flex flex sm:mx-auto justify-center lg:items-center lg:justify-center xl:col-span-4 mt-4">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center py-2 border-transparent text-sm font-medium rounded-md text-indigo-500 bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm active-page"
            >
              Enviar whatsapp
            </a>
          </div>
          <div className="flex justify-center lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3 pb-4">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center py-2  text-sm font-medium rounded-md text-indigo-600 bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
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