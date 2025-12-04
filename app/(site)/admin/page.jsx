'use client';

import Link from 'next/link';
import NavBar from '../../../components/admin/adminNavBar';

export default function Home() {
  return (
    <>
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Home</h2>
        <Link
        href={"admin/posts"} 
          className="w-full bg-slate-800 hover:bg-slate-700 text-orange-500 py-4 px-6 rounded-lg border border-slate-700 transition-colors"
        >
          All Posts
        </Link>
        <Link 
        href={"/admin/add-post"}
          className="w-full bg-slate-800 hover:bg-slate-700 text-orange-500 py-4 px-6 rounded-lg border border-slate-700 transition-colors"
        >
          Add Post
        </Link>
        <Link 
        href={"/admin/categories"}
          className="w-full bg-slate-800 hover:bg-slate-700 text-orange-500 py-4 px-6 rounded-lg border border-slate-700 transition-colors"
        >
          Modify Categories
        </Link>
        <Link 
        href={"/admin/experts"}
          className="w-full bg-slate-800 hover:bg-slate-700 text-orange-500 py-4 px-6 rounded-lg border border-slate-700 transition-colors"
        >
          Modify Experts
        </Link>
      </div>
    </>
  );
}