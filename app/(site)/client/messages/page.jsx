// 'use client';
// import { useState, useEffect } from 'react';
// import MessageList from '@/components/client/expert-dm/MessageList';
// import ExpertChatModal from '@/components/client/modals/ExpertChatModal';
// import axios from 'axios';

import InboxPage from "@/components/expert/MessageTab";
import { isFunctionDeclaration } from "typescript";

// export default function ExpertDMPage() {
//   const [messages, setMessages] = useState([]);
//   const [selectedMessage, setSelectedMessage] = useState(null);

//   useEffect(() => {
//     const loadMessages = async () => {
//       try {
//         const res = await axios.get('/api/chat/inbox');
//         console.log('Inbox Data:', res.data);

//         // Map API response to the shape expected by MessageList
//         const formattedMessages = res.data.map((convo) => ({
//           id: convo.conversationId,
//           expertId: convo.expertId,
//           expertName: convo.expertName,
//           lastMessageId: convo.lastMessageId,
//           updatedAt: convo.updatedAt,
//         }));

//         setMessages(formattedMessages);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     loadMessages();
//   }, []);

//   return (
//     <div className="animate-fadeIn">
//       <div className="mb-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
//           <span className="bg-gradient-to-r from-[#00d4ff] to-[#ff006e] bg-clip-text text-transparent">
//             Messages
//           </span>
//         </h1>
//         <p className="text-[#a0a0b0] text-sm sm:text-base">
//           Keep in touch with experts you're working with
//         </p>
//       </div>

//       <MessageList messages={messages} onMessageClick={setSelectedMessage} />

//       {selectedMessage && (
//         <ExpertChatModal
//           expert={selectedMessage}
//           onClose={() => setSelectedMessage(null)}
//         />
//       )}
//     </div>
//   );
// }


export default function messagesPage() {
  return <InboxPage/>
}