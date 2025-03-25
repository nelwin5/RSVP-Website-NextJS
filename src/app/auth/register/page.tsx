"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    termsAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
  
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    if (!formData.termsAccepted) {
      setErrorMessage("You must accept the terms & conditions.");
      return;
    }
    if (!formData.role) {
      setErrorMessage("Please select a role (Merchant or Planner).");
      return;
    }
  
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: formData.fullName,
          businessName: formData.businessName,
          email: formData.email,
          password: formData.password,
          role: formData.role.toUpperCase(), // ✅ Convert role to uppercase before sending
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }
  
      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => router.replace("/auth/login"), 2000);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Create Account</h2>

        {/* Success & Error Messages */}
        {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit} className="text-black space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          <input type="text" name="businessName" placeholder="Agency/Business Name" value={formData.businessName} onChange={handleChange} className="w-full px-4 py-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />

          {/* Role Selection Dropdown */}
          <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" required>
            <option value="">Select Role</option>
            <option value="merchant">Merchant</option>
            <option value="planner">Planner</option>
          </select>

          {/* Terms & Conditions */}
          <div className="flex items-center text-sm text-gray-700">
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mr-2 rounded border-gray-400 focus:ring-2 focus:ring-blue-500" required />
            <span>I agree to the <span className="font-semibold text-blue-600">Terms & Conditions</span> and <span className="font-semibold text-blue-600">Privacy Policy</span></span>
          </div>

          {/* Sign Up Button */}
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign Up Button */}
        <button className="w-full text-black flex items-center justify-center border border-gray-400 px-4 py-3 rounded-md bg-gray-50 hover:bg-gray-200 transition">
          <FaGoogle className="mr-2"/>
          Sign up with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
