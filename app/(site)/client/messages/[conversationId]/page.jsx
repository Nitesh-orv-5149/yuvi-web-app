"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Send, Plus, Image, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getMessages, sendMessage } from "@/lib/apiFunctions/chatFunctions";
import Loading from "@/components/ui/Loading";


export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const conversationId = params.conversationId;
  
  const [messagesList, setMessagesList] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);


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
    if (!messageInput.trim() && selectedImages.length === 0) return;
    const text = messageInput;
    setMessageInput("");
    try {
      const res = await sendMessage(conversationId, text, selectedImages);
      setMessagesList((prev) => [...prev, res.message]);
      setSelectedImages([]);
    } catch (err) {
      console.error("SEND MESSAGE FAILED:", err);
      setMessageInput(text);
    }
  };


  const handleImageSelect = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...newImages]);
      setShowImagePicker(false);
    }
  };


  const removeImage = (indexToRemove) => {
    setSelectedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };


  if (loading) return <Loading />;


  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-slate-950">
      <div className="flex items-center gap-4 p-4 border-b border-slate-800 bg-slate-900/50">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <h3 className="font-bold text-white text-sm">Chat</h3>
      </div>


      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messagesList.map((msg, idx) => {
          const isMine = msg.senderId === currentUserId;
          return (
            <div key={idx} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-5 py-3 rounded-2xl ${
                  isMine
                    ? "bg-cyan-600 text-white rounded-br-sm"
                    : "bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700"
                }`}
              >
                {msg.content}
                {msg.images && msg.images.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.images.map((img, imgIdx) => (
                      <img
                        key={imgIdx}
                        src={img}
                        alt="Sent image"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>


      <div className="fixed bottom-20 left-0 right-0 p-4 bg-slate-900 border-t border-slate-800">
        <div className="flex flex-col gap-2">
          {selectedImages.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-slate-800 rounded-lg">
              {selectedImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 pl-12 pr-12 py-3 bg-slate-950 border border-slate-800 rounded-full text-white placeholder-slate-500"
            />

            <button
              onClick={() => setShowImagePicker(true)}
              className="absolute left-3 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            >
              <Plus size={18} />
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim() && selectedImages.length === 0}
              className="absolute right-2 p-2 bg-cyan-500 text-white rounded-full disabled:opacity-50 hover:bg-cyan-600 disabled:hover:bg-cyan-500 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>


      {showImagePicker && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-2xl w-full max-w-md max-h-[70vh] overflow-y-auto border border-slate-800">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h3 className="font-bold text-white text-lg">Select Images</h3>
              <button
                onClick={() => setShowImagePicker(false)}
                className="p-2 hover:bg-slate-800 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div
                className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-slate-600 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image className="mx-auto mb-4 text-slate-400" size={48} />
                <p className="text-slate-400 mb-1">Click to select images</p>
                <p className="text-sm text-slate-500">PNG, JPG up to 10MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}