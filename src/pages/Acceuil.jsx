import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Accueil.css'

const services = [
  { icon: '🛒', label: 'Aide aux courses' },
  { icon: '📚', label: 'Soutien scolaire' },
  { icon: '👴', label: 'Visites aux personnes âgées' },
  { icon: '🔧', label: 'Petits travaux' },
]

export default function Accueil() {
  const [stats, setStats] = useState({
    benevoles: 0,
    demandes: 0,
    enAttente: 0
  })

  useEffect(() => {
    const stored = localStorage.getItem('demandesList')
    if (stored) {
      const demandes = JSON.parse(stored)
      const enAttente = demandes.filter(d => d.statut === 'En attente').length
      const total = demandes.length
      setStats({
        benevoles: total,
        demandes: total,
        enAttente: enAttente
      })
    }
  }, [])

  return (
    <div className="accueil">
      <div className="hero card">
        <div className="hero-text">
          <h2>Connectons la Communauté<br />pour <span>s'entraider</span></h2>
          <p>Trouvez des bénévoles ou proposez votre aide près de chez vous.</p>
          <div className="hero-btns">
            <Link to="/demandes"><button className="btn-primary">Faire une demande</button></Link>
            <Link to="/profil"><button className="btn-outline">Proposer de l'aide</button></Link>
          </div>
        </div>
        <div className="hero-image"></div>
      </div>

      <h3 className="section-title">Services disponibles</h3>
      <div className="services-grid">
        {services.map((s, i) => (
          <div key={i} className="service-card card">
            <span className="service-icon">{s.icon}</span>
            <span className="service-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="stats-row">
        <div className="stat-card card">
          <span className="stat-num">{stats.benevoles}</span>
          <span className="stat-label">Bénévoles actifs</span>
        </div>
        <div className="stat-card card">
          <span className="stat-num">{stats.demandes}</span>
          <span className="stat-label">Demandes ce mois</span>
        </div>
        <div className="stat-card card">
          <span className="stat-num">{stats.enAttente}</span>
          <span className="stat-label">En attente</span>
        </div>
      </div>
    </div>
  )
}