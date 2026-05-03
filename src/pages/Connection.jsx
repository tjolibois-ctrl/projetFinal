import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signIn } from '../services/authService'
import './Connexion.css'

export default function Connexion() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setErrorMessage('')
      await signIn(email, password)
      navigate('/')
    } catch (error) {
      const message = error?.message?.toLowerCase() || ''
      if (message.includes('no user') || message.includes('user not found') || message.includes('invalid login') && message.includes('email')) {
        setErrorMessage("Compte introuvable. Vous devez d'abord créer un compte avant de vous connecter.")
      } else if (message.includes('invalid login') || message.includes('invalid password') || message.includes('password')) {
        setErrorMessage("Email ou mot de passe incorrect. Si vous n'avez pas de compte, créez-en un d'abord.")
      } else {
        setErrorMessage("Erreur de connexion : " + error.message)
      }
    }
  }

  return (
    <div className="connexion-page">
      <div className="connexion-card">
        <div className="connexion-logo"></div>
        <h2>Connexion</h2>
        <p className="connexion-sub">Bienvenue sur la plateforme communautaire</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="votre@email.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {errorMessage && <div className="connexion-error">{errorMessage}</div>}
          <button type="submit" className="btn-primary" style={{width:'100%', padding:'12px'}}>
            Se connecter
          </button>
        </form>
        <p className="connexion-footer">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>
      </div>
    </div>
  )
}