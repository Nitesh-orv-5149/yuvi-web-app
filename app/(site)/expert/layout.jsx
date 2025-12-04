'use client';

import ExpertBottomNav from '@/components/expert/ExpertBottomNav';

export default function ExpertLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="max-w-2xl mx-auto p-0 pb-20">
        {children}
      </main>

      {/* Bottom Navigation Always Fixed */}
      <ExpertBottomNav />
    </div>
  );
}
