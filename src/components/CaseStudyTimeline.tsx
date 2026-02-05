"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyTimelineProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyTimeline({ caseStudies }: CaseStudyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animated progress line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-20 px-6" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-emerald-600 mb-2">Option D: Vertical Timeline with Parallax</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Case Studies
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Deep dives into impactful product work—strategy, execution, and measurable results.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Background Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 md:-translate-x-1/2" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600 md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          {caseStudies.map((study, index) => (
            <TimelineCard 
              key={study.slug} 
              study={study} 
              index={index} 
              total={caseStudies.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TimelineCardProps {
  study: CaseStudy;
  index: number;
  total: number;
}

function TimelineCard({ study, index, total }: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds based on position
  const isEven = index % 2 === 0;
  
  // Parallax Y movement - cards float up as you scroll
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [60, 0, -30]
  );

  // Parallax X movement - subtle horizontal drift
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isEven ? [20, 0, -10] : [-20, 0, 10]
  );

  // Scale effect
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.95]
  );

  // Opacity
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.5]
  );

  // Rotation for subtle tilt effect
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isEven ? [-2, 0, 1] : [2, 0, -1]
  );

  return (
    <div
      ref={cardRef}
      className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline Dot with pulse animation */}
      <motion.div 
        className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-lg md:-translate-x-1/2 z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-400"
          animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
      </motion.div>

      {/* Card with parallax */}
      <motion.div 
        className={`flex-1 ml-12 md:ml-0 ${isEven ? "md:pr-16" : "md:pl-16"}`}
        style={{ y, x, scale, opacity, rotate }}
      >
        <Link href={`/case-studies/${study.slug}`}>
          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Company Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  {study.company}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors mb-2">
                {study.title}
              </h3>
              <p className="text-slate-600 mb-6">
                {study.subtitle}
              </p>

              {/* Key Metrics with staggered animation */}
              <div className="grid grid-cols-3 gap-3">
                {study.highlightMetrics.map((metric, idx) => (
                  <motion.div 
                    key={idx} 
                    className="bg-slate-50/80 rounded-xl p-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    <p className="text-xs text-slate-500 mb-1 truncate">{metric.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-slate-400">{metric.before}</span>
                      <span className="text-emerald-500 text-xs">→</span>
                      <span className="text-base font-bold text-emerald-600">{metric.after}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Read More */}
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                <span>Read case study</span>
                <motion.svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 4 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}
