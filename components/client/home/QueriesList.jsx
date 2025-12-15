'use client';
import Loading from '@/components/ui/Loading';
import QueryCard from './QueryCard';

export default function QueriesList({ queries, onQuerySelect, isLoading }) {
  if (isLoading) return <Loading/>

  if (queries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-[#a0a0b0] font-medium mb-2">No queries found</p>
        <p className="text-[#a0a0b0] text-sm">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>📋</span>
        <span>Latest Queries</span>
        <span className="ml-auto bg-[#2a2a3e] text-[#a0a0b0] px-2 py-1 rounded text-xs font-normal">
          {queries.length}
        </span>
      </h2>
      {queries.map((query,idx) => (
        <QueryCard key={idx} query={query} onClick={() => onQuerySelect(query)} />
      ))}
    </div>
  );
}
