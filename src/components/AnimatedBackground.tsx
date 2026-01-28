"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <>
      {/* Background color that shows after image ends - matches high alpine */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-[#e0f0ff] to-[#f5faff]" />
      
      {/* Scrolling background image - different images for mobile vs desktop */}
      <div className="absolute top-0 left-0 right-0 -z-10">
        {/* Mobile background - shown on small screens */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/background-mobile.png"
          alt=""
          className="w-full h-auto md:hidden"
        />
        {/* Desktop background - shown on medium screens and up */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/background.png"
          alt=""
          className="w-full h-auto hidden md:block"
        />
        {/* Gradient fade at the bottom - matches high alpine */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f5faff] to-transparent" />
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
