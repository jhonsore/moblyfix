import HeaderPage from "../../components/headerPage"
import { ImageUploader } from "../../components/imageUploader"
import PageContent from "../../components/layout/pageContent"


const PageDashboard = () => {

    return <>
        <HeaderPage title="Dashboard" />
        <PageContent>
            aqui entra o dashboard
            <br /><br /><br />
            <ImageUploader onUploaded={(url) => { alert(url) }} folder="stores/signature/1" title="Upload de imagem" />
        </PageContent>
    </>
}
export default PageDashboard