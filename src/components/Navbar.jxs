import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import './Navbar.css'

const titles = {
  '/': 'Accueil',
  '/demandes': 'Demandes',
  '/messages': 'Messages',
  '/profil': 'Mon Profil',
  '/dashboard': 'Dashboard',
  '/connexion': 'Connexion',
}

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <header className="navbar">
      <h1 className="navbar-title">{titles[pathname] || 'Page'}</h1>
      <div className="navbar-actions">
        <button className="notif-btn">🔔</button>
        {user ? (
          <div className="user-profile">
            <span className="user-email">{user.email}</span>
            <button className="btn-profile" onClick={() => navigate('/profil')}>Profil</button>
          </div>
        ) : (
          <button className="btn-connexion" onClick={() => navigate('/connexion')}>Se connecter</button>
        )}
      </div>
    </header>
  )
}