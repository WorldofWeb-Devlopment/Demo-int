import { motion } from 'motion/react';
import { WHY_CHOOSE_US } from '../data/studioData';

export function WhyChooseUsSection() {
  return (
    <section className="py-24 md:py-32 bg-[#FFF8E6] text-[#1C1C1C] border-b border-[#1C1C1C]/10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Editorial Intro */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1.5px] bg-[#F5B700]" aria-hidden="true" />
              <p className="text-xs tracking-[0.14em] uppercase text-[#1C1C1C] font-semibold">
                Why Choose Us
              </p>
            </div>
            <h2 className="font-serif text-[clamp(2.35rem,3.8vw,3.6rem)] leading-[1.08] font-medium text-[#1C1C1C] mb-6">
              Crafted With Discipline and Enduring Taste.
            </h2>
            <p className="text-[15px] leading-[1.75] text-[#555555] max-w-md">
              We take on a deliberate number of commissions each year so principal designers
              and master craftspeople remain deeply involved in every detail.
            </p>
          </div>

          {/* Right Editorial Pillar List */}
          <div className="lg:col-span-7 divide-y divide-[#1C1C1C]/15 border-y border-[#1C1C1C]/15">
            {WHY_CHOOSE_US.map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-2 text-xs text-[#1C1C1C] tabular-nums font-semibold">
                  {pillar.number}.
                </div>
                <div className="sm:col-span-10">
                  <h3 className="font-serif text-2xl md:text-[26px] text-[#1C1C1C] font-medium mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-[#555555] max-w-xl">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
