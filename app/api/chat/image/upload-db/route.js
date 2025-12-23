import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { messages } from "@/lib/schema/index.js"
import { nanoid } from "nanoid"

export async function POST(req) {
  try {
    const {
      conversationId,
      senderId,
      senderRole,
      publicId,
    } = await req.json()

    console.log("payload", await req.json())

    if (!conversationId || !senderId || !senderRole || !publicId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await db.insert(messages).values({
      messageId: nanoid(),
      conversationId,
      senderId,
      senderRole,
      content: publicId,   // Cloudinary public_id
      isImage: true,
      isRead: false,
      deleted: false,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Image message insert failed:", err)
    return NextResponse.json(
      { error: "Failed to add image message" },
      { status: 500 }
    )
  }
}
