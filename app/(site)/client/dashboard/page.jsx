'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ClientNavbar from '@/components/client/ClientNavbar';
import ClientBottomNav from '@/components/client/ClientBottomNav';
import QueryDetailModal from '@/components/client/QueryDetailModal';
import ExpertDetailPage from '@/components/client/ExpertDetailPage';
import Image from 'next/image';

const mockQueries = [
  {
    id: '1',
    title: 'How to optimize React performance with useMemo?',
    category: 'React',
    description:
      'I have a large list rendering slowly. Need optimization tips for React components.',
    clientName: 'Arjun Sharma',
    clientAvatar: 'A',
    createdAt: '2025-11-28',
    answers: 2,
    views: 342,
    rating: 4.9,
    answerList: [
      {
        id: 'ans1',
        expert: 'Sarah Dev',
        content: 'Use React.memo and useMemo hooks...',
        likes: 45,
        helpful: true,
      },
      {
        id: 'ans2',
        expert: 'Raj Kumar',
        content: 'Consider using useCallback...',
        likes: 32,
        helpful: true,
      },
    ],
  },
  {
    id: '2',
    title: 'Best practices for Next.js API routes security?',
    category: 'Next.js',
    description: 'What are the security best practices for API routes?',
    clientName: 'Priya Patel',
    clientAvatar: 'P',
    createdAt: '2025-11-27',
    answers: 3,
    views: 256,
    rating: 4.8,
    answerList: [],
  },
];

const mockExperts = [
  {
    id: '1',
    name: 'Sarah Dev',
    category: 'React',
    rating: 4.9,
    answers: 124,
    verified: true,
    bio: 'Senior React Developer',
  },
  {
    id: '2',
    name: 'Raj Kumar',
    category: 'Next.js',
    rating: 4.8,
    answers: 98,
    verified: true,
    bio: 'Full Stack Developer',
  },
  {
    id: '3',
    name: 'Priya Singh',
    category: 'JavaScript',
    rating: 4.7,
    answers: 87,
    verified: false,
    bio: 'JavaScript Expert',
  },
];

const mockMessages = [
  {
    id: '1',
    expertName: 'Sarah Dev',
    lastMessage: 'Thanks for the question!',
    timestamp: '2m ago',
    unread: true,
  },
  {
    id: '2',
    expertName: 'Raj Kumar',
    lastMessage: 'I can help with that',
    timestamp: '1h ago',
  },
];

export default function ClientDashboardFull() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-[#00d4ff] border-t-[#001276] rounded-full sm:w-16 sm:h-16" />
        </div>
      </div>
    );
  }

  const filteredQueries = mockQueries.filter(
    (q) =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // HOME TAB
  const renderHome = () => (
    <div className="animate-fadeIn">
      {/* icon center top */}
      <div className="w-full flex justify-center pt-4 sm:pt-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-[#020617] border border-[#1f2937] shadow-lg">
          <Image
            src="/yuvilogo.png"
            alt="YuviCollab icon"
            width={48}
            height={48}
            className="object-contain sm:w-16 sm:h-16"
          />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-1 flex justify-center pt-2 sm:pt-4">
        <span className="bg-gradient-to-r from-[#00d4ff] to-[#4f46e5] bg-clip-text text-transparent">
          YuviCollab
        </span>
      </h1>
      <p className="text-[#9ca3af] flex justify-center pb-4 text-xs sm:text-sm">
        Get answers from vetted experts
      </p>

      <div className="mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="Search queries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-[#020617] border border-[#1f2937] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#00d4ff] text-sm"
        />
      </div>

      <button
        onClick={() => setActiveTab('post')}
        className="w-full mb-4 sm:mb-6 py-2.5 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-[#001276] to-[#020617] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#020617]/60 transition text-sm"
      >
        ➕ Ask a Question
      </button>

      <div className="space-y-3">
        <h2 className="text-base sm:text-lg font-semibold text-white mb-3">All Queries</h2>
        {filteredQueries.length > 0 ? (
          filteredQueries.map((query) => (
            <div
              key={query.id}
              onClick={() => setSelectedQuery(query)}
              className="bg-[#020617] border border-[#1f2937] rounded-lg p-3 sm:p-4 hover:border-[#00d4ff] transition cursor-pointer group animate-slideIn"
            >
              <div className="flex gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#1d4ed8] flex items-center justify-center flex-shrink-0 text-white font-bold text-xs sm:text-sm">
                  {query.clientAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold group-hover:text-[#00d4ff] transition line-clamp-2 text-xs sm:text-sm mb-1 pr-2">
                    {query.title}
                  </h3>
                  <p className="text-[#9ca3af] text-xs mb-2 line-clamp-1">
                    {query.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-[#6b7280]">
                    <span className="bg-[#00d4ff]/10 text-[#00d4ff] px-1.5 py-0.5 rounded text-xs">
                      {query.category}
                    </span>
                    <span className="truncate">by {query.clientName}</span>
                    <span>👁️ {query.views}</span>
                    <span>💬 {query.answers}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 min-w-[50px]">
                  <div className="text-[#38bdf8] font-semibold text-xs sm:text-sm">⭐ {query.rating}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-[#6b7280]">
            <p>No queries found</p>
          </div>
        )}
      </div>
    </div>
  );

  // POST TAB
  const renderPost = () => (
    <div className="animate-fadeIn">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#4f46e5] bg-clip-text text-transparent">
        Ask a Question
      </h2>
      <div className="bg-[#020617] border border-[#1f2937] rounded-lg p-4 sm:p-6 space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
            Question Title *
          </label>
          <input
            type="text"
            placeholder="What's your question?"
            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-[#020617] border border-[#1f2937] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#00d4ff] text-sm"
            maxLength={100}
          />
          <p className="text-[#6b7280] text-xs mt-1">0/100 characters</p>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
            Category *
          </label>
          <select className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-[#020617] border border-[#1f2937] rounded-lg text-white focus:outline-none focus:border-[#00d4ff] text-sm">
            <option>Select category</option>
            <option>React</option>
            <option>Next.js</option>
            <option>JavaScript</option>
            <option>Python</option>
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
            Describe Your Problem *
          </label>
          <textarea
            placeholder="Provide details about your question..."
            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-[#020617] border border-[#1f2937] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#00d4ff] resize-none h-32 sm:h-40 text-sm"
            maxLength={1000}
          />
          <p className="text-[#6b7280] text-xs mt-1">0/1000 characters</p>
        </div>

        <button className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#001276] to-[#020617] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#020617]/60 transition text-sm">
          Post Question
        </button>
      </div>
    </div>
  );

  // MESSAGES TAB
  const renderMessages = () => (
    <div className="animate-fadeIn">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#4f46e5] bg-clip-text text-transparent">
        Messages
      </h2>
      <div className="space-y-3">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className="bg-[#020617] border border-[#1f2937] rounded-lg p-3 sm:p-4 hover:border-[#00d4ff] transition cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#1d4ed8] flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0 mt-0.5">
                  {msg.expertName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="font-semibold text-white text-sm truncate">{msg.expertName}</h3>
                  <p className="text-[#9ca3af] text-xs line-clamp-1">
                    {msg.lastMessage}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 sm:gap-2 pt-1">
                {msg.unread && (
                  <div className="w-2 h-2 bg-[#00d4ff] rounded-full self-end" />
                )}
                <span className="text-[#6b7280] text-xs">{msg.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // EXPERTS TAB
  const renderExperts = () => (
    <div className="animate-fadeIn">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#4f46e5] bg-clip-text text-transparent">
        Browse Experts
      </h2>
      <div className="space-y-3">
        {mockExperts.map((expert) => (
          <div
            key={expert.id}
            className="bg-[#020617] border border-[#1f2937] rounded-lg p-3 sm:p-4 hover:border-[#00d4ff] transition cursor-pointer group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#1d4ed8] flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-lg">
                  {expert.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white group-hover:text-[#00d4ff] transition text-sm truncate">
                    {expert.name}
                    {expert.verified && (
                      <span className="text-[#00d4ff] ml-1">✓</span>
                    )}
                  </h3>
                  <p className="text-[#9ca3af] text-xs mb-2">
                    {expert.category} Specialist
                  </p>
                  <div className="flex gap-2 text-xs text-[#6b7280] flex-wrap">
                    <span>⭐ {expert.rating}</span>
                    <span>💬 {expert.answers} answers</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedExpert(expert)}
                className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#001276] to-[#020617] text-white text-xs rounded-lg hover:shadow-lg transition flex-shrink-0 sm:ml-auto"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // PROFILE TAB
  const renderProfile = () => (
    <div className="animate-fadeIn">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#4f46e5] bg-clip-text text-transparent">
        Profile
      </h2>
      <div className="space-y-4">
        <div className="bg-[#020617] border border-[#1f2937] rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#1d4ed8] flex items-center justify-center text-2xl sm:text-4xl text-white mx-auto sm:mx-0">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {session?.user?.name}
              </h3>
              <p className="text-[#9ca3af] text-sm">{session?.user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 border-t border-[#1f2937] pt-4 sm:pt-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#00d4ff]">5</div>
              <p className="text-[#6b7280] text-xs">Queries</p>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#38bdf8]">12</div>
              <p className="text-[#6b7280] text-xs">Answers</p>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#4f46e5]">4.8</div>
              <p className="text-[#6b7280] text-xs">Rating</p>
            </div>
          </div>
        </div>

        <div className="bg-[#020617] border border-[#1f2937] rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-white mb-4">Your Queries</h3>
          <div className="space-y-3">
            {mockQueries.slice(0, 2).map((query) => (
              <div key={query.id} className="bg-[#020617] border border-[#1f2937] rounded p-3">
                <p className="text-white text-xs sm:text-sm font-semibold line-clamp-2">
                  {query.title}
                </p>
                <p className="text-[#6b7280] text-xs mt-1">
                  💬 {query.answers} answers
                </p>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-2.5 px-3 sm:py-3 sm:px-4 bg-[#020617] text-[#e5e7eb] border border-[#1f2937] rounded-lg hover:bg-[#030712] transition font-semibold text-sm">
          Edit Profile
        </button>

        <button className="w-full py-2.5 px-3 sm:py-3 sm:px-4 bg-[#020617] text-[#9ca3af] rounded-lg hover:bg-[#030712] transition font-semibold text-sm">
          Account Settings
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] pb-20 sm:pb-28">
      <ClientNavbar />

      <div className="px-3 sm:px-4 py-4 sm:py-6 max-w-2xl mx-auto">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'post' && renderPost()}
        {activeTab === 'dm' && renderMessages()}
        {activeTab === 'experts' && renderExperts()}
        {activeTab === 'profile' && renderProfile()}
      </div>

      {selectedQuery && (
        <QueryDetailModal query={selectedQuery} onClose={() => setSelectedQuery(null)} />
      )}
      {selectedExpert && (
        <ExpertDetailPage expert={selectedExpert} onClose={() => setSelectedExpert(null)} />
      )}

      <ClientBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
