"use client";

import { useState, useEffect } from "react";
import BottomNav from "@/components/admin/BottomNav";
import BottomSheet from "@/components/admin/BottomSheet";
import CategoryCard from "@/components/admin/CategoryCard";
import { getCategories, addCategory, deleteCategory, updateCategory } from "@/lib/apiFunctions/categories";
export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Load categories from DB
  useEffect(() => {
    loadCategories();
  }, []);

 async function loadCategories() {
  try {
    const data = await getCategories();
    setCategories(data);
  } catch (err) {
    console.log("Error fetching:", err);
  }
}

  // open add modal
  const openAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  // open edit modal
  const openEdit = (cat) => {
    setEditing(cat);
    setOpen(true);
  };

  // delete category
  const remove = async (cat) => {
     if (!confirm(`Delete category "${cat.name}"?`)) return;
  try {
    await deleteCategory(cat.categoryId); // DELETE API
    setCategories(prev => prev.filter(c => c.categoryId !== cat.categoryId));
    // loadCategories();
  } catch (err) { console.log(err); }
  };

  // add or update category
  const save = async (data) => {
      try {
    if (editing) {
      console.log("→ Updating:", editing.categoryId, data);
      await updateCategory(editing.categoryId, data);
      

      // locally update UI instantly
      setCategories(prev =>
        prev.map(c =>
          c.categoryId === editing.categoryId ? { ...c, ...data } : c
        )
      );

    } else {
      console.log("→ Adding new:", data);
      await addCategory(data);

      // refresh so UI shows new one
      loadCategories();
    }

    setOpen(false);
    setEditing(null);

  } catch (err) {
    console.log(err);
  }
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

        {/* Category Cards */}
        <div className="space-y-3">
          {categories.map((c) => (
            <CategoryCard
              key={c.categoryId}
              category={c}
              onEdit={() => openEdit(c)}
              onDelete={() => remove(c)}
            />
          ))}
        </div>
      </div>

      <BottomNav />

      {/* Modal */}
      <BottomSheet open={open} onClose={() => setOpen(false)} height="45vh">
        <CategoryForm initial={editing} onCancel={() => setOpen(false)} onSave={save} />
      </BottomSheet>
    </div>
  );
}

function CategoryForm({ initial, onCancel, onSave }) {
  const [name, setName] = useState(initial?.name || "");
  const [desc, setDesc] = useState(initial?.desc || "");

  useEffect(() => {
    setName(initial?.name || "");
    setDesc(initial?.desc || "");
  }, [initial]);
  return (
    <div className="text-white space-y-4">

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{initial ? "Edit Category" : "Add Category"}</h3>
        <button onClick={onCancel} className="text-blue-300 hover:text-blue-400 transition">Close</button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-blue-200">Name</label>
          <input
            className="w-full px-3 py-2 rounded-lg bg-[#0f1116] border border-white/10 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-blue-200">Description</label>
          <input
            className="w-full px-3 py-2 rounded-lg bg-[#0f1116] border border-white/10 text-white"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-white/5 text-blue-200">Cancel</button>
        <button onClick={() => onSave({ name, desc })} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          Save
        </button>
      </div>

    </div>
  );
}
