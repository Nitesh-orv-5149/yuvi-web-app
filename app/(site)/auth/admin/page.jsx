"use client";

import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

const InputField = ({
  icon: Icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}) => (
  <div className="relative group">
    <div className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors">
      <Icon className="w-5 h-5" />
    </div>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-3 pl-10 pr-4 text-slate-200 placeholder:text-slate-600 
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
    />
  </div>
);

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { email, password } = formData;
    console.log("Attempting admin login with:", email, password);

    const res = await signIn("credentials", {
      identifier: email,
      password: password,
      role: "admin",
      redirect: false,
    });

    if (res?.error) setError("Invalid email or password");

    window.location.href = "/admin";

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-4 relative overflow-hidden font-sans">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl relative z-10 overflow-hidden">

        <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Admin Panel
            </h1>
            <p className="text-slate-400 text-sm">Login to continue</p>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <InputField
              icon={Mail}
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <InputField
              icon={Lock}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500
              text-white font-semibold py-3 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)]
              hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all transform active:scale-[0.98]
              mt-6 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-2 mb-4 text-center">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
