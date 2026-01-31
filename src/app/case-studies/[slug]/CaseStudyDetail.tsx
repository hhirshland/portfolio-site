"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/#case-studies"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to home
          </Link>
        </motion.div>
        
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/50 shadow-lg shadow-emerald-900/5"
        >
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {caseStudy.title}
            </h1>
            
            <p className="text-lg text-slate-600">
              {caseStudy.subtitle}
            </p>
          </div>
        </motion.div>
        
        {/* Results Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 md:p-10 shadow-lg shadow-emerald-900/20"
        >
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            Key Results
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {caseStudy.results.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white/15 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center"
              >
                <p className="text-xs font-medium text-emerald-100 uppercase tracking-wide mb-2">
                  {metric.label}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-emerald-200">
                    {metric.before}
                  </span>
                  <svg className="w-3 h-3 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="text-xl md:text-2xl font-bold text-white">
                    {metric.after}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Context Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/50 shadow-lg shadow-emerald-900/5"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">1</span>
            Context
          </h2>
          <div className="space-y-4">
            {caseStudy.context.map((paragraph, idx) => (
              <p key={idx} className="text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
        
        {/* Problem Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/50 shadow-lg shadow-emerald-900/5"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">2</span>
            Problem
          </h2>
          <div className="space-y-3">
            {caseStudy.problem.map((item, idx) => {
              // First item is the main problem statement
              if (idx === 0) {
                return (
                  <p key={idx} className="text-lg font-medium text-slate-700 mb-4">
                    {item}
                  </p>
                );
              }
              // Last item is the conclusion
              if (idx === caseStudy.problem.length - 1) {
                return (
                  <p key={idx} className="text-slate-600 leading-relaxed mt-4 pt-4 border-t border-slate-200">
                    {item}
                  </p>
                );
              }
              // Middle items are bullet points
              return (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0" />
                  <p className="text-slate-600">{item}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Strategy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/50 shadow-lg shadow-emerald-900/5"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">3</span>
            Strategy
          </h2>
          <div className="space-y-4">
            {caseStudy.strategy.map((item, idx) => {
              if (idx === 0) {
                return (
                  <p key={idx} className="text-slate-600 leading-relaxed mb-4">
                    {item}
                  </p>
                );
              }
              // Strategy items with em-dash are key points
              if (item.includes("—")) {
                const [title, description] = item.split("—");
                return (
                  <div key={idx} className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                    <p className="font-semibold text-slate-800">{title.trim()}</p>
                    <p className="text-slate-600 text-sm mt-1">{description.trim()}</p>
                  </div>
                );
              }
              return (
                <p key={idx} className="text-slate-600 leading-relaxed">
                  {item}
                </p>
              );
            })}
          </div>
        </motion.div>
        
        {/* Execution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/50 shadow-lg shadow-emerald-900/5"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">4</span>
            Execution
          </h2>
          
          <div className="space-y-6">
            {caseStudy.execution.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/50 rounded-xl p-6 border border-slate-100"
              >
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {item.title}
                    </h3>
                    <div className="space-y-2">
                      {item.description.map((desc, descIdx) => {
                        // Check if it's a bullet point style item (starts with action word or has specific pattern)
                        const isBullet = descIdx > 0 && !desc.endsWith(".");
                        
                        if (isBullet) {
                          return (
                            <div key={descIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                              <p className="text-slate-600 text-sm">{desc}</p>
                            </div>
                          );
                        }
                        
                        return (
                          <p key={descIdx} className="text-slate-600">
                            {desc}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/#case-studies"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium bg-white/40 backdrop-blur-sm border border-white/50 shadow-lg shadow-emerald-900/5 hover:bg-white hover:border-slate-300 text-emerald-600 hover:text-emerald-700 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
