import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from "@/components/ui/toaster"

import './index.css'

import {
  BrowserRouter
} from "react-router-dom";

import App from '@/screens/';
import { AuthProvider } from './providers/auth/AuthProvider';
import FirebaseProvider from './providers/firebase/FirebaseProvider';

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
