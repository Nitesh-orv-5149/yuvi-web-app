'use client';

import ExpertBottomNav from '@/components/expert/ExpertBottomNav';
import ExpertNavbar from '@/components/expert/ExpertNavbar';

export default function ExpertLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ExpertNavbar/>
      <main className="max-w-2xl mx-auto p-0 pb-20">
        {children}
      </main>

      {/* Bottom Navigation Always Fixed */}
      <ExpertBottomNav />
    </div>
  );
}
