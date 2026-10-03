"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  // Slides the image so its top meets the page top and its bottom meets the page bottom, at any page height.
  const transform = useTransform(
    scrollYProgress,
    (p) => `translate3d(0, calc(${-p * 100}% + ${p * 100}vh), 0)`
  );

  return (
    <>
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-[#e0f0ff] to-[#f5faff]" />

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <picture>
          <source media="(min-width: 768px)" srcSet="/background.webp" />
          <motion.img
            src="/background-mobile.webp"
            alt=""
            className="block w-full h-auto will-change-transform"
            style={{ transform }}
          />
        </picture>
      </div>
      
      {/* Fixed floating clouds - subtle movement in viewport */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[8%] left-[5%] w-48 md:w-72 h-24 md:h-36 rounded-full bg-white/30 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-[3%] right-[10%] w-64 md:w-96 h-32 md:h-44 rounded-full bg-white/25 blur-3xl"
          animate={{
            x: [0, -35, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-[15%] left-[30%] w-56 md:w-80 h-28 md:h-32 rounded-full bg-white/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-[5%] left-[50%] w-44 md:w-64 h-20 md:h-28 rounded-full bg-white/25 blur-3xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 12, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-[20%] right-[5%] w-40 md:w-56 h-20 md:h-24 rounded-full bg-white/15 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 8, 0],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </>
  );
}
