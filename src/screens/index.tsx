import { Route, Routes } from "react-router"
import Login from "./login"
import RequireAuth from "../components/auth"
import Layout from "../components/layout"
import { lazy } from "react"
import Components from './components'
import PrintLayout from "../components/print"

const Dashboard = lazy(() => import('./dashboard'))
const PageCondicoesServicos = lazy(() => import('./termsAndConditions'))
const PageCondicoes = lazy(() => import('./termsAndConditions/item'))
const PageReports = lazy(() => import('./reports'))
const NovaOs = lazy(() => import('./os/item'))
const PageOs = lazy(() => import('./os/os'))
const PagePartsServicesProducts = lazy(() => import('./partsServicesProducts'))
const DadosDaLoja = lazy(() => import('./stores/item'))
const Lojas = lazy(() => import('./stores'))
const DadosDoUsuario = lazy(() => import('./usuarios/item'))
const Usuarios = lazy(() => import('./usuarios'))
const DadosDoCliente = lazy(() => import('./clientes/item'))
const Clientes = lazy(() => import('./clientes'))
const Sales = lazy(() => import('./sales'))
const PartsServicesProductsItem = lazy(() => import('./partsServicesProducts/item'))
const Stock = lazy(() => import('./stock'))
const EstoqueItens = lazy(() => import('./stock/item'))
const DadosDaVenda = lazy(() => import('./sales/item'))
const Appointments = lazy(() => import('./appointments'))
const NewSchedule = lazy(() => import('./appointments/item'))
const OsEntrance = lazy(() => import('./print/osEntrance'))
const TechnicalAnalysis = lazy(() => import('./print/technicalAnalysis'))
const NewTechnicianReport = lazy(() => import('./print/newTechnicianReport'))
const TechnicalAnalysisCompleted = lazy(() => import('./print/technicalAnalysisCompleted'))

// ADMIN PAGES
const IntroPage = lazy(() => import('./admin/pages/intro'))
const NewHeadquarter = lazy(() => import("./admin/pages/newHeadquarter"))
const NewMaster = lazy(() => import("./admin/pages/newMaster"))
const OrdensServicos = lazy(() => import('./os'))

const App = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="imprimir" element={<PrintLayout />}>
            <Route path="os/entrada/:id" element={<OsEntrance />} />
            <Route path="os/analise-tecnica/:id" element={<TechnicalAnalysis />} />
            <Route path="os/nova-analise-tecnica/:id" element={<NewTechnicianReport />} />
            <Route path="os/analise-tecnica-finalizada/:id" element={<TechnicalAnalysisCompleted />} />
        </Route>

        <Route path="dashboard" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<Dashboard />} />
            <Route path="condicoes-de-servicos" element={<PageCondicoesServicos />} />
            <Route path="condicoes-de-servicos/:id" element={<PageCondicoes />} />
            <Route path="condicoes-de-servicos/novo" element={<PageCondicoes />} />
            <Route path="relatorios" element={<PageReports />} />

            <Route path="ordens-servicos" element={<OrdensServicos />} />
            <Route path="ordens-servicos/novo" element={<NovaOs />} />
            <Route path="ordens-servicos/:id" element={<PageOs />} />

            <Route path="pecas-servicos" element={<PagePartsServicesProducts />} />
            <Route path="pecas-servicos/novo" element={<PartsServicesProductsItem />} />
            <Route path="pecas-servicos/:id" element={<PartsServicesProductsItem />} />

            <Route path="lojas" element={<Lojas />} />
            <Route path="lojas/novo" element={<DadosDaLoja />} />
            <Route path="lojas/:id" element={<DadosDaLoja />} />

            <Route path="vendas" element={<Sales />} />
            <Route path="vendas/novo" element={<DadosDaVenda />} />
            <Route path="vendas/:id" element={<DadosDaVenda />} />

            <Route path="usuarios" element={<Usuarios />} />
            <Route path="usuarios/novo" element={<DadosDoUsuario />} />
            <Route path="usuarios/:id" element={<DadosDoUsuario />} />

            <Route path="agendamentos" element={<Appointments />} />
            <Route path="agendamentos/novo" element={<NewSchedule />} />
            <Route path="usuarios/:id" element={<DadosDoUsuario />} />

            <Route path="clientes" element={<Clientes />} />
            <Route path="clientes/novo" element={<DadosDoCliente />} />
            <Route path="clientes/:id" element={<DadosDoCliente />} />

            <Route path="estoque" element={<Stock />} />
            <Route path="estoque/item" element={<EstoqueItens />} />
            <Route path="clientes/1" element={<DadosDoCliente />} />

            <Route path="dados-da-venda" element={<DadosDaVenda />} />
        </Route>
        <Route path="___components" element={<Components />} />
        <Route path="admin" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<IntroPage />} />
            <Route path="new-headquarter" element={<NewHeadquarter />} />
            <Route path="new-master" element={<NewMaster />} />
        </Route>
    </Routes>
}
export default App