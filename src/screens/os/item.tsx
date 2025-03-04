import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import PageOsForm from "./item-form"

const PageNewOs = () => {

  return <>
    <HeaderPage title="Nova OS"></HeaderPage>
    <PageContent>
      <PageOsForm />
    </PageContent>
  </>
}
export default PageNewOs