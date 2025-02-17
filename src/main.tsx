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
import { StoresProvider } from './providers/stores/StoresProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseProvider>
      <AuthProvider>
        <StoresProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StoresProvider>
      </AuthProvider>
    </FirebaseProvider>
    <Toaster />
  </React.StrictMode>,
)
