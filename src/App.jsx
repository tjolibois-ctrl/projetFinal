import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import Register from './pages/Register'
import Profil from './pages/Profil'
import Demandes from './pages/Demandes'
import Messages from './pages/Messages'
import Dashboard from './pages/Dashboard'

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layout><Accueil /></Layout>} />
          <Route path="/demandes" element={<Layout><Demandes /></Layout>} />
          <Route path="/messages" element={<Layout><Messages /></Layout>} />
          <Route path="/profil" element={<Layout><Profil /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}