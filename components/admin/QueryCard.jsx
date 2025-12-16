"use client";

export default function QueryCard({ query, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-4 hover:border-[#00d4ff] hover:shadow-lg hover:shadow-[#00d4ff]/10 transition duration-300 cursor-pointer group"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#8800ff] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm sm:text-base shadow-md">
          {query.clientName.charAt(0).toUpperCase()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white font-semibold group-hover:text-[#00d4ff] transition line-clamp-2 text-sm sm:text-base flex-1">
              {query.questionTitle}
            </h3>
          </div>

          <p className="text-[#a0a0b0] text-xs sm:text-sm mb-3 line-clamp-1">
            {query.question || query.questionBody}
          </p>

          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-block bg-[#00d4ff]/10 text-[#00d4ff] px-2.5 py-0.5 rounded-full text-xs font-medium">
              {query.categoryName || query.name}
            </span>
            <span className="inline-block text-[#a0a0b0] text-xs">
              by{" "}
              <span className="text-white font-medium">
                {query.clientName}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
