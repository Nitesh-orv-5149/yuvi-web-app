"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaFolderOpen, FaUser } from "react-icons/fa";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Home", icon: <FaHome />, path: "/admin" },
    { label: "Categories", icon: <FaFolderOpen />, path: "/admin/categories" },
    { label: "Experts", icon: <FaUser />, path: "/admin/experts" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#0b0d11]/90 to-[#141418]/95 border-t border-white/5 px-3 py-3">
      <div className="max-w-5xl mx-auto flex justify-around items-center">
        {tabs.map((tab) => {
          const active = pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={
                "flex flex-col items-center gap-1 text-[12px] px-3 py-2 rounded-lg transition-all " +
                (active
                  ? "bg-gradient-to-r from-[#3b82f6]/10 to-[#a78bfa]/8 text-sky-200 shadow-md"
                  : "text-white/60 hover:text-white/80")
              }
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="leading-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
