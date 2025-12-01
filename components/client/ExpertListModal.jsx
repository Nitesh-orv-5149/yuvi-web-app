'use client';

export default function ExpertListModal({ experts, onSelectExpert, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1a2e] border-b border-[#2a2a3e] px-6 py-4 flex justify-between items-center">
          <h2 className="font-bold text-white text-lg">Browse Experts</h2>
          <button onClick={onClose} className="text-2xl text-[#a0a0b0] hover:text-white transition">
            ✕
          </button>
        </div>

        {/* Experts Grid */}
        <div className="p-6 space-y-3">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="bg-[#0f0f23] border border-[#2a2a3e] rounded-lg p-4 hover:border-[#00d4ff] transition cursor-pointer group"
              onClick={() => onSelectExpert(expert)}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#ff006e] flex items-center justify-center text-white font-bold flex-shrink-0">
                    {expert.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-[#00d4ff] transition">
                      {expert.name}
                      {expert.verified && <span className="text-[#00d4ff] ml-1">✓</span>}
                    </h3>
                    <p className="text-[#a0a0b0] text-xs mb-2">{expert.category} Specialist</p>
                    <div className="flex gap-2 text-xs text-[#a0a0b0]">
                      <span>⭐ {expert.rating}</span>
                      <span>💬 {expert.answers} answers</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#ff006e] text-white text-xs rounded-lg hover:shadow-lg transition">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}