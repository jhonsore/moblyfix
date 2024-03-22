import { Fragment, useState } from 'react'
import { PlusSmIcon as PlusSmIconSolid, StarIcon } from '@heroicons/react/solid'
import { PlusSmIcon as PlusSmIconOutline, XIcon } from '@heroicons/react/outline'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'






const Modals = () => {



  return <div>



    <div className=" h-svh flex flex-col justify-center sm:px-6 lg:px-8 bg-[#F1F5F9]">

      <div className=" sm:mx-auto sm:w-full sm:max-w-md mt-7">
        <div className="bg-white  shadow sm:rounded-lg ">
          <div className='text-center pt-4'>
            <h1 className="font-bold text-3xl py-2 ">
              OS nº 000005 criada
            </h1>
            <p className='text-base'>
              O que deseja fazer agora?
            </p>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-7">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center py-2 border-transparent text-sm font-medium rounded-md text-[#3C50E0] bg-white border border-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-[#3c4fe01c]"
            >
              Imprimir
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center py-2 border-transparent text-sm font-medium rounded-md text-[#3C50E0] bg-white border border-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-[#3c4fe01c]"
            >
              Enviar whatsapp
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center py-2 border-transparent text-sm font-medium rounded-md text-[#3C50E0] bg-white border border-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-[#3c4fe01c]"
            >
              Nova OS
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center py-2 border-transparent text-sm font-medium rounded-md text-[#3C50E0] bg-white border border-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-[#3c4fe01c]"
            >
              Nova OS do mesmo cliente
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3 pb-4 ">
            <a
              href="#"
              className="ml-6 inline-flex items-center w-64 justify-center  py-2 border-transparent text-sm font-medium rounded-md text-[#3C50E0] bg-white border border-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-[#3c4fe01c]"
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