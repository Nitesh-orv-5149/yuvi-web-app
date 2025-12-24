import axios from "axios";

export async function startConversation(otherUserId) {
  try {
    const res = await axios.post("/api/chat/start", {
      otherUserId,
    });

    return res.data.conversationId;
  } catch (err) {
    console.error("Start conversation failed:", err);

    throw new Error(
      err?.response?.data?.error || "Failed to start conversation"
    );
  }
}

export async function getInbox() {
  try {
    const res = await axios.get("/api/chat/inbox"); 
    return res.data;
  } catch (err) {
    console.error("FETCH INBOX ERROR:", err);
    throw err;
  }
}

export async function getMessages(conversationId, cursor = 0) {
  try {
    const res = await axios.get(`/api/chat/messages`, {
      params: {
        conversationId,
        cursor,
      },
    });

    console.log({params: {
        conversationId,
        cursor,
      }})

    return res.data;
  } catch (err) {
    console.error("GET MESSAGES ERROR:", err);
    throw err;
  }
}

export async function sendMessage(conversationId, content) {
  try {
    const res = await axios.post("/api/chat/send", {
      conversationId,
      content,
    });
    console.log("sendMessage() RESPONSE:", res.data);
    return res.data;
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    throw err;
  }
}
