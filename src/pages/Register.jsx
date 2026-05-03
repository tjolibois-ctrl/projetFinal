import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signUp } from '../services/authService'
import './Register.css'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    try {
      await signUp(email, password)
      setSuccessMessage("Compte créé avec succès 🎉")
      setFullName('')
      setEmail('')
      setPassword('')
      setAddress('')
    } catch (error) {
      const message = error?.message?.toLowerCase() || ''
      if (message.includes('rate limit') || message.includes('too many')) {
        setErrorMessage("Trop de tentatives. Attendez quelques minutes avant de réessayer.")
      } else if (message.includes('already exists') || message.includes('already registered')) {
        setErrorMessage("Cet email existe déjà. Essayez de vous connecter ou utilisez un autre email.")
      } else if (message.includes('invalid email')) {
        setErrorMessage("Email invalide. Entrez une adresse email valide.")
      } else if (message.includes('password')) {
        setErrorMessage("Le mot de passe doit être plus fort (au moins 6 caractères).")
      } else {
        setErrorMessage("Erreur d'inscription : " + error.message)
      }
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-logo"></div>
        <h2>Créer un compte</h2>
        <p className="register-sub">Rejoignez-nous et commencez à utiliser la plateforme</p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              placeholder="Votre nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Adresse</label>
            <input
              type="text"
              placeholder="Votre adresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>
            S'inscrire
          </button>
          {errorMessage && <div className="register-error">{errorMessage}</div>}
          {successMessage && <div className="register-success">{successMessage}</div>}
        </form>
        <p className="connexion-footer">
          Déjà un compte ? <Link to="/connexion">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}