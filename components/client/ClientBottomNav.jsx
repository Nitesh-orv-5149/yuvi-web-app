"use client";
import { usePathname, useRouter } from "next/navigation";

export default function ClientBottomNav({ activeTab, onTabChange }) {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { id: "home", icon: "🏠", label: "Home", path: "/" },
    { id: "post", icon: "✏️", label: "Ask", path: "/client/create-query" },
    { id: "dm", icon: "💬", label: "Messages", path: "/client/messages" },
    { id: "profile", icon: "👤", label: "Profile", path: "/client/profile" },
  ];

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f0f23] via-[#0f0f23]/95 to-[#0f0f23]/80 backdrop-blur-lg border-t border-[#2a2a3e] px-4 py-2 sm:py-3">
      <div className="max-w-3xl mx-auto flex justify-around">
        {tabs.map((tab) => {
          const active = isActive(tab.path);

          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.path)}
              className={`flex flex-col items-center justify-center py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg transition duration-300 group ${
                active
                  ? "text-[#00d4ff] bg-[#00d4ff]/10"
                  : "text-[#a0a0b0] hover:text-white"
              }`}
            >
              <span
                className={`text-lg sm:text-2xl transition ${
                  active ? "scale-110" : "group-hover:scale-105"
                }`}
              >
                {tab.icon}
              </span>
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}