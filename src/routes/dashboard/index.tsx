import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { useAuthContext } from "../../providers/auth/useAuthContext"
import ServiceConditions from "../../functions/serviceConditions"

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