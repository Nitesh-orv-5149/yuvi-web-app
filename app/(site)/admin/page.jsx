"use client";   

import React, { useState } from 'react';
import { Home, Menu, User } from 'lucide-react';

const AdminApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    query: '',
    answer: ''
  });
  const [categories, setCategories] = useState(['']);
  const [experts, setExperts] = useState(['']);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCategoryField = () => {
    setCategories([...categories, '']);
  };

  const addExpertField = () => {
    setExperts([...experts, '']);
  };

  const updateCategory = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const updateExpert = (index, value) => {
    const newExperts = [...experts];
    newExperts[index] = value;
    setExperts(newExperts);
  };

  const NavBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 flex justify-around items-center py-3 px-4">
      <button 
        onClick={() => setCurrentScreen('home')}
        className={`flex flex-col items-center ${currentScreen === 'home' ? 'text-cyan-400' : 'text-slate-400'}`}
      >
        <Home size={24} />
      </button>
      <button 
        onClick={() => setCurrentScreen('menu')}
        className={`flex flex-col items-center ${currentScreen === 'menu' ? 'text-cyan-400' : 'text-slate-400'}`}
      >
        <Menu size={24} />
      </button>
      <button 
        onClick={() => setCurrentScreen('experts')}
        className={`flex flex-col items-center ${currentScreen === 'experts' ? 'text-cyan-400' : 'text-slate-400'}`}
      >
        <User size={24} />
      </button>
    </div>
  );

  const HomeScreen = () => (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Home</h2>
      <button 
        onClick={() => setCurrentScreen('posts')}
        className="w-full bg-slate-800 hover:bg-slate-700 text-orange-500 py-4 px-6 rounded-lg border border-slate-700 transition-colors"
      >
        All Posts
      </button>
      <button 
        onClick={() => setCurrentScreen('add-post')}
        className="w-full bg-slate-800 hover:bg-slate-700 text-orange-500 py-4 px-6 rounded-lg border border-slate-700 transition-colors"
      >
        Add Post
      </button>
      <button 
        onClick={() => setCurrentScreen('categories')}
        className="w-full bg-slate-800 hover:bg-slate-700 text-orange-500 py-4 px-6 rounded-lg border border-slate-700 transition-colors"
      >
        Modify Categories
      </button>
      <button 
        onClick={() => setCurrentScreen('experts')}
        className="w-full bg-slate-800 hover:bg-slate-700 text-orange-500 py-4 px-6 rounded-lg border border-slate-700 transition-colors"
      >
        Modify Experts
      </button>
    </div>
  );

  const AddPostScreen = () => (
    <div className="p-6 space-y-4">
      <button 
        onClick={() => setCurrentScreen('home')}
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
  );

  const CategoriesScreen = () => (
    <div className="p-6 space-y-4">
      <button 
        onClick={() => setCurrentScreen('home')}
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
  );

  const ExpertsScreen = () => (
    <div className="p-6 space-y-4">
      <button 
        onClick={() => setCurrentScreen('home')}
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
  );

  const PostsScreen = () => (
    <div className="p-6">
      <button 
        onClick={() => setCurrentScreen('home')}
        className="text-cyan-400 mb-4 flex items-center gap-2"
      >
        ← Back
      </button>
      <h2 className="text-2xl font-bold text-white mb-6">All Posts</h2>
      <p className="text-slate-400">No posts available yet.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-md mx-auto min-h-screen bg-slate-950 shadow-2xl pb-20">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
          <h1 className="text-3xl font-bold text-white">Admin</h1>
        </div>

        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'add-post' && <AddPostScreen />}
        {currentScreen === 'categories' && <CategoriesScreen />}
        {currentScreen === 'experts' && <ExpertsScreen />}
        {currentScreen === 'posts' && <PostsScreen />}
        {currentScreen === 'menu' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Menu</h2>
            <p className="text-slate-400">Menu options coming soon...</p>
          </div>
        )}

        <NavBar />
      </div>
    </div>
  );
};

export default AdminApp;