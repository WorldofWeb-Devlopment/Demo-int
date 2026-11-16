import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO_CONTACT } from '../data/studioData';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
  onNavigateHome: () => void;
  isProjectDetail?: boolean;
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
] as const;

export function Navbar({
  onNavigateSection,
  onNavigateHome,
  isProjectDetail = false,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const useSolidSurface = scrolled || isProjectDetail || mobileOpen;

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        useSolidSurface
          ? 'bg-[#F5F2EC]/95 backdrop-blur-md border-b border-[#24231F]/10 text-[#24231F]'
          : 'bg-gradient-to-b from-[#24231F]/55 to-transparent text-[#F5F2EC]'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            onNavigateHome();
          }}
          className="font-serif text-2xl tracking-[0.04em] font-medium whitespace-nowrap shrink-0 transition-opacity hover:opacity-80"
        >
          {STUDIO_CONTACT.brandName}
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.06em] font-medium"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
              className="relative py-1 whitespace-nowrap shrink-0 transition-opacity hover:opacity-75 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#A68A64] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`hidden md:inline-flex items-center justify-center px-5 py-2.5 text-xs tracking-[0.08em] font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
              useSolidSurface
                ? 'bg-[#24231F] text-[#F5F2EC] hover:bg-[#A68A64]'
                : 'bg-[#F5F2EC] text-[#24231F] hover:bg-[#EAE5DC]'
            }`}
          >
            Book Consultation
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F5F2EC] text-[#24231F] border-t border-[#24231F]/10 px-6 py-8 space-y-6">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className="font-serif text-2xl py-1 border-b border-[#24231F]/10 text-[#24231F] hover:text-[#A68A64] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="w-full py-3.5 px-6 bg-[#24231F] text-[#F5F2EC] text-xs tracking-[0.1em] font-medium hover:bg-[#A68A64] transition-colors cursor-pointer"
          >
            Book Consultation
          </button>
        </div>
      )}
    </header>
  );
}
