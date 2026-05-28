"use client";

import { FaMale, FaFemale } from "react-icons/fa";

type User = {
  id: string;
  email: string;
  gender: "male" | "female";
};

export default function UserList({ users }: { users: User[] }) {
  return (
    <div className="bg-[#1e293b] p-4 rounded-2xl shadow-xl w-full max-w-md">

      {/* TITLE */}
      <h2 className="text-white font-bold mb-4">
        Registered Users
      </h2>

      {/* SCROLL BOX */}
      <div className="h-72 overflow-y-auto space-y-3 pr-2">

        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-[#334155] p-3 rounded-xl hover:bg-[#475569] transition-all"
          >

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">

              {/* ICON */}
              <div className="text-xl">
                {user.gender === "male" ? (
                  <FaMale className="text-blue-400" />
                ) : (
                  <FaFemale className="text-pink-400" />
                )}
              </div>

              {/* EMAIL */}
              <div>
                <p className="text-white text-sm font-medium">
                  {user.email}
                </p>

                <p className="text-gray-400 text-xs capitalize">
                  {user.gender}
                </p>
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}