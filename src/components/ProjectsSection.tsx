import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/studioData';
import { filterProjectsByCategory, type ProjectCategory } from '../utils/studioLogic';
import { EditorialImage } from './EditorialImage';

interface ProjectsSectionProps {
  onOpenProject: (slug: string) => void;
}

const CATEGORIES: ProjectCategory[] = ['All', 'Residential', 'Commercial'];

export function ProjectsSection({ onOpenProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const visibleProjects = filterProjectsByCategory(PROJECTS, activeCategory);

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#F5F2EC] text-[#24231F]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Header + Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 pb-8 border-b border-[#24231F]/12">
          <div>
            <p className="text-xs tracking-[0.14em] text-[#A68A64] font-medium mb-4">
              Selected Monograph
            </p>
            <h2 className="font-serif text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.08] font-normal text-[#24231F]">
              Featured Projects
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="inline-flex items-center gap-1 p-1 bg-[#EAE5DC] self-start md:self-auto"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs tracking-[0.06em] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#24231F] text-[#F5F2EC]'
                      : 'text-[#77736B] hover:text-[#24231F]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Varied Editorial Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-16 items-start">
          {visibleProjects.map((project, idx) => {
            // Varied asymmetric editorial proportions
            const spanClass =
              idx === 0
                ? 'lg:col-span-7'
                : idx === 1
                  ? 'lg:col-span-5 lg:mt-10'
                  : idx === 2
                    ? 'lg:col-span-5'
                    : idx === 3
                      ? 'lg:col-span-7 lg:-mt-4'
                      : 'lg:col-span-12';

            const aspectClass =
              idx === 0
                ? 'aspect-[16/10]'
                : idx === 1
                  ? 'aspect-[3/4]'
                  : idx === 4
                    ? 'aspect-[21/9]'
                    : 'aspect-[4/3]';

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className={`group ${spanClass}`}
              >
                <button
                  type="button"
                  onClick={() => onOpenProject(project.slug)}
                  aria-label={`View project details for ${project.title}`}
                  className="w-full text-left cursor-pointer focus-visible:outline-none"
                >
                  <div className={`relative overflow-hidden bg-[#EAE5DC] mb-5 ${aspectClass}`}>
                    <EditorialImage
                      src={project.heroImage}
                      alt={`${project.title} — ${project.style}`}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#77736B] mb-2">
                        <span className="text-[#A68A64] font-medium">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.style}</span>
                      </div>

                      <h3 className="font-serif text-2xl md:text-3xl text-[#24231F] font-normal group-hover:text-[#A68A64] transition-colors mb-2">
                        {project.title}
                      </h3>

                      <p className="text-sm leading-[1.65] text-[#77736B] max-w-xl">
                        {project.summary}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.08em] font-medium text-[#24231F] border-b border-[#24231F]/30 pb-1 shrink-0 mt-1 group-hover:border-[#A68A64] group-hover:text-[#A68A64] transition-colors whitespace-nowrap">
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
