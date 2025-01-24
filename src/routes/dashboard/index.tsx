import { useEffect } from "react"
import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import TermsAndConditions from "../../functions/serviceConditions"
import { TypeTermsAndConditions } from "../../types/TermsAndConditions"

const Dashboard = () => {
    const { db } = useFirebaseContext()

    const submit = () => {
        TermsAndConditions.create({ db, data: { text: 'Este é um texto', _headquarterId: 'sqWu9UJpiqxmxLOq9AtH' } as TypeTermsAndConditions })
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