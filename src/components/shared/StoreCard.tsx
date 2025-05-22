
import type { Store } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Tag, Store as StoreIconLucide, Building } from 'lucide-react'; // Added Building
import { StarRating } from './StarRating';

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  const StoreIcon = store.type.toLowerCase().includes('service') || store.type.toLowerCase().includes('garage') ? 
    <Building className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" /> : 
    <StoreIconLucide className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
         <div className="aspect-[3/2] relative w-full bg-muted flex items-center justify-center rounded-t-lg border-b">
          {StoreIcon}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1 line-clamp-2">{store.name}</CardTitle>
        <div className="text-sm text-muted-foreground mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" /> <span className="truncate">{store.location}</span>
        </div>
        <div className="text-sm text-muted-foreground mb-2 flex items-center">
          <Tag className="w-4 h-4 mr-1 flex-shrink-0" /> <span className="truncate">{store.type}</span>
        </div>
        <StarRating rating={store.rating} />
        {/* Store details page could be added later:
        <Button asChild variant="link" className="p-0 h-auto mt-2">
          <Link href={`/stores/${store.id}`}>View Store</Link>
        </Button>
        */}
      </CardContent>
    </Card>
  );
}
