import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login';
import Dashboard from './pages/dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Login />
  },
  {
    path: "/dashboard",
    element:<Dashboard />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
