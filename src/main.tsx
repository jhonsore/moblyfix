import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from "@/components/ui/toaster"

import './index.css'

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import RecuperarSenha from './pages/recuperarsenha';
import Modals from './pages/modals';
import Novaos from './pages/novaos';
import DadosCliente from './pages/modals/dadocliente';

import Dados from './pages/dados';
import Anexo from './pages/anexo';
import Acompanhamento from './pages/acompanhamento';
import Atendimentoiniciado from './pages/modals/atendimentoiniciado';
import Enviarwhatsapp from './pages/modals/enviarwhatsapp';
import Relatotecnico from './pages/modals/relatotecnico';
import Pecaservico from './pages/modals/pecaservico';
import Adicionarpecaservico from './pages/modals/adicionarpecaservico';
import Finalizaranalisetecnica from './pages/finalizaranalisetecnica';
import Inicarreparo from './pages/inicarreparo';
import Finalizarreparo from './pages/finalizarreparo';
import Reabrir from './pages/reabrir';
import Relatofinalizacaoservico from './pages/modals/relatofinalizacaoservico';
import Motivoreaberturaservico from './pages/modals/motivoreaberturaservico';
import Finalizarvenda from './pages/modals/finalizarvenda';
import Clientes from './pages/clientes';
import Usuarios from './pages/usuarios';
import Lojas from './pages/lojas';
import Pecasservicos from './pages/pecasservicos';
import Condicoesdeservicos from './pages/condicoesdeservicos';
import Dadosdousuario from './pages/modals/dadosdousuario';
import Dadosdaloja from './pages/modals/dadosdaloja';
import Dadosdalojapecas from './pages/modals/dadosdalojapecas';
import Condicoes from './pages/modals/condicoes';
import Agendamentos from './pages/Agendamentos';
import Agendamentoavulso from './pages/modals/agendamentoavulso';
import App from './routes';
import { AuthProvider } from './providers/auth/AuthProvider';
import FirebaseProvider from './providers/firebase/FirebaseProvider';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/recuperarsenha",
    element: <RecuperarSenha />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/modals",
    element: <Modals />
  },
  {
    path: "/modals/dadocliente",
    element: <DadosCliente />
  },
  {
    path: "/modals/atendimentoiniciado",
    element: <Atendimentoiniciado />
  },
  {
    path: "/modals/enviarwhatsapp",
    element: <Enviarwhatsapp />
  },
  {
    path: "/modals/relatotecnico",
    element: <Relatotecnico />
  },
  {
    path: "/modals/pecaservico",
    element: <Pecaservico />
  },
  {
    path: "/modals/adicionarpecaservico",
    element: <Adicionarpecaservico />
  },
  {
    path: "/modals/relatofinalizacaoservico",
    element: <Relatofinalizacaoservico />
  },
  {
    path: "/modals/motivoreaberturaservico",
    element: <Motivoreaberturaservico />
  },
  {
    path: "/modals/finalizarvenda",
    element: <Finalizarvenda />
  },
  {
    path: "/modals/dadosdousuario",
    element: <Dadosdousuario />
  },
  {
    path: "/modals/dadosdaloja",
    element: <Dadosdaloja />
  },
  {
    path: "/modals/dadosdalojapecas",
    element: <Dadosdalojapecas />
  },
  {
    path: "/modals/condicoes",
    element: <Condicoes />
  },
  {
    path: "/modals/agendamentoavulso",
    element: <Agendamentoavulso />
  },


  {
    path: "/novaos",
    element: <Novaos />
  },
  {
    path: "/dados",
    element: <Dados />
  },
  {
    path: "/anexo",
    element: <Anexo />
  },
  {
    path: "/acompanhamento",
    element: <Acompanhamento />
  },

  {
    path: "/finalizaranalisetecnica",
    element: <Finalizaranalisetecnica />
  },
  {
    path: "/inicarreparo",
    element: <Inicarreparo />
  },
  {
    path: "/finalizarreparo",
    element: <Finalizarreparo />
  },
  {
    path: "/reabrir",
    element: <Reabrir />
  },
  {
    path: "/clientes",
    element: <Clientes />
  },
  {
    path: "/usuarios",
    element: <Usuarios />
  },
  {
    path: "/lojas",
    element: <Lojas />
  },
  {
    path: "/pecasservicos",
    element: <Pecasservicos />
  },
  {
    path: "/condicoesdeservicos",
    element: <Condicoesdeservicos />
  },
  {
    path: "/agendamentos",
    element: <Agendamentos />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        {/* <BrowserRouter>
          <App />
        </BrowserRouter> */}
      </AuthProvider>
    </FirebaseProvider>
    <Toaster />
  </React.StrictMode>,
)
