"use client";
import { useState, useEffect } from "react";

export default function PostForm({ initial, onCancel, onSave, categories = [] }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [query, setQuery] = useState(initial?.query || "");
  const [answer, setAnswer] = useState(initial?.answer || "");

  useEffect(() => {
    setTitle(initial?.title || "");
    setCategory(initial?.category || "");
    setQuery(initial?.query || "");
    setAnswer(initial?.answer || "");
  }, [initial]);

  const label = { color: "#cfe8ff", fontSize: 12 };
  const input = { padding: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "#0f1116", color: "#eaf4ff" };
  const footer = { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 6 };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ color: "#eaf4ff" }}>{initial ? "Edit Post" : "Add Post"}</h3>
        <button onClick={onCancel} style={{ color: "#9fbff0", background: "transparent", border: "none" }}>Close</button>
      </div>

      <div>
        <label style={label}>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" style={input} />
      </div>

      <div>
        <label style={label}>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={input}>
          <option value="">Select category</option>
          {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      <div>
        <label style={label}>Query</label>
        <textarea value={query} onChange={(e) => setQuery(e.target.value)} style={{ ...input, minHeight: 120 }} />
      </div>

      <div>
        <label style={label}>Answer</label>
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} style={{ ...input, minHeight: 120 }} />
      </div>

      <div style={footer}>
        <button onClick={onCancel} style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "#cfe8ff", border: "none" }}>Cancel</button>
        <button onClick={() => onSave({ title, category, query, answer })} style={{ padding: "8px 12px", borderRadius: 8, background: "#6b8cff", color: "#fff", border: "none" }}>Save</button>
      </div>
    </div>
  );
}
