"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CaseStudyCard from "./CaseStudyCard";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyGrid({ caseStudies }: CaseStudyGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Reverse so the first item in array appears on top
  const stackedStudies = [...caseStudies].reverse();

  return (
    <section id="case-studies" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Case Studies
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Deep dives into impactful product work—strategy, execution, and measurable results.
          </p>
        </motion.div>
        
        {/* Stacked cards container */}
        <div 
          className="relative"
          style={{ 
            minHeight: isExpanded 
              ? `${caseStudies.length * 320 + (caseStudies.length - 1) * 24}px` 
              : `${320 + (caseStudies.length - 1) * 16}px` 
          }}
        >
          <AnimatePresence>
            {stackedStudies.map((caseStudy, index) => {
              const reverseIndex = caseStudies.length - 1 - index;
              const isTopCard = reverseIndex === 0;
              
              return (
                <motion.div
                  key={caseStudy.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1,
                    x: isExpanded ? 0 : reverseIndex * 16,
                    y: isExpanded ? reverseIndex * 344 : reverseIndex * 16,
                    scale: isExpanded ? 1 : 1 - reverseIndex * 0.02,
                    zIndex: caseStudies.length - reverseIndex,
                    rotate: isExpanded ? 0 : reverseIndex * 1,
                  }}
                  transition={{ 
                    duration: 0.4, 
                    delay: isExpanded ? reverseIndex * 0.05 : (caseStudies.length - 1 - reverseIndex) * 0.05,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  viewport={{ once: true }}
                  className="absolute top-0 left-0 right-0"
                  style={{ 
                    zIndex: caseStudies.length - reverseIndex,
                    transformOrigin: 'top left'
                  }}
                >
                  <CaseStudyCard 
                    caseStudy={caseStudy} 
                    index={reverseIndex}
                    isStacked={!isExpanded && !isTopCard}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Expand/Collapse button */}
        {caseStudies.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
            style={{ 
              marginTop: isExpanded 
                ? '32px' 
                : `${(caseStudies.length - 1) * 16 + 32}px` 
            }}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium bg-white/40 backdrop-blur-sm border border-white/50 shadow-lg shadow-emerald-900/5 hover:bg-white hover:border-slate-300 text-slate-600 hover:text-slate-800 transition-all duration-300"
            >
              {isExpanded ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Collapse
                </>
              ) : (
                <>
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold flex items-center justify-center">
                    {caseStudies.length}
                  </span>
                  View all case studies
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
