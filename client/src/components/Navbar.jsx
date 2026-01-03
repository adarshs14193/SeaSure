import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT US", path: "/contact" },
  ];

  return (
    <header className="bg-[#0A5A6A] shadow-lg p-2">
      <div className="max-w-8xl mx-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="SeaSure"
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="text-xl font-semibold text-white">
              SeaSure
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="
                  inline-block
                  px-2 py-1
                  uppercase
                  text-base font-medium tracking-wide
                  text-white
                  hover:text-black
                  transition-colors duration-200
                "
              >
                {link.name}
              </Link>

            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md text-white hover:bg-white/20"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-64 bg-white p-6 shadow-lg">
            <nav className="flex flex-col space-y-4 mt-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="
                    block
                    px-2 py-2
                    uppercase
                    text-base font-medium
                    text-gray-800
                    hover:text-black
                    transition-colors
                  "
                >
                  {link.name}
                </Link>

              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
