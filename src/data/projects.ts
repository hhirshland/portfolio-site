export interface Project {
  slug: string;
  title: string;
  description: string;
  descriptionLink?: { text: string; url: string };
  thumbnail: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoVideo?: string;
  content: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "lomita-os",
    title: "Lomita OS",
    description: "A supervised AI command center for relationship-driven investment teams—agents do the work, humans stay in control.",
    thumbnail: "/projects/lomita-os.jpg",
    tags: ["Next.js", "Supabase", "Vercel AI SDK", "Gmail API"],
    liveUrl: "https://www.lomita.ai",
    content: `
## Overview

Lomita OS is the product behind Lomita AI: a supervised command center where investment teams manage a fleet of AI agents. The first vertical slice is an outbound email agent that moves a contact from CRM selection through grounded draft generation, human edits or feedback-driven revisions, and an explicit Gmail-approved send—then evaluates the first draft against the exact version that was sent, so the agent measurably improves over time.

## Key Features

- CRM workspace with company, relationship, and next-action context, plus on-demand AI contact enrichment
- Grounded email drafting with immutable draft versions—every edit and feedback turn is preserved
- Human-in-the-loop review queue: the model has no send tool, and every send requires explicit approval
- Writing profile and evidence-backed rules learned from your own sent email history
- Deterministic evals comparing each first draft to the final sent version

## Technical Details

Built with Next.js and the Vercel AI SDK via AI Gateway. Supabase powers the multi-tenant backend with row-level security and encrypted Gmail history. Langfuse handles observability, with AI inputs and outputs omitted from hosted traces.

## Learnings

Building agents for finance taught me that safety is the product: append-only audit records, AES-256-GCM encryption for mailbox data, server-side compare-and-swap checks on every send, and keeping the model physically unable to send email are what make an agent system professionals can actually trust.
    `,
    featured: true,
  },
  {
    slug: "thrive",
    title: "Thrive",
    description: "An identity-based habit formation app designed to help people become the best version of themselves, inspired by Atomic Habits.",
    thumbnail: "/projects/project-3.png",
    tags: ["React Native", "Expo", "Vapi", "Supabase"],
    liveUrl: "https://thrive.hyperactivestudio.xyz/",
    demoVideo: "/projects/thrive-demo.mp4",
    content: `
## Overview

I designed Thrive to be the operating system for people looking to build better habits. Inspired by Atomic Habits' identity-based habit formation, we start by helping users define who they aspire to be. Then we help them identify what that person does daily and focus on doing those things each day. Thrive keeps people accountable, encourages reflection on what's working and what isn't, and builds lasting habits by focusing on what matters most—not just tracking everything.

## Key Features

- Daily habit tracking
- Morning intentions (top 3 most important things each day)
- Evening reflections (celebrate wins, surface identity tensions)
- Evening accountability calls—AI calls each night to run through reflections, habits, and intentions, automatically checking things off in the app
- Weekly AI reflections

## Technical Details

Mobile app built with React Native and Expo. Vapi powers the nightly phone calls. Supabase for the backend.

## Learnings

Built familiarity deploying mobile apps and the different CI/CD workflows compared to web. Also experimented with building helpful agent skills—like a multi-variate testing skill that generates two or more variations of a feature for rapid design critique and UI exploration.
    `,
    featured: true,
  },
  {
    slug: "grove",
    title: "Grove Insights",
    description: "AI-moderated user interview tool for qualitative user research at survey scale.",
    thumbnail: "/projects/project-1.png",
    tags: ["Next.js", "OpenAI", "Supabase"],
    liveUrl: "https://groveinsights.ai",
    githubUrl: "https://github.com/hhirshland/groveinsights",
    demoVideo: "/projects/grove-demo.mp4",
    content: `
## Overview

I've always believed the best way to solve product problems is to talk directly to users. But I've also felt the friction of manual user interviews—scheduling sessions, coordinating calendars, and spending hours each week conducting and transcribing. Grove was built to give teams the qualitative insights they need without that headache.

## Key Features

- AI-moderated interviews with customizable agents for each study
- AI-powered insights that surface key learnings from individual interviews and across the full study
- Chat interface to explore and dig deeper into interview responses
- Full transcripts and video recordings for every session
- Google OAuth for simple sign-in

## Technical Details

Built with Next.js and OpenAI's APIs for custom voice agents and AI-powered features. Supabase for the backend.

## Learnings

Learned how to build voice-first custom agents, implement RAG for context-aware responses, and use evals to systematically improve agent performance over time.
    `,
    featured: true,
  },
  {
    slug: "40-ball",
    title: "40 Ball",
    description: "A mobile app to play and score the golf game 40 Ball with large groups.",
    descriptionLink: { text: "40 Ball", url: "https://www.thefriedegg.com/articles/how-to-play-golf-game-40-score" },
    thumbnail: "/projects/project-2.png",
    tags: ["React Native", "Expo", "Firebase"],
    liveUrl: "https://testflight.apple.com/join/SMAMFbCc",
    demoVideo: "/projects/40ball-demo.mp4",
    content: `
## Overview

40 Ball is my favorite golf game for big groups—a great way to run a large competition that spans multiple tee times. My friends and I used to score it with a manual spreadsheet, so I built an app for us to use instead.

## Key Features

- Course finder: search for your course and pull in course data (hole handicap info)
- Random team sorting: randomly assign teams or assign based on handicaps
- Recent players: select players from past rounds with their handicaps saved
- Smart scoring: automatically calculate each player's net score based on their handicaps
- Real-time leaderboard to track the competition live
- Track your progress to see if you're above or below the expected pace

## Technical Details

Built with React Native and Expo. Lightweight database using Firebase for real-time state management across devices.

## Learnings

Practice deploying mobile apps.
    `,
    featured: true,
  },
  {
    slug: "first-to-worst",
    title: "First to Worst App",
    description: "A mobile app to play First to Worst on the go—no physical cards required. Built after enjoying the game with family over the holidays.",
    thumbnail: "/projects/first-to-worst.png",
    tags: ["Expo", "React Native", "Firebase"],
    demoVideo: "/projects/first-to-worst-demo.mp4",
    content: `
## Overview

I had a great time playing First to Worst with my family over the holidays, so I decided to build a mobile app to make it easy to play on the go without bringing the physical cards.

## Key Features

- Play First to Worst anywhere—no deck of cards needed
- Clean, intuitive mobile interface for quick rounds
- Firebase backend for game state and persistence
- Built for iOS and Android with Expo

## Technical Details

Built with Expo and React Native for cross-platform mobile development. Firebase handles the backend—real-time data sync and lightweight storage for game sessions.

## Learnings

Another opportunity to ship a mobile app and bring a favorite tabletop game into the digital world.
    `,
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
