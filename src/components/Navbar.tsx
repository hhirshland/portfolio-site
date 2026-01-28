"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between rounded-full bg-white/70 backdrop-blur-md px-4 sm:px-6 py-3 shadow-lg shadow-emerald-900/5 border border-white/50">
          <Link
            href="/"
            className="text-xl font-bold text-slate-800 hover:text-emerald-600 transition-colors"
            style={{ fontFamily: 'var(--font-libre-baskerville), serif' }}
          >
            Henry Hirshland
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/#projects" 
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/#about" 
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
            >
              About
            </Link>
            <a
              href="mailto:hhirshland@gmail.com"
              className="text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full transition-colors"
            >
              Contact
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-2xl bg-white/90 backdrop-blur-md px-6 py-4 shadow-lg shadow-emerald-900/5 border border-white/50"
            >
              <div className="flex flex-col gap-4">
                <Link 
                  href="/#projects" 
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  Projects
                </Link>
                <Link 
                  href="/#about" 
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  About
                </Link>
                <a
                  href="mailto:hhirshland@gmail.com"
                  className="text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full transition-colors text-center"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
