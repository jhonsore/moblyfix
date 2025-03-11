import HeaderPage from "../../components/headerPage"
import { ImageUploader } from "../../components/imageUploader"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button";
import { DB } from "../../functions/database";
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext";
import { useStoresContext } from "../../providers/stores/useStoresContext";

const PageDashboard = () => {
    const { db } = useFirebaseContext()
    const { store } = useStoresContext()
    // const sendWhatsApp = async () => {
    //     if (!store) {
    //         return
    //     }
    //     try {
    //         const response = await DB.os.create({ data: { _headquarterId: store._headquarterId, _storeId: store._id, devices: [{ device: 'iphone' }] }, db })
    //         console.log(response)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    return <>
        <HeaderPage title="Dashboard" />
        <PageContent>
            aqui entra o dashboard
            <br /><br /><br />
            {/* <ImageUploader onUploaded={(url) => { alert(url) }} folder="stores/1/signature" title="Upload de imagem" />
            <Button onClick={() => { sendWhatsApp() }}>Enviar zap</Button> */}
        </PageContent>
    </>
}
export default PageDashboard