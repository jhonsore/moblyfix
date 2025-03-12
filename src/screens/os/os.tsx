import { OsProvider } from "./provider/OsProvider"
import PageOsDetail from "./detail"

const PageOs = () => {
    return <>
        <OsProvider>
            <PageOsDetail />
        </OsProvider>
    </>
}

export default PageOs



