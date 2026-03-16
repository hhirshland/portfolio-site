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
            href="/#projects"
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
          <div className="p-8 md:p-12 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {project.title}
            </h1>
            
            <p className="text-lg text-slate-600">
              {project.descriptionLink && project.description.includes(project.descriptionLink.text) ? (
                <>
                  {project.description.split(project.descriptionLink.text).map((part, i) => (
                    <span key={i}>
                      {part}
                      {i < project.description.split(project.descriptionLink!.text).length - 1 && (
                        <a
                          href={project.descriptionLink!.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline"
                        >
                          {project.descriptionLink!.text}
                        </a>
                      )}
                    </span>
                  ))}
                </>
              ) : (
                project.description
              )}
            </p>
          </div>

          {project.demoVideo ? (
            <div className="px-6">
              <div className="aspect-video bg-transparent relative rounded-xl overflow-hidden">
                <video
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  loop
                  playsInline
                  src={project.demoVideo}
                />
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-emerald-100 to-sky-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl opacity-20 font-bold">
                  {project.title.charAt(0)}
                </span>
              </div>
            </div>
          )}

          <div className="p-8 md:p-12 pt-6">
            {/* Links */}
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
