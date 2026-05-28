"use client";

import { useState } from "react";

import { loginUser } from "@/lib/auth";

import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await loginUser(email, password);

      alert("Login Successful 🚀");

      router.push("/dashboard");

    } catch (error) {

      alert("Invalid Credentials");

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 🚀
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-[#334155] text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-[#334155] text-white outline-none"
          />

          <button
            className="w-full bg-blue-600 py-3 rounded-lg text-white"
          >
            Login
          </button>

        </form>
        <p className="text-white/70 text-sm text-center mt-5">

          Don’t have an account?{" "}

          <span
            onClick={() =>
              router.push("/signup")
            }
            className="
  text-blue-400
  font-semibold
  cursor-pointer
  hover:!text-blue-500
  hover:underline
  hover:scale-105
  transition-all duration-300
  inline-block
"
          >
            Create Account
          </span>

        </p>

      </div>

    </div>

  );

}