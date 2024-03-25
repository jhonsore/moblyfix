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
import Ematendimento from './pages/ematendimento';

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
    path: "/ematendimento",
    element: <Ematendimento />
  },
  
 
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
