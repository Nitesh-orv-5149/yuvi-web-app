'use client';
import { useState } from 'react';

export default function ExpertDetailPage({ expert, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">

      <div className="w-full md:max-w-lg bg-[#121225] rounded-3xl overflow-hidden  animate-slideUp">
        
        {/* HEADER */}
        <div className="relative px-6 py-6 bg-linear-to-br from-[#00d4ff]/20 via-[#5f00d2]/10 to-[#ff006e]/20 border-b border-white/5">
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/50 hover:text-white transition"
          >
            ✕
          </button>

          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#00d4ff] to-[#5f00d2] flex items-center justify-center text-white text-2xl font-bold shadow-xl">
              {expert.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-white font-bold text-xl tracking-wide">
                {expert.username}
              </h2>
              <p className="text-[#a0a0b0] text-sm mt-1">
                {expert.categoryName} Specialist
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="px-8 py-5 bg-[#0f0f23] border-b border-white/5">
          <div className="grid grid-cols-1 text-center">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold bg-linear-to-r from-[#00d4ff] to-[#5f00d2] bg-clip-text text-transparent">
                {expert.answersCount}
              </p>
              <span className="text-[#a0a0b0] text-xs tracking-wider mt-1">
                TOTAL ANSWERS
              </span>
            </div>
          </div>
        </div>

        {/* BIO */}
        <div className="p-6 text-white">
          <h3 className="font-semibold text-lg mb-4">About {expert.username}</h3>

          <div className="bg-[#161628] border border-white/5 rounded-2xl p-5 shadow-inner shadow-black/40">
            <p className="text-[#c2c2d0] text-sm leading-relaxed">
              {expert.bio || (
                <span className="text-[#6f6f85]">
                  This expert has not added a bio yet.
                </span>
              )}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
