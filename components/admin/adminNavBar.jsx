'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, User } from 'lucide-react';

export default function AdminNavBar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `flex flex-col items-center ${
      pathname === path ? 'text-cyan-400' : 'text-slate-400'
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 flex justify-around items-center py-3 px-4">
      <Link href="/admin" className={linkClass('/admin')}>
        <Home size={24} />
      </Link>

      <Link href="/admin/menu" className={linkClass('/admin/menu')}>
        <Menu size={24} />
      </Link>

      <Link href="/admin/experts" className={linkClass('/admin/experts')}>
        <User size={24} />
      </Link>
    </div>
  );
}
