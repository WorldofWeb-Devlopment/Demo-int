import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES, type ServiceItem } from '../data/studioData';
import { EditorialImage } from './EditorialImage';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [residential, kitchen, bedroom, living, commercial, turnkey] = SERVICES;

  const renderCard = (service: ServiceItem, aspectClass: string) => (
    <motion.article
      key={service.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      <button
        type="button"
        onClick={() => onSelectService(service.title)}
        className="text-left cursor-pointer focus-visible:outline-none"
      >
        <div className={`relative overflow-hidden bg-[#1C1C1C]/5 mb-5 ${aspectClass}`}>
          <EditorialImage
            src={service.image}
            alt={service.title}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex items-baseline justify-between gap-4 border-b border-[#1C1C1C]/15 group-hover:border-[#F5B700] transition-colors pb-3 mb-3">
          <div className="flex items-baseline gap-3">
            <span className="text-xs text-[#1C1C1C] tabular-nums font-semibold">
              {service.index}.
            </span>
            <h3 className="font-serif text-2xl md:text-[28px] text-[#1C1C1C] font-medium">
              {service.title}
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#1C1C1C] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <p className="text-sm leading-[1.7] text-[#555555] mb-2.5 max-w-lg">
          {service.description}
        </p>
        <p className="text-xs text-[#555555] font-medium tracking-[0.04em]">{service.scope}</p>
      </button>
    </motion.article>
  );

  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-[#FFF8E6] border-y border-[#1C1C1C]/10"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1.5px] bg-[#F5B700]" aria-hidden="true" />
              <p className="text-xs tracking-[0.14em] uppercase text-[#1C1C1C] font-semibold">
                Our Services
              </p>
            </div>
            <h2 className="font-serif text-[clamp(2.35rem,3.8vw,3.6rem)] leading-[1.08] font-medium text-[#1C1C1C]">
              Curated Spatial Disciplines.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="text-[15px] leading-[1.7] text-[#555555]">
              From individual architectural rooms to full-scale turnkey residences and
              hospitality spaces, each discipline is executed with singular care.
            </p>
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="space-y-14">
          {/* Row 1: 7 / 5 asymmetric split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              {renderCard(residential, 'aspect-[16/10]')}
            </div>
            <div className="lg:col-span-5 lg:pt-12">
              {renderCard(kitchen, 'aspect-[4/3]')}
            </div>
          </div>

          {/* Row 2: 4 / 4 / 4 staggered architectural plates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-4">
              {renderCard(bedroom, 'aspect-[4/3]')}
            </div>
            <div className="lg:col-span-4 lg:pt-8">
              {renderCard(living, 'aspect-[4/3]')}
            </div>
            <div className="lg:col-span-4 md:col-span-2 lg:col-span-4">
              {renderCard(commercial, 'aspect-[4/3]')}
            </div>
          </div>

          {/* Row 3: Turnkey Feature Composition */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pt-10 border-t border-[#1C1C1C]/15"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#1C1C1C] text-[#FFF8E6] p-6 md:p-10 border border-[#1C1C1C]">
              <div className="lg:col-span-5">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-xs text-[#F5B700] tabular-nums font-semibold">
                    {turnkey.index}.
                  </span>
                  <span className="text-xs tracking-[0.1em] uppercase text-[#FFF8E6]/80">
                    Comprehensive Delivery
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-[#FFF8E6] font-medium mb-4">
                  {turnkey.title}
                </h3>
                <p className="text-[15px] leading-[1.75] text-[#FFF8E6]/85 mb-5">
                  {turnkey.description}
                </p>
                <p className="text-xs text-[#FFF8E6]/70 tracking-[0.04em] mb-7">
                  {turnkey.scope}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectService(turnkey.title)}
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#F5B700] text-[#1C1C1C] text-xs tracking-[0.1em] font-semibold hover:bg-[#FFF8E6] hover:text-[#1C1C1C] transition-colors cursor-pointer"
                >
                  <span>Discuss a Turnkey Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="lg:col-span-7">
                <EditorialImage
                  src={turnkey.image}
                  alt={turnkey.title}
                  containerClassName="relative overflow-hidden bg-[#FFF8E6]/10 aspect-[16/10]"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
