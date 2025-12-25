"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function ClientNavbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-blue-1000/80 backdrop-blur-md border-b border-[#2e2e49]">
      <div className="px-4 py-3 sm:px-6 sm:py-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          {/* Logo + Brand (top-left) */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/yuvilogo.png"
              alt="YuviCollab logo"
              width={28}
              height={28}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base bg-indigo-500 bg-clip-text text-transparent">
                YuviCollab
              </span>
              <span className="text-[10px] sm:text-xs text-[#a0a0b0]">
                Student DashBoard
              </span>
            </div>
          </Link>

          {/* Right side: user + logout */}
          {session ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => signOut({ callbackUrl: "/auth" })}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-500/30 border border-purple-500/40 transition font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href={"/auth"}>
              <button className="bg-indigo-600 px-3 py-2 rounded-full hover:bg-indigo-400 transition-all ">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
