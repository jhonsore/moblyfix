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
              Dados do cliente
            </h1>
          </div>

          <div className="flex justify-between items-center py-2 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <div className=" flex-1">
              <label htmlFor="text" className='text-sm mt-2'>
                Cliente
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

          <div className='grid grid-cols-3 gap-4'>
            <div className="">
              <label htmlFor="cpf" className='text-sm mt-2'>
                CPF/CNPJ
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  type="text"
                  pattern="d{3}\.\d{3}\.\d{3}-\d{2}"
                  id="cpf"
                  name="cpf"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="xxx.xxx.xxx-xx"

                />
              </div>
            </div>
            <div className="">
              <label htmlFor="email" className='text-sm mt-2'>
                Email
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="email"
                  name="email"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="xxx@xxx.com"
                  type="email"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="tel" className='text-sm mt-2'>
                Whatsapp
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="tel"
                  name="telefone"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="(xx) xxxxx-xxxx"
                  type="tel"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="tel" className='text-sm mt-2'>
                Contato 1
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="tel"
                  name="telefone"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="(xx) xxxxx-xxxx"
                  type="tel"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="tel" className='text-sm mt-2'>
                Contato 2
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="tel"
                  name="felefone"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="(xx) xxxxx-xxxx"
                  type="tel"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="tel" className='text-sm mt-2'>
                Contato 3
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="tel"
                  name="telefone"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="(xx) xxxxx-xxxx"
                  type="tel"
                />
              </div>
            </div>
            <div className="">

              <label htmlFor="estado" className='text-sm mt-2' >
                UF
              </label>

              <div className="mt-2">
                <select
                  name="estado"
                  id="estado"
                  autoComplete="estado"
                  className="py-1.5 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                >
                  <option></option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>


            </div>
            <div className="">
              <label htmlFor="cidade" className='text-sm mt-2'>
                Cidade
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="cidade"
                  name="cidade"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Digite aqui"
                  type="text"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="bairro" className='text-sm mt-2'>
                Bairro
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="bairro"
                  name="bairro"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Digite aqui"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className=" flex-1 mt-4">
            <label htmlFor="text" className='text-sm mt-2'>
              Endereço
            </label>
            <div className="relative mt-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              </div>
              <input
                id="text"
                name="cliente"
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="End:"
                type="text"
              />
            </div>
          </div>

          <div className='flex gap-2'>
            <div className=" mt-4 w-2/6">
              <label htmlFor="text" className='text-sm mt-2'>
                CEP
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>

                <input
                  id="CEP"
                  name="CEP"
                  required pattern="d{5}-\d{3}"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Cep"
                  type="text"
                />
              </div>
            </div>
            <div className=" w-1/5 mt-4">
              <label htmlFor="text" className='text-sm mt-2'>
                Nº
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="text"
                  name="cliente"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Numero"
                  type="text"
                />
              </div>
            </div>
            <div className=" flex-1 mt-4">
              <label htmlFor="text" className='text-sm mt-2'>
                Complemento
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                </div>
                <input
                  id="text"
                  name="cliente"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Complemento"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className='py-6 flex justify-end'>
            <button
              type="button"
              className=" inline-flex items-center px-8 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3C50E0] hover:bg-[#3c4fe05e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C50E0]"
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