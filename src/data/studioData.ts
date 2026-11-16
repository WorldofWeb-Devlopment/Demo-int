import type { ProjectSummary } from '../utils/studioLogic';
import heroLivingImg from '../assets/images/hero_living_sanctuary_1794671212329.jpg';
import aboutCraftImg from '../assets/images/about_atelier_craft_1794671213546.jpg';
import modularKitchenImg from '../assets/images/service_modular_kitchen_1794671213493.jpg';
import bedroomSuiteImg from '../assets/images/service_bedroom_suite_1794671214595.jpg';
import commercialLoungeImg from '../assets/images/service_commercial_lounge_1794671215022.jpg';
import villaResidenceImg from '../assets/images/project_villa_residence_1794671215428.jpg';
import penthouseAtelierImg from '../assets/images/project_penthouse_atelier_1794671215268.jpg';

export const IMAGES = {
  heroLiving: heroLivingImg,
  aboutCraft: aboutCraftImg,
  modularKitchen: modularKitchenImg,
  bedroomSuite: bedroomSuiteImg,
  commercialLounge: commercialLoungeImg,
  villaResidence: villaResidenceImg,
  penthouseAtelier: penthouseAtelierImg,
} as const;

export const STUDIO_CONTACT = {
  brandName: 'Atelier Veyra',
  tagline: 'Interior Architecture & Bespoke Living',
  // Configurable via environment variables; uses explicit placeholders until actual studio details are provided.
  addressLine1:
    (import.meta.env.VITE_STUDIO_ADDRESS_LINE1 as string | undefined) ||
    '[Studio Street Address, Suite / Floor]',
  addressLine2:
    (import.meta.env.VITE_STUDIO_ADDRESS_LINE2 as string | undefined) ||
    '[City, State / Region, Postal Code]',
  country:
    (import.meta.env.VITE_STUDIO_COUNTRY as string | undefined) || '[Country Placeholder]',
  phoneDisplay:
    (import.meta.env.VITE_STUDIO_PHONE as string | undefined) || '+1 (000) 000-0000',
  whatsappDigits:
    (import.meta.env.VITE_STUDIO_WHATSAPP as string | undefined) || '10000000000',
  email:
    (import.meta.env.VITE_STUDIO_EMAIL as string | undefined) || 'studio@atelierveyra.example',
  hours: 'Monday – Saturday · 10:00 AM – 6:30 PM (By Appointment)',
  mapLabel:
    (import.meta.env.VITE_STUDIO_MAP_LABEL as string | undefined) ||
    'Atelier Veyra Studio (Address Placeholder)',
  mapQuery:
    (import.meta.env.VITE_STUDIO_MAP_QUERY as string | undefined) ||
    '40.7195,-74.0089',
  coordinates: {
    lat: Number(import.meta.env.VITE_STUDIO_LAT) || 40.7195,
    lng: Number(import.meta.env.VITE_STUDIO_LNG) || -74.0089,
  },
  isPlaceholderAddress: !import.meta.env.VITE_STUDIO_ADDRESS_LINE1,
};

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  scope: string;
  image: string;
  layoutSpan: 'featured' | 'tall' | 'standard';
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'residential-interior-design',
    index: '01',
    title: 'Residential Interior Design',
    description:
      'Holistic spatial planning, architectural detailing, and material curation tailored to the quiet rituals of private homes.',
    scope: 'Full-Home Architecture · Custom Millwork · Art Curation',
    image: IMAGES.villaResidence,
    layoutSpan: 'featured',
  },
  {
    id: 'modular-kitchen-design',
    index: '02',
    title: 'Modular Kitchen Design',
    description:
      'Monolithic stone islands, precision-engineered joinery, and integrated bronze fixtures balancing sculptural restraint with daily ergonomics.',
    scope: 'Monolithic Stone · Handleless Cabinetry · Ergonomic Flow',
    image: IMAGES.modularKitchen,
    layoutSpan: 'standard',
  },
  {
    id: 'bedroom-interiors',
    index: '03',
    title: 'Bedroom Interiors',
    description:
      'Restorative private sanctuaries composed with tactile Belgian linens, acoustic limewash plaster, and layered ambient lighting.',
    scope: 'Bespoke Headboards · Walk-in Wardrobes · Soft Lighting',
    image: IMAGES.bedroomSuite,
    layoutSpan: 'standard',
  },
  {
    id: 'living-room-design',
    index: '04',
    title: 'Living Room Design',
    description:
      'Inviting architectural lounges anchored by natural daylight, custom upholstered seating, and heirloom stone surfaces.',
    scope: 'Spatial Rhythm · Custom Furniture · Layered Textiles',
    image: IMAGES.heroLiving,
    layoutSpan: 'standard',
  },
  {
    id: 'commercial-interiors',
    index: '05',
    title: 'Commercial Interiors',
    description:
      'Flagship boutiques, private executive lounges, and hospitality spaces that translate brand heritage into memorable spatial presence.',
    scope: 'Hospitality · Gallery Spaces · Executive Studios',
    image: IMAGES.commercialLounge,
    layoutSpan: 'featured',
  },
  {
    id: 'turnkey-interior-solutions',
    index: '06',
    title: 'Turnkey Interior Solutions',
    description:
      'Single-point accountability from architectural concept and technical documentation through site execution, procurement, and final styling.',
    scope: 'End-to-End Execution · Site Supervision · Final Styling',
    image: IMAGES.penthouseAtelier,
    layoutSpan: 'tall',
  },
];

export const PROJECTS: ProjectSummary[] = [
  {
    slug: 'solstice-courtyard-residence',
    title: 'The Solstice Courtyard Residence',
    category: 'Residential',
    location: 'Private Estate · South Wing',
    style: 'Warm Architectural Minimalism',
    year: '2026',
    area: '4,850 sq ft',
    timeline: '9 Months',
    heroImage: IMAGES.villaResidence,
    aspect: 'wide',
    summary:
      'An expansive indoor-outdoor residence framed in patinated bronze glazing, honed travertine dining monoliths, and exposed white oak rafters.',
    challenge:
      'Unify a fragmented floor plan into a calm, light-filled pavilion that opens effortlessly onto an ancient olive courtyard while maintaining acoustic intimacy.',
    approach:
      'Structural partitions were replaced with custom bronze-framed pivot apertures, allowing morning and late afternoon light to wash across raw limestone walls and bespoke oak seating.',
    materials: [
      'Honed Roman Travertine',
      'Quarter-Sawn European White Oak',
      'Oil-Rubbed Architectural Bronze',
      'Hand-Troweled Mineral Limewash',
    ],
    deliverables: [
      'Architectural Spatial Reconfiguration',
      'Bespoke Dining & Lounge Furniture',
      'Lighting Design & Courtyard Integration',
      'Turnkey Procurement & Styling',
    ],
    gallery: [
      {
        src: IMAGES.villaResidence,
        caption: 'Plate 01 — Main dining and living pavilion opening to the stone courtyard.',
      },
      {
        src: IMAGES.modularKitchen,
        caption: 'Plate 02 — Adjoining culinary atelier with monolithic vein-cut travertine island.',
      },
      {
        src: IMAGES.aboutCraft,
        caption: 'Plate 03 — Hand-carved limestone archway and fluted oak gallery credenza.',
      },
    ],
  },
  {
    slug: 'meridian-penthouse-library',
    title: 'Meridian Penthouse & Study',
    category: 'Residential',
    location: 'Skyline Tower · Upper Terrace',
    style: 'Quiet Tailored Luxury',
    year: '2025',
    area: '3,200 sq ft',
    timeline: '7 Months',
    heroImage: IMAGES.penthouseAtelier,
    aspect: 'tall',
    summary:
      'A serene high-rise residence anchored by floor-to-ceiling smoked oak library joinery, a carved travertine hearth, and warm bronze sconces.',
    challenge:
      'Soften the clinical glass envelope of a high-altitude apartment into an enveloping evening sanctuary suitable for private contemplation and intimate hosting.',
    approach:
      'We introduced deep smoked oak millwork that wraps the perimeter walls, paired with acoustic wool rugs, unbleached linen upholstery, and low-glare warm bronze luminaires.',
    materials: [
      'Fumed Smoked Oak Millwork',
      'Cross-Cut Silver Travertine',
      'Brushed Aged Brass & Bronze',
      'Belgian Bouclé & Hand-Knotted Wool',
    ],
    deliverables: [
      'Custom Library & Hearth Architecture',
      'Acoustic Ceiling & Wall Treatment',
      'Bespoke Upholstered Seating',
      'Curated Ceramic & Art Placement',
    ],
    gallery: [
      {
        src: IMAGES.penthouseAtelier,
        caption: 'Plate 01 — Floor-to-ceiling smoked oak library overlooking the evening skyline.',
      },
      {
        src: IMAGES.bedroomSuite,
        caption: 'Plate 02 — Primary bedroom suite dressed in unbleached linen and sand plaster.',
      },
      {
        src: IMAGES.heroLiving,
        caption: 'Plate 03 — Daylit sitting room with travertine coffee table and bouclé sofa.',
      },
    ],
  },
  {
    slug: 'lumiere-executive-gallery',
    title: 'Lumière & Partners Executive Lounge',
    category: 'Commercial',
    location: 'Cultural District · Flagship Floor',
    style: 'Monolithic Contemporary',
    year: '2026',
    area: '6,100 sq ft',
    timeline: '6 Months',
    heroImage: IMAGES.commercialLounge,
    aspect: 'wide',
    summary:
      'A private advisory reception and gallery lounge defined by a hand-chiseled limestone concierge plinth, walnut paneling, and cognac saddle leather.',
    challenge:
      'Replace conventional corporate reception cues with the warmth and discretion of a private collector’s salon.',
    approach:
      'A single two-ton sculpted limestone reception desk anchors the arrival hall, surrounded by acoustic American walnut millwork and residentially scaled lounge seating.',
    materials: [
      'Hand-Chiseled French Limestone',
      'Fluted American Black Walnut',
      'Full-Grain Saddle Leather',
      'Nero Marquina Honed Marble',
    ],
    deliverables: [
      'Commercial Concept & Brand Architecture',
      'Custom Monolithic Stone Reception Desk',
      'Acoustic Boardroom & Lounge Fit-Out',
      'Turnkey Lighting & Millwork Execution',
    ],
    gallery: [
      {
        src: IMAGES.commercialLounge,
        caption: 'Plate 01 — Sculpted limestone arrival plinth and walnut architectural gallery.',
      },
      {
        src: IMAGES.aboutCraft,
        caption: 'Plate 02 — Private consultation vestibule with bespoke oak joinery.',
      },
    ],
  },
  {
    slug: 'serene-linen-sanctuary',
    title: 'The Alabaster Residence',
    category: 'Residential',
    location: 'Hillside Enclave · West Ridge',
    style: 'Organic Tactile Minimalism',
    year: '2025',
    area: '3,900 sq ft',
    timeline: '8 Months',
    heroImage: IMAGES.heroLiving,
    aspect: 'standard',
    summary:
      'Sun-drenched living quarters sculpted from limewash plaster, wide-plank European oak, and curated stone surfaces.',
    challenge:
      'Create visual calm and tactile warmth across expansive open-plan rooms without relying on heavy ornamentation.',
    approach:
      'Every surface relies on subtle tonal variation—from hand-applied ivory mineral plaster to raw travertine and woven jute textures that evolve gracefully in shifting daylight.',
    materials: [
      'Mineral Limewash Plaster',
      'Wide-Plank Brushed White Oak',
      'Unfilled Honed Travertine',
      'Woven Natural Wool & Linen',
    ],
    deliverables: [
      'Full Residential Interior Architecture',
      'Modular Kitchen & Pantry Systems',
      'Custom Bedroom & Bath Joinery',
      'Soft Furnishings & Object Styling',
    ],
    gallery: [
      {
        src: IMAGES.heroLiving,
        caption: 'Plate 01 — Sunlit primary living room with bronze-framed garden glazing.',
      },
      {
        src: IMAGES.bedroomSuite,
        caption: 'Plate 02 — Master suite wrapped in warm sand limewash and sheer linen.',
      },
      {
        src: IMAGES.modularKitchen,
        caption: 'Plate 03 — Integrated culinary island with aged bronze fixtures.',
      },
    ],
  },
  {
    slug: 'maison-atelier-showroom',
    title: 'Maison Culinary & Material Atelier',
    category: 'Commercial',
    location: 'Design Quarter · Street Level',
    style: 'Architectural Monograph',
    year: '2025',
    area: '2,750 sq ft',
    timeline: '5 Months',
    heroImage: IMAGES.modularKitchen,
    aspect: 'standard',
    summary:
      'An experiential culinary showroom and material library crafted to showcase monolithic stone engineering and precision European joinery.',
    challenge:
      'Design a working hospitality-grade showroom that feels like an intimate private residence rather than a retail floor.',
    approach:
      'Full-scale architectural kitchen vignettes are paired with concealed appliance walls, bronze pendant lighting, and a dedicated stone and timber sampling archive.',
    materials: [
      'Vein-Cut Honed Travertine',
      'Warm Ivory Matte Lacquer',
      'Brushed Burnished Bronze',
      'Smoked European Oak',
    ],
    deliverables: [
      'Showroom Spatial Masterplan',
      'Bespoke Display Vignettes',
      'Architectural Lighting Programming',
      'Turnkey Site Execution',
    ],
    gallery: [
      {
        src: IMAGES.modularKitchen,
        caption: 'Plate 01 — Monolithic travertine culinary island and bronze pendant trio.',
      },
      {
        src: IMAGES.commercialLounge,
        caption: 'Plate 02 — Client specification lounge and material consultation suite.',
      },
    ],
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  image: string;
  deliverables: string[];
}

export const DESIGN_PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultation',
    duration: 'Weeks 1 – 2',
    description:
      'An in-depth dialogue around how you live or work, architectural site evaluation, spatial aspirations, and transparent budget alignment.',
    image: IMAGES.aboutCraft,
    deliverables: ['Architectural Site Audit', 'Spatial Brief & Program', 'Budget & Timeline Charter'],
  },
  {
    number: '02',
    title: 'Concept & Planning',
    duration: 'Weeks 3 – 6',
    description:
      'Refined floor plans, daylight studies, bespoke material boards, and photorealistic architectural visualizations that establish the spatial narrative.',
    image: IMAGES.heroLiving,
    deliverables: ['2D/3D Spatial Layouts', 'Limestone, Oak & Bronze Palette', 'Daylight & Acoustic Studies'],
  },
  {
    number: '03',
    title: 'Design & Execution',
    duration: 'Months 2 – 6',
    description:
      'Detailed technical joinery drawings, master artisan fabrication, rigorous site supervision, and curated global procurement.',
    image: IMAGES.modularKitchen,
    deliverables: ['Bespoke Millwork Drawings', 'Master Artisan Fabrication', 'On-Site Principal Supervision'],
  },
  {
    number: '04',
    title: 'Final Handover',
    duration: 'Completion',
    description:
      'Precision installation, lighting calibration, tactile art and textile styling, and a comprehensive walkthrough before handing over the keys.',
    image: IMAGES.villaResidence,
    deliverables: ['Scene Lighting Calibration', 'Fine Art & Linen Styling', 'White-Glove Key Handover'],
  },
];

export interface PillarItem {
  number: string;
  title: string;
  description: string;
}

export const WHY_CHOOSE_US: PillarItem[] = [
  {
    number: '01',
    title: 'Personalized Design Approach',
    description:
      'Every commission begins from a blank page—shaped around your rhythms, architecture, and sense of comfort rather than recycled templates.',
  },
  {
    number: '02',
    title: 'Premium Materials',
    description:
      'We specify natural stone, quarter-sawn hardwoods, mineral plasters, and patinated metals that acquire character over decades.',
  },
  {
    number: '03',
    title: 'Attention to Detail',
    description:
      'From shadow-gap plaster reveals to the weight of custom bronze hardware, proportion and finish are resolved down to the millimeter.',
  },
  {
    number: '04',
    title: 'Transparent Communication',
    description:
      'Structured milestone schedules, itemized specifications, and dedicated project leadership eliminate uncertainty from concept to handover.',
  },
  {
    number: '05',
    title: 'Quality Craftsmanship',
    description:
      'Long-standing partnerships with master cabinetmakers, stonemasons, and lighting engineers ensure architectural integrity in every joint.',
  },
];

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  project: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'Atelier Veyra transformed our residence into a place of extraordinary stillness. Every sightline, stone junction, and shaft of morning light feels deeply considered yet completely effortless to live in.',
    author: 'Claire & Henrik Lindqvist',
    role: 'Private Homeowners · Solstice Courtyard Residence',
    project: 'Residential Interior Design',
  },
  {
    quote:
      'Our executive lounge needed to convey quiet authority without feeling sterile. The studio’s restraint with limestone, walnut, and warm bronze redefined how our clients experience our firm from the moment they arrive.',
    author: 'Marcus Vance',
    role: 'Managing Partner · Lumière & Partners',
    project: 'Commercial Interiors',
  },
  {
    quote:
      'From initial spatial planning to the final placement of linens and lighting, their turnkey execution was transparent, disciplined, and remarkably calm. Nothing was left to chance.',
    author: 'Nadia Al-Mansoor',
    role: 'Residence Owner · Meridian Penthouse',
    project: 'Turnkey Interior Solutions',
  },
];
