'use client';
import { useState } from 'react';
// Corrected relative imports
import HomeTab from './expertComponents/HomeTab';
import MessageTab from './expertComponents/MessageTab';
import ProfileTab from './expertComponents/ProfileTab';
import ExpertBottomNav from './expertComponents/ExpertBottomNav';
import { LogOut } from 'lucide-react';

export default function ExpertPage() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'message':
        return <MessageTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] pb-28 text-white">
      
      {/* Top Navigation / Header */}
      <nav className="sticky top-0 z-40 px-4 py-3 sm:p-4 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Expert Dashboard
            </span>
          </h1>
          <button className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-slate-800">
             <LogOut size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content Area - Responsive Container */}
      {/* Allows full width on mobile (max-w-full) and centers on larger screens (sm:max-w-2xl sm:mx-auto) */}
      <main className="px-4 py-6 max-w-full sm:max-w-2xl mx-auto sm:mx-auto"> 
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <ExpertBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}