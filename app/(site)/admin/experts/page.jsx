"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../../../components/admin/BottomNav";
import BottomSheet from "../../../../components/admin/BottomSheet";
import ExpertCard from "../../../../components/admin/ExpertCard";

export default function ExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setExperts([
      { id: "e1", name: "Alice Kumar", tags: ["Payments", "KYC"], bio: "Payments specialist" },
      { id: "e2", name: "Rahul Singh", tags: ["Account"], bio: "Account support" },
    ]);
  }, []);

  function openAdd() {
    setEditing(null);
    setOpen(true);
  }
  function openEdit(ex) {
    setEditing(ex);
    setOpen(true);
  }
  function remove(ex) {
    if (!confirm(`Delete expert "${ex.name}"?`)) return;
    setExperts((prev) => prev.filter((e) => e.id !== ex.id));
  }
  function save(data) {
    if (editing) {
      setExperts((prev) => prev.map((e) => (e.id === editing.id ? { ...e, ...data } : e)));
    } else {
      setExperts((prev) => [{ id: Date.now().toString(), ...data }, ...prev]);
    }
    setOpen(false);
  }

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 84, background: "linear-gradient(180deg,#0b0d11,#1a1223)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h1 style={{ color: "#eaf4ff", fontSize: 20 }}>Experts</h1>
          <button onClick={openAdd} style={{ background: "#6b8cff", color: "#fff", padding: "8px 12px", borderRadius: 10, border: "none" }}>+ Add</button>
        </header>

        <div style={{ display: "grid", gap: 12 }}>
          {experts.map((e) => <ExpertCard key={e.id} expert={e} onEdit={openEdit} onDelete={remove} />)}
        </div>
      </div>

      <BottomNav />

      <BottomSheet open={open} onClose={() => setOpen(false)} height={"50vh"}>
        <ExpertForm initial={editing} onCancel={() => setOpen(false)} onSave={save} />
      </BottomSheet>
    </div>
  );
}

function ExpertForm({ initial, onCancel, onSave }) {
  const [name, setName] = useState(initial?.name || "");
  const [tags, setTags] = useState((initial?.tags || []).join(", "));
  const [bio, setBio] = useState(initial?.bio || "");

  useEffect(() => {
    setName(initial?.name || "");
    setTags((initial?.tags || []).join(", ") || "");
    setBio(initial?.bio || "");
  }, [initial]);

  const label = { color: "#cfe8ff", fontSize: 12 };
  const input = { padding: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "#0f1116", color: "#eaf4ff" };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ color: "#eaf4ff" }}>{initial ? "Edit Expert" : "Add Expert"}</h3>
        <button onClick={onCancel} style={{ color: "#9fbff0", background: "transparent", border: "none" }}>Close</button>
      </div>

      <div>
        <label style={label}>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={input} />
      </div>

      <div>
        <label style={label}>Tags (comma separated)</label>
        <input value={tags} onChange={(e) => setTags(e.target.value)} style={input} />
      </div>

      <div>
        <label style={label}>Bio (optional)</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} style={{ ...input, minHeight: 120 }} />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button onClick={onCancel} style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "#cfe8ff", border: "none" }}>Cancel</button>
        <button onClick={() => onSave({ name, tags: tags.split(",").map((t) => t.trim()).filter(Boolean), bio })} style={{ padding: "8px 12px", borderRadius: 8, background: "#6b8cff", color: "#fff", border: "none" }}>Save</button>
      </div>
    </div>
  );
}
