'use client';

import { useRouter } from 'next/navigation';
import NavBar from '../../../../components/admin/adminNavBar';

export default function Posts() {
  const router = useRouter();

  return (
    <>
      <div className="p-6">
        <button 
          onClick={() => router.push('/')}
          className="text-cyan-400 mb-4 flex items-center gap-2"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">All Posts</h2>
        <p className="text-slate-400">No posts available yet.</p>
      </div>
    </>
  );
}
