import { Link } from "react-router";
import { TypeUsersViewList } from "../../../types/Users";
import { ChevronRightIcon } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import { useToast } from "../../../hooks/use-toast";
import { useState } from "react";
import { Users } from "../../../functions/users";
import { useAuthContext } from "../../../providers/auth/useAuthContext";
import TYPE_OF_USERS from "../../../consts/TYPE_USERS";

export default function ItemList({ data }: { data: TypeUsersViewList }) {
    const { toast } = useToast()
    const [statusRemoved, setStatusRemoved] = useState(false)
    const { idToken } = useAuthContext()
    const [statusDeleting, setStatusDeleting] = useState(false)

    async function removeHandler() {
        if (!idToken) {
            alert('Impossível remover o item')
            return
        }
        setStatusDeleting(true)
        const response = await Users.delete(idToken, data._id);
        setStatusDeleting(false)
        if (!response.status) {
            toast({
                variant: "destructive",
                title: "Remoção de Usuário",
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

    return <tr key={data._id} className='lg:border-b border-gray-200'>
        <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b border-gray-200">
            <div className="flex justify-between">
                <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                    Nome
                </div>
                <div className="text-sm text-gray-900 p-4 lg:p-0">
                    {data.name}
                </div>
            </div>
        </td>
        <td className="whitespace-nowrap lg:px-2 lg:py-4 text-sm text-gray-900 block lg:table-cell p-0 border-b-4 border-gray-200 lg:border-none">
            <div className="flex justify-between">
                <div className="lg:hidden w-3/5 bg-gray-50 p-4 lg:p-0  text-left text-sm font-semibold text-gray-900 ">
                    Tipo
                </div>
                <div className="text-sm text-gray-900 p-4 lg:p-0">
                    {TYPE_OF_USERS?.[data.type]?.label || '-'}
                </div>
            </div>
        </td>
        <td className="whitespace-nowrap pl-3 text-center lg:text-right text-sm font-medium sm:pr-6 p-0">
            <Link to={`/dashboard/usuarios/${data._id}`}>
                <span className="material-symbols-outlined text-gray-400 hover:text-indigo-900 mr-2 hidden lg:inline">
                    edit
                </span>
                <span className="text-gray-400 hover:text-indigo-900 lg:hidden flex justify-center">
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
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
                        <AlertDialogCancel disabled={statusDeleting}>Cancelar</AlertDialogCancel>
                        <Button disabled={statusDeleting} onClick={removeHandler} variant={'destructive'}>
                            {!statusDeleting && <span>Remover</span>}
                            {statusDeleting && <span><svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </td>
    </tr>
}