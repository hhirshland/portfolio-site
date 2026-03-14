"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { useToast } from "./Toast";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function CardInner({ project }: { project: Project }) {
  return (
    <div className="group relative bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-1">
      <div className="p-4 pb-0">
        <div className="aspect-square relative overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-300 rounded-2xl" />
        </div>
      </div>

      <div className="p-6 pt-4">
        <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { showToast } = useToast();
  const hasDetailPage = !!project.demoVideo;

  const handleClick = () => {
    if (!hasDetailPage) {
      showToast("Coming soon!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {hasDetailPage ? (
        <Link href={`/projects/${project.slug}`} className="block w-full text-left">
          <CardInner project={project} />
        </Link>
      ) : (
        <button onClick={handleClick} className="w-full text-left">
          <CardInner project={project} />
        </button>
      )}
    </motion.div>
  );
}
