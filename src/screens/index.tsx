import { Route, Routes } from "react-router"
import Login from "./login"
import RequireAuth from "../components/auth"
import Layout from "../components/layout"
import { lazy } from "react"
import Components from './components'

const Dashboard = lazy(() => import('./dashboard'))
const CondicoesServicosPage = lazy(() => import('./condicoesServicos'))
const CondicoesPage = lazy(() => import('./condicoes'))

// ADMIN PAGES
const IntroPage = lazy(() => import('./admin/pages/intro'))
const NewHeadquarter = lazy(() => import("./admin/pages/newHeadquarter"))
const NewMaster = lazy(() => import("./admin/pages/newMaster"))

const App = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<Dashboard />} />
            <Route path="condicoes-de-servicos" element={<CondicoesServicosPage />} />
            <Route path="condicao-de-servico/:id" element={<CondicoesPage />} />
            <Route path="condicao-de-servico/novo" element={<CondicoesPage />} />
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