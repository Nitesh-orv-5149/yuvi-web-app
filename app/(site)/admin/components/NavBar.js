'use client';

import { Home, Menu, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 flex justify-around items-center py-3 px-4">
      <button 
        onClick={() => router.push('/')}
        className={`flex flex-col items-center ${pathname === '/' ? 'text-cyan-400' : 'text-slate-400'}`}
      >
        <Home size={24} />
      </button>
      <button 
        onClick={() => router.push('/menu')}
        className={`flex flex-col items-center ${pathname === '/menu' ? 'text-cyan-400' : 'text-slate-400'}`}
      >
        <Menu size={24} />
      </button>
      <button 
        onClick={() => router.push('/experts')}
        className={`flex flex-col items-center ${pathname === '/experts' ? 'text-cyan-400' : 'text-slate-400'}`}
      >
        <User size={24} />
      </button>
    </div>
  );
}
