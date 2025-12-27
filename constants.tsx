
import { Product, CarouselItem } from './types';

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'f1',
    title: 'Midnight Floral Vinyl',
    collection: 'Botanic Collection',
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=800&auto=format&fit=crop',
    badge: 'New',
    badgeColor: 'bg-blue-600',
    price: 89.99,
    type: 'interior'
  },
  {
    id: 'f2',
    title: 'Geometric Gold Line',
    collection: 'Luxe Series',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop',
    price: 124.50,
    type: 'interior'
  },
  {
    id: 'f3',
    title: 'Textured Concrete',
    collection: 'Industrial Loft',
    image: 'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=800&auto=format&fit=crop',
    badge: '-20%',
    badgeColor: 'bg-green-600',
    price: 75.00,
    type: 'interior'
  },
  {
    id: 'f4',
    title: 'New Exterior Facades',
    collection: 'Facade Main',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    badge: 'New',
    badgeColor: 'bg-emerald-600',
    price: 210.00,
    type: 'exterior'
  }
];

export const INTERIOR_PRODUCTS: Product[] = [
  {
    id: 'i1',
    title: 'Velvet Midnight',
    collection: 'Luxe Series',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?q=80&w=800&auto=format&fit=crop',
    badge: 'Limited',
    badgeColor: 'bg-purple-600',
    price: 115.00,
    type: 'interior'
  },
  {
    id: 'i2',
    title: 'Conmate Moldings',
    collection: 'Modernist',
    image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=800&auto=format&fit=crop',
    badge: 'Best Seller',
    badgeColor: 'bg-blue-500',
    price: 45.00,
    type: 'interior'
  }
];

export const EXTERIOR_PRODUCTS: Product[] = [
  {
    id: 'e1',
    title: 'Minimalist Stripe',
    collection: 'Nordic Home',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop',
    badge: 'Weatherproof',
    badgeColor: 'bg-emerald-600',
    price: 155.00,
    type: 'exterior'
  },
  {
    id: 'e2',
    title: 'New Exterior Facades',
    collection: 'Nordic Loft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6199f7d009?q=80&w=800&auto=format&fit=crop',
    price: 199.99,
    type: 'exterior'
  }
];

export const SALE_PRODUCTS: Product[] = [
  {
    id: 's1',
    title: 'Autumn Oak Panels',
    collection: 'Timber Series',
    image: 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c1?q=80&w=800&auto=format&fit=crop',
    badge: '-40%',
    badgeColor: 'bg-red-600',
    price: 49.99,
    type: 'interior'
  },
  {
    id: 's2',
    title: 'Slate Grey Texture',
    collection: 'Modernist',
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?q=80&w=800&auto=format&fit=crop',
    badge: 'Clearance',
    badgeColor: 'bg-orange-600',
    price: 32.50,
    type: 'interior'
  }
];

export const COLLECTIONS = [
  {
    id: 'c1',
    name: 'Nordic Minimalism',
    count: 24,
    image: 'https://images.unsplash.com/photo-1616489953149-8e7c1029e24a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'c2',
    name: 'Industrial Loft',
    count: 18,
    image: 'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'c3',
    name: 'Botanical Sanctuary',
    count: 32,
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'c4',
    name: 'Luxury Geometric',
    count: 15,
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop'
  }
];

export const PRO_FEATURES = [
  {
    title: "Bespoke Scaling",
    desc: "Adjust pattern repeats to fit architectural specs perfectly.",
    icon: "Ruler"
  },
  {
    title: "Sustainability Certs",
    desc: "All pro-grade materials meet LEED and EPD requirements.",
    icon: "Leaf"
  },
  {
    title: "CAD Integration",
    desc: "Direct texture export for Revit, Rhino, and 3ds Max.",
    icon: "Layers"
  }
];

export const FAQS = [
  {
    question: "How does the AI Room Visualizer work?",
    answer: "Our visualizer uses advanced computer vision and the Gemini Generative AI model to map your room's geometry and apply seamless textures to your walls while preserving furniture, lighting, and shadows."
  },
  {
    question: "Is the wallpaper measurement accurate?",
    answer: "The calculator provides a high-confidence estimate based on standard roll widths and repeat patterns. We recommend adding a 10% waste buffer for complex corners."
  },
  {
    question: "Can I order custom pattern repeats?",
    answer: "Yes, our 'Architectural Program' offers bespoke pattern scaling and color matching for professional projects. Contact our design concierge for details."
  }
];

export const INSPIRATION_GALLERY = [
  { id: 1, image: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=1200&auto=format&fit=crop', title: 'Mid-Century Modern' },
  { id: 2, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop', title: 'Coastal Retreat' },
  { id: 3, image: 'https://images.unsplash.com/photo-1617806118233-18e16208a50a?q=80&w=1200&auto=format&fit=crop', title: 'Japanese Zen' }
];

export const CAROUSEL_ITEMS: CarouselItem[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1616489953149-8e7c1029e24a?q=80&w=1200&auto=format&fit=crop', title: 'Modern Living' },
  { id: 2, image: 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=1200&auto=format&fit=crop', title: 'Elegant Office' },
  { id: 3, image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop', title: 'Serene Bedroom' },
  { id: 4, image: 'https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=1200&auto=format&fit=crop', title: 'Urban Loft' },
  { id: 5, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop', title: 'Minimalist Study' }
];
