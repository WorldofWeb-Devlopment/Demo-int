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
    <footer className="bg-[#4d6080] text-[#e9d9ca] pt-20 pb-12 border-t border-[#e9d9ca]/15">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#e9d9ca]/15">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="font-serif text-3xl text-[#e9d9ca] tracking-[0.04em] inline-block"
            >
              {STUDIO_CONTACT.brandName}
            </a>
            <p className="text-sm leading-[1.7] text-[#e9d9ca]/85 max-w-sm">
              Architectural interior design studio composing serene residential and
              commercial environments rooted in timeless materiality.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs tracking-[0.12em] uppercase text-[#f4721e] font-semibold">
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
                    className="text-[#e9d9ca]/85 hover:text-[#f4721e] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs tracking-[0.12em] uppercase text-[#f4721e] font-semibold">
              Contact &amp; Studio
            </p>
            <div className="space-y-2 text-sm text-[#e9d9ca]/85">
              <p>{STUDIO_CONTACT.addressLine1}</p>
              <p>{STUDIO_CONTACT.addressLine2}</p>
              <p className="pt-1 tabular-nums">{STUDIO_CONTACT.phoneDisplay}</p>
              <p>
                <a
                  href={`mailto:${STUDIO_CONTACT.email}`}
                  className="hover:text-[#f4721e] transition-colors"
                >
                  {STUDIO_CONTACT.email}
                </a>
              </p>
            </div>

            <div className="pt-3 flex items-center gap-6 text-xs tracking-[0.08em] text-[#e9d9ca]/85">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f4721e] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f4721e] transition-colors"
              >
                Pinterest
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f4721e] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Map Terms */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#e9d9ca]/70">
          <p>
            &copy; {year} {STUDIO_CONTACT.brandName}. All rights reserved.
          </p>
          <p>
            Location features powered by Google Maps, subject to{' '}
            <a
              href="https://maps.google.com/help/terms_maps/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#f4721e]"
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
