"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/admin/BottomNav";
import BottomSheet from "@/components/admin/BottomSheet";
import PostCard from "@/components/admin/PostCard";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [openSheet, setOpenSheet] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setPosts([
      { 
        id: "1",
        title: "Payment not reflecting",
        category: "Payments",
        query: "I paid but didn't get confirmation",
        updatedAt: Date.now(),
        answersCount: 1
      },
      { 
        id: "2",
        title: "How to reset password?",
        category: "Account",
        query: "I forgot my password",
        updatedAt: Date.now(),
        answersCount: 0
      }
    ]);
  }, []);

  const openNew = () => {
    setEditing(null);
    setOpenSheet(true);
  };

  const openEdit = (post) => {
    setEditing(post);
    setOpenSheet(true);
  };

  const savePost = (data) => {
    if (editing) {
      setPosts((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...data } : p))
      );
    } else {
      setPosts((prev) => [
        { id: Date.now().toString(), ...data },
        ...prev,
      ]);
    }
    setOpenSheet(false);
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-[#0b0d11] to-[#1a1223]">
      {/* CONTENT WRAPPER */}
      <div className="max-w-3xl mx-auto p-5 space-y-4">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold text-[#eaf4ff]">All Posts</h1>

          <button
            onClick={openNew}
            className="px-4 py-2 bg-[#6b8cff] text-white rounded-xl shadow-md hover:opacity-90 transition"
          >
            + Add Post
          </button>
        </header>

        {/* POSTS LIST */}
        <div className="grid gap-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} onOpen={openEdit} />
          ))}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <BottomNav />

      {/* BOTTOM SHEET MODAL */}
      <BottomSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        height={editing ? "85vh" : "75vh"}
      >
        <PostForm
          initial={editing}
          onCancel={() => setOpenSheet(false)}
          onSave={savePost}
        />
      </BottomSheet>
    </div>
  );
}

/* --------------------------- POST FORM --------------------------- */
function PostForm({ initial, onCancel, onSave }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [query, setQuery] = useState(initial?.query || "");
  const [answer, setAnswer] = useState(initial?.answer || "");

  return (
    <div className="text-[#eaf4ff] space-y-4">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {initial ? "Edit Post" : "Add Post"}
        </h3>
        <button
          onClick={onCancel}
          className="text-[#9fbff0] hover:opacity-80 transition"
        >
          Close
        </button>
      </div>

      {/* FORM FIELDS */}
      <div className="space-y-3">

        {/* TITLE */}
        <div>
          <label className="text-xs text-[#cfe8ff]">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0f1116] border border-white/10 text-[#eaf4ff] focus:ring-2 focus:ring-[#6b8cff]"
            placeholder="Post title"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="text-xs text-[#cfe8ff]">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0f1116] border border-white/10 text-[#eaf4ff] focus:ring-2 focus:ring-[#6b8cff]"
            placeholder="Category"
          />
        </div>

        {/* QUERY */}
        <div>
          <label className="text-xs text-[#cfe8ff]">Query</label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0f1116] border border-white/10 text-[#eaf4ff] min-h-[120px] focus:ring-2 focus:ring-[#6b8cff]"
          />
        </div>

        {/* ANSWER */}
        <div>
          <label className="text-xs text-[#cfe8ff]">Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0f1116] border border-white/10 text-[#eaf4ff] min-h-[120px] focus:ring-2 focus:ring-[#6b8cff]"
          />
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-white/10 text-[#cfe8ff] hover:bg-white/20 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => onSave({ title, category, query, answer })}
          className="px-4 py-2 rounded-lg bg-[#6b8cff] text-white shadow hover:opacity-90 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}