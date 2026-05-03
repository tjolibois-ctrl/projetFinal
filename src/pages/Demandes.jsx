import { useState, useEffect } from 'react'
import './Demandes.css'

const badge = { 'En attente': '#3B5BFC', 'En cours': '#f97316', 'Accepté': '#22c55e', 'Rejeté': '#ef4444' }

export default function Demandes() {
  const [demandes, setDemandes] = useState([])
  
  const [showModal, setShowModal] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState(null)
  const [newDemande, setNewDemande] = useState({ nom: '', service: '', description: '' })

  useEffect(() => {
    const stored = localStorage.getItem('demandesList')
    if (stored) {
      setDemandes(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('demandesList', JSON.stringify(demandes))
  }, [demandes])

  const handleAddDemande = () => {
    if (newDemande.nom && newDemande.service) {
      const demand = {
        id: demandes.length + 1,
        nom: newDemande.nom,
        service: newDemande.service,
        statut: 'En attente'
      }
      setDemandes([...demandes, demand])
      setNewDemande({ nom: '', service: '', description: '' })
      setShowModal(false)
    }
  }

  const handleStatutChange = (id, newStatut) => {
    setDemandes(demandes.map(d => d.id === id ? { ...d, statut: newStatut } : d))
  }

  const handleDeleteDemande = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      setDemandes(demandes.filter(d => d.id !== id))
    }
  }

  return (
    <div className="demandes">
      <div className="demandes-header">
        <h2>Toutes les demandes</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Nouvelle demande</button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Nouvelle demande</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddDemande(); }}>
              <div className="form-group">
                <label>Votre nom</label>
                <input
                  type="text"
                  placeholder="Entrez votre nom"
                  value={newDemande.nom}
                  onChange={(e) => setNewDemande({...newDemande, nom: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Service demandé</label>
                <select
                  value={newDemande.service}
                  onChange={(e) => setNewDemande({...newDemande, service: e.target.value})}
                  required
                >
                  <option value="">Choisir un service</option>
                  <option>Aide aux courses</option>
                  <option>Soutien scolaire</option>
                  <option>Visites aux personnes âgées</option>
                  <option>Petits travaux</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Décrivez votre demande..."
                  value={newDemande.description}
                  onChange={(e) => setNewDemande({...newDemande, description: e.target.value})}
                  rows="4"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="btn-primary">Créer demande</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedDetail && (
        <div className="modal-overlay" onClick={() => setSelectedDetail(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Détails de la demande</h3>
              <button className="modal-close" onClick={() => setSelectedDetail(null)}>✕</button>
            </div>
            <div className="detail-content">
              <p><strong>Demandeur:</strong> {selectedDetail.nom}</p>
              <p><strong>Service:</strong> {selectedDetail.service}</p>
              <p><strong>Statut:</strong> <span className="status-badge" style={{background: badge[selectedDetail.statut]+'20', color: badge[selectedDetail.statut]}}>{selectedDetail.statut}</span></p>
            </div>
          </div>
        </div>
      )}

      <div className="card demandes-table">
        <div className="table-header">
          <span>Demandeur</span>
          <span>Service</span>
          <span>Statut</span>
          <span>Action</span>
        </div>
        {demandes.map(d => (
          <div key={d.id} className="table-row">
            <span className="demandeur"><span className="dem-avatar">👤</span>{d.nom}</span>
            <span>{d.service}</span>
            <span>
              <select 
                className="status-select"
                value={d.statut}
                onChange={(e) => handleStatutChange(d.id, e.target.value)}
                style={{ color: badge[d.statut], borderColor: badge[d.statut] }}
              >
                <option value="En attente">En attente</option>
                <option value="En cours">En cours</option>
                <option value="Accepté">Accepté</option>
                <option value="Rejeté">Rejeté</option>
              </select>
            </span>
            <span className="action-buttons">
              <button className="btn-outline" style={{padding:'5px 12px', fontSize:'12px'}} onClick={() => setSelectedDetail(d)}>Voir detail</button>
              <button className="btn-delete" onClick={() => handleDeleteDemande(d.id)} title="Supprimer">🗑️</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}