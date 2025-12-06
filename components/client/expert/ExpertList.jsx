'use client';
import ExpertCard from './ExpertCard';

export default function ExpertList({ experts, onViewClick, onMessageClick, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-4 animate-pulse">
            <div className="h-14 bg-[#2a2a3e] rounded-full w-14 mb-4"></div>
            <div className="h-4 bg-[#2a2a3e] rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-[#2a2a3e] rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (experts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">👨‍💼</div>
        <p className="text-[#a0a0b0] font-medium">No experts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>👨‍💼</span>
        <span>Browse Experts</span>
        <span className="ml-auto bg-[#2a2a3e] text-[#a0a0b0] px-2 py-1 rounded text-xs font-normal">
          {experts.length}
        </span>
      </h2>
      {experts.map((expert,idx) => (
        <ExpertCard
          key={idx}
          expert={expert}
          onViewClick={onViewClick}
          onMessageClick={onMessageClick}
        />
      ))}
    </div>
  );
}
