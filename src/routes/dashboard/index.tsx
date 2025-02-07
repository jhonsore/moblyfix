
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { useAuthContext } from "../../providers/auth/useAuthContext"
import ServiceConditions from "../../functions/serviceConditions"
import { Button } from "../../components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "../../components/ui/textarea"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"



const Dashboard = () => {
    const { db } = useFirebaseContext()
    const { claims } = useAuthContext()
    //TODO: criar método delete
    const submit = async () => {
        // const result = await ServiceConditions.create({ db, data: { title: 'este é o título', text: 'Este é um texto', _headquarterId: 'AQZLhFK5fw1kE4sRPUVj', _storeId: 'fy1rlAiFJeMeU6URevgK' } })
        // const result = await ServiceConditions.update({ db, data: { title: 'este é o título ', text: 'Este é um texto ' }, id: 'GHgCBUWtwlnDHaNAmF3N' })
        // const result = await ServiceConditions.read({ db, id: 'GHgCBUWtwlnDHaNAmF3N' })
        const result = await ServiceConditions.delete({ db, id: 'GHgCBUWtwlnDHaNAmF3N' })

        console.log(result)
    }

    const form = useForm()
    return <>

        <HeaderPage title="Dashboard" />
        <PageContent>
            aqui entra o dashboard

            <br /><br /><br />


            <button onClick={submit}>Submit</button>
        </PageContent>
    </>
}
export default Dashboard