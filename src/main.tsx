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
import DadosCliente from './pages/modals/dadocliente/dadoscliente';

import Dados from './pages/dados';
import Anexo from './pages/anexo';

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
 
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
