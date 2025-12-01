'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function ClientNavbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f23]/80 backdrop-blur-md border-b border-[#2a2a3e] px-4 py-4">
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#ff006e] rounded-xl flex items-center justify-center">
            <span className="text-lg">💡</span>
          </div>
          <span className="font-bold text-lg gradient-text">Expert QA</span>
        </Link>

        <div className="flex items-center gap-4">
          {session && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#ff006e] flex items-center justify-center text-white text-xs font-bold">
                {session.user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/signin' })}
                className="text-xs bg-[#ff006e]/20 text-[#ff006e] px-2 py-1 rounded hover:bg-[#ff006e]/30 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}