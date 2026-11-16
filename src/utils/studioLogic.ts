export type ProjectCategory = 'All' | 'Residential' | 'Commercial';

export interface ProjectSummary {
  slug: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  location: string;
  style: string;
  year: string;
  area: string;
  timeline: string;
  heroImage: string;
  aspect: 'wide' | 'tall' | 'standard';
  summary: string;
  challenge: string;
  approach: string;
  materials: string[];
  deliverables: string[];
  gallery: {
    src: string;
    caption: string;
  }[];
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export interface ContactValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function filterProjectsByCategory<T extends Pick<ProjectSummary, 'category'>>(
  projects: readonly T[],
  category: ProjectCategory
): T[] {
  if (category === 'All') {
    return [...projects];
  }
  return projects.filter((project) => project.category === category);
}

export function getProjectBySlug<T extends Pick<ProjectSummary, 'slug'>>(
  projects: readonly T[],
  slug: string | null | undefined
): T | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return projects.find((project) => project.slug.toLowerCase() === normalized);
}

export function parseProjectHash(hash: string): string | null {
  const match = hash.match(/^#\/project\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

export function validateContactForm(values: ContactFormValues): ContactValidationErrors {
  const errors: ContactValidationErrors = {};

  const trimmedName = values.name.trim();
  if (trimmedName.length < 2) {
    errors.name = 'Please enter your full name.';
  }

  const trimmedEmail = values.email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  const digitsOnly = values.phone.replace(/\D/g, '');
  if (values.phone.trim().length > 0 && digitsOnly.length < 7) {
    errors.phone = 'Please enter a valid phone number or leave blank.';
  }

  const trimmedMessage = values.message.trim();
  if (trimmedMessage.length < 10) {
    errors.message = 'Please share a few details about your space (at least 10 characters).';
  }

  return errors;
}

export function isValidMapsApiKey(apiKey: string | undefined | null): apiKey is string {
  if (!apiKey) return false;
  const trimmed = apiKey.trim();
  if (!trimmed) return false;
  const placeholders = ['YOUR_GOOGLE_MAPS_API_KEY', 'MY_GOOGLE_MAPS_API_KEY', 'REPLACE_ME'];
  return !placeholders.includes(trimmed);
}

export function buildGoogleMapsDirectionsUrl(options: {
  addressQuery: string;
  lat?: number;
  lng?: number;
}): string {
  const hasCoords =
    typeof options.lat === 'number' &&
    typeof options.lng === 'number' &&
    Number.isFinite(options.lat) &&
    Number.isFinite(options.lng);

  const destination = hasCoords
    ? `${options.lat},${options.lng}`
    : options.addressQuery.trim() || 'Design District';

  const params = new URLSearchParams({
    api: '1',
    destination,
  });

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function buildGoogleMapsEmbedUrl(options: {
  apiKey?: string;
  query: string;
  lat: number;
  lng: number;
  zoom: number;
  mapType: 'roadmap' | 'satellite';
}): string {
  const clampedZoom = Math.min(20, Math.max(3, Math.round(options.zoom)));

  if (isValidMapsApiKey(options.apiKey)) {
    const params = new URLSearchParams({
      key: options.apiKey,
      center: `${options.lat},${options.lng}`,
      zoom: String(clampedZoom),
      maptype: options.mapType,
      solution_id: 'gmp_mcp_codeassist_v1_aistudio',
    });
    return `https://www.google.com/maps/embed/v1/view?${params.toString()}`;
  }

  const q = options.query.trim() || `${options.lat},${options.lng}`;
  const t = options.mapType === 'satellite' ? 'k' : '';
  const params = new URLSearchParams({
    q,
    z: String(clampedZoom),
    output: 'embed',
  });
  if (t) {
    params.set('t', t);
  }
  return `https://maps.google.com/maps?${params.toString()}`;
}

export function buildWhatsAppEnquiryUrl(options: {
  phoneDigits: string;
  studioName: string;
  projectType?: string;
}): string {
  const cleanedPhone = options.phoneDigits.replace(/\D/g, '') || '10000000000';
  const context = options.projectType
    ? `regarding a ${options.projectType} project`
    : 'regarding an interior design consultation';
  const message = `Hello ${options.studioName}, I would like to enquire ${context}.`;
  return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
}
