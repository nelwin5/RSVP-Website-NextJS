"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter(); // ✅ Initialize router
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false }); // ✅ Prevent default NextAuth redirection
    router.push("/"); // ✅ Redirect to landing page
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-[#ac263e] text-white px-12 py-2 flex justify-between items-center shadow-md z-50 font-monsterrat">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <div className="bg-white">
          <Image src="/images/logo.png" alt="RSVP Logo" width={35} height={30} priority />
        </div>
      </Link>

      {/* Navigation Links (Hidden on Mobile) */}
      <nav className="hidden md:flex space-x-18 text-[14px] font-light tracking-wide">
        <Link href="/template" className="hover:underline">Templates</Link>
        <Link href="/about" className="hover:underline">About us</Link>
        <Link href="/services" className="hover:underline">Services</Link>
        <Link href="/contacts" className="hover:underline">Contacts</Link>
      </nav>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Search Icon */}
        <FiSearch size={20} className="cursor-pointer" />

        {/* Divider */}
        <div className="h-6 w-[1px] bg-white opacity-50"></div>

        {status === "authenticated" ? (
          <div className="relative">
            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center space-x-2">
              <Image src={session.user?.image || "/default-avatar.png"} alt="Profile" width={40} height={40} className="rounded-full border border-white" />
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/auth/login" className="text-white text-[14px] hover:text-gray-300 transition duration-200">
              Login
            </Link>
            <Link href="/auth/register">
              <button className="bg-white text-[14px] text-red-700 px-4 py-1.5 rounded-full font-semibold hover:bg-gray-200 transition">
                Create Account
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-red-700 text-white p-4 flex flex-col items-center space-y-4 md:hidden">
          <Link href="/template" className="hover:underline">Template</Link>
          <Link href="/about" className="hover:underline">About us</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          <Link href="/contacts" className="hover:underline">Contacts</Link>

          {status === "authenticated" ? (
            <button className="border border-white px-4 py-2 rounded-md w-full mt-4" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link href="/auth/login">
                <button className="border border-white px-4 py-2 rounded-md w-full mt-4">Login</button>
              </Link>
              <Link href="/auth/register">
                <button className="bg-white text-red-700 px-4 py-2 rounded-md w-full mt-2">Create Account</button>
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
