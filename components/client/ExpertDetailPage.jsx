'use client';
import { useState } from 'react';

export default function ExpertDetailPage({ expert, onClose }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'expert', text: 'Hi! I can help you with React performance.' },
    { id: 2, sender: 'user', text: 'Thanks! I need help with useMemo optimization.' },
    { id: 3, sender: 'expert', text: 'Absolutely. Let me explain how to use memoization effectively.' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'user', text: message }]);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl h-[90vh] md:h-auto md:max-h-[90vh] flex flex-col animate-slideUp">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#00d4ff]/10 to-[#ff006e]/10 border-b border-[#2a2a3e] px-6 py-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#ff006e] flex items-center justify-center text-white font-bold">
              {expert.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-white flex items-center gap-2">
                {expert.name}
                {expert.verified && <span className="text-[#00d4ff]">✓</span>}
              </h2>
              <p className="text-[#a0a0b0] text-xs">{expert.category} Specialist</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-[#a0a0b0] hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Expert Info */}
        <div className="bg-[#0f0f23] border-b border-[#2a2a3e] px-6 py-4 flex-shrink-0">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-[#00d4ff]">⭐ {expert.rating}</div>
              <p className="text-[#a0a0b0] text-xs">Rating</p>
            </div>
            <div>
              <div className="text-xl font-bold text-[#ff006e]">{expert.answers}</div>
              <p className="text-[#a0a0b0] text-xs">Answers</p>
            </div>
            <div>
              <div className="text-xl font-bold text-[#ff6b35]">{expert.verified ? 'Verified' : 'Active'}</div>
              <p className="text-[#a0a0b0] text-xs">Status</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#00d4ff] to-[#ff006e] text-white'
                    : 'bg-[#0f0f23] border border-[#2a2a3e] text-[#a0a0b0]'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-[#2a2a3e] px-6 py-4 flex-shrink-0 bg-[#1a1a2e]">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-[#0f0f23] border border-[#2a2a3e] rounded-lg text-white placeholder-[#a0a0b0] focus:outline-none focus:border-[#00d4ff]"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#ff006e] text-white rounded-lg hover:shadow-lg transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}