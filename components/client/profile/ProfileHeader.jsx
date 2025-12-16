'use client';
import { useSession } from 'next-auth/react';

export default function ProfileHeader() {
  const { data: session } = useSession();

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-6 sm:p-8 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-600 flex items-center justify-center text-2xl sm:text-4xl text-white shadow-lg">
          {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {session?.user?.name}
          </h1>
          <p className="text-[#a0a0b0] text-sm sm:text-base mb-2">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
}
