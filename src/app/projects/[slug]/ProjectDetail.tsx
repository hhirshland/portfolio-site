"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
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
            href="/projects"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to projects
          </Link>
        </motion.div>
        
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/50 shadow-lg shadow-emerald-900/5"
        >
          {/* Thumbnail placeholder */}
          <div className="aspect-video bg-gradient-to-br from-emerald-100 to-sky-100 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl opacity-20 font-bold">
                {project.title.charAt(0)}
              </span>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {project.title}
            </h1>
            
            <p className="text-lg text-slate-600 mb-6">
              {project.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-medium px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Links */}
            <div className="flex gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/50 shadow-lg shadow-emerald-900/5"
        >
          <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-ul:text-slate-600 prose-li:text-slate-600">
            {project.content.split('\n').map((line, index) => {
              const trimmedLine = line.trim();
              if (trimmedLine.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-slate-800 mt-8 mb-4 first:mt-0">
                    {trimmedLine.replace('## ', '')}
                  </h2>
                );
              } else if (trimmedLine.startsWith('- ')) {
                return (
                  <li key={index} className="text-slate-600 ml-4">
                    {trimmedLine.replace('- ', '')}
                  </li>
                );
              } else if (trimmedLine) {
                return (
                  <p key={index} className="text-slate-600 mb-4">
                    {trimmedLine}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
