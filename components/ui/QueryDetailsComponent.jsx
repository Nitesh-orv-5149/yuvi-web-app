import { ArrowLeft, Send } from "lucide-react";

export default function QueryDetailsComponent({ answer,
                                                selectedQuery,
                                                setAnswer,
                                                setSelectedQuery }) {
      return (
        <div className="flex flex-col min-h-screen justify-start items-center mt-20 animate-in slide-in-from-right duration-300 pb-24 px-4">
        <button
          onClick={() => setSelectedQuery(null)}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Queries
        </button>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-6">
          <h2 className="text-xl font-bold text-white">{selectedQuery.questionTitle}</h2>
          <p className="text-slate-400">{selectedQuery.questionBody}</p>

          <div className="text-xs text-slate-500">
            Category: {selectedQuery.categoryId}
          </div>

          <div className="text-xs text-slate-500">
            Created: {new Date(selectedQuery.createdAt).toLocaleString()}
          </div>

          <div className="pt-2">
            <label className="block text-sm font-semibold text-white mb-3">
              Your Answer
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white"
              placeholder="Type your answer..."
            />
            <button
              onClick={() => {
                alert("Answer submitted");
                setAnswer("");
                setSelectedQuery(null);
              }}
              className="mt-2 p-2 bg-cyan-500 text-white rounded-xl"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
      );
    }
    