"use client";

import { useEffect, useState } from "react";
import { fetchAllQueries } from "@/lib/apiFunctions/fetchAllQueries";
import Loading from "../ui/Loading";
import ExpertQueryComponent from "../ui/ExpertQueryComponent";
import { useSession } from "next-auth/react";

export default function HomeTab() {
  const { data: session } = useSession();
  const expertCategory = session?.user?.categoryId;

  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!expertCategory) return;

    async function load() {
      console.log("LOAD() CALLED");
      setLoading(true);

      console.log("fetching...");

      console.log("QUERY PARAMS →", {
        q: searchTerm,
        categoryId: expertCategory,
        page,
      });

            
      const result = await fetchAllQueries({
        q: searchTerm,
        categoryId: expertCategory,
        page,
        limit: 8,
      });

      console.log("fetched: ", result);
      

      setQueries(result)
      setHasMore(result.hasMore)
      setLoading(false)
    }

    load();
  }, [searchTerm, page, expertCategory]);

  const pendingCount = queries.length;

  return (
    <div className="animate-in fade-in duration-500 pb-24 space-y-8">
      
      {/* header */}
      <div className="flex items-center justify-between pt-8 px-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Expert Dashboard
        </h1>
      </div>

      {/* search */}
      <div className="px-4">
        <input
          type="text"
          placeholder="Search for Queries..."
          value={searchTerm}
          onChange={(e) => {
            setPage(1);
            setSearchTerm(e.target.value);
          }}
          className="w-full max-w-md rounded-full px-4 py-2 bg-neutral-900 border border-neutral-700 text-white"
        />

        {/* queries */}
        <div className="mt-10">
          {loading ? (
            <Loading />
          ) : (
            queries.map((query) => (
              <ExpertQueryComponent key={query.queryId} query={query} />
            ))
          )}
        </div>

        {/* pagination */}
        <div className="flex justify-between mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-slate-800 rounded disabled:opacity-40"
          >
            Prev
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasMore}
            className="px-4 py-2 bg-slate-800 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}
