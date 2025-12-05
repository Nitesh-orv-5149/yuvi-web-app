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
            <span>•</span>

            <span>
              {new Date(query.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}
