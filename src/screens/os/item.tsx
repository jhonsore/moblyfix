import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import PageOsForm from "./item-form"
import { OsProvider } from "./provider/OsProvider"

const PageNewOs = () => {
  return <>
    <HeaderPage title="Nova OS"></HeaderPage>
    <PageContent>
      <OsProvider>
        <PageOsForm />
      </OsProvider>
    </PageContent>
  </>
}
export default PageNewOs