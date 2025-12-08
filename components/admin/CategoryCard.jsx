"use client";

export default function CategoryCard({ category, onEdit, onDelete }) {
  const card = {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    background: "linear-gradient(180deg, rgba(18,20,24,0.95), rgba(16,18,22,0.95))",
    boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.03)",
  };
  const name = { color: "#eaf4ff", fontSize: 14, fontWeight: 600 };
  const desc = { color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 4 };
  const actions = { display: "flex", gap: 8 };
  const btnEdit = { background: "rgba(60,100,200,0.08)", color: "#9fd6ff", padding: "6px 10px", borderRadius: 8, border: "none" };
  const btnDel = { background: "rgba(200,60,60,0.06)", color: "#ff9fa6", padding: "6px 10px", borderRadius: 8, border: "none" };

  return (
    <div style={card}>
      <div>
        <h4 style={name}>{category.name}</h4>
        {category.desc && <p style={desc}>{category.desc}</p>}
      </div>

      <div style={actions}>
        <button onClick={() => onEdit(category)} style={btnEdit}>Edit</button>
        <button onClick={() => onDelete(category)} style={btnDel}>Delete</button>
      </div>
    </div>
  );
}
