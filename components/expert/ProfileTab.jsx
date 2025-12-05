"use client"

import { expertProfile } from '@/lib/mockData';
import { LogOut, Settings, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '../ui/Loading';
import { fetchAllQueries } from '@/lib/fetchFunctions/fetchAllQueries';
import axios from 'axios';

export default function ProfileTab() {

  const { data: session, status } = useSession();
  const user = session.user

  const [numberOfQueries, setNumberOfQueries] = useState(0)
  const [answeredQueries, setAnsweredQueries] = useState([])

  useEffect(() => {
    async function fetchQueries() {
      const res = await fetchAllQueries();
      setNumberOfQueries(res.length);
    }

    async function fetchAnsweredQueries() {
      try {
        const response = await axios.get("/api/expert/queries/answered")
        console.log("answered queries: ", response.data)
        setAnsweredQueries(response.data)
      } catch (error) {
        console.error(`error fetching answered queries ${error}`)
      } 
    }

    fetchQueries();
    fetchAnsweredQueries()
  }, []);

  if (status === "loading") {
    <Loading/>
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

          {/* Stat Grid - 1 column on mobile, 3 columns on small screens and up */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 border-t border-[#1f2937] pt-6">
            <div className="text-center bg-[#0f172a] sm:bg-transparent p-3 sm:p-0 rounded-lg">
              <div className="text-2xl font-bold text-[#00d4ff]">{numberOfQueries}</div>
              <p className="text-[#6b7280] text-xs">Queries</p>
            </div>
            <div className="text-center bg-[#0f172a] sm:bg-transparent p-3 sm:p-0 rounded-lg">
              <div className="text-2xl font-bold text-[#38bdf8]">{answeredQueries.length}</div>
              <p className="text-[#6b7280] text-xs">Answers</p>
            </div>
          </div>
        </div>

        {/* Answered Queries List */}
        <div className="bg-[#020617] border border-[#1f2937] rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recently Answered</h3>
          <div className="space-y-3">
            {answeredQueries.map((query) => (
              <div key={query.queryId} className="bg-[#0f172a] border border-[#1f2937] rounded p-3">
                <p className="text-white text-sm font-semibold line-clamp-2">
                  {query.questionTitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-3 px-4 bg-[#020617] text-[#e5e7eb] border border-[#1f2937] rounded-lg hover:bg-[#1f2937] transition font-semibold flex items-center justify-center gap-2">
          <User size={18} /> Edit Profile
        </button>
        <button onClick={() => signOut()} className="w-full py-3 px-4 bg-red-900/20 text-red-400 border border-red-900/30 rounded-lg hover:bg-red-900/30 transition font-semibold flex items-center justify-center gap-2 mt-4">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
}