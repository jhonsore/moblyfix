import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "../../../components/ui/button"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/ui/input"
import AsyncSelect from 'react-select/async';
import { StylesConfig } from 'react-select';

export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}


export const colourOptions: readonly ColourOption[] = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];

const colourStyles: StylesConfig<ColourOption> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', borderColor: '#e5e5e5' })
};
const OSPecasServicos = () => {
    const form = useForm()

    const filterColors = (inputValue: string) => {
        return colourOptions.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const promiseOptions = (inputValue: string) =>
        new Promise<ColourOption[]>((resolve) => {
            setTimeout(() => {
                resolve(filterColors(inputValue));
            }, 1000);
        });

    return <div className="pt-8">
        <Sheet>
            <div className="text-right">
                <SheetTrigger>
                    <Button variant={"outlinePrimary"}>Adicionar  peça/serviço</Button>
                </SheetTrigger>
            </div>
            <SheetContent className="w-96">
                <SheetHeader>
                    <SheetTitle>Adicionar peça/serviço</SheetTitle>
                    <SheetDescription>
                        Preencha o formulário abaixo e adicione peças/serviços/produtos a OS
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={() => { }} className="mt-6">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 ">
                                <FormLabel>Peça/serviço/produto</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="search"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <AsyncSelect className="w-full" styles={colourStyles} cacheOptions defaultOptions loadOptions={promiseOptions} />

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormLabel>Quantidade/estoque</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="number"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>
                                                <Input placeholder="Digite aqui" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4 mt-4'>
                            <div className="space-y-2">
                                <FormLabel>Preço de custo</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="number"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>
                                                <Input placeholder="R$" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormLabel>Venda à vista</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="number"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>
                                                <Input placeholder="R$" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormLabel>Venda à prazo</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="number"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>
                                                <Input placeholder="R$" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>


                        <SheetFooter className="mt-4">
                            <SheetClose asChild>
                                <Button type="submit" variant={"primary"}>Adicionar</Button>
                            </SheetClose>
                        </SheetFooter>

                    </form>
                </Form>
            </SheetContent>
        </Sheet>
        <div className="pb-6 mt-6">
            <table className="w-full">
                <thead className="bg-gray-50 border-b-4 border-gray-300">
                    <tr className="align-top">
                        <th
                            scope="col"
                            className="whitespace-nowrap pl-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                            Peça/Serviço
                        </th>
                        <th
                            scope="col"
                            className="whitespace-nowrap pr-8 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                            Qtd
                        </th>
                        <th scope="col"
                            className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                            Preço de custo
                        </th>
                        <th scope="col"
                            className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                            Venda á vista<br /> (débito/dinheiro)
                        </th>

                        <th colSpan={2}
                            className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                            Venda á prazo
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr className='border-b-4 border-gray-200'>
                        <td className="whitespace-nowrap pl-2 py-4 text-sm font-semibold text-gray-900">
                            Peça-1
                        </td>
                        <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                            1
                        </td>
                        <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                            R$1000,00
                        </td>
                        <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                            R$3000,00
                        </td>
                        <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                            R$2300,00
                        </td>
                        <td className="text-center">
                            <span className="material-symbols-outlined cursor-pointer text-red-400 hover:text-indigo-900 mr-2 text-sm">
                                x
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <div className="py-4 text-base font-bold text-gray-900 border-b border-gray-200 flex justify-between">
                    <h2>
                        Total á prazo
                    </h2>
                    <span>
                        R$ 00,00
                    </span>
                </div>
                <div className="py-4 text-base font-bold text-gray-900 border-b border-gray-200 flex justify-between">
                    <h2>
                        Total á vista
                    </h2>
                    <span>
                        R$ 00,00
                    </span>
                </div>
            </div>
        </div>
    </div>


}

export default OSPecasServicos