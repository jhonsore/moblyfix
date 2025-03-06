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
import { TypeOsViewList } from "@/types/Os";
import { Badge } from "@/components/ui/badge";
import convertNumberOs from "../../../functions/os/convertOsNumber";
import formatDate from "../../../functions/utils/formatDate";
import TYPE_STATUS from "../../../consts/TYPE_STATUS";
import TYPE_SUBSTATUS from "../../../consts/TYPE_SUBSTATUS";
import getLabelByStatus from "../../../functions/os/getLabelByStatus";
import isLate from "../../../functions/os/isLate";

export function ItemList({ data }: { data: TypeOsViewList }) {
    const { db } = useFirebaseContext()
    const { toast } = useToast()
    const [statusRemoved, setStatusRemoved] = useState(false)


    async function removeHandler() {
        const response = await DB.os.delete({ db, id: data._id })

        if (!response.status) {
            toast({
                variant: "destructive",
                title: "Remoção da Os",
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

    const osLate = isLate(data.createdAt.toDate())

    return <tr key={data._id} className='border-b border-gray-200'>
        <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-gray-900 sm:pl-6">
            {convertNumberOs(data.numberOs)}
        </td>
        <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-gray-900">
            {data.customer.name}
        </td>
        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{data.product}</td>
        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{formatDate(data.createdAt.toDate())}</td>
        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{(data.finishedAt && formatDate(data.finishedAt.toDate())) || '-'}</td>
        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-900">{osLate.isLate ? <span className="text-red-500 font-bold">{osLate.dias} dia{osLate.dias > 1 ? 's' : ''}</span> : '-'}</td>

        <td>
            <div className="max-w-36">
                <Badge variant={getLabelByStatus(data.status)}>{TYPE_STATUS[data.status].label}</Badge>
                <span className="block text-[8px] text-gray-500">{TYPE_SUBSTATUS[data.substatus].label}</span>
            </div>
        </td>
        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <Link to={`/dashboard/ordens-servicos/${data._id}`}>
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