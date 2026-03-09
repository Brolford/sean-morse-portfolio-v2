/**
 * Project data — edit this file to add or update portfolio projects.
 * Each project needs a unique slug matching the URL: #/project/[slug]
 *
 * Fields:
 *   slug           — URL-safe name, used in #/project/[slug]
 *   title          — Display name shown on cards and detail pages
 *   year           — Year the project was completed
 *   category       — Short descriptor (e.g. "Brand & Packaging")
 *   tagline        — One-liner shown in spotlight overlay
 *   descriptor     — Short phrase shown on card hover
 *   gradientClass  — CSS class for placeholder gradient (maps to future photos)
 *   featured       — true = appears in spotlight carousel on homepage
 *   spotlightOrder — order in spotlight rotation (only needed if featured: true)
 *   caseStudy      — true = clicking links to #/project/[slug] detail page
 *   comingSoon     — true = disables hover/click on this card
 */
export const projects = [
  {
    slug: 'liquid-iv',
    title: 'Liquid I.V.',
    year: '2022',
    category: 'Brand & Packaging',
    tagline: 'Hydration Multiplier.',
    descriptor: 'Hydration Multiplier.',
    gradientClass: 'gradient-liquid-iv',
    featured: true,
    spotlightOrder: 1,
    caseStudy: false,
  },
  {
    slug: 'leisure-project',
    title: 'Leisure Project',
    year: '2023',
    category: 'Brand Development & Packaging',
    tagline: 'Creating an Oasis of Holistic Refreshment.',
    descriptor: 'Creating an Oasis of Holistic Refreshment.',
    gradientClass: 'gradient-leisure',
    featured: true,
    spotlightOrder: 2,
    caseStudy: false,
  },
  {
    slug: 'alecs-ice-cream',
    title: "Alec's Ice Cream",
    year: '2023',
    category: 'Brand Identity & Packaging',
    tagline: 'Dynamic Disruption in the Freezer Aisle.',
    descriptor: 'Dynamic Disruption in the Freezer Aisle.',
    gradientClass: 'gradient-alecs',
    featured: false,
    caseStudy: false,
  },
  {
    slug: 'v8',
    title: 'V8',
    year: '2021',
    category: 'Brand Evolution & Packaging',
    tagline: 'Evolving an American Icon.',
    descriptor: 'Evolving an American Icon.',
    gradientClass: 'gradient-v8',
    featured: false,
    caseStudy: false,
  },
  {
    slug: 'elenita-mezcal',
    title: 'Elenita Mezcal',
    year: '2022',
    category: 'Brand Identity & Packaging',
    tagline: 'Crafting a Distinctly Mexican Spirit.',
    descriptor: 'Crafting a Distinctly Mexican Spirit.',
    gradientClass: 'gradient-elenita',
    featured: false,
    caseStudy: false,
  },
  {
    slug: 'over-easy',
    title: 'Over Easy',
    year: '2022',
    category: 'Brand & Packaging',
    tagline: 'All-Day Craveability.',
    descriptor: 'All-Day Craveability.',
    gradientClass: 'gradient-over-easy',
    featured: false,
    caseStudy: false,
  },
  {
    slug: 'mimio',
    title: 'Mimio',
    year: '2022',
    category: 'Brand Strategy & Packaging',
    tagline: 'Science-Backed Longevity.',
    descriptor: 'Science-Backed Longevity.',
    gradientClass: 'gradient-mimio',
    featured: false,
    caseStudy: false,
  },
  {
    slug: 'coming-soon',
    title: 'Coming Soon',
    year: '2024',
    category: 'Brand & Packaging',
    tagline: '',
    descriptor: 'Coming Soon.',
    gradientClass: 'gradient-coming-soon',
    featured: false,
    caseStudy: false,
    comingSoon: true,
  },
];
