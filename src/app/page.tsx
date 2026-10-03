import Hero from "@/components/Hero";
import ConsultingBanner from "@/components/ConsultingBanner";
import ProjectGrid from "@/components/ProjectGrid";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
// import CaseStudyTimeline from "@/components/CaseStudyTimeline";
import StockTicker from "@/components/StockTicker";
import Library from "@/components/library/Library";
import { getFeaturedProjects } from "@/data/projects";
import { getFeaturedCaseStudies } from "@/data/caseStudies";
import { getLibraryBooks } from "@/lib/goodreads";

export const revalidate = 3600;

export default async function Home() {
  const featuredProjects = getFeaturedProjects();
  const featuredCaseStudies = getFeaturedCaseStudies();
  const libraryBooks = await getLibraryBooks();

  return (
    <>
      {/* Main content - grows to fill space */}
      <div className="flex-grow">
        <Hero />
        <ConsultingBanner />
        
        <ProjectGrid projects={featuredProjects} />
        
        {/* Case Study Options for comparison */}
        <CaseStudyCarousel caseStudies={featuredCaseStudies} />
        {/* <CaseStudyTimeline caseStudies={featuredCaseStudies} /> */}
        
        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/50 shadow-lg shadow-emerald-900/5">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 text-center">
                About Me
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  I&apos;m a builder with 6+ years of experience doing product at startups. I love rolling up my sleeves, tackling big problems, and building systems that help my team deliver value quickly. I&apos;m experienced in driving product strategy, building out product analytics, and experimentation.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  These days I&apos;m focused on AI. Through{" "}
                  <a
                    href="https://www.lomita.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    Lomita AI
                  </a>
                  , I build production-grade AI agents for investment firms: multi-agent systems that turn days of manual analysis into minutes, with humans in the loop where it counts.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  I love building (and investing in) new things and experimenting with new technologies. I&apos;m always open to discussing business strategy and exploring new ideas. Feel free to reach out!
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  When I&apos;m unplugged, you can find me playing golf, tennis, skiing, hiking, playing poker or catan, cooking, exercising, reading a sci-fi book, or watching the Patriots. Fun fact: I was once ranked top 50 globally in online Catan on the Colonist site.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Library books={libraryBooks} />
      </div>
      
      {/* Stock Ticker */}
      <StockTicker />
      
      {/* Footer - pushed to bottom */}
      <footer className="py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Henry Hirshland. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </>
  );
}
