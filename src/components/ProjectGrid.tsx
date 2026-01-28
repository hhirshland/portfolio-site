"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";
import { useToast } from "./Toast";

interface ProjectGridProps {
  projects: Project[];
  showViewAll?: boolean;
}

export default function ProjectGrid({ projects, showViewAll = false }: ProjectGridProps) {
  const { showToast } = useToast();

  const handleViewAll = () => {
    showToast("Coming soon!");
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A collection of projects I&apos;ve worked on. Each one taught me something new
            and pushed me to grow as a developer.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button
              onClick={handleViewAll}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium bg-white/40 backdrop-blur-sm border border-white/50 shadow-lg shadow-emerald-900/5 hover:bg-white hover:border-slate-300 text-emerald-600 hover:text-emerald-700 transition-all duration-300"
            >
              View all projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
