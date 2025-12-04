'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../../../components/admin/adminNavBar';

export default function Experts() {
  const router = useRouter();
  const [experts, setExperts] = useState(['']);

  const addExpertField = () => {
    setExperts([...experts, '']);
  };

  const updateExpert = (index, value) => {
    const newExperts = [...experts];
    newExperts[index] = value;
    setExperts(newExperts);
  };

  return (
    <>
      <div className="p-6 space-y-4">
        <button 
          onClick={() => router.push('/')}
          className="text-cyan-400 mb-4 flex items-center gap-2"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Modify Experts</h2>
        
        <div className="space-y-4">
          {experts.map((expert, index) => (
            <input
              key={index}
              type="text"
              value={expert}
              onChange={(e) => updateExpert(index, e.target.value)}
              placeholder={`Expert ${index + 1}`}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            />
          ))}
          <button 
            onClick={addExpertField}
            className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-400 py-3 px-6 rounded-lg border border-slate-700 transition-colors"
          >
            + Add Expert
          </button>
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
