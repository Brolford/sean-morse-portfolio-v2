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
 *   description    — 1-2 sentence summary for archive list + project page
 *   image          — Path to card image (e.g. "/images/liquid-iv.jpg"). Falls back to gradient if empty.
 *   imagePosition  — CSS object-position value (default "center"). Use "top", "bottom", etc. if needed.
 *   stickerNumber  — Big center text for sticker badge (e.g. "+550"). If set, sticker renders on card.
 *   stickerLabel   — Smaller text below the number (e.g. "locations launched")
 *   stickerEdge    — Text repeated around sticker edge (defaults to project title)
 *   gradientClass  — CSS class for placeholder gradient (used when no image provided)
 *   featured       — true = appears in spotlight carousel on homepage
 *   spotlightOrder — order in spotlight rotation (only needed if featured: true)
 *   caseStudy      — true = clicking links to #/project/[slug] detail page
 *   comingSoon     — true = disables hover/click on this card
 *
 * Project detail fields (shown on #/project/[slug] page):
 *   client         — Client or brand name
 *   agency         — Agency name (e.g. "Hatch Design SF" or "Freelance")
 *   services       — Comma-separated list of services provided
 *   credit         — Sean's role on the project
 *   problem        — The challenge or brief
 *   solution       — The strategic/creative approach
 *   results        — Outcomes, awards, metrics
 */
export const projects = [
  {
    slug: 'liquid-iv',
    title: 'Liquid I.V.',
    year: '2022',
    category: 'Brand & Packaging',
    tagline: 'Hydration Multiplier.',
    descriptor: 'Hydration Multiplier.',
    description: 'Comprehensive brand and packaging redesign for the category-defining hydration brand, acquired by Unilever for over $500M.',
    gradientClass: 'gradient-liquid-iv',
    stickerNumber: '+550',
    stickerLabel: 'locations launched',
    featured: true,
    spotlightOrder: 1,
    caseStudy: false,
    client: 'Liquid I.V.',
    agency: 'Hatch Design SF',
    services: 'Brand Strategy, Visual Identity, Packaging Design, Art Direction',
    credit: 'Sean Morse — Design Director',
    problem: 'Liquid I.V. had grown rapidly but its brand and packaging system lacked the sophistication to match its market position. The brand needed to evolve from scrappy startup to premium shelf presence — without alienating its loyal customer base.',
    solution: 'We developed a refined visual identity system that elevated the brand while preserving the energy and accessibility that made it a category leader. The packaging architecture was rebuilt from the ground up to create clear product hierarchy across an expanding SKU lineup.',
    results: 'The redesigned brand system helped position Liquid I.V. for its acquisition by Unilever, with the brand generating over $320M+ in annual revenue. The packaging refresh drove measurable shelf impact across major retail channels.',
  },
  {
    slug: 'leisure-project',
    title: 'Leisure Project',
    year: '2023',
    category: 'Brand Development & Packaging',
    tagline: 'Creating an Oasis of Holistic Refreshment.',
    descriptor: 'Creating an Oasis of Holistic Refreshment.',
    description: 'Full brand development for a breakthrough hydration beverage — from strategic foundation to final packaging design.',
    gradientClass: 'gradient-leisure',
    featured: true,
    spotlightOrder: 2,
    caseStudy: false,
    client: 'Leisure Project',
    agency: 'Freelance',
    services: 'Brand Development, Brand Strategy, Visual Identity, Packaging Design',
    credit: 'Sean Morse — Design Director',
    problem: 'A new hydration beverage needed a complete brand from scratch — one that could carve a unique position in an increasingly crowded functional beverage space and communicate holistic wellness without cliché.',
    solution: 'We built a brand world rooted in the concept of intentional leisure — the idea that true refreshment comes from slowing down. The visual identity pairs organic textures with clean typography, and the packaging uses muted, earthy tones to stand apart from the neon-heavy competition.',
    results: 'Leisure Project launched to strong retail reception and consumer engagement, with the brand identity praised for its distinctive shelf presence and cohesive storytelling across every touchpoint.',
  },
  {
    slug: 'alecs-ice-cream',
    title: "Alec's Ice Cream",
    year: '2023',
    category: 'Brand Identity & Packaging',
    tagline: 'Dynamic Disruption in the Freezer Aisle.',
    descriptor: 'Dynamic Disruption in the Freezer Aisle.',
    description: 'Award-winning brand identity and packaging that earned the #1 Dieline Award in the Dairy Category.',
    gradientClass: 'gradient-alecs',
    featured: false,
    caseStudy: false,
    client: "Alec's Ice Cream",
    agency: 'Hatch Design SF',
    services: 'Brand Identity, Packaging Design, Art Direction',
    credit: 'Sean Morse — Design Director',
    problem: "Alec's Ice Cream needed a brand identity that could compete with established premium ice cream brands while communicating its artisanal quality and unique flavor profiles in a freezer aisle dominated by visual noise.",
    solution: "We crafted a bold, illustration-driven identity system with vibrant color blocking that creates instant shelf recognition. Each flavor variant tells its own visual story while maintaining unmistakable brand cohesion across the entire product line.",
    results: "The packaging won the 2023 Dieline Award #1 in the Dairy Category — the industry's highest recognition for packaging design. The brand experienced significant retail expansion following the redesign.",
  },
  {
    slug: 'v8',
    title: 'V8',
    year: '2021',
    category: 'Brand Evolution & Packaging',
    tagline: 'Evolving an American Icon.',
    descriptor: 'Evolving an American Icon.',
    description: 'Brand evolution and packaging refresh for Campbell Soup\'s iconic vegetable juice brand, modernizing a household name.',
    gradientClass: 'gradient-v8',
    featured: false,
    caseStudy: false,
    client: 'V8 / Campbell Soup Company',
    agency: 'Hatch Design SF',
    services: 'Brand Evolution, Packaging Design, Visual Identity',
    credit: 'Sean Morse — Design Director',
    problem: 'V8 is one of the most recognized brands in American grocery — but that legacy had become a liability. The brand felt dated and was losing relevance with younger consumers, while needing to maintain the trust built over decades.',
    solution: 'We evolved the brand with a careful balance of heritage and modernity. The iconic V8 mark was refined, the color system was energized, and the packaging architecture was restructured to better communicate the health benefits and variety of the product lineup.',
    results: 'The refreshed brand system successfully bridged generational appeal, maintaining loyalty with existing customers while creating renewed interest among health-conscious younger consumers across Campbell Soup\'s retail channels.',
  },
  {
    slug: 'elenita-mezcal',
    title: 'Elenita Mezcal',
    year: '2022',
    category: 'Brand Identity & Packaging',
    tagline: 'Crafting a Distinctly Mexican Spirit.',
    descriptor: 'Crafting a Distinctly Mexican Spirit.',
    description: 'Brand identity and packaging for an artisanal mezcal brand rooted in Mexican craft tradition and modern sophistication.',
    gradientClass: 'gradient-elenita',
    featured: false,
    caseStudy: false,
    client: 'Elenita Mezcal',
    agency: 'Hatch Design SF',
    services: 'Brand Identity, Packaging Design, Brand Strategy',
    credit: 'Sean Morse — Design Director',
    problem: 'Elenita needed to enter the premium mezcal market with a brand that honored authentic Mexican craft traditions while feeling contemporary enough to attract a design-savvy spirits consumer.',
    solution: 'We developed an identity rooted in Mexican artisanship — drawing from traditional typography, earthy material textures, and hand-crafted details. The packaging uses warm metallics and tactile finishes to convey the care and craft behind every bottle.',
    results: 'Elenita launched with a distinctive shelf presence in the competitive premium spirits category, earning recognition for its authentic storytelling and sophisticated design approach.',
  },
  {
    slug: 'over-easy',
    title: 'Over Easy',
    year: '2022',
    category: 'Brand & Packaging',
    tagline: 'All-Day Craveability.',
    descriptor: 'All-Day Craveability.',
    description: 'Brand and packaging design for a breakfast-inspired snack brand built around all-day craveability and approachable nutrition.',
    gradientClass: 'gradient-over-easy',
    featured: false,
    caseStudy: false,
    client: 'Over Easy',
    agency: 'Hatch Design SF',
    services: 'Brand Strategy, Visual Identity, Packaging Design',
    credit: 'Sean Morse — Design Director',
    problem: 'Over Easy needed a brand that could own the "breakfast snack" occasion — a space with no clear leader — while communicating that their products are both indulgent and nutritious.',
    solution: 'We built a warm, inviting brand world anchored by playful illustration and a sunrise-inspired color palette. The packaging balances appetite appeal with clean ingredient storytelling, making the "all-day breakfast" concept feel natural and craveable.',
    results: 'Over Easy gained rapid traction in the natural grocery channel, with the brand identity becoming a key differentiator in retail buyer conversations and consumer trial.',
  },
  {
    slug: 'mimio',
    title: 'Mimio',
    year: '2022',
    category: 'Brand Strategy & Packaging',
    tagline: 'Science-Backed Longevity.',
    descriptor: 'Science-Backed Longevity.',
    description: 'Brand strategy and packaging for a science-backed longevity supplement brand bridging clinical rigor and consumer accessibility.',
    gradientClass: 'gradient-mimio',
    featured: false,
    caseStudy: false,
    client: 'Mimio',
    agency: 'Hatch Design SF',
    services: 'Brand Strategy, Packaging Design, Visual Identity',
    credit: 'Sean Morse — Design Director',
    problem: 'Mimio had breakthrough longevity science but no brand to match. The challenge was translating complex biomimetic research into a consumer brand that felt credible, premium, and approachable — not clinical or intimidating.',
    solution: 'We developed a brand strategy centered on "science you can feel" — pairing clean, pharmaceutical-grade design cues with warm, human touches. The packaging uses confident typography and a restrained palette to signal credibility while remaining inviting on shelf.',
    results: 'Mimio launched with strong DTC performance and successfully expanded into retail, with the brand positioning consistently cited as a key factor in consumer trust and conversion.',
  },
  {
    slug: 'coming-soon',
    title: 'Coming Soon',
    year: '2024',
    category: 'Brand & Packaging',
    tagline: '',
    descriptor: 'Coming Soon.',
    description: '',
    gradientClass: 'gradient-coming-soon',
    featured: false,
    caseStudy: false,
    comingSoon: true,
  },
];
