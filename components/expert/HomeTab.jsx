"use client";
import { useEffect, useState } from "react";
import { fetchAllQueries } from "@/lib/fetchFunctions/fetchAllQueries";
import Loading from "../ui/Loading";
import QueryDetailsComponent from "../ui/QueryDetailsComponent";
import ExpertQueryComponent from "../ui/ExpertQueryComponent";
import { Saira_Extra_Condensed } from "next/font/google";

export default function HomeTab() {
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [answer, setAnswer] = useState("");
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetchAllQueries(searchTerm);
      console.log("fetched queries: ", res)
      setQueries(res);
      setLoading(false)
    }
    load();
  }, [searchTerm]);

  const pendingCount = queries.length; 

  // ===========================
  // DETAIL VIEW
  // ===========================
  if (selectedQuery) {
    return (
    <QueryDetailsComponent
      answer={answer}
      selectedQuery={selectedQuery}
      setAnswer={setAnswer}
      setSelectedQuery={setSelectedQuery}
    />
    );
  }

  return (
    <div className="animate-in fade-in duration-500 pb-24 space-y-8">
      <div className="flex items-center justify-between pt-8 px-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800">
          <img src="/yuvilogo.png" className="w-9 h-9 object-contain" />
        </div>

        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Expert Dashboard
        </h1>

        <div className="p-2 bg-indigo-950 rounded-full">
          <h4 className="text-sm">Pending : {pendingCount}</h4>
        </div>
      </div>

      <div className="px-4">
          <input
              type="text"
              placeholder="Search for Queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" w-full max-w-md rounded-full px-4 py-2 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-transparent transition"/>
          <div className="mt-10">
          {loading ? 
            <Loading/>
            :
            queries.map((query) => (  
              <ExpertQueryComponent
                key={query.queryId}
                query={query}
                setSelectedQuery={setSelectedQuery}
              />
          ))}
        </div>
      </div>
    </div>
  );
}