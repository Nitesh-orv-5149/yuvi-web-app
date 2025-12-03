// yuvi-web-app/components/expert/HomeTab.jsx
"use client";
import { useState } from 'react';
import { mockQueries } from '@/lib/mockData';
import { ArrowLeft, Send, Clock, CheckCircle2 } from 'lucide-react';

export default function HomeTab() {
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [answer, setAnswer] = useState('');

  const pendingCount = mockQueries.filter(q => q.status === 'pending').length;

  // Detail View
  if (selectedQuery) {
    return (
      <div className="animate-in slide-in-from-right duration-300 pb-24 px-4">
        <button
          onClick={() => setSelectedQuery(null)}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Queries
        </button>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-6 space-y-6 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
            <h2 className="text-xl font-bold text-white leading-tight min-w-0">{selectedQuery.title}</h2>
            <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border border-cyan-500/20 flex-shrink-0">
              {selectedQuery.category}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-400 border-b border-slate-800 pb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
              {selectedQuery.clientAvatar}
            </div>
            <span className="font-medium text-gray-300">{selectedQuery.clientName}</span>
            <span className="text-slate-600">•</span>
            <span>{selectedQuery.createdAt}</span>
          </div>

          <div className="bg-slate-950 p-4 sm:p-5 rounded-lg border border-slate-800">
            <p className="text-slate-300 leading-relaxed">
              {selectedQuery.description}
            </p>
          </div>

          <div className="pt-2">
            <label className="block text-sm font-semibold text-white mb-3">
              Your Answer
            </label>
            <div className="relative group">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your expert answer here..."
                className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 min-h-[150px] resize-none transition-all"
              />
              <button
                className="absolute bottom-4 right-4 p-2.5 bg-cyan-500 text-white rounded-full hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95"
                onClick={() => {
                  if (answer.trim()) {
                    alert('Answer submitted!');
                    setAnswer('');
                    setSelectedQuery(null);
                  }
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="animate-in fade-in duration-500 pb-24 space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col items-center pt-8 space-y-4 px-4 relative">

        {/* Logo moved to top-right */}
        <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 shadow-lg shadow-cyan-500/20 overflow-hidden group hover:scale-105 transition-transform cursor-pointer">
          <img
            src="/yuvilogo.png"
            alt="YuviCollab icon"
            className="w-9 h-9 object-contain"
          />
        </div>

        {/* Central Heading */}
        <h1 className="text-3xl font-bold text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
            Expert Dashboard
          </span>
        </h1>

      </div>

      {/* Pending Queries Stats Box */}
      <div className="mx-auto max-w-full sm:max-w-sm transform hover:scale-[1.02] transition-transform duration-300 px-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-black/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl -mr-10 -mt-10" />

          <div className="relative z-10">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Pending Queries</p>
            <p className="text-3xl font-bold text-white">{pendingCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 relative z-10">
            <Clock size={24} />
          </div>
        </div>
      </div>

      {/* Queries List */}
      <div className="space-y-4 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Client Queries</h2>
          <span className="text-xs text-slate-500">{mockQueries.length} total</span>
        </div>

        <div className="space-y-4">
          {mockQueries.map((query) => (
            <div
              key={query.id}
              onClick={() => setSelectedQuery(query)}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-5 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer group relative overflow-hidden shadow-md"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg shadow-cyan-500/10 text-lg">
                  {query.clientAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors line-clamp-2 text-base pr-16 sm:pr-20 leading-snug">
                      {query.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {query.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md font-medium border border-slate-700">
                      {query.category}
                    </span>
                    <span>•</span>
                    <span>by {query.clientName}</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                {query.status === 'pending' ? (
                  <span className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border border-amber-400/20">
                    <Clock size={12} /> Pending
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border border-emerald-400/20">
                    <CheckCircle2 size={12} /> Answered
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

