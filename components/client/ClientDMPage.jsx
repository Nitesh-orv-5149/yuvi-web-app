'use client';

export default function ClientDMPage({ activeTab, onTabChange }) {
  const mockMessages = [
    {
      id: '1',
      expertName: 'Sarah Dev',
      expertAvatar: 'S',
      category: 'React',
      lastMessage: 'Thanks for the question! You can use...',
      timestamp: '2m ago',
      unread: true,
      verified: true,
    },
    {
      id: '2',
      expertName: 'Raj Kumar',
      expertAvatar: 'R',
      category: 'Next.js',
      lastMessage: 'I can help with that. Let me check...',
      timestamp: '1h ago',
      unread: false,
      verified: true,
    },
    {
      id: '3',
      expertName: 'Priya Singh',
      expertAvatar: 'P',
      category: 'JavaScript',
      lastMessage: 'Sure! When are you available?',
      timestamp: '3h ago',
      unread: false,
      verified: false,
    },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold mb-6 gradient-text">Your Conversations</h2>
      {mockMessages.map((msg) => (
        <div
          key={msg.id}
          className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-4 hover:border-[#00d4ff] transition cursor-pointer group"
        >
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#ff006e] flex items-center justify-center text-white font-bold flex-shrink-0 relative">
              {msg.expertAvatar}
              {msg.verified && (
                <span className="absolute -bottom-1 -right-1 bg-[#00d4ff] rounded-full p-0.5">
                  <span className="text-white text-xs">✓</span>
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-white group-hover:text-[#00d4ff] transition">
                  {msg.expertName}
                </h3>
                {msg.unread && (
                  <div className="w-2 h-2 bg-[#00d4ff] rounded-full"></div>
                )}
              </div>
              <p className="text-[#a0a0b0] text-xs mb-1">{msg.category} Specialist</p>
              <p className="text-[#a0a0b0] text-sm line-clamp-1">{msg.lastMessage}</p>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-[#a0a0b0] text-xs">{msg.timestamp}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}