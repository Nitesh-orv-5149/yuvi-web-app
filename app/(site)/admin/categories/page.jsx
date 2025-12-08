"use client";

import { useState, useEffect } from "react";
import BottomNav from "@/components/admin/BottomNav";
import BottomSheet from "@/components/admin/BottomSheet";
import CategoryCard from "@/components/admin/CategoryCard";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setCategories([
      { id: "c1", name: "Payments", desc: "Payment & billing related" },
      { id: "c2", name: "Account", desc: "Account and settings" },
    ]);
  }, []);

  const openAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setOpen(true);
  };

  const remove = (cat) => {
    if (!confirm(`Delete category "${cat.name}"?`)) return;
    setCategories((prev) => prev.filter((c) => c.id !== cat.id));
  };

  const save = (data) => {
    if (editing) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editing.id ? { ...c, ...data } : c))
      );
    } else {
      setCategories((prev) => [
        { id: Date.now().toString(), ...data },
        ...prev,
      ]);
    }
    setOpen(false);
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-[#0b0d11] to-[#1a1223] animate-fadeIn">
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Categories</h1>

          <button
            onClick={openAdd}
            className="px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 shadow-md shadow-blue-500/20 hover:scale-[1.02] transition"
          >
            + Add
          </button>
        </div>

        {/* Category List */}
        <div className="space-y-3">
          {categories.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              onEdit={openEdit}
              onDelete={remove}
            />
          ))}
        </div>
      </div>

      <BottomNav />

      {/* Bottom Sheet */}
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        height="45vh"
      >
        <CategoryForm
          initial={editing}
          onCancel={() => setOpen(false)}
          onSave={save}
        />
      </BottomSheet>
    </div>
  );
}

function CategoryForm({ initial, onCancel, onSave }) {
  const [name, setName] = useState(initial?.name || "");
  const [desc, setDesc] = useState(initial?.desc || "");

  return (
    <div className="text-white space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">
          {initial ? "Edit Category" : "Add Category"}
        </h3>

        <button
          onClick={onCancel}
          className="text-blue-300 hover:text-blue-400 transition"
        >
          Close
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">

        <div className="space-y-1">
          <label className="text-sm text-blue-200">Name</label>
          <input
            className="w-full px-3 py-2 rounded-lg bg-[#0f1116] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-blue-200">Description</label>
          <input
            className="w-full px-3 py-2 rounded-lg bg-[#0f1116] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-white/5 text-blue-200 hover:bg-white/10 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => onSave({ name, desc })}
          className="px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
