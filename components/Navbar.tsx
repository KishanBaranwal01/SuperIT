// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar({ onOpenBookModal }: { onOpenBookModal: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
            ⚡
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">FIBER<span className="text-blue-600">NET</span></span>
            <span className="block text-[10px] font-semibold text-slate-400 tracking-widest uppercase">Ultra Broadband</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/plans" className="hover:text-blue-600 transition">Plans & Pricing</Link>
          <Link href="/coverage" className="hover:text-blue-600 transition">Coverage Area</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact & Support</Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+919876543210" className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-200 transition">
            📞 24x7: 98765-43210
          </a>
          <button
            onClick={onOpenBookModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 transition active:scale-95"
          >
            Get New Connection
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <Link href="/" className="block py-2 text-slate-700 font-medium">Home</Link>
          <Link href="/plans" className="block py-2 text-slate-700 font-medium">Plans & Pricing</Link>
          <Link href="/coverage" className="block py-2 text-slate-700 font-medium">Coverage Area</Link>
          <Link href="/contact" className="block py-2 text-slate-700 font-medium">Contact & Support</Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBookModal();
            }}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl mt-2"
          >
            Get New Connection
          </button>
        </div>
      )}
    </header>
  );
}