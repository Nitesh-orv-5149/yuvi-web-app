"use client";

import { useState, useEffect } from "react";
import BottomNav from "../../../components/admin/BottomNav";
import BottomSheet from "../../../components/admin/BottomSheet";
import PostCard from "../../../components/admin/PostCard";
import PostForm from "../../../components/admin/PostForm";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [openSheet, setOpenSheet] = useState(false);
  const [editing, setEditing] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // mock data — swap with API
    setPosts([
      { id: "1", title: "Payment not reflecting", category: "Payments", query: "I paid but didn't get confirmation", updatedAt: Date.now(), answersCount: 1 },
      { id: "2", title: "How to reset password?", category: "Account", query: "I forgot my password", updatedAt: Date.now(), answersCount: 0 },
    ]);
    setCategories([{ id: "c1", name: "Payments" }, { id: "c2", name: "Account" }]);
  }, []);

  function openNew() {
    setEditing(null);
    setOpenSheet(true);
  }

  function openEdit(post) {
    setEditing(post);
    setOpenSheet(true);
  }

  function savePost(data) {
    if (editing) {
      setPosts((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...data } : p)));
    } else {
      setPosts((prev) => [{ id: Date.now().toString(), updatedAt: Date.now(), answersCount: 0, ...data }, ...prev]);
    }
    setOpenSheet(false);
  }

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 84, background: "linear-gradient(180deg,#0b0d11,#1a1223)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h1 style={{ color: "#eaf4ff", fontSize: 20 }}>All Posts</h1>
          <button onClick={openNew} style={{ background: "#6b8cff", color: "#fff", padding: "8px 12px", borderRadius: 10, border: "none" }}>+ Add Post</button>
        </header>

        <div style={{ display: "grid", gap: 12 }}>
          {posts.map((p) => <PostCard key={p.id} post={p} onOpen={openEdit} />)}
        </div>
      </div>

      <BottomNav />

      <BottomSheet open={openSheet} onClose={() => setOpenSheet(false)} height={editing ? "85vh" : "75vh"}>
        <div style={{ paddingBottom: 6 }}>
          <PostForm initial={editing} onCancel={() => setOpenSheet(false)} onSave={savePost} categories={categories} />
        </div>
      </BottomSheet>
    </div>
  );
}
