"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import icon from "../icon.png";
import MenuButton from "./MenuButton";
import { useRouter } from "next/navigation";

const EventsNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 w-full bg-bgSecondary text-white px-6 py-4 flex items-center justify-between z-50 lg:hidden">
      {/* Hack The North Logo (Clickable) */}
      <Link href="/" className="flex items-center space-x-3">
        <Image src={icon} alt="Hack The North Logo" width={40} height={40} />
        <span className="text-xl font-bold text-primary">Hack The North</span>
      </Link>

      {/* Hamburger Menu Button */}
      <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
        <Menu size={32} />
      </button>

      {/* Sidebar Overlay (When Open) */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-64 bg-bgSecondary p-6 flex flex-col space-y-6 shadow-lg transition-transform duration-300">
            <button
              className="self-end text-text"
              onClick={() => setSidebarOpen(false)}>
              <X size={32} />
            </button>
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
            <MenuButton
              onClick={() => {
                router.push("/");
              }}>
              Home
            </MenuButton>
            <MenuButton onClick={() => {}}>Login</MenuButton>
          </div>
        </>
      )}
    </nav>
  );
};

export default EventsNavbar;
