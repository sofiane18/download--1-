
import { getItemById, mockServices } from '@/lib/mockData';
import type { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/shared/StarRating';
import { MapPin, Store as StoreIconLucide, Tag, CheckCircle, Info, Wrench, Car, ShieldCheck, Settings, Droplets, ScanLine, PenToolIcon as Tool, Gauge, PaintRoller, CircleDotDashed } from 'lucide-react'; // Added more icons
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return mockServices.map((service) => ({
    id: service.id,
  }));
}

interface ServicePageProps {
  params: { id: string };
}

const getServiceIconForPage = (category: string) => {
  const catLower = category.toLowerCase();
  if (catLower.includes('wash') || catLower.includes('clean') || catLower.includes('detail')) return <Droplets className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('tire') || catLower.includes('wheel')) return <CircleDotDashed className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('engine') || catLower.includes('oil')) return <Settings className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('diagnostic')) return <ScanLine className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('repair')) return <Tool className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('maintenance')) return <Wrench className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('tuning')) return <Gauge className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  if (catLower.includes('body') || catLower.includes('paint')) return <PaintRoller className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
  return <Car className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />;
}


export default async function ServicePage({ params }: ServicePageProps) {
  const service = getItemById(params.id, 'service') as Service | undefined;

  if (!service) {
    notFound();
  }

  const ServiceIcon = getServiceIconForPage(service.category);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-square bg-muted md:rounded-l-lg flex items-center justify-center border-b md:border-b-0 md:border-r">
            {ServiceIcon}
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{service.name}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <StarRating rating={service.reviews} starClassName="w-5 h-5" />
                <span>({service.reviews} reviews)</span>
              </div>
            </CardHeader>

            <CardContent className="p-0 flex-grow space-y-4">
              <p className="text-xl sm:text-2xl font-semibold text-primary mb-4">{service.price} DZD</p>
              
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground flex items-center"><Info className="w-5 h-5 mr-2 text-primary" />Description</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-foreground flex items-center"><Tag className="w-5 h-5 mr-2 text-primary" />Category</h3>
                <p className="text-muted-foreground">{service.category}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground flex items-center"><Wrench className="w-5 h-5 mr-2 text-primary" />Service Provider</h3>
                <p className="text-muted-foreground">{service.store}</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-foreground flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary" />Location</h3>
                <p className="text-muted-foreground">{service.location} - {service.storeAddress}</p>
              </div>
              
              <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground my-4 border">
                <MapPin className="w-8 h-8 mr-2" />
                <span>Map Placeholder for {service.storeAddress}</span>
              </div>
            </CardContent>
            
            <div className="mt-auto pt-6">
               <Button 
                asChild 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3"
              >
                <Link href={`/confirmation?itemId=${service.id}&itemType=service&itemName=${encodeURIComponent(service.name)}&price=${service.price}`}>
                  <CheckCircle className="w-5 h-5 mr-2" /> Book Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

