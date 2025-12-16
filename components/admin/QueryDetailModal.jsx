"use client";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

import axios from "axios";

export default function QueryDetailModal({ query, onClose, isAdmin }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("/api/client/queries");
        const data = res.data;
        setAnswers(
          data
            .map((q) => q.answers)
            .flat()
            .filter((a) => a.queryId === query.queryId)
        );
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };

    loadData();
  }, []);

  const formattedDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  

  const handleDelete = async (queryId) => {
  const confirmed = window.confirm(
      "Are you sure you want to delete this query?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await axios.delete(`/api/admin/queries/${queryId}`);
      
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Failed to delete query");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-indigo-700 border-b border-[#2a2a3e] px-4 sm:px-6 py-4 flex justify-between items-center">
          <h2 className="font-bold text-white text-base sm:text-lg">
            Question Details
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#2a2a3e] transition duration-300 text-[#a0a0b0] hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Question Header */}
          <div>
            <div className="flex gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#8800ff] flex items-center justify-center text-white font-bold shadow-md">
                {query.clientName?.charAt(0).toUpperCase() ?? "Y"}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">
                  {query.clientName ?? "You"}
                </p>
                <p className="text-[#a0a0b0] text-xs">
                  {formattedDate(query.createdAt)}
                </p>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
              {query.questionTitle}
            </h3>
            <p className="text-[#a0a0b0] text-sm leading-relaxed mb-4">
              {query.question || query.questionBody}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className=" bg-[#00d4ff]/20 text-[#00d4ff] px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                {query.categoryName || query.name}
              </span>
              {isAdmin && (
                <div className="deletebutton">
                  <button
                    className={`p-1 rounded-2xl transition ${
                      loading
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-700 hover:bg-red-800"
                    }`}
                    onClick={() => handleDelete(query.queryId)}
                    disabled={loading}
                    title="Delete query"
                  >
                    {loading ? (
                      <span className="text-white text-xs px-2">...</span>
                    ) : (
                      <Trash2 className="text-white" />
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-4 text-xs text-[#a0a0b0] border-t border-[#2a2a3e] pt-4">
              <span className="flex items-center gap-1">
                <span>💬</span>
                <span>Answers</span>
              </span>
            </div>
          </div>

          {/* Answers Section */}
          {answers.length > 0 && (
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                Answers ({answers.length})
              </h3>
              <div className="space-y-3">
                {answers.map((answer, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0f0f23] border border-[#2a2a3e] rounded-lg p-4"
                  >
                    <button className="flex justify-between items-start mb-2 gap-4 cursor-pointer">
                      <div className="bg-cyan-700 rounded-full px-2"> {answer.expertName.charAt(0).toUpperCase()}</div>
                      {answer.expertName}
                    </button>
                    <p className="text-[#a0a0b0] text-sm leading-relaxed">
                      {answer?.answerBody}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!answers || answers.length === 0) && (
            <div className="bg-[#0f0f23] border border-[#2a2a3e] rounded-lg p-6 text-center">
              <p className="text-[#a0a0b0] mb-4">No answers yet</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 border-t border-[#2a2a3e] pt-6"></div>
        </div>
      </div>
    </div>
  );
}
