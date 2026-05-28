"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";



import Link from "next/link";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import {
  FiHome,
  FiClipboard,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar({
  isAdmin,
  
}: {
  isAdmin: boolean;
}) {
  const router = useRouter();

  const pathname = usePathname();
 const { darkMode, toggleTheme } = useTheme();
   

  // LOGOUT FUNCTION

  const handleLogout = async () => {

    try {

      await signOut(auth);

      router.push("/");

    } catch (error) {

      console.log(error);

    }

  };
 

  return (

<aside className="hidden md:flex w-60 fixed left-0 top-0 h-screen bg-[#111827] text-white p-5 flex-col justify-between border-r border-slate-700 z-30">      {/* TOP */}

      <div>

        {/* LOGO */}

        <h1 className="text-3xl font-bold text-white mb-12">
          NuageCx
        </h1>

        {/* NAVIGATION */}

        <nav className="flex flex-col gap-4">

          {/* DASHBOARD */}

          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ease-in-out duration-300
            ${pathname === "/dashboard"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-blue-600"
              }`}
          >

            <FiHome size={20} />

            Dashboard

          </Link>

          {/* TASKS */}

          <Link
            href="/tasks"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ease-in-out duration-300
            ${pathname === "/tasks"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-blue-600 hover:shadow-lg hover:scale-[1.02]"
              }`}
          >

            <FiClipboard size={20} />

            Tasks

          </Link>

          {/* WORKSPACE */}

          <Link
            href="/workspace"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ease-in-out duration-300
            ${pathname === "/workspace"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-blue-600 hover:shadow-lg hover:scale-[1.02]"
              }`}
          >

            <FiUsers size={20} />

            Workspace

          </Link>

        </nav>

      </div>
      {isAdmin && (

        <Link
          href="/admin"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
        >

          👑 Admin Panel

        </Link>

      )}

    
      {/* LOGOUT BUTTON */}

      <button
        onClick={handleLogout}
        className="
          flex items-center justify-center gap-3
          bg-gradient-to-r from-red-500 to-red-600
          hover:from-red-600 hover:to-red-700
          text-white
          px-4 py-3
          rounded-2xl
          font-semibold
          shadow-lg shadow-red-500/20
          hover:shadow-red-500/40
          hover:-translate-y-1
          hover:scale-[1.02]
          active:scale-95
          transition-all duration-300
          cursor-pointer
        "
      >

        <FiLogOut size={20} />

        Logout

      </button>

    </aside>

  );

}