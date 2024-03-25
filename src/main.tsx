import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
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
import Ematendimento from './pages/finalizaranalisetecnica';
import Pecaservico from './pages/modals/pecaservico';
import Adicionarpecaservico from './pages/modals/adicionarpecaservico';
import Finalizaranalisetecnica from './pages/finalizaranalisetecnica';
import Inicarreparo from './pages/inicarreparo';
import Finalizarreparo from './pages/finalizarreparo';
import Reabrir from './pages/reabrir';
import Relatofinalizacaoservico from './pages/modals/relatofinalizacaoservico';
import Motivoreaberturaservico from './pages/modals/motivoreaberturaservico';
import Finalizarvenda from './pages/modals/finalizarvenda';

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
  
 
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
