'use client';

export default function ExpertCard({ expert, onViewClick, onMessageClick }) {
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-4 hover:border-[#00d4ff] transition duration-300 group">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#8800ff] flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md relative">
          {expert.username.charAt(0).toUpperCase()}
          {expert.isApproved && (
            <div className="absolute -bottom-1 -right-1 bg-[#00d4ff] rounded-full p-1 shadow-md">
              <svg className="w-3 h-3 text-[#0f0f23]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white group-hover:text-[#00d4ff] transition text-sm sm:text-base truncate">
              {expert.username}
            </h3>
          </div>
          <p className=" sm:text-sm mb-2 bg-[#00d4ff]/10 text-[#00d4ff] px-2.5 py-0.5 rounded-full text-xs w-fit">{expert.categoryName} Specialist</p>
          <p className="text-[#a0a0b0] text-xs line-clamp-2 mb-3">{expert.bio || "no bio"}</p>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onViewClick(expert)}
              className="flex-1 px-3 py-2 bg-[#2a2a3e] text-white text-xs sm:text-sm rounded-lg hover:bg-[#00d4ff]/20 hover:border-[#00d4ff] transition duration-300 border border-[#2a2a3e] font-medium"
            >
              View Profile
            </button>
            <button
              onClick={() => onMessageClick(expert)}
              className="flex-1 px-3 py-2 bg-linear-to-r from-[#00d4ff] to-[#8800ff] text-white text-xs sm:text-sm rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/20 transition duration-300 font-medium"
            >
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
