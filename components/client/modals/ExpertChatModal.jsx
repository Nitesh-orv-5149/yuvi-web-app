'use client';
import React,{useState,useEffect} from 'react';
import MessageList from '../expert-dm/MessageList';
import MessageInput from '../expert-dm/MessageInput';

export default function ExpertChatModal({ expert, onClose }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages for the expert when the modal opens
    async function fetchMessages() {
      try {
        const response = await fetch(`/api/chat/messages?conversationId=${expert.conversationId}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchMessages();
  }, [expert.conversationId]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-4 animate-fadeIn">

      {/* MODAL CONTAINER */}
      <div className="w-full md:max-w-xl bg-[#121225] rounded-3xl overflow-hidden shadow-[0_0_45px_-8px_rgba(0,212,255,0.3)] animate-slideUp">
        
        {/* HEADER */}
        <div className="px-6 py-5 bg-gradient-to-br from-[#00d4ff]/20 via-[#5f00d2]/10 to-[#ff006e]/20 border-b border-white/5 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#5f00d2] flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {expert.username}
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg">{expert.username}</h2>
              <p className="text-[#a0a0b0] text-xs mt-0.5">{expert.categoryName} Specialist</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition text-xl px-2"
          >
            ✕
          </button>
        </div>

        {/* MESSAGE LIST */}
        <div className="p-5 h-[70vh] overflow-y-auto custom-scrollbar">
          <MessageList
            messages={expert.messages || []}
            onMessageClick={(m) => console.log("open chat", m)}
            isLoading={false}
          />
        </div>
        <MessageInput onSend={(msg) => console.log("Send:", msg)} />
      </div>

    </div>
  );
}
