
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { 
  ArrowRight, 
  Search, 
  LayoutGrid, 
  Store as StoreIconLucide, 
  Sparkles, 
  Package, 
  Wrench,
  Disc3,
  Settings2,
  Filter,
  Lightbulb,
  CircleDotDashed,
  ShoppingBag,
  PenToolIcon as Tool, // Changed from Tool to PenToolIcon
  ScanLine,
  Droplets,
  Gauge,
  PaintRoller,
  type LucideIcon
} from 'lucide-react';
import { productCategories, serviceCategories } from '@/lib/mockData';
import type { Category } from '@/lib/types';

// Helper to get Lucide icon component by name string
const iconMap: { [key: string]: LucideIcon } = {
  Disc3, Settings2, Filter, Lightbulb, CircleDotDashed, ShoppingBag, Wrench, Tool, ScanLine, Droplets, Gauge, PaintRoller, Package, StoreIconLucide, Sparkles, LayoutGrid, Search
};

const CategoryCard = ({ title, categories, type }: { title: string, categories: Category[], type: 'product' | 'service' }) => (
  <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow">
    <CardHeader>
      <CardTitle className="flex items-center text-xl sm:text-2xl">
        {type === 'product' ? <Package className="mr-2 h-6 w-6 text-primary" /> : <Wrench className="mr-2 h-6 w-6 text-primary" />}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-grow space-y-2 overflow-y-auto max-h-60 custom-scrollbar">
      {categories.map(cat => {
        const IconComponent = iconMap[cat.iconName] || LayoutGrid; // Fallback icon
        return (
          <Link 
            key={cat.id} 
            href={`/explore?category=${encodeURIComponent(cat.name)}&itemType=${type}&tab=${type}s`} 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
            aria-label={`Explore ${cat.name}`}
          >
            <span className="flex items-center">
              <IconComponent className="mr-3 h-5 w-5 text-muted-foreground" /> 
              {cat.name}
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        );
      })}
    </CardContent>
  </Card>
);

export default function NewHomePage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Welcome to AutoDinar</h1>
        <p className="mt-2 text-lg sm:text-xl text-muted-foreground">Your smart automotive companion in Algeria.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Link href="/explore" className="lg:col-span-3 block group">
          <Card className="h-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 transition-all transform hover:scale-[1.01]">
            <CardHeader>
              <CardTitle className="flex items-center text-xl sm:text-2xl">
                <Search className="mr-3 h-7 w-7 sm:h-8 sm:w-8" /> Explore All Products & Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg opacity-90">Dive into our comprehensive catalog of automotive parts and expert services. Find exactly what your vehicle needs.</p>
              <div className="mt-4 text-right">
                <span className="inline-flex items-center font-semibold group-hover:underline">
                  Start Exploring <ArrowRight className="ml-2 h-5 w-5"/>
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <CategoryCard title="Product Categories" categories={productCategories} type="product" />
        <CategoryCard title="Service Categories" categories={serviceCategories} type="service" />

        <Link href="/explore?tab=stores" className="block group">
          <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow transform hover:scale-[1.01]">
            <CardHeader>
              <CardTitle className="flex items-center text-xl sm:text-2xl">
                <StoreIconLucide className="mr-2 h-6 w-6 text-primary" /> Nearby Stores
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm sm:text-base">Discover trusted auto part retailers and service centers in your area. Quality and convenience, guaranteed.</p>
            </CardContent>
             <CardContent className="mt-auto text-right pt-0">
                <span className="inline-flex items-center font-semibold text-primary group-hover:underline">
                  Find Stores <ArrowRight className="ml-2 h-4 w-4"/>
                </span>
              </CardContent>
          </Card>
        </Link>
        
        <Link href="/recommendations" className="md:col-span-2 lg:col-span-3 block group">
           <Card className="h-full bg-accent text-accent-foreground shadow-xl hover:bg-accent/90 transition-all transform hover:scale-[1.01]">
            <CardHeader>
              <CardTitle className="flex items-center text-xl sm:text-2xl">
                <Sparkles className="mr-3 h-7 w-7 sm:h-8 sm:w-8" /> AI-Powered Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg opacity-90">Let our smart AI guide you to the best products and services tailored for your vehicle and past purchases. Upgrade smarter, not harder.</p>
               <div className="mt-4 text-right">
                <span className="inline-flex items-center font-semibold group-hover:underline">
                  Get AI Picks <ArrowRight className="ml-2 h-5 w-5"/>
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
