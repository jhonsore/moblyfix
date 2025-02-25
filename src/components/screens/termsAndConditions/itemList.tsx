import { Link } from "react-router";
import { TypeTermsAndConditionsViewList } from "../../../types/TermsAndConditions";
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

export function ItemList({ data }: { data: TypeTermsAndConditionsViewList }) {
    const { db } = useFirebaseContext()
    const { toast } = useToast()
    const [statusRemoved, setStatusRemoved] = useState(false)

    async function removeHandler() {
        const response = await DB.termsAndConditions.delete({ db, id: data._id })

        if (!response.status) {
            toast({
                variant: "destructive",
                title: "Remoção de Condição de serviços",
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

    return <tr key={data._id} className='border-b border-gray-200'>
        <td className="whitespace-nowrap py-4 pl-2 pr-2 text-sm text-gray-900 ">
            {data.title}
        </td>
        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium ">
            <Link to={`/dashboard/condicoes-de-servicos/${data._id}`}>
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