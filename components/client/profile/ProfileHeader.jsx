'use client';
import { useSession } from 'next-auth/react';

export default function ProfileHeader() {
  const { data: session } = useSession();

  return (
    <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#ff006e]/10 border border-[#2a2a3e] rounded-lg p-6 sm:p-8 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#8400ff] flex items-center justify-center text-2xl sm:text-4xl text-white shadow-lg">
          {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {session?.user?.name}
          </h1>
          <p className="text-[#a0a0b0] text-sm sm:text-base mb-2">{session?.user?.email}</p>
          <p className="text-[#00d4ff] text-xs sm:text-sm font-medium">Member since 2025</p>
        </div>
      </div>
    </div>
  );
}
