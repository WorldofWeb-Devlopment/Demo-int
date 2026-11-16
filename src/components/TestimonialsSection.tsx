import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/studioData';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = TESTIMONIALS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 md:py-32 bg-[#4d6080] text-[#e9d9ca]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs tracking-[0.14em] uppercase text-[#f4721e] font-semibold mb-4">
              Client Perspectives
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#e9d9ca] mb-8">
              Words From Those Who Live in Our Spaces.
            </h2>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 inline-flex items-center justify-center border border-[#e9d9ca]/25 text-[#e9d9ca] hover:bg-[#f4721e] hover:border-[#f4721e] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-11 h-11 inline-flex items-center justify-center border border-[#e9d9ca]/25 text-[#e9d9ca] hover:bg-[#f4721e] hover:border-[#f4721e] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="ml-2 text-xs text-[#e9d9ca]/85 tabular-nums">
                0{activeIndex + 1} / 0{TESTIMONIALS.length}
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.author}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-[#e9d9ca]/20 pt-8"
              >
                <p className="font-sans text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.45] text-[#e9d9ca] mb-8">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-6 border-t border-[#e9d9ca]/15">
                  <div>
                    <cite className="not-italic text-sm font-semibold text-[#e9d9ca] block">
                      {current.author}
                    </cite>
                    <span className="text-xs text-[#e9d9ca]/80">{current.role}</span>
                  </div>
                  <span className="text-xs text-[#f4721e] font-semibold">
                    {current.project}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
