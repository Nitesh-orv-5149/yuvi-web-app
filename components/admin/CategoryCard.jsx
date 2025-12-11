"use client";

export default function CategoryCard({ category, onEdit, onDelete }) {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-b from-[#16181e]/95 to-[#101218]/95 border border-white/5 shadow-lg shadow-black/40 flex items-center justify-between">

      <div>
        <h4 className="text-white font-semibold text-[15px]">{category.name}</h4>
        {category.desc && (
          <p className="text-white/50 text-sm mt-1">{category.desc}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(category)}
          className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-300 text-sm hover:bg-blue-500/20 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(category)}
          className="px-3 py-1 rounded-lg bg-red-500/10 text-red-300 text-sm hover:bg-red-500/20 transition"
        >
          Delete
        </button>
      </div>

    </div>
  );
}
