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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
