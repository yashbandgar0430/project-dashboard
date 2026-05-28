"use client";

import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";



import {
  FiBell,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Navbar({
  isAdmin,

}: {
  isAdmin: boolean;

}) {
  // MOBILE MENU STATE
  const { darkMode, toggleTheme } = useTheme();
  const [openMenu, setOpenMenu] =
    useState(false);

  const today = new Date();

  const formattedDate =
    today.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  const router = useRouter();
  const handleLogout = async () => {

    try {

      await signOut(auth);

      router.push("/");

    } catch (error) {

      console.log(error);

    }

  };
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Task created successfully",
      read: false,
    },
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;

  //profile first letter 
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
  // 👇 HERE PASTE getInitial FUNCTION (IMPORTANT)
  const getInitial = () => {
    if (!user) return "U";

    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }

    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }

    return "U";
  };

  return (

    <header className="w-full flex items-center justify-between px-4 md:px-8 py-4 bg-red-600 text-white relative z-50">
      

        {/* LEFT */}

        <div className="flex items-center gap-4">

          {/* MOBILE MENU */}

          <button
            onClick={() =>
              setOpenMenu(!openMenu)
            }
            className="md:hidden text-white text-3xl"
          >

            {openMenu ? <FiX /> : <FiMenu />}

          </button>

          {/* TITLE */}

          <div>

            <h1 className="text-white text-2xl md:text-3xl font-bold">
              Dashboard
            </h1>

          </div>

        </div>

        {/* SEARCH BAR */}

        <div className="hidden lg:flex items-center bg-[#334155] px-4 py-3 rounded-xl w-[260px] hover:ring-2 hover:ring-blue-500 transition-all duration-300">

          <FiSearch className="text-gray-400 mr-3" />

          <input
            type="text"
            placeholder="Search tasks..."
            className="bg-transparent outline-none text-white placeholder:text-gray-400 w-full"
          />

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-6">
          <button onClick={toggleTheme}>
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
          <div className="flex items-center gap-6">





            <div className="relative">

              {/* BELL ICON */}
              <button
                onClick={() => setOpen(!open)}
                className="text-xl relative"
              >
                🔔
              </button>

              {/* 🔴 RED DOT */}
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}

              {/* 📩 DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-3 w-72 bg-white shadow-xl rounded-xl p-3 z-50">

                  {/* EMPTY STATE */}
                  {notifications.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2 text-sm border-b ${n.read ? "text-gray-400" : "text-black font-medium"
                          }`}
                      >
                        {n.message}
                      </div>
                    ))
                  )}

                </div>
              )}

            </div>

          </div>

          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold hover:scale-110 transition-all duration-300 shadow-md cursor-pointer">

            {getInitial()}

          </div>
          {isAdmin && (

            <div className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-xs font-bold">

              Admin
            </div>

          )}

        </div>

      
      {/* MOBILE DROPDOWN */}

      {openMenu && (

        <div className="absolute top-full left-0 w-full md:hidden bg-[#334155] rounded-xl p-4 flex flex-col gap-4 z-50 shadow-lg">

          <button
            onClick={() => router.push("/dashboard")}
            className="text-left text-white hover:text-blue-400 transition-all"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/tasks")}
            className="text-left text-white hover:text-blue-400 transition-all"
          >
            Tasks
          </button>

          <button
            onClick={() => router.push("/workspace")}
            className="text-left text-white hover:text-blue-400 transition-all"
          >
            Workspace
          </button>
          <button
            onClick={handleLogout}
            className="md:hidden flex items-center justify-center">

            <FiX size={18} />

            Logout

          </button>



        </div>

      )}

    </header>

  );

}