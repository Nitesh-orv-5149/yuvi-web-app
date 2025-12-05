"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import QueryDetailsComponent from "@/components/ui/QueryDetailsComponent";
import Loading from "@/components/ui/Loading";

export default function DetailedQueryPage({ params }) {
  const { queryId } = use(params);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`/api/client/queries/${queryId}`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch query:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [queryId]);

  if (loading) return <Loading/>;
  if (!data) return <div className="text-red-400 p-10">Failed to load query</div>;

  return (
    <QueryDetailsComponent data={data} />
  );
}
