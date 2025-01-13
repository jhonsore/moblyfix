import { Route, Routes } from "react-router"
import Login from "./login"
import Clientes from "./clientes"
import RequireAuth from "../components/auth"
import Layout from "../components/layout"
import { lazy } from "react"

const Agendamentos = lazy(() => import('./agendamentos'))

const App = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Layout />}>
            <Route path="agendamentos" element={<RequireAuth><Agendamentos /></RequireAuth>} />
            <Route path="clientes" element={<RequireAuth><Clientes /></RequireAuth>} />
        </Route>
    </Routes>
}
export default App