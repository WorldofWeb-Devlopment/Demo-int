import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';
import { IMAGES } from '../data/studioData';
import { EditorialImage } from './EditorialImage';

interface HeroProps {
  onExploreProjects: () => void;
}

export function Hero({ onExploreProjects }: HeroProps) {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] w-full flex items-end bg-[#1C1C1C] text-[#FFF8E6] overflow-hidden"
    >
      {/* Full-bleed architectural interior photograph */}
      <div className="absolute inset-0">
        <EditorialImage
          src={IMAGES.heroLiving}
          alt="Sunlit architectural living room with warm limewash plaster walls, honed travertine table, and oatmeal bouclé seating"
          containerClassName="w-full h-full"
          className="w-full h-full object-cover object-center"
          priority
        />
        {/* Measured scrim ensuring crisp WCAG contrast across all image luminance areas */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-[#1C1C1C]/45 to-[#1C1C1C]/30"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 md:px-10 pt-36 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-[1.5px] bg-[#F5B700]" aria-hidden="true" />
              <p className="text-xs tracking-[0.16em] uppercase text-[#F5B700] font-semibold">
                Interior Architecture &amp; Bespoke Living
              </p>
            </div>
            <h1 className="font-serif text-[clamp(2.85rem,5.6vw,5.5rem)] leading-[1.04] tracking-[-0.01em] font-medium text-[#FFF8E6] max-w-3xl">
              Spaces That Tell Your Story.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:pb-2 space-y-7"
          >
            <p className="text-[15px] md:text-base leading-[1.7] text-[#FFF8E6]/90 max-w-md font-normal">
              Thoughtfully designed interiors that bring beauty, comfort and functionality
              into everyday living.
            </p>

            <div>
              <button
                type="button"
                onClick={onExploreProjects}
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#F5B700] text-[#1C1C1C] text-xs tracking-[0.1em] font-semibold hover:bg-[#FFF8E6] hover:text-[#1C1C1C] transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>Explore Our Projects</span>
                <ArrowDownRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
