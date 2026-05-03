import { useEffect, useState } from 'react'
import './Dashboard.css'

const months = ['Jan','Fév','Mar','Avr','Mai','Jun']
const data = [40, 65, 50, 80, 70, 90]

export default function Dashboard() {
  const [stats, setStats] = useState([
    { label: 'Bénévoles', value: 0, color: '#3B5BFC' },
    { label: 'Demandes', value: 0, color: '#22c55e' },
    { label: 'En attente', value: 0, color: '#f97316' },
  ])

  useEffect(() => {
    const stored = localStorage.getItem('demandesList')
    if (stored) {
      const demandes = JSON.parse(stored)
      const enAttente = demandes.filter(d => d.statut === 'En attente').length
      const total = demandes.length
      setStats([
        { label: 'Bénévoles', value: total, color: '#3B5BFC' },
        { label: 'Demandes', value: total, color: '#22c55e' },
        { label: 'En attente', value: enAttente, color: '#f97316' },
      ])
    }
  }, [])

  const max = Math.max(...data)
  return (
    <div className="dashboard">
      <div className="dash-stats">
        {stats.map((s, i) => (
          <div key={i} className="card dash-stat">
            <span className="dash-stat-val" style={{color: s.color}}>{s.value}</span>
            <span className="dash-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Statistiques d'activité</h3>
        <div className="bar-chart">
          {data.map((val, i) => (
            <div key={i} className="bar-col">
              <div className="bar" style={{height: `${(val/max)*160}px`}}></div>
              <span className="bar-label">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Activité récente</h3>
        <ul className="activity-list">
          <li>✅ Jean Devley — demande <strong>acceptée</strong></li>
          <li>🆕 Anas Jajula — nouvelle <strong>demande créée</strong></li>
          <li>💬 Towensia — a envoyé un <strong>message</strong></li>
          <li>👤 Doublas — <strong>profil mis à jour</strong></li>
        </ul>
      </div>
    </div>
  )
}