import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContext } from './components/context/AuthContext.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>,</AuthContextProvider>
)
