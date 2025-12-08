"use client";

import { useState, useEffect } from "react";
import BottomNav from "@/components/admin/BottomNav";
import BottomSheet from "@/components/admin/BottomSheet";
import ExpertCard from "@/components/admin/ExpertCard";
import ExpertForm from "@/components/admin/ExpertForm";

export default function ExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [openSheet, setOpenSheet] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    // Mock data (replace with API)
    setExperts([
      { id: "e1", name: "Alice Kumar", tags: ["Payments", "KYC"], bio: "Payments specialist" },
      { id: "e2", name: "Rahul Singh", tags: ["Account"], bio: "Account support expert" },
    ]);
  }, []);

  const openAdd = () => {
    setEditing(null);
    setOpenSheet(true);
  };

  const openEdit = (expert) => {
    setEditing(expert);
    setOpenSheet(true);
  };

  const removeExpert = (expert) => {
    if (!confirm(`Delete expert "${expert.name}"?`)) return;
    setExperts((prev) => prev.filter((x) => x.id !== expert.id));
  };

  const saveExpert = (data) => {
    if (editing) {
      setExperts((prev) =>
        prev.map((ex) => (ex.id === editing.id ? { ...ex, ...data } : ex))
      );
    } else {
      setExperts((prev) => [
        { id: Date.now().toString(), ...data },
        ...prev,
      ]);
    }
    setOpenSheet(false);
  };

  return (
    <div className="min-h-screen pb-24 bg-[linear-gradient(180deg,#0b0d11,#1a1223)]">

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-blue-100 drop-shadow">Experts</h1>

          <button
            onClick={openAdd}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white shadow-md shadow-blue-600/30 hover:scale-105 transition"
          >
            + Add
          </button>
        </div>

        {/* Expert cards */}
        <div className="grid gap-4">
          {experts.map((expert) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
              onEdit={openEdit}
              onDelete={removeExpert}
            />
          ))}
        </div>
      </div>

      <BottomNav />

      {/* Bottom Sheet */}
      <BottomSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        height="60vh"
      >
        <ExpertForm
          initial={editing}
          onCancel={() => setOpenSheet(false)}
          onSave={saveExpert}
        />
      </BottomSheet>
    </div>
  );
}
