'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../../../components/admin/adminNavBar';

export default function AddPost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    query: '',
    answer: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <h2 className="text-2xl font-bold text-white mb-6">Add Post</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2 text-sm">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 text-sm">Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 text-sm">Query:</label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleInputChange}
              rows="4"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 text-sm">Answer:</label>
            <textarea
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              rows="4"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
