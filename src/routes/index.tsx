import { Outlet, Route, Routes } from "react-router"
import Login from "./login"
import RequireAuth from "../components/auth"
import Layout from "../components/layout"
import { lazy } from "react"
import Teste from '../pages/novaos'
import Components from './components'


const Agendamentos = lazy(() => import('./agendamentos'))
const Dashboard = lazy(() => import('./dashboard'))
const Clientes = lazy(() => import('./clientes'))
const OrdensServicos = lazy(() => import('./os'))

// ADMIN PAGES
const IntroPage = lazy(() => import('./admin/pages/intro'))
const NewHeadquarter = lazy(() => import("./admin/pages/newHeadquarter"))
const NewMaster = lazy(() => import("./admin/pages/newMaster"))

const App = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<Dashboard />} />
            <Route path="agendamentos" element={<Agendamentos />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="ordens-servico" element={<OrdensServicos />} />
        </Route>
        <Route path="teste" element={<Teste />} />
        <Route path="___components" element={<Components />} />

        <Route path="admin" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<IntroPage />} />
            <Route path="new-headquarter" element={<NewHeadquarter />} />
            <Route path="new-master" element={<NewMaster />} />
        </Route>
    </Routes>
}
export default App