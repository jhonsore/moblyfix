import { useForm } from "react-hook-form"
import PageContent from "../../components/layout/pageContent"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"

import { Button } from "../../components/ui/button"
import { XMarkIcon as XIcon, } from '@heroicons/react/24/solid'




const Atendentes = () => {
    const form = useForm()

    return <>
        <PageContent>

            

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
                                <XIcon className="h-4 w-4 text-black " aria-hidden="true" />
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
                                className="ml-6 inline-flex items-center w-64 justify-center py-2  text-sm font-medium rounded-md text-indigo-500 bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
                            >
                                Imprimir
                            </a>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3">
                            <a
                                href="#"
                                className="ml-6 inline-flex items-center w-64 justify-center py-2  text-sm font-medium rounded-md text-indigo-500 bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
                            >
                                Enviar whatsapp
                            </a>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3">
                            <a
                                href="#"
                                className="ml-6 inline-flex items-center w-64 justify-center py-2  text-sm font-medium rounded-md text-indigo-500 bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
                            >
                                Nova OS
                            </a>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3">
                            <a
                                href="#"
                                className="ml-6 inline-flex items-center w-64 justify-center py-2  text-sm font-medium rounded-md text-indigo-500 bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
                            >
                                Nova OS do mesmo cliente
                            </a>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:justify-center xl:col-span-4 mt-3 pb-4 ">
                            <a
                                href="#"
                                className="ml-6 inline-flex items-center w-64 justify-center  py-2  text-sm font-medium rounded-md text-indigo-500 bg-white border border-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-sm hover:bg-indigo-200"
                            >
                                Fechar
                            </a>
                        </div>



                    </div>
                </div>
            </div>


        



        <Form {...form}>
            <form onSubmit={() => { }} >
                <div className="flex justify-betwee items-end pb-4">
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="flex-1 mr-10">
                                <FormLabel>Peça/serviço</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite o nome do cliente" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant={"outlinePrimary"}>Novo item</Button>
                </div>
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Peça/serviço</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o nome do cliente" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='grid grid-cols-2 gap-4 mt-4'>
                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Venda à vista</FormLabel>
                                <FormControl>
                                    <Input placeholder="R$" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Venda à prazo</FormLabel>
                                <FormControl>
                                    <Input placeholder="R$" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Produto</FormLabel>
                                    <FormControl>
                                        <Input placeholder="R$" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                    {/* <div className="space-y-2">
                            <FormLabel>Data de abertura</FormLabel>
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "flex w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div> */}
                    {/* <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Horário</FormLabel>
                                    <FormControl>
                                        <Input type="time" placeholder="00:00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Garantia
                            </label>
                        </div> */}
                </div>
                <div className="flex justify-end gap-4 pt-6">
                    <Button variant={"outlinePrimary"}>Ver menos dados</Button>
                    <Button variant={"primary"}>Ver menos dados</Button>
                </div>
                <div >
                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Produto</FormLabel>
                                <FormControl className="w-2/12">
                                    <Input placeholder="R$" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* <div className="pt-5 space-y-2">
                        <FormLabel>Relato do problema</FormLabel>

                        <Textarea />
                        <div className="flex justify-end pt-6">
                            <Button variant={"ghost"}>Ver menos dados</Button>
                        </div>
                    </div> */}
                {/* <div className='grid grid-cols-3 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="telefone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contato 1</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="telefone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contato 2</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="telefone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contato 3</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(xx) xxxxx-xxxx" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-2">
                            <FormLabel>UF</FormLabel>
                            <Select>
                                <SelectTrigger className="flex w-full text-left font-normal">
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="AC">Acre</SelectItem>
                                    <SelectItem value="AL">Alagoas</SelectItem>
                                    <SelectItem value="AP">Amapá</SelectItem>
                                    <SelectItem value="AM">Amazonas</SelectItem>
                                    <SelectItem value="BA">Bahia</SelectItem>
                                    <SelectItem value="CE">Ceará</SelectItem>
                                    <SelectItem value="DF">Distrito Federal</SelectItem>
                                    <SelectItem value="ES">Espírito Santo</SelectItem>
                                    <SelectItem value="GO">Goiás</SelectItem>
                                    <SelectItem value="MA">Maranhão</SelectItem>
                                    <SelectItem value="MT">Mato Grosso</SelectItem>
                                    <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                                    <SelectItem value="MG">Minas Gerais</SelectItem>
                                    <SelectItem value="PA">Pará</SelectItem>
                                    <SelectItem value="PB">Paraíba</SelectItem>
                                    <SelectItem value="PR">Paraná</SelectItem>
                                    <SelectItem value="PE">Pernambuco</SelectItem>
                                    <SelectItem value="PI">Piauí</SelectItem>
                                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                                    <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                                    <SelectItem value="RO">Rondônia</SelectItem>
                                    <SelectItem value="RR">Roraima</SelectItem>
                                    <SelectItem value="SC">Santa Catarina</SelectItem>
                                    <SelectItem value="SP">São Paulo</SelectItem>
                                    <SelectItem value="SE">Sergipe</SelectItem>
                                    <SelectItem value="TO">Tocantins</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <FormField
                            control={form.control}
                            name="cidade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cidade</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bairro"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bairro</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div> */}
                {/* <FormField
                        control={form.control}
                        name="endereco"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Endereço</FormLabel>
                                <FormControl>
                                    <Input placeholder="End:" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                {/* <div className='grid grid-cols-3 gap-4 py-4'>
                        <FormField
                            control={form.control}
                            name="cep"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CEP</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nº</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="complemento"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Complemento</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div> */}
            </form>
        </Form>
        <div className='py-6 flex justify-end'>
            <Button variant={'primary'}>Salvar</Button>
        </div>

    </PageContent >
    </>
}

export default Atendentes