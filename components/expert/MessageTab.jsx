// yuvi-web-app/components/expert/MessageTab.jsx
"use client";
import { useState } from 'react';
import { mockChatClients } from '@/lib/mockData';
import { ArrowLeft, Send } from 'lucide-react';

export default function MessageTab() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  
  // Separate chat history for each client
  const [chatHistories, setChatHistories] = useState({
    '1': [{ sender: 'them', text: 'Hello, I need some help with my project.' }],
    '2': [{ sender: 'them', text: 'Hi, are you available for a quick call?' }],
    '3': [{ sender: 'them', text: 'I sent the screenshots you asked for.' }]
  });

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedClient) {
      setChatHistories(prev => ({
        ...prev,
        [selectedClient.id]: [
          ...(prev[selectedClient.id] || []),
          { sender: 'me', text: messageInput }
        ]
      }));
      setMessageInput('');
    }
  };

  // Chat View
  if (selectedClient) {
    const currentHistory = chatHistories[selectedClient.id] || [];

    return (
      <div className="flex flex-col h-[calc(100vh-120px)] sm:h-auto animate-in slide-in-from-right duration-300 bg-slate-950">
        {/* Chat Header */}
        <div className="flex items-center gap-4 p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md z-10">
          <button 
            onClick={() => setSelectedClient(null)}
            className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20 text-sm">
            {selectedClient.avatar}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">{selectedClient.name}</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs text-emerald-500 font-medium">Online</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          {currentHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-sm ${
                msg.sender === 'me' 
                  ? 'bg-cyan-600 text-white rounded-br-sm' 
                  : 'bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="fixed bottom-20 left-0 right-0 max-w-2xl mx-auto p-4 bg-slate-900 border-t border-slate-800">
          <div className="relative">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Type a message..."
              className="w-full pl-5 pr-12 py-3.5 bg-slate-950 border border-slate-800 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!messageInput.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List View (Client List)
  return (
    <div className="animate-in fade-in duration-500 pb-24 pt-6 px-4">
      <h2 className="text-2xl font-bold mb-6">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Messages
        </span>
      </h2>
      <div className="space-y-3">
        {mockChatClients.map((client) => (
          <div
            key={client.id}
            onClick={() => setSelectedClient(client)}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:bg-slate-900 hover:border-cyan-500/30 transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/10 text-lg">
                  {client.avatar}
                </div>
                {client.unread && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0 py-0.5">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                    {client.name}
                  </h3>
                  <span className="text-slate-500 text-xs whitespace-nowrap font-medium">{client.timestamp}</span>
                </div>
                
                {/* Context/Reason Section */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                    Context
                  </span>
                  <p className="text-slate-400 text-xs truncate">
                    {client.context}
                  </p>
                </div>
                
                <p className="text-slate-500 text-sm truncate group-hover:text-slate-300 transition-colors">
                  {client.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}