"use client";

import { usePathname, useRouter } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Posts", icon: "🏠", path: "/admin" },
    { label: "Categories", icon: "📂", path: "/admin/categories" },
    { label: "Experts", icon: "👤", path: "/admin/experts" },
  ];

  const barStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-around",
    padding: "12px 8px",
    gap: 8,
    zIndex: 60,
    background: "linear-gradient(180deg, rgba(10,11,14,0.95), rgba(17,20,27,0.98))",
    borderTop: "1px solid rgba(255,255,255,0.04)",
  };

  const tabBase = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 10,
    border: "none",
    background: "transparent",
    color: "rgba(255,255,255,0.6)",
  };

  const activeStyle = {
    background: "linear-gradient(90deg, rgba(57,120,255,0.12), rgba(220,60,200,0.08))",
    color: "#9fd6ff",
    boxShadow: "0 6px 18px rgba(30,30,60,0.35)",
  };

  return (
    <nav style={barStyle}>
      {tabs.map((t) => (
        <button
          key={t.path}
          onClick={() => router.push(t.path)}
          style={{ ...(tabBase), ...(pathname === t.path ? activeStyle : {}) }}
        >
          <span style={{ fontSize: 18 }}>{t.icon}</span>
          <span style={{ fontSize: 11 }}>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
