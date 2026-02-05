"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCarouselProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyCarousel({ caseStudies }: CaseStudyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  const currentStudy = caseStudies[currentIndex];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Case Studies
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Deep dives into impactful product work—strategy, execution, and measurable results.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {caseStudies.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:bg-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:bg-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/case-studies/${currentStudy.slug}`}>
                <div className="group bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 overflow-hidden">
                  <div className="p-8 md:p-10">
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                        {currentStudy.title}
                      </h3>
                      <p className="text-slate-600 mt-2 text-lg">
                        {currentStudy.subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {currentStudy.highlightMetrics.map((metric, idx) => (
                        <div key={idx} className="bg-white/60 rounded-xl p-4 border border-white/80">
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                            {metric.label}
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm text-slate-400">{metric.before}</span>
                            <svg className="w-3 h-3 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <span className="text-xl font-bold text-emerald-600">{metric.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          {caseStudies.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {caseStudies.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-emerald-500 w-8"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
