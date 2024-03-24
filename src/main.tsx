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
import Osaberta from './pages/osaberta';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Login />
  },
  {
    path: "/recuperarsenha",
    element:<RecuperarSenha />
  },
  {
    path: "/dashboard",
    element:<Dashboard />
  },
  {
    path: "/modals",
    element: <Modals />
  },
  {
    path: "/novaos",
    element: <Novaos />
  },
  {
    path: "/osaberta",
    element: <Osaberta />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
