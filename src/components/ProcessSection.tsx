import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { DESIGN_PROCESS } from '../data/studioData';
import CircularGallery, { CircularGalleryItem } from './CircularGallery';

export function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const galleryItems: CircularGalleryItem[] = useMemo(
    () =>
      DESIGN_PROCESS.map((step) => ({
        image: step.image,
        text: `${step.number}. ${step.title}`,
      })),
    []
  );

  const activeStep = DESIGN_PROCESS[activeStepIndex] ?? DESIGN_PROCESS[0];

  const handlePrev = () => {
    setActiveStepIndex((prev) => (prev - 1 + DESIGN_PROCESS.length) % DESIGN_PROCESS.length);
  };

  const handleNext = () => {
    setActiveStepIndex((prev) => (prev + 1) % DESIGN_PROCESS.length);
  };

  return (
    <section
      id="process"
      className="py-24 md:py-32 bg-[#4d6080] text-[#e9d9ca] overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[#e9d9ca]/15">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.16em] uppercase text-[#f4721e] font-medium mb-4">
              Our Design Process
            </p>
            <h2 className="font-serif text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.08] font-normal text-[#e9d9ca]">
              From Initial Dialogue to Quiet Completion.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-[1.7] text-[#e9d9ca]/85">
              A continuous, four-stage architectural cycle ensuring creative clarity,
              material precision, and calm execution at every milestone.
            </p>
          </div>
        </div>

        {/* Architectural Circular Process Grid */}
        <div className="relative mb-20">
          {/* Decorative Orbital Rings (Desktop) */}
          <div
            aria-hidden="true"
            className="hidden lg:flex pointer-events-none absolute inset-0 items-center justify-center"
          >
            <div className="w-[540px] h-[540px] rounded-full border border-[#e9d9ca]/15" />
            <div className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-[#f4721e]/40" />
          </div>

          {/* Central Orbital Medallion (Desktop) */}
          <div className="hidden lg:flex pointer-events-none absolute inset-0 items-center justify-center z-20">
            <div className="w-36 h-36 rounded-full bg-[#4d6080] border border-[#f4721e]/60 shadow-2xl flex flex-col items-center justify-center text-center px-3">
              <Compass className="w-4 h-4 text-[#f4721e] mb-1.5" strokeWidth={1.5} />
              <span className="text-[10px] tracking-[0.18em] uppercase text-[#e9d9ca]/75">
                Phase {activeStep.number}
              </span>
              <span className="font-serif text-sm text-[#e9d9ca] mt-0.5 leading-tight">
                {activeStep.title}
              </span>
            </div>
          </div>

          {/* 4-Quadrant Circular Process Grid */}
          <div
            role="tablist"
            aria-label="Design process stages"
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
          >
            {DESIGN_PROCESS.map((step, index) => {
              const isActive = index === activeStepIndex;
              return (
                <motion.button
                  key={step.number}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveStepIndex(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group text-left p-7 md:p-9 transition-all duration-300 border cursor-pointer flex flex-col sm:flex-row items-start gap-6 ${
                    isActive
                      ? 'bg-[#3f506c] border-[#f4721e] shadow-lg'
                      : 'bg-[#4d6080]/85 border-[#e9d9ca]/15 hover:border-[#f4721e]/60 hover:bg-[#445673]'
                  } ${
                    index % 2 === 0 ? 'lg:pr-20' : 'lg:pl-20'
                  }`}
                >
                  {/* Circular Step Node */}
                  <div
                    className={`w-16 h-16 shrink-0 rounded-full border flex flex-col items-center justify-center transition-colors duration-300 ${
                      isActive
                        ? 'bg-[#f4721e] border-[#f4721e] text-[#e9d9ca]'
                        : 'border-[#e9d9ca]/30 text-[#f4721e] group-hover:border-[#f4721e]'
                    }`}
                  >
                    <span className="font-serif text-xl leading-none tabular-nums">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-serif text-2xl text-[#e9d9ca] font-normal">
                        {step.title}
                      </h3>
                      <span className="text-xs tracking-[0.08em] uppercase text-[#f4721e] tabular-nums">
                        {step.duration}
                      </span>
                    </div>

                    <p className="text-sm leading-[1.75] text-[#e9d9ca]/85 mb-4">
                      {step.description}
                    </p>

                    <p className="text-xs text-[#e9d9ca]/70 tracking-wide">
                      {step.deliverables.join(' · ')}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Interactive Circular Arc Gallery */}
        <div className="pt-8 border-t border-[#e9d9ca]/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-xs tracking-[0.14em] uppercase text-[#f4721e] mb-1">
                Interactive Process Gallery · Phase {activeStep.number} of 04
              </p>
              <p className="text-sm text-[#e9d9ca]/85">
                Drag, scroll, or select a phase to explore the architectural milestones in our circular gallery.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous process stage"
                className="w-10 h-10 rounded-full border border-[#e9d9ca]/25 flex items-center justify-center text-[#e9d9ca] hover:border-[#f4721e] hover:text-[#f4721e] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs tracking-[0.14em] text-[#e9d9ca]/85 tabular-nums min-w-[60px] text-center">
                {activeStep.number} / 04
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next process stage"
                className="w-10 h-10 rounded-full border border-[#e9d9ca]/25 flex items-center justify-center text-[#e9d9ca] hover:border-[#f4721e] hover:text-[#f4721e] transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className="w-full h-[440px] md:h-[520px] relative"
            data-testid="process-circular-gallery"
          >
            <CircularGallery
              items={galleryItems}
              bend={2.2}
              textColor="#e9d9ca"
              borderRadius={0.04}
              font='400 28px "BBH Bogle", "BBH Sans Bogle", "Josefin Sans", sans-serif'
              scrollSpeed={2}
              scrollEase={0.06}
              autoScroll={0}
              activeIndex={activeStepIndex}
              onActiveChange={(index) => setActiveStepIndex(index)}
              onItemClick={(_item, index) => setActiveStepIndex(index)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
