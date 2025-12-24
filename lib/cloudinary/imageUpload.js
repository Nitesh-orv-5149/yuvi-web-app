import axios from "axios"
import { is } from "drizzle-orm"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE_MB = 5

function validateImage(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Unsupported file format")
  }

  const sizeMB = file.size / (1024 * 1024)
  if (sizeMB > MAX_SIZE_MB) {
    throw new Error("Image size exceeds 5MB")
  }
}

export default async function uploadImageToCloudinary(
  file,
  conversationId,
  senderId,
  senderRole
) {
  try {
    // 0️⃣ Client-side validation
    validateImage(file)

    // 1️⃣ Upload to Cloudinary
    const form = new FormData()
    form.append("file", file)
    form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: form,
      }
    )

    const data = await res.json()

    if (!res.ok) {
      // Cloudinary error messages are useful
      throw new Error(data?.error?.message || "Upload failed")
    }

    const { public_id, secure_url } = data

    // 2️⃣ Save message to DB   
    const dbRes = await axios.post("/api/chat/send", {
      conversationId,
      content: secure_url,
      isImage: true,
    })

    console.log("upload to cloudinary Res:", dbRes.data)
    return dbRes.data.message 
    
  } catch (err) {
    // Normalize errors for UI
    return {
      error: err.message || "Image upload failed",
    }
  }
}
