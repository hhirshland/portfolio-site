"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
}

export default function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/case-studies/${caseStudy.slug}`}>
        <div className="group relative bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                  {caseStudy.title}
                </h3>
                <p className="text-slate-600 mt-2">
                  {caseStudy.subtitle}
                </p>
              </div>
              
              {/* Arrow indicator */}
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4">
              {caseStudy.highlightMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white/60 rounded-xl p-4 border border-white/80"
                >
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    {metric.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-slate-400">
                      {metric.before}
                    </span>
                    <svg className="w-3 h-3 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="text-lg md:text-xl font-bold text-emerald-600">
                      {metric.after}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile arrow */}
            <div className="flex items-center justify-center mt-6 md:hidden">
              <span className="text-sm font-medium text-emerald-600 flex items-center gap-2">
                Read case study
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
