import { Fragment, useState } from 'react'
import { PlusSmIcon as PlusSmIconSolid, StarIcon } from '@heroicons/react/solid'

import { PlusSmIcon as PlusSmIconOutline, Bars2Icon as MenuAlt2Icon, XMarkIcon as XIcon, MagnifyingGlassIcon as SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'






const Modals = () => {



  return <div>



    <div className=" h-svh flex flex-col justify-center sm:px-6 lg:px-8 bg-[#F1F5F9]">

      <div className=" sm:mx-auto sm:w-full sm:max-w-3xl mt-7">
        <div className="bg-white  shadow sm:rounded-lg px-6 py-4 mx-4 max-[639px]:rounded-lg ">
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
            <h1 className="font-bold text-2xl max-[380px]:text-base">
              Motivo de reabertura de serviço
            </h1>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mt-4">
              Motivo
            </label>
            <div className="mt-2">
              <textarea
                placeholder='Digite a mensagem'
                rows={4}
                name="comment"
                id="comment"
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={''}
              />
            </div>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4 mt-8 pb-4">
            <a
              href="#"
              className=" inline-flex items-center justify-center py-2 px-8 text-sm font-medium rounded-md text-indigo-600 bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
            >
              Enviar
            </a>
          </div>






        </div>
      </div>
    </div>


  </div>
}
export default Modals