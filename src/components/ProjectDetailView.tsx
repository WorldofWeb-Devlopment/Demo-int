import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/studioData';
import type { ProjectSummary } from '../utils/studioLogic';
import { EditorialImage } from './EditorialImage';

interface ProjectDetailViewProps {
  project: ProjectSummary;
  onBackToProjects: () => void;
  onOpenProject: (slug: string) => void;
  onInquireSimilar: (projectTitle: string, category: string) => void;
}

export function ProjectDetailView({
  project,
  onBackToProjects,
  onOpenProject,
  onInquireSimilar,
}: ProjectDetailViewProps) {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="pt-28 pb-24 bg-[#F5F2EC] text-[#24231F] min-h-screen"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Back Control */}
        <div className="mb-10">
          <button
            type="button"
            onClick={onBackToProjects}
            className="inline-flex items-center gap-2.5 text-xs tracking-[0.08em] font-medium text-[#77736B] hover:text-[#24231F] transition-colors cursor-pointer py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Featured Projects</span>
          </button>
        </div>

        {/* Project Editorial Title & Metadata */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#77736B] mb-4">
              <span className="text-[#A68A64] font-medium">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.location}</span>
              <span aria-hidden="true">·</span>
              <span>{project.style}</span>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,4.4vw,4.5rem)] leading-[1.05] font-normal text-[#24231F]">
              {project.title}
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="text-[15px] leading-[1.7] text-[#77736B]">{project.summary}</p>
          </div>
        </header>

        {/* Full-Width Hero Plate */}
        <div className="mb-16">
          <EditorialImage
            src={project.heroImage}
            alt={project.title}
            containerClassName="relative overflow-hidden bg-[#EAE5DC] aspect-[16/9]"
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Specifications & Architectural Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#24231F]/12">
          {/* Left: Structured Specification Ledger */}
          <div className="lg:col-span-4">
            <h2 className="font-serif text-2xl text-[#24231F] mb-6">
              Project Specifications
            </h2>
            <dl className="divide-y divide-[#24231F]/12 border-y border-[#24231F]/12 text-sm">
              <div className="py-3.5 flex justify-between gap-4">
                <dt className="text-[#77736B]">Category</dt>
                <dd className="text-[#24231F] font-medium text-right">{project.category}</dd>
              </div>
              <div className="py-3.5 flex justify-between gap-4">
                <dt className="text-[#77736B]">Location</dt>
                <dd className="text-[#24231F] text-right">{project.location}</dd>
              </div>
              <div className="py-3.5 flex justify-between gap-4">
                <dt className="text-[#77736B]">Design Style</dt>
                <dd className="text-[#24231F] text-right">{project.style}</dd>
              </div>
              <div className="py-3.5 flex justify-between gap-4">
                <dt className="text-[#77736B]">Area</dt>
                <dd className="text-[#24231F] tabular-nums text-right">{project.area}</dd>
              </div>
              <div className="py-3.5 flex justify-between gap-4">
                <dt className="text-[#77736B]">Completion</dt>
                <dd className="text-[#24231F] tabular-nums text-right">
                  {project.year} · {project.timeline}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <button
                type="button"
                onClick={() =>
                  onInquireSimilar(
                    project.title,
                    project.category === 'Commercial'
                      ? 'Commercial Interiors'
                      : 'Residential Interior Design'
                  )
                }
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#24231F] text-[#F5F2EC] text-xs tracking-[0.09em] font-medium hover:bg-[#A68A64] transition-colors cursor-pointer"
              >
                <span>Inquire About a Similar Space</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Challenge, Approach & Material Palette */}
          <div className="lg:col-span-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="font-serif text-2xl text-[#24231F] mb-3">
                  Architectural Brief
                </h2>
                <p className="text-[15px] leading-[1.75] text-[#77736B]">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h2 className="font-serif text-2xl text-[#24231F] mb-3">
                  Spatial Approach
                </h2>
                <p className="text-[15px] leading-[1.75] text-[#77736B]">
                  {project.approach}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-[#24231F]/10">
              <div>
                <h3 className="text-xs tracking-[0.12em] text-[#A68A64] font-medium mb-4">
                  Material Palette
                </h3>
                <ul className="space-y-2.5 text-sm text-[#24231F]">
                  {project.materials.map((item) => (
                    <li
                      key={item}
                      className="pb-2.5 border-b border-[#24231F]/8 last:border-b-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs tracking-[0.12em] text-[#A68A64] font-medium mb-4">
                  Scope Delivered
                </h3>
                <ul className="space-y-2.5 text-sm text-[#24231F]">
                  {project.deliverables.map((item) => (
                    <li
                      key={item}
                      className="pb-2.5 border-b border-[#24231F]/8 last:border-b-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Gallery Plates */}
        <section className="py-16 border-b border-[#24231F]/12">
          <h2 className="font-serif text-3xl text-[#24231F] mb-10">
            Architectural Plates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {project.gallery.map((plate, index) => (
              <figure
                key={`${plate.src}-${index}`}
                className={index === 0 ? 'md:col-span-2' : ''}
              >
                <EditorialImage
                  src={plate.src}
                  alt={plate.caption}
                  containerClassName={`relative overflow-hidden bg-[#EAE5DC] ${
                    index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                  className="w-full h-full object-cover"
                />
                <figcaption className="mt-3 text-xs text-[#77736B] font-serif italic text-[14px]">
                  {plate.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Next Project Navigation */}
        {nextProject && nextProject.slug !== project.slug && (
          <div className="pt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.12em] text-[#77736B] mb-2">Next Project</p>
              <h3 className="font-serif text-3xl text-[#24231F]">{nextProject.title}</h3>
            </div>
            <button
              type="button"
              onClick={() => onOpenProject(nextProject.slug)}
              className="inline-flex items-center gap-3 px-6 py-3.5 border border-[#24231F]/25 text-xs tracking-[0.09em] font-medium text-[#24231F] hover:bg-[#24231F] hover:text-[#F5F2EC] transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>Explore Next Monograph</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.main>
  );
}
