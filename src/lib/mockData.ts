import type { Product, Service, Store } from './types';

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Premium Brake Pads',
    store: 'AutoParts Algiers',
    location: 'Algiers',
    price: 4200,
    description: 'High-performance ceramic brake pads for most car models. Ensures quiet and smooth braking.',
    // imageUrl: 'https://placehold.co/600x400.png', // Replaced by icon
    category: 'Brake System',
    reviews: 4.5,
    storeAddress: '12 Rue Didouche Mourad, Alger Centre, Algiers',
  },
  {
    id: 'p2',
    name: 'Synthetic Engine Oil 5L',
    store: 'Oran Car Essentials',
    location: 'Oran',
    price: 3500,
    description: 'Fully synthetic 5W-30 engine oil for optimal engine protection and performance.',
    // imageUrl: 'https://placehold.co/600x400.png', // Replaced by icon
    category: 'Engine Parts',
    reviews: 4.8,
    storeAddress: '5 Avenue de la République, Oran',
  },
  {
    id: 'p3',
    name: 'Spark Plugs (Set of 4)',
    store: 'Blida Auto Spares',
    location: 'Blida',
    price: 1800,
    description: 'Durable iridium spark plugs for improved fuel efficiency and engine response.',
    // imageUrl: 'https://placehold.co/600x400.png', // Replaced by icon
    category: 'Engine Parts',
    reviews: 4.2,
    storeAddress: 'Cité des 1000 Logements, Blida',
  },
];

export const mockServices: Service[] = [
  {
    id: 's1',
    name: 'Standard Car Wash',
    store: 'CleanCar Algiers',
    location: 'Algiers',
    price: 1500,
    description: 'Exterior wash, tire shining, and interior vacuuming. Get your car sparkling clean!',
    // imageUrl: 'https://placehold.co/600x400.png', // Replaced by icon
    category: 'Maintenance',
    reviews: 4.0,
    storeAddress: 'Zone Industrielle Oued Smar, Algiers',
  },
  {
    id: 's2',
    name: 'Tire Replacement (Per Tire)',
    store: 'TirePro Oran',
    location: 'Oran',
    price: 2500, 
    description: 'Professional tire removal and installation service. Balancing included.',
    // imageUrl: 'https://placehold.co/600x400.png', // Replaced by icon
    category: 'Repair',
    reviews: 4.6,
    storeAddress: 'Boulevard Millenium, Bir El Djir, Oran',
  },
  {
    id: 's3',
    name: 'Engine Diagnostics',
    store: 'MechTech Blida',
    location: 'Blida',
    price: 3000,
    description: 'Comprehensive engine diagnostics using latest OBD-II tools to identify issues.',
    // imageUrl: 'https://placehold.co/600x400.png', // Replaced by icon
    category: 'Diagnostics',
    reviews: 4.3,
    storeAddress: 'Route Nationale 1, Blida',
  },
];

export const mockStores: Store[] = [
  {
    id: 'st1',
    name: 'AutoParts Algiers',
    location: 'Algiers',
    type: 'Parts Retailer',
    address: '12 Rue Didouche Mourad, Alger Centre, Algiers',
    // imageUrl: 'https://placehold.co/300x200.png', // Replaced by icon
    rating: 4.5,
  },
  {
    id: 'st2',
    name: 'Oran Car Essentials',
    location: 'Oran',
    type: 'Parts & Accessories',
    address: '5 Avenue de la République, Oran',
    // imageUrl: 'https://placehold.co/300x200.png', // Replaced by icon
    rating: 4.8,
  },
  {
    id: 'st3',
    name: 'CleanCar Algiers',
    location: 'Algiers',
    type: 'Service Center',
    address: 'Zone Industrielle Oued Smar, Algiers',
    // imageUrl: 'https://placehold.co/300x200.png', // Replaced by icon
    rating: 4.0,
  },
  {
    id: 'st4',
    name: 'MechTech Blida',
    location: 'Blida',
    type: 'Full Service Garage',
    address: 'Route Nationale 1, Blida',
    // imageUrl: 'https://placehold.co/300x200.png', // Replaced by icon
    rating: 4.3,
  },
];

export const productCategories = [
  { id: 'cat_brakes', name: 'Brake Systems', iconName: 'Disc3' }, // Using Disc3 as a stand-in for brake disc/pads
  { id: 'cat_engine', name: 'Engine Parts', iconName: 'Settings2' },
  { id: 'cat_filters', name: 'Filters', iconName: 'Filter' },
  { id: 'cat_lights', name: 'Lighting', iconName: 'Lightbulb' },
  { id: 'cat_wheels', name: 'Wheels & Tires', iconName: 'CircleDotDashed' }, //Stand-in for tire
  { id: 'cat_accesso', name: 'Accessories', iconName: 'ShoppingBag' },
];

export const serviceCategories = [
  { id: 'serv_cat_maint', name: 'General Maintenance', iconName: 'Wrench' },
  { id: 'serv_cat_repair', name: 'Repairs', iconName: 'Tool' },
  { id: 'serv_cat_diag', name: 'Diagnostics', iconName: 'ScanLine' },
  { id: 'serv_cat_wash', name: 'Cleaning & Detailing', iconName: 'Droplets' },
  { id: 'serv_cat_tuning', name: 'Performance Tuning', iconName: 'Gauge' },
  { id: 'serv_cat_bodywork', name: 'Body Work & Paint', iconName: 'PaintRoller' },
];


export const getItemById = (id: string, type: 'product' | 'service'): Product | Service | undefined => {
  if (type === 'product') {
    const product = mockProducts.find(p => p.id === id);
    // Simulate adding imageUrl back if it was removed for icons
    // return product ? { ...product, imageUrl: product.imageUrl || 'https://placehold.co/600x400.png' } : undefined;
    return product;
  }
  const service = mockServices.find(s => s.id === id);
  // return service ? { ...service, imageUrl: service.imageUrl || 'https://placehold.co/600x400.png' } : undefined;
  return service;
}
