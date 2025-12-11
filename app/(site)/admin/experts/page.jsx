"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BottomNav from "@/components/admin/BottomNav";

export default function ManageExpertsPage() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);

  // ---------------------------
  // FETCH EXPERTS
  // ---------------------------
  const loadExperts = async () => {
    try {
      const res = await axios.get("/api/admin/experts");
      const all = res.data;

      setPending(all.filter((e) => !e.isApproved));
      setApproved(all.filter((e) => e.isApproved));
    } catch (err) {
      console.error("LOAD EXPERTS ERROR:", err);
    }
  };

  useEffect(() => {
    loadExperts();
  }, []);

  // ---------------------------
  // APPROVE EXPERT
  // ---------------------------
  const approveExpert = async (id) => {
    try {
      await axios.patch(`/api/admin/experts/${id}`, {
        isApproved: true,
      });
      loadExperts(); // refresh UI
    } catch (err) {
      console.error("APPROVE ERROR:", err);
    }
  };

  // ---------------------------
  // DELETE EXPERT
  // ---------------------------
  const deleteExpert = async (id) => {
    try {
      await axios.delete(`/api/admin/experts/${id}`);
      loadExperts(); // refresh UI
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-[#0b0d11] to-[#1a1223] text-white p-5">
      <h1 className="text-2xl font-bold mb-6">Manage Experts</h1>

      {/* ------------------- PENDING SECTION ------------------- */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-blue-400 mb-3">Pending Requests</h2>

        {pending.length === 0 ? (
          <p className="text-white/50">No pending requests.</p>
        ) : (
          pending.map((exp) => (
            <div
              key={exp.expertId}
              className="bg-black/30 border border-white/10 rounded-xl p-4 mb-3"
            >
              <h3 className="text-lg font-semibold">{exp.name}</h3>
              <p className="text-sm text-blue-300">{exp.domain}</p>
              <p className="text-sm text-white/60">{exp.email}</p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => approveExpert(exp.expertId)}
                  className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={() => deleteExpert(exp.expertId)}
                  className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* ------------------- APPROVED SECTION ------------------- */}
      <section>
        <h2 className="text-xl font-semibold text-green-400 mb-3">Approved Experts</h2>

        {approved.length === 0 ? (
          <p className="text-white/50">No approved experts yet.</p>
        ) : (
          approved.map((exp) => (
            <div
              key={exp.expertId}
              className="bg-black/30 border border-white/10 rounded-xl p-4 mb-3"
            >
              <h3 className="text-lg font-semibold">{exp.name}</h3>
              <p className="text-sm text-blue-300">{exp.domain}</p>
              <p className="text-sm text-white/60">{exp.email}</p>

              <button
                onClick={() => deleteExpert(exp.expertId)}
                className="mt-3 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </section>

      <BottomNav />
    </div>
  );
}
