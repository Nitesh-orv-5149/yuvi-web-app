"use client";

export default function PostCard({ post, onOpen }) {
  const cardStyle = {
    background: "linear-gradient(180deg, rgba(22,24,30,0.95), rgba(18,20,26,0.95))",
    borderRadius: 12,
    padding: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.03)",
  };

  const titleStyle = { color: "#e6eef8", fontWeight: 600, fontSize: 14 };
  const catStyle = {
    background: "rgba(80,120,200,0.12)",
    padding: "4px 8px",
    borderRadius: 999,
    fontSize: 11,
    color: "#9fd6ff",
  };

  const queryStyle = { color: "#cbd8ea", marginTop: 8, fontSize: 13, opacity: 0.95 };
  const footerStyle = { display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.45)" };

  return (
    <article style={cardStyle} onClick={() => onOpen(post)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3 style={titleStyle}>{post.title || "Untitled"}</h3>
        <span style={catStyle}>{post.category || "Uncategorized"}</span>
      </div>
      <p style={queryStyle}>{post.query}</p>
      <div style={footerStyle}>
        <span>{post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : ""}</span>
        <span>{post.answersCount ? `${post.answersCount} answers` : ""}</span>
      </div>
    </article>
  );
}
