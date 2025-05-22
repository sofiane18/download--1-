
import { getItemById, mockProducts } from '@/lib/mockData';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/shared/StarRating';
import { MapPin, Store as StoreIconLucide, Tag, CheckCircle, Info, Package, Car, Disc3, Settings2, Filter, Lightbulb, CircleDotDashed, Cog } from 'lucide-react'; // Added Package, Car & category icons
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: { id: string };
}

const getProductIconForPage = (category: string) => {
  const catLower = category.toLowerCase();
  if (catLower.includes('brake')) return <Disc3 className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('oil') || catLower.includes('engine')) return <Settings2 className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('filter')) return <Filter className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('light') || catLower.includes('lamp')) return <Lightbulb className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('tire') || catLower.includes('wheel')) return <CircleDotDashed className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('plug')) return <Cog className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  return <Package className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
}


export default async function ProductPage({ params }: ProductPageProps) {
  const product = getItemById(params.id, 'product') as Product | undefined;

  if (!product) {
    notFound();
  }
  
  const ProductIcon = getProductIconForPage(product.category);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-square bg-muted md:rounded-l-lg flex items-center justify-center border-b md:border-b-0 md:border-r">
            {ProductIcon}
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <StarRating rating={product.reviews} starClassName="w-5 h-5" />
                <span>({product.reviews} reviews)</span>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex-grow space-y-4">
              <p className="text-2xl font-semibold text-primary mb-4">{product.price} DZD</p>
              
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground flex items-center"><Info className="w-5 h-5 mr-2 text-primary" />Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-foreground flex items-center"><Tag className="w-5 h-5 mr-2 text-primary" />Category</h3>
                <p className="text-muted-foreground">{product.category}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground flex items-center"><StoreIconLucide className="w-5 h-5 mr-2 text-primary" />Store</h3>
                <p className="text-muted-foreground">{product.store}</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-foreground flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary" />Location</h3>
                <p className="text-muted-foreground">{product.location} - {product.storeAddress}</p>
              </div>
              
              <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground my-4 border">
                <MapPin className="w-8 h-8 mr-2" />
                <span>Map Placeholder for {product.storeAddress}</span>
              </div>
            </CardContent>
            
            <div className="mt-auto pt-6">
              <Button 
                asChild 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3"
              >
                <Link href={`/confirmation?itemId=${product.id}&itemType=product&itemName=${encodeURIComponent(product.name)}&price=${product.price}`}>
                  <CheckCircle className="w-5 h-5 mr-2" /> Buy Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
