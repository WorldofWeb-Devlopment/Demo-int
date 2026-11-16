import { motion } from 'motion/react';
import { IMAGES } from '../data/studioData';
import { EditorialImage } from './EditorialImage';

const STUDIO_METRICS = [
  { value: '14 Years', label: 'Architectural & Interior Practice' },
  { value: '120+', label: 'Completed Residences & Commercial Spaces' },
  { value: '100%', label: 'Bespoke Material & Joinery Specification' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#e9d9ca] text-[#4d6080]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Large Portrait Architectural Photograph */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <EditorialImage
              src={IMAGES.aboutCraft}
              alt="Hand-carved limestone archway beside fluted white oak cabinetry and stoneware vessel"
              containerClassName="relative overflow-hidden bg-[#4d6080]/10 aspect-[3/4] lg:aspect-auto lg:h-full min-h-[420px]"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Column: Studio Philosophy & Craftsmanship */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between py-2"
          >
            <div>
              <p className="text-xs tracking-[0.14em] uppercase text-[#f4721e] font-semibold mb-4">
                About The Studio
              </p>
              <h2 className="font-serif text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.08] font-normal text-[#4d6080] mb-8 max-w-xl">
                Designing Beyond Expectations.
              </h2>

              <div className="space-y-5 text-[15px] md:text-base leading-[1.75] text-[#4d6080] max-w-2xl">
                <p className="text-[#4d6080] text-lg font-medium leading-[1.7]">
                  At Atelier Veyra, we believe enduring interiors emerge from restraint,
                  honest materiality, and an intimate understanding of light and proportion.
                </p>
                <p>
                  Founded as a multidisciplinary interior architecture studio, our practice
                  bridges spatial rigor with quiet human warmth. Rather than chasing fleeting
                  seasonal trends, we compose rooms around limestone, quarter-sawn timber,
                  mineral plaster, and patinated bronze that deepen in character over decades.
                </p>
                <p>
                  Every commission—whether a private courtyard home, a tailored modular
                  kitchen, or a flagship commercial salon—is guided from initial architectural
                  sketches through master-artisan joinery and turnkey installation.
                </p>
              </div>
            </div>

            {/* Clean Typographic Metrics Strip */}
            <div className="mt-12 pt-8 border-t border-[#4d6080]/20 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {STUDIO_METRICS.map((metric) => (
                <div key={metric.label}>
                  <div className="font-serif text-3xl md:text-4xl text-[#f4721e] tabular-nums mb-1.5">
                    {metric.value}
                  </div>
                  <div className="text-xs leading-relaxed text-[#4d6080] font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
