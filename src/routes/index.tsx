import { Route, Routes } from "react-router"
import Login from "./login"
import RequireAuth from "../components/auth"
import Layout from "../components/layout"
import { lazy } from "react"
import Components from './components'

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
const CondicoesServicosPage = lazy(() => import('./condicoesServicosPage'))
const PecasServicos = lazy(() => import('./pecas-servicos'))
const Atendentes = lazy(() => import('./atendentes'))
const DadosDoUsuario = lazy(() => import('./dados-do-usuario'))
const DadosDoCliente = lazy(() => import('./dados-do-cliente'))
const DadosDaLoja = lazy(() => import('./dados-da-loja'))
const AgendamentoAvulso = lazy(() => import('./agendamento-avulso'))
const DadosDaVenda = lazy(() => import('./dados-da-venda'))
const Condicoes = lazy(() => import('./condicoes'))

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
            <Route path="condicoes-de-servicos" element={<CondicoesServicosPage />} />
            <Route path="pecas-servicos" element={<PecasServicos />} />
            <Route path="atendentes" element={<Atendentes />} />
            <Route path="dados-do-usuario" element={<DadosDoUsuario />} />
            <Route path="dados-do-cliente" element={<DadosDoCliente />} />
            <Route path="dados-da-loja" element={<DadosDaLoja />} />
            <Route path="agendamento-avulso" element={<AgendamentoAvulso />} />
            <Route path="dados-da-venda" element={<DadosDaVenda />} />
            <Route path="condicoes" element={<Condicoes />} />
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