"use client";

import { useEffect, useState } from "react";
import { getInbox } from "@/lib/apiFunctions/chatFunctions";
import Link from "next/link";
import Loading from "../ui/Loading";

export default function InboxPage() {
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const loadInbox = async () => {
      try {
        const data = await getInbox();
        setInbox(data);
      } catch (err) {
        console.error("INBOX LOAD FAILED:", err);
      } finally {
        setLoading(false)
      }
    };

    loadInbox();
  }, []);

  if (loading) return <Loading/>

  return (
    <div className="pb-24 pt-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Messages</h2>

      <div className="space-y-3">
        {inbox.map((convo) => {
          const name = convo.clientName || convo.expertName;

          return (
            <Link href={`messages/${convo.conversationId}`} key={convo.conversationId}>
              <div
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                    {name?.[0]?.toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{name}</h3>
                    <p className="text-slate-500 text-sm">
                      Tap to view conversation
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
