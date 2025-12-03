'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, User } from 'lucide-react';

export default function ExpertBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/expert/home' },
    { id: 'message', icon: MessageSquare, label: 'Messages', path: '/expert/messages' },
    { id: 'profile', icon: User, label: 'Profile', path: '/expert/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/60 backdrop-blur-xl border-t border-slate-800 py-2 px-8 z-50">
      <div className="flex justify-between max-w-2xl mx-auto">
        {navItems.map((item) => {
          const active = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex flex-col items-center gap-1 text-sm font-medium transition-all ${
                active ? 'text-cyan-400' : 'text-slate-500 hover:text-cyan-300'
              }`}
            >
              <Icon size={22} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
