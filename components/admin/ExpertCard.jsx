"use client";

export default function ExpertCard({ expert, onEdit, onDelete }) {
  const card = {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 12,
    background: "linear-gradient(180deg, rgba(18,20,24,0.95), rgba(16,18,22,0.95))",
    boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.03)",
  };
  const name = { color: "#eaf4ff", fontSize: 14, fontWeight: 700 };
  const tags = { color: "rgba(159,214,255,0.9)", fontSize: 12, marginTop: 6 };
  const bio = { color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 8 };
  const actions = { display: "flex", flexDirection: "column", gap: 8 };
  const btn = { padding: "6px 10px", borderRadius: 8, border: "none" };

  return (
    <div style={card}>
      <div>
        <h4 style={name}>{expert.name}</h4>
        {expert.tags && <p style={tags}>{expert.tags.join(" • ")}</p>}
        {expert.bio && <p style={bio}>{expert.bio}</p>}
      </div>

      <div style={actions}>
        <button onClick={() => onEdit(expert)} style={{ ...btn, background: "rgba(60,100,200,0.08)", color: "#9fd6ff" }}>Edit</button>
        <button onClick={() => onDelete(expert)} style={{ ...btn, background: "rgba(200,60,60,0.06)", color: "#ff9fa6" }}>Delete</button>
      </div>
    </div>
  );
}
