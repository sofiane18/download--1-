
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Store as StoreIcon, Package, Car } from 'lucide-react'; // Added Package, Car
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
}

const getProductIcon = (category: string) => {
  const catLower = category.toLowerCase();
  if (catLower.includes('brake')) return <Disc3 className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('oil') || catLower.includes('engine')) return <Settings2 className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('filter')) return <Filter className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('light') || catLower.includes('lamp')) return <Lightbulb className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('tire') || catLower.includes('wheel')) return <CircleDotDashed className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('plug')) return <Cog className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />; // Cog for spark plugs
  return <Package className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />; // Default product icon
}
import { Disc3, Settings2, Filter, Lightbulb, CircleDotDashed, Cog } from 'lucide-react';


export function ProductCard({ product }: ProductCardProps) {
  const ProductIcon = getProductIcon(product.category);

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="aspect-[3/2] relative w-full bg-muted flex items-center justify-center rounded-t-lg border-b">
          {ProductIcon}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1 line-clamp-2">{product.name}</CardTitle>
        <div className="text-sm text-muted-foreground mb-2 flex items-center">
          <StoreIcon className="w-4 h-4 mr-1 flex-shrink-0" /> <span className="truncate">{product.store}</span>
        </div>
        <div className="text-sm text-muted-foreground mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" /> <span className="truncate">{product.location}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
           <StarRating rating={product.reviews} />
           <span className="text-base font-semibold text-foreground">{product.price} DZD</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
