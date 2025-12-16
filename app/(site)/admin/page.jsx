"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/admin/BottomNav";
import axios from "axios";
import QueryCard from "@/components/admin/QueryCard";
import Link from "next/link";
import Image from "next/image";
import QueryDetailModal from "@/components/admin/QueryDetailModal";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/queries");
        setPosts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const onQuerySelect = (p) => {
    setSelectedQuery(p);
  };

  return (
    <div className="min-h-screen pb-24 bg-linear-to-b from-[#0b0d11] to-[#1a1223]">
      {/* CONTENT WRAPPER */}
      <div className="max-w-3xl mx-auto p-5 space-y-4">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold text-[#eaf4ff]">All Posts</h1>
          <Link href="/admin" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/yuvilogo.png"
              alt="YuviCollab logo"
              width={28}
              height={28}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                YuviCollab
              </span>
              <span className="text-[10px] sm:text-xs text-[#a0a0b0]">
                Admin Portal
              </span>
            </div>
          </Link>
        </header>

        {/* POSTS LIST */}
        <div className="grid gap-4">
          {posts.map((p) => (
            <QueryCard
              key={p.queryId}
              query={p}
              onClick={() => onQuerySelect(p)}
            />
          ))}
        </div>
      </div>

      {selectedQuery && (
        <QueryDetailModal
          query={selectedQuery}
          onClose={() => setSelectedQuery(null)}
          isAdmin={true}
        />
      )}

      {/* BOTTOM NAV */}
      <BottomNav />
    </div>
  );
}
