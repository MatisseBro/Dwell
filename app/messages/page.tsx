'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';

interface User {
  id: number;
  prenom?: string;
  nom?: string;
  lastMessage?: string;
  lastDate?: string;
}

interface Message {
  id: number;
  content: string;
  createdAt: string;
  senderId: number;
  receiverId: number;
}

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const [conversations, setConversations] = useState<User[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [search, setSearch] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const initialUserId = searchParams.get('userId');
  const userId = session?.user?.id;

  // Charger les conversations initiales
  useEffect(() => {
    if (!userId) return;

    fetch('/api/messages/conversations')
      .then((res) => res.json())
      .then(async (convos: User[]) => {
        setConversations(convos);
        setFilteredConversations(convos);

        if (initialUserId) {
          const id = parseInt(initialUserId);
          const found = convos.find((u) => u.id === id);
          if (found) {
            setSelectedUser(found);
          } else {
            const res = await fetch(`/api/messages/users/${id}`);
            if (res.ok) {
              const user = await res.json();
              setSelectedUser(user);

              setConversations((prev) =>
                prev.some((u) => u.id === user.id) ? prev : [...prev, user]
              );
              setFilteredConversations((prev) =>
                prev.some((u) => u.id === user.id) ? prev : [...prev, user]
              );
            }
          }
        }
      });
  }, [userId, initialUserId]);

  // Recherche dans les conversations
  useEffect(() => {
    const term = search.toLowerCase();
    setFilteredConversations(
      conversations.filter(
        (u) =>
          u.nom?.toLowerCase().includes(term) ||
          u.prenom?.toLowerCase().includes(term)
      )
    );
  }, [search, conversations]);

  // Charger les messages de la conversation
  useEffect(() => {
    if (!selectedUser) return;

    fetch(`/api/messages/conversations/${selectedUser.id}`)
      .then((res) => res.json())
      .then((msgs: Message[]) => {
        setMessages(msgs);
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 100);
      });
  }, [selectedUser]);

  // Envoyer un message
  const handleSend = async () => {
    if (!messageInput.trim() || !selectedUser) return;

    const res = await fetch('/api/messages/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: messageInput,
        receiverId: selectedUser.id,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(data.error);
      return;
    }

    setMessages((prev) => [...prev, data.message]);
    setMessageInput('');

    if (!conversations.find((u) => u.id === selectedUser.id)) {
      setConversations((prev) => [...prev, selectedUser]);
      setFilteredConversations((prev) => [...prev, selectedUser]);
    }

    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (status === 'loading') {
    return <p className="text-center mt-10 text-gray-500">Chargement...</p>;
  }

  if (!session?.user?.id) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Vous devez être connecté pour accéder à la messagerie.
      </p>
    );
  }

  return (
    <div className="flex justify-center px-4 py-6 bg-[#F9FAFB] min-h-screen">
      <div className="w-full max-w-6xl flex h-[80vh] bg-white rounded-xl shadow border overflow-hidden">
        {/* Liste des conversations */}
        <aside className="w-1/3 border-r border-gray-200 p-4 overflow-y-auto">
          <h2 className="font-bold text-lg mb-4 text-[#1E1E1E]">Conversations</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="mb-4 w-full border border-gray-300 rounded px-3 py-2 text-sm text-black"
          />
          <ul className="space-y-3">
            {filteredConversations.map((user) => (
              <li
                key={`user-${user.id}`}
                onClick={() => setSelectedUser(user)}
                className={`flex items-start gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-100 ${
                  selectedUser?.id === user.id ? 'bg-gray-100 font-semibold' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm">
                  {(user?.prenom?.charAt(0) || '?').toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-black truncate">
                      {user.prenom} {user.nom}
                    </span>
                    {user.lastDate && (
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {format(new Date(user.lastDate), 'HH:mm')}
                      </span>
                    )}
                  </div>
                  {user.lastMessage && (
                    <p className="text-xs text-gray-600 truncate">
                      {user.lastMessage}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Fenêtre de chat */}
        <main className="flex-1 flex flex-col">
          <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto">
            {selectedUser ? (
              <>
                <h3 className="text-lg font-semibold text-black mb-4">
                  Discussion avec {selectedUser.prenom} {selectedUser.nom}
                </h3>
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`max-w-xl ${
                        msg.senderId === userId ? 'ml-auto text-right' : 'text-left'
                      }`}
                    >
                      <div className="inline-block px-4 py-2 rounded-lg text-black bg-white shadow border">
                        {msg.content}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(msg.createdAt), 'HH:mm')}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center mt-10">
                Sélectionnez une conversation à gauche pour démarrer.
              </p>
            )}
          </div>

          {/* Barre de saisie */}
          {selectedUser && (
            <div className="p-4 border-t bg-white flex gap-2">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border border-gray-300 rounded px-4 py-2 text-black resize-none"
                placeholder={`Message à ${selectedUser.prenom || ''}...`}
                rows={1}
              />
              <button
                onClick={handleSend}
                className="bg-[#405733] text-white px-4 py-2 rounded hover:bg-[#304624]"
              >
                Envoyer
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
