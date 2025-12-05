import axios from "axios";

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

    return res.data;
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    throw err;
  }
}
