"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import icon from "../icon.png";
import MenuButton from "./MenuButton";
import LoginButton from "./LoginButton";

// Navbar for the home page
const Navbar = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="fixed top-0 left-0 w-full text-white px-6 py-4 lg:px-12 flex items-center justify-between z-50">
      {/* Hack The North Logo + Text (Clickable) */}
      <Link href="/" className="flex items-center space-x-3">
        <Image src={icon} alt="Hack The North Logo" width={40} height={40} />
        <span className="text-xl font-bold text-primary">Hack The North</span>
      </Link>

      {/* Desktop Navigation (Hidden on Small Screens) */}
      <div className="hidden lg:flex gap-4">
        <MenuButton onClick={() => router.push("/events")}>Events</MenuButton>
        <LoginButton />
      </div>

      {/* Hamburger Menu Button (Mobile Only) */}
      <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
        <Menu size={32} />
      </button>

      {/* Sidebar (Mobile Only) */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar Menu */}
          <div className="fixed top-0 left-0 h-full w-64 bg-bgSecondary p-6 flex flex-col space-y-6 shadow-lg transition-transform duration-300">
            {/* Close Button */}
            <button
              className="self-end text-text"
              onClick={() => setSidebarOpen(false)}>
              <X size={32} />
            </button>

            {/* Navigation Links */}
            <Link
              href="/"
              className="flex items-center space-x-3 text-xl font-bold text-primary"
              onClick={() => setSidebarOpen(false)}>
              <Image
                src={icon}
                alt="Hack The North Logo"
                width={40}
                height={40}
              />
              <span>Hack The North</span>
            </Link>
            <MenuButton onClick={() => router.push("/events")}>
              Events
            </MenuButton>
            <LoginButton />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
