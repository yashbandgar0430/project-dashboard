"use client";

import { useState } from "react";

import { signupUser } from "@/lib/auth";

import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignupPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");

  const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // SAVE TO FIRESTORE
    await setDoc(doc(db, "users", user.uid), {
      email,
      gender,
      createdAt: new Date(),
    });

    alert("Account Created 🚀");

    router.push("/login");

  } catch (error) {
    alert("Signup Failed");
    console.log(error);
  }
};

  return (

    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Create Account 🚀
        </h1>

        <form
          onSubmit={handleSignup}
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
          <div className="flex gap-4 mt-3">

            <label className="text-white">Gender:</label>

            <div className="mt-4">

  <p className="text-white mb-2">Select Gender</p>

  <div className="flex gap-4">

    {/* MALE CARD */}
    <div
      onClick={() => setGender("male")}
      className={`flex-1 p-3 rounded-xl cursor-pointer text-center transition-all duration-300 border
      ${
        gender === "male"
          ? "bg-blue-600 border-blue-400 scale-105 shadow-lg"
          : "bg-[#334155] border-transparent hover:bg-[#475569]"
      }`}
    >
      👨 Male
    </div>

    {/* FEMALE CARD */}
    <div
      onClick={() => setGender("female")}
      className={`flex-1 p-3 rounded-xl cursor-pointer text-center transition-all duration-300 border
      ${
        gender === "female"
          ? "bg-pink-600 border-pink-400 scale-105 shadow-lg"
          : "bg-[#334155] border-transparent hover:bg-[#475569]"
      }`}
    >
      👩 Female
    </div>

  </div>
</div>

          </div>
          <button
            className="w-full bg-green-600 py-3 rounded-lg text-white"
          >
            Sign Up
          </button>

        </form>
        <p className="text-white/70 text-sm text-center mt-5">

          Already have an account?{" "}

          <span
            onClick={() =>
              router.push("/login")
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
            Login
          </span>

        </p>
      </div>

    </div>

  );

}