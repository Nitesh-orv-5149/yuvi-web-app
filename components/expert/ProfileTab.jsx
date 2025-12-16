"use client"

import { expertProfile } from '@/lib/mockData';
import { LogOut, Settings, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '../ui/Loading';
import axios from 'axios';
import Link from 'next/link';

export default function ProfileTab() {

  const { data: session, status } = useSession();
  const user = session?.user

  const [answeredQueries, setAnsweredQueries] = useState([])

  useEffect(() => {

    async function fetchAnsweredQueries() {
      try {
        const response = await axios.get("/api/expert/queries/answered")
        console.log("answered queries: ", response.data)
        setAnsweredQueries(response.data)
      } catch (error) {
        console.error(`error fetching answered queries ${error}`)
      } 
    }

    fetchAnsweredQueries()
  }, []);

  if (status === "loading") {
    return <Loading/>
  }

  return (
    <div className="animate-in fade-in duration-500 pt-6 pb-24 px-4">
      <h2 className="text-2xl font-bold mb-6">
        <span className="bg-gradient-to-r from-[#00d4ff] to-[#4f46e5] bg-clip-text text-transparent">
          Profile
        </span>
      </h2>
      
      <div className="space-y-4">
        {/* Profile Card */}
        <div className="bg-[#020617] border border-[#1f2937] rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#1d4ed8] flex items-center justify-center text-4xl text-white font-bold flex-shrink-0">
              {expertProfile.avatar}
            </div>
            <div className='min-w-0'>
              <h3 className="text-xl font-bold text-white truncate">
                {user.username}
              </h3>
              <p className="text-[#9ca3af] truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Answered Queries List */}
        <div className="bg-[#020617] border border-[#1f2937] rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recently Answered</h3>
          <div className="space-y-3">
            {answeredQueries.map((query) => (
              <Link key={query.queryId}  href={`home/${query.queryId}`}>
                <div className="bg-[#0f172a] border border-[#1f2937] rounded p-3">
                  <p className="flex flex-col justify-center items-start text-white text-sm font-bold line-clamp-2">
                    {query.questionTitle}
                    <span className='font-light text-gray-400'>{query.questionBody}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <button onClick={() => signOut()} className="w-full py-3 px-4 bg-red-900/20 text-red-400 border border-red-900/30 rounded-lg hover:bg-red-900/30 transition font-semibold flex items-center justify-center gap-2 mt-4">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
}