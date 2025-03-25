"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  
    if (res?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }
  
    // ✅ Fetch updated session
    const session = await fetch("/api/auth/session").then((res) => res.json());
  
    console.log("Session after login:", session); // Debug session
    console.log("User Role:", session?.user?.role); // Debug role
  
    // ✅ Convert role to lowercase before checking
    const role = session?.user?.role?.toLowerCase();
  
    if (role === "merchant") {
      router.replace("/merchant-dashboard");
    } else if (role === "planner") {
      router.replace("/planner-dashboard");
    } else {
      router.replace("/");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Welcome Back</h2>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-black px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-black px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>Remember me</span>
            </label>
            <Link href="#" className="font-semibold hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={() => {
            setLoading(true);
            signIn("google");
          }}
          className="w-full text-black flex items-center justify-center border px-4 py-3 rounded-md bg-gray-100 hover:bg-gray-200 transition"
          disabled={loading}
        >
          <FaGoogle className="mr-2" />
          {loading ? "Loading..." : "Login with Google"}
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="font-semibold text-black hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
