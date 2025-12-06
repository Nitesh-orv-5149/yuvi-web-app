'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <div className="bg-[#0f0f23] border-t border-[#2a2a3e] p-4 flex items-center gap-3">

      {/* Input Field */}
      <div className="flex-1">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="w-full px-4 py-3 bg-[#1a1a2e] text-white text-sm rounded-xl 
                     border border-[#2a2a3e] focus:border-[#00d4ff] outline-none 
                     placeholder:text-[#6b6b7a] transition"
        />
      </div>

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="w-12 h-12 flex items-center justify-center rounded-xl 
                   bg-gradient-to-br from-[#00d4ff] to-[#5f00d2] hover:opacity-90 
                   transition shadow-[0_0_15px_rgba(0,212,255,0.4)]"
      >
        <Send className="text-white w-5 h-5" />
      </button>

    </div>
  );
}
