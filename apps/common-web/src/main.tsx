import React from 'react'
import ReactDOM from 'react-dom/client'
// import HomePage from './pages/index'
import { AppRoutes } from './routes'
import { BrowserRouter } from'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
)
