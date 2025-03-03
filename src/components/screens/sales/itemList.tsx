import { Link } from "react-router";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../../ui/button";
import { useFirebaseContext } from "../../../providers/firebase/useFirebaseContext";
import { DB } from "../../../functions/database";
import { useToast } from "@/hooks/use-toast"
import { useState } from "react";
import { TypeSalesViewList } from "../../../types/Sales";
import formatDate from "../../../functions/utils/formatDate";
import formatToBrazilianReal from "../../../functions/utils/formatToBrazilianReal";
import PAYMENT_TYPES from "../../../consts/PAYMENT_TYPES";

export function ItemList({ data }: { data: TypeSalesViewList }) {
    const { db } = useFirebaseContext()
    const { toast } = useToast()
    const [statusRemoved, setStatusRemoved] = useState(false)

    async function removeHandler() {
        const response = await DB.sales.delete({ db, id: data._id })

        if (!response.status) {
            toast({
                variant: "destructive",
                title: "Remoção de venda",
                description: "Ocorreu um erro ao remover o item, tente novamente!"
            })
            return
        }
        toast({
            description: "Item removido com sucesso",
        })
        setStatusRemoved(true)
    }


    if (statusRemoved) {
        return
    }

    return <tr key={data._id} className='lg:border-b border-gray-200 '>
        <td className="whitespace-nowrap lg:px-2 lg:pl-6 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
            <div className="flex justify-between">
                <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                    Nome
                </div>
                <div className="text-sm text-gray-900 p-4 lg:p-0">
                    {data.customer.name}
                </div>
            </div>
        </td>
        <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
            <div className="flex justify-between">
                <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                    Valor
                </div>
                <div className="text-sm text-gray-900 p-4 lg:p-0">
                    {formatToBrazilianReal(data.total)}
                </div>
            </div>
        </td>
        <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200 lg:border-none">
            <div className="flex justify-between">
                <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                    Pagamento
                </div>
                <div className="text-sm text-gray-900 p-4 lg:p-0">
                    {PAYMENT_TYPES[data.paymentType].label} {data.paymentMethod ? `(${data.paymentMethod})` : ''}
                </div>
            </div>
        </td>
        <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b-4 border-gray-200 lg:border-none">
            <div className="flex justify-between">
                <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                    Data
                </div>
                <div className="text-sm text-gray-900 p-4 lg:p-0">
                    {formatDate(data.createdAt.toDate())}
                </div>
            </div>
        </td>

        <td className=" whitespace-nowrap pl-3 text-center lg:text-right text-sm font-medium sm:pr-6">
            <Link to={`/dashboard/lojas/${data._id}`}>
                <span className="text-gray-400 hover:text-indigo-900 mr-2">
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                </span>
            </Link>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <span className="material-symbols-outlined text-gray-400 hover:text-red-500 cursor-pointer">
                        delete
                    </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você realmente quer remover esse item?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Ao clicar no botão "Remover" você apagará o item permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <Button onClick={removeHandler} variant={'destructive'}>Remover</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </td>
    </tr>

}