import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailView } from './components/ProjectDetailView';
import { ProcessSection } from './components/ProcessSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PROJECTS } from './data/studioData';
import { getProjectBySlug, parseProjectHash } from './utils/studioLogic';

export default function App() {
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(() =>
    parseProjectHash(window.location.hash)
  );
  const [preselectedService, setPreselectedService] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const onHashChange = () => {
      setActiveProjectSlug(parseProjectHash(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const activeProject = getProjectBySlug(PROJECTS, activeProjectSlug);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveProjectSlug(null);
    if (window.location.hash.startsWith('#/project/')) {
      window.history.pushState(null, '', `#${sectionId}`);
    }
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 40);
    });
  }, []);

  const handleNavigateHome = useCallback(() => {
    setActiveProjectSlug(null);
    window.history.pushState(null, '', '#top');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenProject = useCallback((slug: string) => {
    setActiveProjectSlug(slug);
    window.location.hash = `#/project/${slug}`;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleBackToProjects = useCallback(() => {
    scrollToSection('projects');
  }, [scrollToSection]);

  const handleSelectService = useCallback(
    (serviceTitle: string) => {
      setPreselectedService(serviceTitle);
      scrollToSection('contact');
    },
    [scrollToSection]
  );

  const handleInquireSimilar = useCallback(
    (projectTitle: string, categoryTitle: string) => {
      setPreselectedService(categoryTitle);
      scrollToSection('contact');
      void projectTitle;
    },
    [scrollToSection]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#e9d9ca] text-[#4d6080]">
        <Navbar
          onNavigateSection={scrollToSection}
          onNavigateHome={handleNavigateHome}
          isProjectDetail={Boolean(activeProject)}
        />

        {activeProject ? (
          <ProjectDetailView
            project={activeProject}
            onBackToProjects={handleBackToProjects}
            onOpenProject={handleOpenProject}
            onInquireSimilar={handleInquireSimilar}
          />
        ) : (
          <main className="flex-1">
            <Hero onExploreProjects={() => scrollToSection('projects')} />
            <AboutSection />
            <ServicesSection onSelectService={handleSelectService} />
            <ProjectsSection onOpenProject={handleOpenProject} />
            <ProcessSection />
            <WhyChooseUsSection />
            <TestimonialsSection />
            <ContactSection preselectedService={preselectedService} />
          </main>
        )}

        <Footer
          onNavigateSection={scrollToSection}
          onNavigateHome={handleNavigateHome}
        />
      </div>
    </MotionConfig>
  );
}
