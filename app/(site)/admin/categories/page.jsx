'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../../../components/admin/adminNavBar';

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState(['']);

  const addCategoryField = () => {
    setCategories([...categories, '']);
  };

  const updateCategory = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
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
        <h2 className="text-2xl font-bold text-white mb-6">Modify Categories</h2>
        
        <div className="space-y-4">
          {categories.map((category, index) => (
            <input
              key={index}
              type="text"
              value={category}
              onChange={(e) => updateCategory(index, e.target.value)}
              placeholder={`Category ${index + 1}`}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            />
          ))}
          <button 
            onClick={addCategoryField}
            className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-400 py-3 px-6 rounded-lg border border-slate-700 transition-colors"
          >
            + Add Category
          </button>
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
