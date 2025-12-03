'use client';
import { useState } from 'react';

export default function QueryDetailModal({ query, onClose }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1a2e] border-b border-[#2a2a3e] px-6 py-4 flex justify-between items-center">
          <h2 className="font-bold text-white text-lg">Question Details</h2>
          <button
            onClick={onClose}
            className="text-2xl text-[#a0a0b0] hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Question */}
          <div>
            <div className="flex gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#ff006e] flex items-center justify-center text-white font-bold">
                {query.clientAvatar}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{query.clientName}</p>
                <p className="text-[#a0a0b0] text-xs">{query.createdAt}</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{query.title}</h3>
            <p className="text-[#a0a0b0] mb-3">{query.description}</p>

            <div className="flex gap-2 mb-4">
              <span className="bg-[#00d4ff]/20 text-[#00d4ff] px-3 py-1 rounded-full text-xs font-semibold">
                {query.category}
              </span>
              <span className="bg-[#ff006e]/20 text-[#ff006e] px-3 py-1 rounded-full text-xs font-semibold">
                ⭐ {query.rating}
              </span>
            </div>

            <div className="flex gap-4 text-sm text-[#a0a0b0] border-t border-[#2a2a3e] pt-4">
              <span>👁️ {query.views} Views</span>
              <span>💬 {query.answers} Answers</span>
            </div>
          </div>

          {/* Answers Section */}
          {query.answerList.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Answers ({query.answerList.length})</h3>
              <div className="space-y-4">
                {query.answerList.map((answer) => (
                  <div key={answer.id} className="bg-[#0f0f23] border border-[#2a2a3e] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-semibold text-[#00d4ff]">🎯 {answer.expert}</p>
                      <div className="flex gap-2">
                        <button className="text-[#a0a0b0] hover:text-[#ff006e] text-sm">👍 {answer.likes}</button>
                        <button className="text-[#a0a0b0] hover:text-[#00d4ff] text-sm">🚩 Report</button>
                      </div>
                    </div>
                    <p className="text-[#a0a0b0] text-sm leading-relaxed">{answer.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query.answerList.length === 0 && (
            <div className="bg-[#0f0f23] border border-[#2a2a3e] rounded-lg p-6 text-center">
              <p className="text-[#a0a0b0] mb-4">No answers yet. Be the first to answer!</p>
              <button className="px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#ff006e] text-white rounded-lg font-semibold hover:shadow-lg transition">
                Write an Answer
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 border-t border-[#2a2a3e] pt-6">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${
                liked
                  ? 'bg-[#ff006e]/20 text-[#ff006e] border border-[#ff006e]'
                  : 'bg-[#2a2a3e] text-[#a0a0b0] hover:text-white'
              }`}
            >
              ❤️ Helpful
            </button>
            <button className="flex-1 py-2 px-4 bg-gradient-to-r from-[#00d4ff] to-[#ff006e] text-white rounded-lg font-semibold hover:shadow-lg transition">
              Message Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}