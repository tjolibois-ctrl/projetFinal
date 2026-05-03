import { useEffect, useState } from 'react'
import './Profil.css'

const services = [
  { icon: '🛒', label: 'Aide aux courses', color: '#3B5BFC' },
  { icon: '📚', label: 'Soutien scolaire', color: '#22c55e' },
  { icon: '👴', label: 'Visites aux personnes âgées', color: '#ef4444' },
]

const demandeurs = [
  { id: 1, nom: 'Jean Devley', location: 'Delmas', service: 'Aide aux courses', note: '4.7' },
  { id: 2, nom: 'Anas Jajula', location: 'Pétion-Ville', service: 'Soutien scolaire', note: '4.9' },
  { id: 3, nom: 'Marie Clermont', location: 'Croix-des-Bouquets', service: 'Petits travaux', note: '4.5' },
]

export default function Profil() {
  const defaultProfile = {
    fullName: 'Towensia Jolibois',
    location: 'Bénévole à Delmas',
    services: ['Aide aux courses', 'Soutien scolaire', 'Visites aux personnes âgées'],
    demandesAidées: 12,
    note: 4.8,
    membreDepuis: '3 mois',
    avatarUrl: '',
  }

  const [profile, setProfile] = useState(defaultProfile)
  const [editMode, setEditMode] = useState(false)
  const [editProfile, setEditProfile] = useState({
    fullName: defaultProfile.fullName,
    location: defaultProfile.location,
    services: defaultProfile.services.join(', '),
    avatarUrl: defaultProfile.avatarUrl,
  })
  const [selectedDemandeur, setSelectedDemandeur] = useState(demandeurs[0])

  useEffect(() => {
    const stored = localStorage.getItem('profilUser')
    if (stored) {
      const parsed = JSON.parse(stored)
      setProfile(parsed)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('profilUser', JSON.stringify(profile))
  }, [profile])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setEditProfile(prev => ({ ...prev, avatarUrl: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const updated = {
      ...profile,
      fullName: editProfile.fullName,
      location: editProfile.location,
      services: editProfile.services.split(',').map(s => s.trim()).filter(Boolean),
      avatarUrl: editProfile.avatarUrl,
    }
    setProfile(updated)
    localStorage.setItem('profilUser', JSON.stringify(updated))
    setEditMode(false)
  }

  return (
    <div className="profil">
      <div className="card profil-card">
        <div className="profil-avatar">
          {profile.avatarUrl ? <img src={profile.avatarUrl} alt="Avatar" /> : profile.fullName.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="profil-info">
          <h2>{profile.fullName}</h2>
          <p className="profil-location">📍 {profile.location}</p>
        </div>
      </div>

      <div className="card">
        <h3>Mes services proposés</h3>
        <div className="profil-services">
          {profile.services.map((label, i) => (
            <div key={i} className="profil-service-item">
              <span className="service-dot" style={{background: services[i]?.color || '#3B5BFC'}}></span>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <button className="btn-green" style={{marginTop: '20px', width: '100%'}} onClick={() => {
          setEditProfile({
            fullName: profile.fullName,
            location: profile.location,
            services: profile.services.join(', '),
            avatarUrl: profile.avatarUrl || '',
          })
          setEditMode(true)
        }}>
          Modifier le Profil
        </button>
      </div>

      <div className="card">
        <h3>Statistiques</h3>
        <div className="profil-stats">
          <div><span className="stat-big">{profile.demandesAidées}</span><br/><span className="stat-sm">Demandes aidées</span></div>
          <div><span className="stat-big">{profile.note} ⭐</span><br/><span className="stat-sm">Note moyenne</span></div>
          <div><span className="stat-big">{profile.membreDepuis}</span><br/><span className="stat-sm">Membre depuis</span></div>
        </div>
      </div>

      <div className="card">
        <h3>Profils des demandeurs</h3>
        <div className="demandeurs-list">
          {demandeurs.map(d => (
            <div key={d.id} className="demandeur-card">
              <div className="demandeur-avatar">{d.nom[0]}</div>
              <div>
                <h4>{d.nom}</h4>
                <p className="demandeur-meta">{d.location}</p>
                <p className="demandeur-meta">Service: {d.service}</p>
              </div>
              <span className="demandeur-note">{d.note} ⭐</span>
            </div>
          ))}
        </div>
      </div>

      {editMode && (
        <div className="modal-overlay" onClick={() => setEditMode(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Modifier le profil</h3>
              <button className="modal-close" onClick={() => setEditMode(false)}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  value={editProfile.fullName}
                  onChange={(e) => setEditProfile({...editProfile, fullName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Photo de profil</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                {editProfile.avatarUrl && (
                  <div className="avatar-preview">
                    <img src={editProfile.avatarUrl} alt="Prévisualisation avatar" />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Localisation</label>
                <input
                  type="text"
                  value={editProfile.location}
                  onChange={(e) => setEditProfile({...editProfile, location: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Services (séparés par des virgules)</label>
                <input
                  type="text"
                  value={editProfile.services}
                  onChange={(e) => setEditProfile({...editProfile, services: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setEditMode(false)}>Annuler</button>
                <button type="submit" className="btn-green">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}