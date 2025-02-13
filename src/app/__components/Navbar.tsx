"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import icon from "../icon.png";

const Navbar = () => {
  // State to keep track of the hamburger menu
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent text-white px-6 py-4 lg:px-12 flex items-center justify-between z-50">
      {/* HTN Logo (left hand side) */}
      <Link href="/">
        <Image
          src={icon}
          alt="Logo"
          className="h-10 sm:h-12 object-contain"
          width={48}
          height={48}
        />
      </Link>

      {/* Navigation links (right hand side) */}
      <div className="hidden md:flex gap-4">
        <button className="bg-primary hover:bg-accent text-white px-5 py-2 rounded-lg transition">
          Login
        </button>
        <button
          className="bg-primary hover:bg-accent text-white px-5 py-2 rounded-lg transition"
          onClick={() => setIsOpen(false)}>
          Events
        </button>
      </div>

      {/* Hamburger menu exit button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Hamburger menu for smaller screens */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/80 text-white flex flex-col items-center gap-6 py-8 text-xl backdrop-blur-md md:hidden">
          <Link
            href="/events"
            className="hover:text-primary transition"
            onClick={() => setIsOpen(false)}>
            Events
          </Link>
          <button
            className="bg-primary hover:bg-accent text-white px-5 py-2 rounded-lg transition"
            onClick={() => setIsOpen(false)}>
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
