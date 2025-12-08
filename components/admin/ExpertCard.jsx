"use client";

export default function ExpertCard({ expert, onEdit, onDelete }) {
  return (
    <div
      className="p-4 rounded-xl bg-[linear-gradient(180deg,#16181e,#101217)] 
                 shadow-lg shadow-black/40 border border-white/5 flex justify-between gap-4"
    >
      <div>
        <h3 className="text-blue-100 text-sm font-semibold">{expert.name}</h3>

        {expert.tags?.length > 0 && (
          <p className="text-[12px] text-blue-300/80 mt-1">
            {expert.tags.join(" • ")}
          </p>
        )}

        {expert.bio && (
          <p className="text-xs text-white/40 mt-2 leading-relaxed">
            {expert.bio}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => onEdit(expert)}
          className="px-3 py-1 rounded-md text-[12px] 
                     bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(expert)}
          className="px-3 py-1 rounded-md text-[12px] 
                     bg-red-600/20 text-red-300 hover:bg-red-600/30 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
