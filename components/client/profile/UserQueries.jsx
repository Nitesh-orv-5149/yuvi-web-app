'use client';

export default function UserQueries({ queries = [] }) {
  return (
    <div className="mb-6">
      <h2 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>📋</span>
        <span>Your Recent Questions</span>
        <span className="ml-auto bg-[#2a2a3e] text-[#a0a0b0] px-2 py-1 rounded text-xs font-normal">
          {queries.length}
        </span>
      </h2>

      {queries.length > 0 ? (
        <div className="space-y-3">
          {queries.slice(0, 3).map((query) => (
            <div key={query.queryId} className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-4 hover:border-[#00d4ff] transition duration-300">
              <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-2 mb-2">
                {query.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-[#a0a0b0]">
                <span className="inline-block bg-[#00d4ff]/10 text-[#00d4ff] px-2 py-1 rounded">
                  {query.category}
                </span>
                <span></span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg">
          <p className="text-[#a0a0b0]">No questions yet</p>
        </div>
      )}
    </div>
  );
}
