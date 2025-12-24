"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowLeft, Send, Plus, X } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import Loading from "@/components/ui/Loading"
import uploadImageToCloudinary from "@/lib/cloudinary/imageUpload"
import { sendMessage, getMessages } from "@/lib/apiFunctions/chatFunctions"

export default function ChatPage() {
  const { conversationId } = useParams()
  const router = useRouter()
  const { data: session } = useSession()

  const currentUserId = session?.user?.id

  const [messagesList, setMessagesList] = useState([])
  const [messageInput, setMessageInput] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fullscreenImage, setFullscreenImage] = useState(null)
  const [sending, setSending] = useState(false)

  const fileInputRef = useRef(null)

  // Load messages
  useEffect(() => {
    const load = async () => {
      try {
        const msgs = await getMessages(conversationId)
        setMessagesList(msgs.reverse())
      } catch (err) {
        console.error("MESSAGE FETCH FAILED", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [conversationId])

  // 🖼 pick ONE image
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedImage(file)
    setMessageInput("") // enforce one-at-a-time
  }

  // ❌ remove image
  const removeImage = () => {
    setSelectedImage(null)
  }

  // 🚀 SEND (text OR image)
  const handleSendMessage = async () => {
    if (sending) return 
    
    // nothing to send
    if (!messageInput.trim() && !selectedImage) return
    
    // block mixed content
    if (messageInput.trim() && selectedImage) return
    
    setSending(true)

    try {
      // 🖼 IMAGE MESSAGE
      if (selectedImage) {
        const res = await uploadImageToCloudinary(
          selectedImage,
          conversationId,
          currentUserId,
          session.user.role
        )

        if (res?.error) throw new Error(res.error)

        // optimistic UI
        setMessagesList((prev) => [...prev, res])

        setSelectedImage(null)
        return
      }

      // TEXT MESSAGE
      const res = await sendMessage(conversationId, messageInput)

      setMessagesList((prev) => [...prev, res.message])
      setMessageInput("")
    } catch (err) {
      console.error("SEND FAILED:", err)
    } finally {
      setSending(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-slate-950">

      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-slate-800">
        <button
          onClick={() => router.back()}
          className="p-2 text-slate-400 hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <h3 className="text-white font-semibold">Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messagesList.map((msg, idx) => {
          const isMine = msg.senderId === currentUserId
          return (
            <div
              key={idx}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              {msg.isImage ? (
                // 🖼 IMAGE → NO BUBBLE
                <img
                  src={msg.content}
                  alt="sent"
                  onClick={() => setFullscreenImage(msg.content)}
                  className="w-40 h-40 rounded-xl object-cover cursor-pointer hover:opacity-90"
                />
              ) : (
                // 💬 TEXT → BUBBLE
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    isMine
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.content}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800">
        {selectedImage && (
          <div className="mb-2 relative w-fit">
            <img
              src={URL.createObjectURL(selectedImage)}
              className="w-20 h-20 rounded object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
            >
              <X size={14} className="text-white" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-400 hover:text-white"
          >
            <Plus size={18} />
          </button>

          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={selectedImage ? "Image selected" : "Type a message"}
            disabled={!!selectedImage}
            className="flex-1 bg-slate-900 text-white px-4 py-2 rounded-full disabled:opacity-50"
       />

          <button
            onClick={handleSendMessage}
            disabled={sending || (!messageInput.trim() && !selectedImage)}
            className="p-2 bg-cyan-500 rounded-full text-white disabled:opacity-50 flex items-center justify-center"
          >
            {sending ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
        </div>
      </div>
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setFullscreenImage(null)}
        >
          <img
            src={fullscreenImage}
            alt="fullscreen"
            className="max-w-[95vw] max-h-[95vh] object-contain"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking image
          />

          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 text-red-400 rounded-full p-2 hover:bg-black"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  )
}
