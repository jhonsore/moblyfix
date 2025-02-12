import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"


const PageDashboard = () => {

    return <>
        <HeaderPage title="Dashboard" />
        <PageContent>
            <HeaderPage title="Finalizar venda">
                <Button variant={"primary"}>Salvar</Button>
            </ HeaderPage>
            aqui entra o dashboard
            <br /><br /><br />
        </PageContent>
    </>
}
export default PageDashboard