"use client";

import { motion } from "framer-motion";

export default function ConsultingBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="-mt-12 mb-8 px-6 relative z-10"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/50 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <p className="text-sm text-slate-600">
            Currently deploying AI agents at{" "}
            <a
              href="https://www.lomita.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
            >
              Lomita AI
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
