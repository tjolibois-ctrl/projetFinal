import { useState } from 'react'
import './Messages.css'

const contacts = [
  { id: 1, nom: 'Jean Devley', time: '10:30', unread: 2 },
  { id: 2, nom: 'Jolibois Towensia', time: '09:15', unread: 0 },
  { id: 3, nom: 'Anas Jajula', time: 'Hier', unread: 1 },
  { id: 4, nom: 'Jean Doublas', time: 'Lun', unread: 0 },
]

const initialMessages = {
  1: [
    { from: 'other', text: 'Bonjour, est-ce que vous pouvez m\'aider ?' },
    { from: 'me', text: 'Oui bien sûr !' },
  ],
  2: [
    { from: 'other', text: 'Merci pour votre aide.' }
  ],
  3: [
    { from: 'other', text: 'Hello, avez-vous un moment ?' }
  ],
  4: [
    { from: 'other', text: 'Ok super, merci !' }
  ]
}

export default function Messages() {
  const [selectedContactId, setSelectedContactId] = useState(contacts[0].id)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(initialMessages)

  const selected = contacts.find(c => c.id === selectedContactId)
  const msgs = messages[selectedContactId] || []

  const send = () => {
    if (!input.trim()) return
    setMessages(prev => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), { from: 'me', text: input }]
    }))
    setInput('')
  }

  return (
    <div className="messages-layout">
      <div className="contacts-list card">
        <h3>Messages</h3>
        {contacts.map(c => {
          const lastMsg = messages[c.id]?.slice(-1)[0]
          return (
            <div key={c.id} className={`contact-item ${selectedContactId === c.id ? 'active' : ''}`}
              onClick={() => setSelectedContactId(c.id)}>
              <div className="contact-avatar">{c.nom[0]}</div>
              <div className="contact-info">
                <span className="contact-name">{c.nom}</span>
                <span className="contact-msg">{lastMsg?.text || 'Aucun message'}</span>
              </div>
              <div className="contact-meta">
                <span className="contact-time">{c.time}</span>
                {c.unread > 0 && <span className="unread-badge">{c.unread}</span>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="chat-area card">
        <div className="chat-header">
          <div className="contact-avatar">{selected.nom[0]}</div>
          <span className="chat-name">{selected.nom}</span>
        </div>
        <div className="chat-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`bubble ${m.from}`}>{m.text}</div>
          ))}
        </div>
        <div className="chat-input">
          <input placeholder="Écrire un message..."
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()} />
          <button className="btn-primary" onClick={send}>Envoyer</button>
        </div>
      </div>
    </div>
  )
}