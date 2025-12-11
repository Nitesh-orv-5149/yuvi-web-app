'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/client/home'); // or '/client/home' if you kept client in the path
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0f0f23]">
      <div className="animate-spin">
        <div className="w-16 h-16 border-4 border-[#00d4ff] border-t-[#ff006e] rounded-full" />
      </div>
    </div>
  );
}
