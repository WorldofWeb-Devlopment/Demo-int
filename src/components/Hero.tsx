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
      className="relative min-h-[92vh] w-full flex items-end bg-[#4d6080] text-[#e9d9ca] overflow-hidden"
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
          className="absolute inset-0 bg-gradient-to-t from-[#4d6080]/90 via-[#4d6080]/45 to-[#4d6080]/25"
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
            <p className="text-xs tracking-[0.14em] uppercase text-[#e9d9ca] mb-5 font-semibold">
              Interior Architecture &amp; Bespoke Living
            </p>
            <h1 className="font-serif text-[clamp(2.75rem,5.4vw,5.25rem)] leading-[1.04] tracking-[0.02em] font-normal text-[#e9d9ca] max-w-3xl">
              Spaces That Tell Your Story.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:pb-2 space-y-7"
          >
            <p className="text-[15px] md:text-base leading-[1.7] text-[#e9d9ca] max-w-md font-normal">
              Thoughtfully designed interiors that bring beauty, comfort and functionality
              into everyday living.
            </p>

            <div>
              <button
                type="button"
                onClick={onExploreProjects}
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#f4721e] text-[#e9d9ca] text-xs tracking-[0.1em] font-semibold hover:bg-[#e9d9ca] hover:text-[#4d6080] transition-colors duration-200 whitespace-nowrap cursor-pointer"
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
