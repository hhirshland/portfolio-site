import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";

const baseUrl = "https://www.henryhirshland.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/projects`, priority: 0.8 },
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      priority: 0.6,
    })),
    ...caseStudies.map((study) => ({
      url: `${baseUrl}/case-studies/${study.slug}`,
      priority: 0.7,
    })),
  ];
}
