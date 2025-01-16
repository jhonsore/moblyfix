import { Route, Routes } from "react-router"
import Login from "./login"
import RequireAuth from "../components/auth"
import Layout from "../components/layout"
import { lazy } from "react"
import Teste from '../pages/dashboard'

const Agendamentos = lazy(() => import('./agendamentos'))
const Dashboard = lazy(() => import('./dashboard'))
const Clientes = lazy(() => import('./clientes'))
const OrdensServicos = lazy(() => import('./os'))
const Usuarios = lazy(() => import('./usuarios'))
const Lojas = lazy(() => import('./lojas'))

const App = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<Dashboard />} />
            <Route path="agendamentos" element={<Agendamentos />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="ordens-servico" element={<OrdensServicos />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="lojas" element={<Lojas />} />

        </Route>
        <Route path="teste" element={<Teste />} />
    </Routes>
}
export default App