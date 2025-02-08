import { Route, Routes } from "react-router"
import Login from "./login"
import RequireAuth from "../components/auth"
import Layout from "../components/layout"
import { lazy } from "react"
import Components from './components'

const Dashboard = lazy(() => import('./dashboard'))
const PageCondicoesServicos = lazy(() => import('./termsAndConditions'))
const PageCondicoes = lazy(() => import('./termsAndConditions/item'))
const PageReports = lazy(() => import('./reports'))
const NovaOs = lazy(() => import('./novaos'))
const PagePartsServicesProducts = lazy(() => import('./partsServicesProducts'))
const DadosDaVenda = lazy(() => import('./dados-da-venda'))
const DadosDaLoja = lazy(() => import('./stores/item'))
const Lojas = lazy(() => import('./stores'))
const DadosDoUsuario = lazy(() => import('./usuarios/item'))
const Usuarios = lazy(() => import('./usuarios'))
const DadosDoCliente = lazy(() => import('./clientes/item'))
const Clientes = lazy(() => import('./clientes'))

// ADMIN PAGES
const IntroPage = lazy(() => import('./admin/pages/intro'))
const NewHeadquarter = lazy(() => import("./admin/pages/newHeadquarter"))
const NewMaster = lazy(() => import("./admin/pages/newMaster"))
const OrdensServicos = lazy(() => import('./os'))

const App = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<Dashboard />} />
            <Route path="condicoes-de-servicos" element={<PageCondicoesServicos />} />
            <Route path="condicoes-de-servicos/:id" element={<PageCondicoes />} />
            <Route path="condicoes-de-servicos/novo" element={<PageCondicoes />} />
            <Route path="relatorios" element={<PageReports />} />
            <Route path="ordens-servicos" element={<OrdensServicos />} />
            <Route path="ordem-servico/novo" element={<NovaOs />} />

            <Route path="pecas-servicos" element={<PagePartsServicesProducts />} />
            <Route path="pecas-servicos/novo" element={<DadosDaVenda />} />
            <Route path="pecas-servicos/:id" element={<DadosDaVenda />} />

            <Route path="lojas" element={<Lojas />} />
            <Route path="lojas/novo" element={<DadosDaLoja />} />
            <Route path="lojas/:id" element={<DadosDaLoja />} />

            <Route path="usuarios" element={<Usuarios />} />
            <Route path="usuarios/novo" element={<DadosDoUsuario />} />
            <Route path="usuarios/1" element={<DadosDoUsuario />} />

            <Route path="clientes" element={<Clientes />} />
            <Route path="clientes/novo" element={<DadosDoCliente />} />
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