import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";
import CaseStudyDetail from "./CaseStudyDetail";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  
  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }
  
  return {
    title: `${caseStudy.title} | Henry Hirshland`,
    description: caseStudy.subtitle,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  
  if (!caseStudy) {
    notFound();
  }
  
  return <CaseStudyDetail caseStudy={caseStudy} />;
}
