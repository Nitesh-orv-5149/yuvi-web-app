"use client"

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Briefcase, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Brain
} from 'lucide-react';
import { signIn } from 'next-auth/react';
import axios from 'axios';

// --- Reusable UI Components ---

const InputField = ({ icon: Icon, type = "text", placeholder, name, value, onChange, required = false, isTextArea = false }) => (
  <div className="relative group">
    <div className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows="3"
        className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-3 pl-10 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-3 pl-10 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
      />
    )}
  </div>
);

const RoleToggle = ({ role, setRole }) => (
  <div className="grid grid-cols-2 p-1 bg-slate-900/80 rounded-full border border-slate-800 mb-8 relative overflow-hidden">
    <div 
      className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-blue-600 rounded-full transition-all duration-300 shadow-lg shadow-blue-900/20 ${
        role === 'client' ? 'left-1' : 'left-[calc(50%+2px)]'
      }`} 
    />
    
    <button
      onClick={() => setRole('client')}
      className={`relative z-10 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors duration-300 ${
        role === 'client' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      <User className="w-4 h-4" />
      Client
    </button>
    <button
      onClick={() => setRole('expert')}
      className={`relative z-10 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors duration-300 ${
        role === 'expert' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      <Brain className="w-4 h-4" />
      Expert
    </button>
  </div>
);

// --- Main Component ---

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('client'); // 'client' | 'expert'
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    categoryId: '',
    bio: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { username, email, password, phone, categoryId, bio } = formData;
    
    try {
      if (isLogin) {
        console.log(`Attempting Sign In as ${role} for: ${username}`);
        
        const result = await signIn('credentials', { 
          identifier: username ? username : email,
          password: password, 
          role: role,
          redirect: true,
          callbackUrl: role === "client" ? "/" : "/expert/home" 
        });
        
        if (result.error) {
          throw new Error(result.error);
        }
        
      } else {
        
        const registrationData = {
          role,
          username,
          email,
          password,
          phoneNumber: phone,
          ...(role === 'expert' && { categoryId, bio })
        };
        
        console.log(`Attempting Sign Up as ${role} with data:`, registrationData);
        
        try {
        const response = await axios.post(`/api/auth/signup/${role}`, registrationData);
        console.log("Signup success:", response.data);

        } catch (error) {
            const msg =
                error.response?.data?.message ||
                error.message ||
                "Registration failed";

            throw new Error(msg);
        }
        
        await signIn('credentials', { identifier: email, password, role, redirect: true, callbackUrl: role === "client" ? "/client" : "/expert/home" });
      }
      
    } catch (error) {
      console.error("Authentication Error:", error.message);      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl relative z-10 overflow-hidden">
        
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

        <div className="p-8">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join the Network'}
            </h1>
            <p className="text-slate-400 text-sm">
              {isLogin 
                ? 'Enter your credentials to access your dashboard.' 
                : 'Create an account to start connecting.'}
            </p>
          </div>

          <RoleToggle role={role} setRole={setRole} />

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <InputField 
              icon={User} 
              name="username"
              placeholder={isLogin ? "Username or Email" : "Username"}
              value={formData.username}
              onChange={handleInputChange}
              required
            />

            {!isLogin && (
              <InputField 
                icon={Mail} 
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            )}

            <InputField 
              icon={Lock} 
              type="password" 
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            {!isLogin && (
              <div className="animate-in slide-in-from-top-4 fade-in duration-300 space-y-4">
                <InputField 
                  icon={Phone} 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />

                {role === 'expert' && (
                  <div className="space-y-4 border-t border-slate-800/50 pt-4 mt-4">
                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider ml-1">
                      Expert Profile
                    </p>
                    <InputField 
                      icon={Briefcase} 
                      name="category"
                      placeholder="category (e.g. software, Medical..)"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    />
                    <InputField 
                      icon={FileText} 
                      isTextArea
                      name="bio"
                      placeholder="Brief Bio & Qualifications..."
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all transform active:scale-[0.98] mt-6 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

        </div>

        <div className="bg-slate-900/80 p-6 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm">
            {isLogin ? "Don't have an account yet?" : "Already have an account?"}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ username: '', email: '', password: '', phone: '', category: '', bio: '' });
              }}
              className="ml-2 text-blue-400 font-medium hover:text-blue-300 transition-colors focus:outline-none"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

      </div>
      
      {role === 'expert' && !isLogin && (
        <div className="absolute top-20 right-20 hidden lg:block animate-pulse">
           <Brain className="w-32 h-32 text-blue-500/10 rotate-12" />
        </div>
      )}
    </div>
  );
}