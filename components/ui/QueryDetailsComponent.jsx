"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ArrowLeft, Send, Trash2 } from "lucide-react";
import ConfirmModal from "./Deletemodal";

export default function QueryDetailsComponent({ data }) {
  const { data: session } = useSession();
  const loggedExpertId = session?.user?.id;

  const { query, answers } = data;

  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [answerList, setAnswerList] = useState(answers);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  function openDeleteModal(id) {
    setDeleteId(id);
    setModalOpen(true);
  }

  // ---------------------------------------
  // SUBMIT ANSWER
  // ---------------------------------------
  async function submitAnswer() {
    if (!answer.trim()) return;

    try {
      setSubmitting(true);

      const res = await axios.post("/api/expert/queries/answered", {
        queryId: query.queryId,
        answerBody: answer,
      });

      const newAnswer = res.data.answer;

      setAnswerList((prev) => [newAnswer, ...prev]);
      setAnswer("");

    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit answer");
    } finally {
      setSubmitting(false);
    }
  }

  // ---------------------------------------
  // DELETE ANSWER
  // ---------------------------------------
  async function deleteAnswer(answerId) {
    try {
      await axios.delete("/api/expert/queries/answered", {
        data: { answerId },
      });

      // remove from UI
      setAnswerList((prev) => prev.filter((a) => a.answerId !== answerId));

    } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete answer");
    } finally {
        setModalOpen(false);
        setDeleteId(null);
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-start items-center mt-20 px-4">
      
      <a
        href="/expert/home"
        className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Queries
      </a>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 w-full max-w-2xl space-y-6">
        
        {/* Question */}
        <h2 className="text-xl font-bold text-white">{query.questionTitle}</h2>
        <p className="text-slate-400">{query.questionBody}</p>

        <div className="text-xs text-slate-500">
          Category: {query.categoryName}
        </div>

        <div className="text-xs text-slate-500">
          Posted at: {new Date(query.createdAt).toLocaleString()}
        </div>

        {/* Previous Answers */}
        <div className="border-t border-slate-800 pt-4 mt-4">
          <h3 className="text-white font-semibold mb-3">Previous Answers</h3>

          {answerList.length === 0 && (
            <p className="text-slate-600 text-sm">No answers yet.</p>
          )}

          {answerList.map((ans) => (
            <div
              key={ans.answerId}
              className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-2 flex justify-between items-start"
            >
              <div>
                <p className="text-white">{ans.answerBody}</p>
                <p className="text-xs text-slate-500 mt-2">
                  — {ans.expertUsername || session.user.username || "Unknown Expert"} •{" "}
                  {new Date(ans.createdAt).toLocaleString()}
                </p>
              </div>

              {/* DELETE button only for creator */}
              {loggedExpertId === ans.expertId && (
                <button
                  onClick={() => openDeleteModal(ans.answerId)}
                  className="text-red-400 hover:text-red-300 ml-4"
                >
                  <Trash2 size={18} />
                </button>
              )}

              <ConfirmModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={() => deleteAnswer(ans.answerId)}
              />
            
            </div>
          ))}
        </div>

        {/* New Answer Box */}
        <div className="pt-2">
          <label className="block text-sm font-semibold text-white mb-2">
            Your Answer
          </label>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white"
            placeholder="Type your answer..."
          />

          <button
            onClick={submitAnswer}
            disabled={submitting}
            className="mt-2 p-2 bg-cyan-500 text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : <Send size={18} />}
          </button>
        </div>

      </div>


    </div>
  );
}
