import { STUDIO_CONTACT } from '../data/studioData';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onNavigateHome: () => void;
}

const FOOTER_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

export function Footer({ onNavigateSection, onNavigateHome }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1C1C] text-[#FFF8E6] pt-20 pb-12 border-t border-[#FFF8E6]/10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#FFF8E6]/15">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="font-serif text-3xl font-medium text-[#FFF8E6] tracking-[0.03em] inline-block"
            >
              {STUDIO_CONTACT.brandName}
            </a>
            <p className="text-sm leading-[1.7] text-[#FFF8E6]/75 max-w-sm">
              Architectural interior design studio composing serene residential and
              commercial environments rooted in timeless materiality.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs tracking-[0.12em] uppercase text-[#F5B700] font-semibold">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateSection(link.id);
                    }}
                    className="text-[#FFF8E6]/80 hover:text-[#F5B700] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs tracking-[0.12em] uppercase text-[#F5B700] font-semibold">
              Contact &amp; Studio
            </p>
            <div className="space-y-2 text-sm text-[#FFF8E6]/80">
              <p>{STUDIO_CONTACT.addressLine1}</p>
              <p>{STUDIO_CONTACT.addressLine2}</p>
              <p className="pt-1 tabular-nums">{STUDIO_CONTACT.phoneDisplay}</p>
              <p>
                <a
                  href={`mailto:${STUDIO_CONTACT.email}`}
                  className="hover:text-[#F5B700] transition-colors"
                >
                  {STUDIO_CONTACT.email}
                </a>
              </p>
            </div>

            <div className="pt-3 flex items-center gap-6 text-xs tracking-[0.08em] text-[#FFF8E6]/80">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5B700] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5B700] transition-colors"
              >
                Pinterest
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5B700] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Map Terms */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#FFF8E6]/65">
          <p>
            &copy; {year} {STUDIO_CONTACT.brandName}. All rights reserved.
          </p>
          <p>
            Location features powered by Google Maps, subject to{' '}
            <a
              href="https://maps.google.com/help/terms_maps/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#F5B700]"
            >
              Google Maps End User Terms
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
