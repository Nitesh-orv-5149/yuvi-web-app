import { Home, MessageSquare, User } from 'lucide-react';

export default function ExpertBottomNav({ activeTab, onTabChange }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'message', icon: MessageSquare, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 shadow-2xl shadow-black/50">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-20 px-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-cyan-400 font-semibold scale-105' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div 
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isActive ? 'bg-cyan-500/20' : 'bg-transparent group-hover:bg-slate-800'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}