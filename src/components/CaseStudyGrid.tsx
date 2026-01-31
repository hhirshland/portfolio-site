"use client";

import { motion } from "framer-motion";
import CaseStudyCard from "./CaseStudyCard";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyGrid({ caseStudies }: CaseStudyGridProps) {
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
        
        <div className="flex flex-col gap-6">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
