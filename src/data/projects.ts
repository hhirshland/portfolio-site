export interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  content: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Grove Insights",
    description: "AI-moderated user interview tool for qualitative user research at survey scale.",
    thumbnail: "/projects/project-1.png",
    tags: ["React", "Python", "TailwindCSS", "OpenAI"],
    liveUrl: "https://groveinsights.ai",
    githubUrl: "https://github.com/henryhirshland/groveinsights",
    content: `
## Overview

This project is an AI-powered analytics dashboard that helps businesses make data-driven decisions faster.

## Key Features

- Real-time data synchronization
- AI-powered insights and recommendations
- Beautiful, responsive charts and visualizations
- Role-based access control

## Technical Details

Built with a React frontend and Python backend, utilizing OpenAI's API for intelligent data analysis.

## Learnings

This project taught me a lot about handling real-time data at scale and integrating AI into practical applications.
    `,
    featured: true,
  },
  {
    slug: "project-two",
    title: "40 Balls Golf Game",
    description: "A mobile app to play and score the golf game 40 Balls with large groups.",
    thumbnail: "/projects/project-2.png",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/henryhirshland/ecommerce",
    content: `
## Overview

A complete e-commerce platform designed for small businesses to sell their products online.

## Key Features

- Product catalog with filtering and search
- Secure checkout with Stripe
- Order tracking and history
- Admin dashboard for inventory management

## Technical Details

Built with Next.js for the frontend and backend API routes, with PostgreSQL database managed through Prisma ORM.

## Learnings

Gained deep experience with payment processing, database design, and building scalable web applications.
    `,
    featured: true,
  },
  {
    slug: "project-three",
    title: "Thrive Health",
    description: "An employer sponsored wellness program that rewards employees for building healthy habits.",
    thumbnail: "/projects/project-3.png",
    tags: ["React Native", "Firebase", "Node.js", "TypeScript"],
    githubUrl: "https://github.com/henryhirshland/fitness-app",
    content: `
## Overview

A comprehensive fitness tracking application that helps users achieve their health goals.

## Key Features

- Workout logging and exercise library
- Nutrition tracking with barcode scanning
- Progress photos and measurements
- Social features and challenges

## Technical Details

Cross-platform mobile app built with React Native, using Firebase for authentication and real-time data sync.

## Learnings

Learned the intricacies of mobile development and creating engaging user experiences on small screens.
    `,
    featured: true,
  },
  {
    slug: "project-four",
    title: "Developer Portfolio Template",
    description: "An open-source portfolio template for developers with beautiful animations and easy customization.",
    thumbnail: "/projects/project-4.png",
    tags: ["Next.js", "Framer Motion", "TailwindCSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/henryhirshland/portfolio-template",
    content: `
## Overview

A beautiful, customizable portfolio template designed specifically for developers and designers.

## Key Features

- Smooth page transitions and animations
- Dark/light mode support
- Blog integration
- SEO optimized

## Technical Details

Built with Next.js and styled with TailwindCSS. Animations powered by Framer Motion.

## Learnings

Focused on creating the best possible user experience while keeping the codebase clean and maintainable.
    `,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
