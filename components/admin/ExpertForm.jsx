"use client";

import { useState } from "react";

export default function ExpertForm({ initial, onCancel, onSave }) {
  const [name, setName] = useState(initial?.name || "");
  const [tags, setTags] = useState((initial?.tags || []).join(", "));
  const [bio, setBio] = useState(initial?.bio || "");

  const handleSubmit = () => {
    onSave({
      name,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      bio,
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-blue-100 text-lg font-semibold">
          {initial ? "Edit Expert" : "Add Expert"}
        </h2>

        <button onClick={onCancel} className="text-blue-300 text-sm">
          Close
        </button>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        {/* NAME */}
        <div>
          <label className="text-blue-200 text-xs">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0e1014] text-blue-100 
                       border border-white/10 focus:outline-blue-400"
            placeholder="Expert name"
          />
        </div>

        {/* TAGS */}
        <div>
          <label className="text-blue-200 text-xs">Tags (comma separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0e1014] text-blue-100 
                       border border-white/10 focus:outline-blue-400"
            placeholder="Payments, KYC, Account..."
          />
        </div>

        {/* BIO */}
        <div>
          <label className="text-blue-200 text-xs">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0e1014] text-blue-100 
                       border border-white/10 min-h-[100px] resize-none
                       focus:outline-blue-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-white/5 text-blue-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg 
                       bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                       shadow-md shadow-blue-600/30 hover:scale-105 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
