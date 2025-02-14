import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"

export function ItemCreatedAlert({ open, confirmHandler, closeHandler, type }: { type: 'create' | 'update', open: boolean, confirmHandler: () => void, closeHandler: () => void }) {
  const [_open, setOpen] = useState(open)
  useEffect(() => {
    setOpen(open)
  }, [open])

  return (
    <AlertDialog open={_open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Item {`${type === 'create' ? 'criado' : 'atualizado'}`} com sucesso</AlertDialogTitle>
          <AlertDialogDescription>
            O que deseja fazer agora?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeHandler}>Fechar</AlertDialogCancel>
          <AlertDialogAction className="bg-blue-500 text-primary-foreground shadow hover:bg-blue-600" onClick={confirmHandler}>
            Criar novo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}