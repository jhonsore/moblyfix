import { Route, Routes } from "react-router"
import Login from "./login"
import RequireAuth from "../components/auth"
import Layout from "../components/layout"
import { lazy } from "react"
import Components from './components'
import Agendamentoavulso from "@/pages/modals/agendamentoavulso"






const Agendamentos = lazy(() => import('./agendamentos'))
const Dashboard = lazy(() => import('./dashboard'))
const Clientes = lazy(() => import('./clientes'))
const OrdensServicos = lazy(() => import('./ordens-servicos'))
const Usuarios = lazy(() => import('./usuarios'))
const Lojas = lazy(() => import('./lojas'))
const NovaOs = lazy(() => import('./novaos'))
const OrdemServico = lazy(() => import('./ordem-servico'))
const AnexosPage = lazy(() => import('./ordem-servico/anexosPage'))
const AcompanhamentoPage = lazy(() => import('./ordem-servico/acompanhametoPage'))
const AnaliseTecnicaPage = lazy(() => import('./ordem-servico/analiseTecnicaPage'))
const InicioReparoPage = lazy(() => import('./ordem-servico/inicioReparoPage'))
const FinalizarReparoPage = lazy(() => import('./ordem-servico/finalizarReparoPage'))
const ReabrirReparoPage = lazy(() => import('./ordem-servico/reabrirReparoPage'))
const CondicoesServicosPage = lazy(() => import('./ordem-servico/condicoesServicosPage'))
const PecasServicos = lazy(() => import('./pecas-servicos'))
const Atendentes = lazy(() => import('./atendentes'))



const App = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<Dashboard />} />
            <Route path="agendamentos" element={<Agendamentos />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="ordens-servicos" element={<OrdensServicos />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="lojas" element={<Lojas />} />
            <Route path="ordem-servico/criar" element={<NovaOs />} />
            <Route path="ordem-servico/dados" element={<OrdemServico />} />
            <Route path="ordem-servico/anexos" element={<AnexosPage />} />
            <Route path="ordem-servico/acompanhamento" element={<AcompanhamentoPage />} />
            <Route path="ordem-servico/analise-tecnica" element={<AnaliseTecnicaPage />} />
            <Route path="ordem-servico/inicio-reparo" element={<InicioReparoPage />} />
            <Route path="ordem-servico/finalizar-reparo" element={<FinalizarReparoPage />} />
            <Route path="ordem-servico/reabrir-reparo" element={<ReabrirReparoPage />} />
            <Route path="ordem-servico/condicoes-servicos" element={<CondicoesServicosPage />} />
            <Route path="pecas-servicos" element={<PecasServicos />} />
            <Route path="atendentes" element={<Atendentes />} />
            


            

        </Route>
        <Route path="teste" element={<Agendamentoavulso />} />
        <Route path="___components" element={<Components />} />
        
    </Routes>
}
export default App