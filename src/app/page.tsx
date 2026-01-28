import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import { getFeaturedProjects } from "@/data/projects";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      {/* Main content - grows to fill space */}
      <div className="flex-grow">
        <Hero />
        <ProjectGrid projects={featuredProjects} showViewAll={true} />
        
        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/50 shadow-lg shadow-emerald-900/5">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                About Me
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  I&apos;m a builder with 6+ years of experience doing product at startups.  I love rolling up my sleeves, tackling big problems, and building systems that help my team deliver value quickly.  I'm experienced in driving product strategy, building out product analytics, and experimentation.
                    
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  I always enjoy building (or investing in) new things, and experimenting with new technologies. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                When I&apos;m unplugged, you can find me playing golf, tennis, skiing, hiking, playing poker or catan, cooking, exercising, reading a sci-fi book, or watching the Patriots.


                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
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
