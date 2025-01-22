import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from "@/components/ui/toaster"

import './index.css'

import {
  BrowserRouter,
  createBrowserRouter,
  
} from "react-router-dom";

import Dashboard from './pages/dashboard';
import RecuperarSenha from './pages/recuperarsenha';
import Modals from './pages/modals';
import DadosCliente from './pages/modals/dadocliente';
import Atendimentoiniciado from './pages/modals/atendimentoiniciado';
import Enviarwhatsapp from './pages/modals/enviarwhatsapp';
import Relatotecnico from './pages/modals/relatotecnico';
import Pecaservico from './pages/modals/pecaservico';
import Adicionarpecaservico from './pages/modals/adicionarpecaservico';
import Relatofinalizacaoservico from './pages/modals/relatofinalizacaoservico';
import Motivoreaberturaservico from './pages/modals/motivoreaberturaservico';
import Finalizarvenda from './pages/modals/finalizarvenda';
import Condicoesdeservicos from './pages/Condiçoes de serviços';
import Dadosdousuario from './pages/modals/dadosdousuario';
import Dadosdaloja from './pages/modals/dadosdaloja';
import Dadosdalojapecas from './pages/modals/dadosdalojapecas';
import Condicoes from './pages/modals/condicoes';
import Agendamentoavulso from './pages/modals/agendamentoavulso';
import App from './routes';
import { AuthProvider } from './providers/auth/AuthProvider';
import FirebaseProvider from './providers/firebase/FirebaseProvider';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = createBrowserRouter([
 
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
    path: "/condicoesdeservicos",
    element: <Condicoesdeservicos />
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseProvider>
      <AuthProvider>
        {/* <RouterProvider router={router} /> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </FirebaseProvider>
    <Toaster />
  </React.StrictMode>,
)
