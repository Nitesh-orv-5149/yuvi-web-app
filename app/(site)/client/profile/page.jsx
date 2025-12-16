'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import ProfileHeader from '@/components/client/profile/ProfileHeader';
import ProfileActions from '@/components/client/profile/ProfileActions';
import QueriesList from '@/components/client/home/QueriesList';
import QueryDetailModal from '@/components/client/modals/QueryDetailModal';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchQueries = async () => {
      try {
        const res = await axios.get(`/api/client/queries/my?clientId=${session.user.id}`);
        let queryList = []
        const userqueries = res.data.map((q)=>{
          const userquery = q.queries;
          const querycate= q.categories;
          const finalquery =  {...userquery,...querycate}
          queryList.push(finalquery)
        })
        setQueries(queryList);
      } catch (err) {
        console.error('Error fetching queries:', err);
      }
    };

    fetchQueries();
  }, [status, session]);

  return (
    <div className="animate-fadeIn max-w-2xl">
      <ProfileHeader />

      <QueriesList
        queries={queries}
        onQuerySelect={setSelectedQuery}
      />

      {selectedQuery && (
        <QueryDetailModal
          query={selectedQuery}
          onClose={() => setSelectedQuery(null)}
          isClient={true}
        />
      )}
    </div>
  );
}
