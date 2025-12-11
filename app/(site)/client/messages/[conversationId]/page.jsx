"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // or your own method
import { getMessages, sendMessage } from "@/lib/apiFunctions/chatFunctions";
import Loading from "@/components/ui/Loading";

export default function ChatPage() {
  const { conversationId } = useParams();
  const router = useRouter();

  const { data: session } = useSession();
  const currentUserId = session.user.id; 
  
  const [messagesList, setMessagesList] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const msgs = await getMessages(conversationId);
        setMessagesList(msgs.reverse());
      } catch (err) {
        console.error("MESSAGE FETCH FAILED", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    const text = messageInput;
    setMessageInput("");

    try {
      const res = await sendMessage(conversationId, text);

      // append backend message
      setMessagesList((prev) => [...prev, res.message]);
    } catch (err) {
      console.error("SEND MESSAGE FAILED:", err);

      // restore input if sending failed
      setMessageInput(text);
    }
  };

  if (loading) return <Loading/>;

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-slate-950">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-slate-800 bg-slate-900/50">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>

        <h3 className="font-bold text-white text-sm">Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messagesList.map((msg, idx) => {
          const isMine = msg.senderId === currentUserId;

          return (
            <div
              key={idx}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-5 py-3 rounded-2xl ${
                  isMine
                    ? "bg-cyan-600 text-white rounded-br-sm"
                    : "bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-slate-900 border-t border-slate-800">
        <div className="relative">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="w-full pl-4 pr-12 py-3 bg-slate-950 border border-slate-800 rounded-full text-white"
          />

          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-500 text-white rounded-full disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
