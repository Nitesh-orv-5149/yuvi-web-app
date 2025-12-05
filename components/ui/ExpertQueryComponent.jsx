import { Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ExpertQueryComponent({ query }) {
  return (
    <Link href={`home/${query.queryId}`}>
    <div
      className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-5 
                 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer 
                 group relative overflow-hidden shadow-md"
    >
      <div className="flex gap-4">
        
        {/* Avatar placeholder since your data has no avatar */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br 
                        from-cyan-500 to-blue-600 flex items-center justify-center 
                        flex-shrink-0 text-white font-bold shadow-lg shadow-cyan-500/10 text-lg">
          {query.clientId?.slice(0, 2).toUpperCase() || "U"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-white font-semibold group-hover:text-cyan-400 
                           transition-colors line-clamp-2 text-base pr-16 sm:pr-20 leading-snug">
              {query.questionTitle}
            </h3>
          </div>

          <p className="text-slate-400 text-sm mb-3 line-clamp-2 leading-relaxed">
            {query.questionBody}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md 
                             font-medium border border-slate-700">
              {query.categoryId.slice(0, 8)}…
            </span>

            <span>•</span>

            <span>
              {new Date(query.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Status missing in your data → assume all are pending */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
        <span className="flex items-center gap-1 text-amber-400 bg-amber-400/10 
                         px-2.5 py-1 rounded-full text-[10px] font-bold uppercase 
                         tracking-wide border border-amber-400/20">
          <Clock size={12} /> Pending
        </span>
      </div>
    </div>
    </Link>
  );
}
