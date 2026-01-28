"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { useToast } from "./Toast";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast("Coming soon!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <button onClick={handleClick} className="w-full text-left">
        <div className="group relative bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-1">
          {/* Thumbnail with padding and rounded corners */}
          <div className="p-4 pb-0">
            <div className="aspect-square relative overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-300 rounded-2xl" />
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 pt-4">
            <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            
            {/* Tags */}
            {/*
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
            */}
          </div>
          
          {/* Links */}
          {/*
          <div className="px-6 pb-6 pt-0 flex gap-3">
            {project.liveUrl && (
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live
              </span>
            )}
            {project.githubUrl && (
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Code
              </span>
            )}
          </div>
          */}
        </div>
      </button>
    </motion.div>
  );
}
