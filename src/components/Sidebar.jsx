import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const links = [
  { to: '/', label: 'Accueil', icon: '🏠' },
  { to: '/connexion', label: 'Connexion', icon: '🔑' },
  { to: '/demandes', label: 'Demandes', icon: '📋' },
  { to: '/messages', label: 'Messages', icon: '💬' },
  { to: '/profil', label: 'Profil', icon: '👤' },
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
 
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🤝</span>
        <span className="logo-text">Plat. comm.</span>
      </div>
      <nav className="sidebar-nav">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="link-icon">{link.icon}</span>
            <span className="link-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}