"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isJumpingRef = useRef(false);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isJumpingRef.current) return;
    const setWidth = el.scrollWidth / 3; // 3 copies for seamless loop both ways
    // Right boundary: scrolled past end of middle copy
    if (el.scrollLeft >= setWidth * 2) {
      isJumpingRef.current = true;
      const offset = el.scrollLeft - setWidth * 2;
      el.style.scrollBehavior = "auto";
      el.scrollLeft = setWidth + offset;
      el.style.scrollBehavior = "";
      requestAnimationFrame(() => {
        isJumpingRef.current = false;
      });
    }
    // Left boundary: scrolled past start of middle copy
    else if (el.scrollLeft <= 0) {
      isJumpingRef.current = true;
      const offset = -el.scrollLeft;
      el.style.scrollBehavior = "auto";
      el.scrollLeft = setWidth - offset;
      el.style.scrollBehavior = "";
      requestAnimationFrame(() => {
        isJumpingRef.current = false;
      });
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const initScroll = () => {
      if (el.scrollWidth > 0) {
        // Start in middle copy so user can scroll both directions
        el.scrollLeft = el.scrollWidth / 3;
      }
    };
    requestAnimationFrame(() => requestAnimationFrame(initScroll));
  }, [projects.length]);

  // At left edge: jump so user can scroll left (wheel + touch)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const setWidth = () => el.scrollWidth / 3;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollLeft <= 0 && e.deltaX > 0) {
        e.preventDefault();
        isJumpingRef.current = true;
        el.style.scrollBehavior = "auto";
        el.scrollLeft = setWidth() - e.deltaX;
        el.style.scrollBehavior = "";
        requestAnimationFrame(() => {
          isJumpingRef.current = false;
        });
      }
    };

    let touchStartX = 0;
    let didJumpThisTouch = false;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      didJumpThisTouch = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (didJumpThisTouch) return;
      // Swiping left = finger moving left = clientX decreasing
      if (el.scrollLeft <= 0 && touchStartX - e.touches[0].clientX > 10) {
        didJumpThisTouch = true;
        const deltaX = touchStartX - e.touches[0].clientX;
        isJumpingRef.current = true;
        el.style.scrollBehavior = "auto";
        el.scrollLeft = setWidth() - deltaX;
        el.style.scrollBehavior = "";
        requestAnimationFrame(() => {
          isJumpingRef.current = false;
        });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [projects.length]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const setWidth = el.scrollWidth / 3;
    const isMobile = el.clientWidth < 640;
    const amount = isMobile
      ? el.clientWidth * 0.85 + 16 // ~1 card (80vw) + gap on mobile
      : el.clientWidth / 3 + 24; // ~1 card + gap on desktop

    // At left edge: smooth scroll to equivalent position in previous copy
    if (direction === "left" && el.scrollLeft < amount) {
      const targetScroll = Math.max(0, setWidth + (el.scrollLeft - amount));
      el.scrollTo({ left: targetScroll, behavior: "smooth" });
      return;
    }

    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
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
            A collection of fullstack apps I&apos;ve built.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-2 w-full">
            {projects.length > 3 && (
              <button
                onClick={() => scroll("left")}
                className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg items-center justify-center text-slate-600 hover:text-emerald-600 hover:bg-white transition-all"
                aria-label="Previous projects"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="project-carousel flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide flex-1 min-w-0 w-full sm:w-[600px] lg:w-[912px] sm:max-w-[600px] lg:max-w-[912px] max-w-full touch-pan-x"
          >
              {[...projects, ...projects, ...projects].map((project, index) => (
                <div
                  key={`${project.slug}-${index}`}
                  className="flex-shrink-0 w-[80vw] sm:w-72 lg:w-72 snap-center sm:snap-start"
                >
                  <ProjectCard project={project} index={index % projects.length} />
                </div>
              ))}
            </div>

            {projects.length > 3 && (
              <button
                onClick={() => scroll("right")}
                className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg items-center justify-center text-slate-600 hover:text-emerald-600 hover:bg-white transition-all"
                aria-label="Next projects"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {projects.length > 3 && (
            <div className="flex sm:hidden justify-center gap-4">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:bg-white transition-all"
                aria-label="Previous projects"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:bg-white transition-all"
                aria-label="Next projects"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
