'use client';

export default function ClientBottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'post', icon: '➕', label: 'Ask' },
    { id: 'dm', icon: '💬', label: 'Messages' },
    { id: 'experts', icon: '👥', label: 'Experts' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0f0f23]/95 backdrop-blur-md border-t border-[#2a2a3e] px-4 py-2">
      <div className="max-w-2xl mx-auto flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-3 px-3 rounded-lg transition ${
              activeTab === tab.id
                ? 'text-[#00d4ff] bg-[#00d4ff]/10'
                : 'text-[#a0a0b0] hover:text-white'
            }`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}