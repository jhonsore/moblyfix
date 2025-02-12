import HeaderPage from "@/components/headerPage"
import PageContent from "@/components/layout/pageContent"
import { Link } from "react-router"


const RelatosTecnicosPage = () => {

    return <>
        <HeaderPage title="Relatos Técnicos " />
        <PageContent>

            <div className="py-6 px-4 bg-gray-50 border-b-4 border-gray-200">
                <div className="flex justify-between items-center pb-4">
                    <span>
                        Jhonnatan
                    </span>
                    <span>
                        11/02/2025  15:00hs
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span>
                        Relato
                    </span>
                    <span>
                        <Link to={'/dashboard/ordem-servico/analise-tecnica'}>
                            <span className="text-orange-300 hover:text-indigo-900">
                                email
                            </span>
                        </Link>
                    </span>
                </div>
            </div>

        </PageContent>
    </>
}
export default RelatosTecnicosPage