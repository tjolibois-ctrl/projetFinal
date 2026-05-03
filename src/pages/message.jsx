import { useState, useEffect } from 'react';
import '../components/Messages.css';

const Messages = ({ conversations, contacts, setConversations }) => {
  const [selectedContactId, setSelectedContactId] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [showMenu, setShowMenu] = useState(null);

  const selectedContact = contacts.find((contact) => contact.id === selectedContactId);
  const messages = conversations[selectedContactId] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage) return;

    setConversations({
      ...conversations,
      [selectedContactId]: [
        ...messages,
        { id: messages.length + 1, text: newMessage, type: 'sent' },
      ],
    });
    setNewMessage('');
  };

  const handleMenuToggle = (contactId) => {
    setShowMenu(showMenu === contactId ? null : contactId);
  };

  const handleClickOutside = () => {
    setShowMenu(null);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMarkAsRead = (contactId) => {
    // Simuler le marquage comme lu
    alert(`Conversation avec ${contacts.find(c => c.id === contactId)?.name} marquée comme lue`);
    setShowMenu(null);
  };

  const handleDeleteConversation = (contactId) => {
    // Simuler la suppression
    alert(`Conversation avec ${contacts.find(c => c.id === contactId)?.name} supprimée`);
    setShowMenu(null);
  };

  const handleBlockUser = (contactId) => {
    // Simuler le blocage
    alert(`${contacts.find(c => c.id === contactId)?.name} bloqué`);
    setShowMenu(null);
  };

  return (
    <div className="messages-container">
      <div className="page-header">
        <div>
          <h1>Messages</h1>
        </div>
      </div>

      <div className="chat-layout">
        <aside className="chat-sidebar">
          <h2>Messages</h2>
          {contacts.map((contact) => (
            <button
              key={contact.id}
              type="button"
              className={`chat-contact ${selectedContactId === contact.id ? 'active' : ''}`}
              onClick={() => setSelectedContactId(contact.id)}
            >
              <div className="contact-avatar">{contact.initials}</div>
              <div>{contact.name}</div>
            </button>
          ))}
        </aside>

        <section className="chat-panel">
          <div className="chat-panel-header">
            <div>
              <h2>{selectedContact?.name}</h2>
              <small>Dernière conversation</small>
            </div>
            <div className="page-toolbar">
              <button type="button">🔔</button>
              <div className="menu-container">
                <button
                  type="button"
                  className="menu-trigger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuToggle(selectedContactId);
                  }}
                >
                  ⋮
                </button>
                {showMenu === selectedContactId && (
                  <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
                    <button onClick={(e) => { e.stopPropagation(); handleMarkAsRead(selectedContactId); }}>
                      ✅ Marquer comme lu
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteConversation(selectedContactId); }}>
                      🗑️ Supprimer la conversation
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleBlockUser(selectedContactId); }}>
                      🚫 Bloquer l'utilisateur
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message-row ${message.type}`}>
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}
          </div>

          <form className="message-send" onSubmit={handleSubmit}>
            <input
              className="message-input"
              type="text"
              placeholder="Écrire un message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">➤</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Messages;