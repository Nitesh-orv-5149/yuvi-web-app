"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-4xl px-6 py-14">
        {/* Logo + Name */}
        <div className="flex items-center gap-3 mb-10">
          <Image
            src="/yuvilogo.png"
            alt="YuviCollab logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-blue-400">
            YuviCollab
          </h1>
        </div>

        {/* Card */}
        <div className="relative bg-[#0b1220]/95 border border-gray-800/80 rounded-3xl p-8 sm:p-12 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur">
          {/* top accent line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-t-3xl" />

          <div className="header">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 text-blue-400 text-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>

            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white tracking-tight">
              Privacy Policy
            </h2>
          </div>

          <section className="space-y-7 text-gray-300 leading-8 text-[15.5px]">
            <p className="text-gray-400">
              At YuviCollab, your privacy is extremely important to us. This
              Privacy Policy explains how we collect, use, and protect your
              information when you use our platform.
            </p>

            {[
              {
                title: "1. Information We Collect",
                body: "We may collect personal information such as your name, email address, educational details, and activity on the platform when you ask questions or interact with content.",
              },
              {
                title: "2. How We Use Information",
                body: "The information collected is used to improve user experience, personalize content, and enhance collaboration between students on the platform.",
              },
              {
                title: "3. Data Security",
                body: "We implement strong security measures to protect your data from unauthorized access, alteration, or disclosure.",
              },
              {
                title: "4. Sharing of Information",
                body: "We do not sell or share your personal data with third parties unless required by law or to provide essential services.",
              },
              {
                title: "5. Cookies",
                body: "Cookies are used to enhance your browsing experience and remember your preferences.",
              },
              {
                title: "6. Your Rights",
                body: "You have the right to access, update, or delete your personal information at any time.",
              },
              {
                title: "7. Changes to This Policy",
                body: "YuviCollab may update this Privacy Policy occasionally. Changes will be reflected on this page.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.body}</p>
              </div>
            ))}

            <div className="pt-6 border-t border-gray-800">
              <p className="text-gray-500 text-sm">
                Last updated: January 2026
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
