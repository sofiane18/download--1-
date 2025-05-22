
import type { Service } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Wrench, Car, ShieldCheck, Settings, Droplets, ScanLine, PenToolIcon as Tool, Gauge, PaintRoller, CircleDotDashed } from 'lucide-react'; // Consolidated icons
import { StarRating } from './StarRating';

interface ServiceCardProps {
  service: Service;
}

const getServiceIcon = (category: string) => {
  const catLower = category.toLowerCase();
  if (catLower.includes('wash') || catLower.includes('clean') || catLower.includes('detail')) return <Droplets className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('tire') || catLower.includes('wheel')) return <CircleDotDashed className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('engine') || catLower.includes('oil')) return <Settings className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('diagnostic')) return <ScanLine className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('repair')) return <Tool className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('maintenance')) return <Wrench className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('tuning')) return <Gauge className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  if (catLower.includes('body') || catLower.includes('paint')) return <PaintRoller className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />;
  return <Car className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />; // Default service icon
}


export function ServiceCard({ service }: ServiceCardProps) {
  const ServiceIcon = getServiceIcon(service.category);
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="aspect-[3/2] relative w-full bg-muted flex items-center justify-center rounded-t-lg border-b">
          {ServiceIcon}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1 line-clamp-2">{service.name}</CardTitle>
         <div className="text-sm text-muted-foreground mb-2 flex items-center">
          <Wrench className="w-4 h-4 mr-1 flex-shrink-0" /> <span className="truncate">{service.store}</span>
        </div>
        <div className="text-sm text-muted-foreground mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" /> <span className="truncate">{service.location}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
            <StarRating rating={service.reviews} />
            <span className="text-base font-semibold text-foreground">{service.price} DZD</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/services/${service.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
