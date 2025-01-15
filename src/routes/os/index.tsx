import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"

const OrdensServicos = () => {
    return <>
        <HeaderPage title="Ordens de serviço">
            <Button>Nova OS</Button>
        </HeaderPage>
        <PageContent>
            aqui entra o dashboard
        </PageContent>
    </>
}
export default OrdensServicos