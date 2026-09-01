"use client";

import { motion } from "framer-motion";

const tools = [
  {
    name: "Cursor",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/cursor.png" alt="Cursor" className="w-8 h-8 object-contain" />
    ),
  },
  {
    name: "Claude",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/claude.png" alt="Claude" className="w-8 h-8 object-contain" />
    ),
  },
  {
    name: "OpenAI",
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#000000">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#000000">
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/supabase.png" alt="Supabase" className="w-8 h-8 object-contain" />
    ),
  },
  {
    name: "Expo",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/expo.png" alt="Expo" className="w-8 h-8 object-contain" />
    ),
  },
  {
    name: "Next.js",
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#000000">
        <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/figma.png" alt="Figma" className="w-8 h-8 object-contain" />
    ),
  },
  {
    name: "Granola",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/granola.png" alt="Granola" className="w-8 h-8 object-contain" />
    ),
  },
  {
    name: "PostHog",
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#000000">
        <path d="M9.854 14.5 5 9.647.854 5.5A.5.5 0 0 0 0 5.854V8.44a.5.5 0 0 0 .146.353L5 13.647l.147.146L9.854 18.5l.146.147v-.049c.065.03.134.049.207.049h2.586a.5.5 0 0 0 .353-.854L9.854 14.5zm0-5-4-4a.487.487 0 0 0-.409-.144.515.515 0 0 0-.356.21.493.493 0 0 0-.089.288V8.44a.5.5 0 0 0 .147.353l9 9a.5.5 0 0 0 .853-.354v-2.585a.5.5 0 0 0-.146-.354l-5-5zm1-4a.5.5 0 0 0-.854.354V8.44a.5.5 0 0 0 .147.353l4 4a.5.5 0 0 0 .853-.354V9.854a.5.5 0 0 0-.146-.354l-4-4zm12.647 11.515a3.863 3.863 0 0 1-2.232-1.1l-4.708-4.707a.5.5 0 0 0-.854.354v6.585a.5.5 0 0 0 .5.5H23.5a.5.5 0 0 0 .5-.5v-.6c0-.276-.225-.497-.499-.532zm-5.394.032a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6zM.854 15.5a.5.5 0 0 0-.854.354v2.293a.5.5 0 0 0 .5.5h2.293c.222 0 .39-.135.462-.309a.493.493 0 0 0-.109-.545L.854 15.501zM5 14.647.854 10.5a.5.5 0 0 0-.854.353v2.586a.5.5 0 0 0 .146.353L4.854 18.5l.146.147h2.793a.5.5 0 0 0 .353-.854L5 14.647z" />
      </svg>
    ),
  },
  {
    name: "Mixpanel",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/mixpanel.png" alt="Mixpanel" className="w-8 h-8 object-contain" />
    ),
  },
];

interface ToolkitProps {
  grayscale?: boolean;
  title?: string;
}

export default function Toolkit({ grayscale = false, title = "My Toolkit" }: ToolkitProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/50 shadow-lg shadow-emerald-900/5"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 text-center">
            {title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-center mb-10">
            The tools I use to bring ideas to life.
          </p>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-14 h-14 flex items-center justify-center rounded-xl bg-white/60 border border-white/50 shadow-sm group-hover:shadow-md group-hover:bg-white transition-all duration-300 text-slate-700 group-hover:text-emerald-600 ${grayscale ? 'grayscale group-hover:grayscale-0' : ''}`}>
                  {tool.logo}
                </div>
                <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800 transition-colors text-center">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
