'use client';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function QueryForm({ onSubmit, isLoading }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/client/queries/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  },[]);

  const [charCounts, setCharCounts] = useState({
    title: 0,
    description: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setCharCounts((prev) => ({ ...prev, [name]: value.length }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.category && formData.description) {
      onSubmit(formData);
    }
  };

  const isValid = formData.title && formData.category && formData.description;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Question Title <span className="text-[#ff006e]">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="What's your question?"
          maxLength={100}
          className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg text-white placeholder-[#a0a0b0] focus:outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 transition duration-300"
        />
        <div className="flex justify-between mt-2 text-xs text-[#a0a0b0]">
          <span>Be specific and concise</span>
          <span>{charCounts.title}/100</span>
        </div>
      </div>

      {/* Category Select */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Category <span className="text-[#ff006e]">*</span>
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg text-white focus:outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 transition duration-300 appearance-none cursor-pointer"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-[#a0a0b0]">Choose the most relevant category</p>
      </div>

      {/* Description Textarea */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Describe Your Problem <span className="text-[#8800ff]">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide detailed information about your question..."
          maxLength={1000}
          rows={6}
          className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg text-white placeholder-[#a0a0b0] focus:outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 transition duration-300 resize-none"
        />
        <div className="flex justify-between mt-2 text-xs text-[#a0a0b0]">
          <span>Include code snippets or examples if applicable</span>
          <span>{charCounts.description}/1000</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full py-3 px-4 bg-indigo-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/20 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⏳</span>
            <span>Posting...</span>
          </>
        ) : (
          <>
            <span>✓</span>
            <span>Post Question</span>
          </>
        )}
      </button>

      {/* Info Box */}
      <div className="bg-[#00d4ff]/5 border border-[#00d4ff]/20 rounded-lg p-4">
        <p className="text-xs sm:text-sm text-[#a0a0b0]">
          <span className="text-[#00d4ff] font-semibold">💡 Tip:</span> The more details you provide, the better answers you'll get from experts.
        </p>
      </div>
    </form>
  );
}
