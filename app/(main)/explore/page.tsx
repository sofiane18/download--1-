
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/shared/ProductCard";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { StoreCard } from "@/components/shared/StoreCard";
import { mockProducts, mockServices, mockStores } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react"; // Renamed to avoid conflict
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'products');

  const initialCategory = searchParams.get('category');
  const itemType = searchParams.get('itemType');

  useEffect(() => {
    const tabFromParams = searchParams.get('tab');
    if (tabFromParams) setActiveTab(tabFromParams);

    const categoryFromParams = searchParams.get('category');
    const typeFromParams = searchParams.get('itemType');

    if (categoryFromParams && typeFromParams) {
      setSearchTerm(categoryFromParams); // Pre-fill search with category name
      if (typeFromParams === 'product') setActiveTab('products');
      if (typeFromParams === 'service') setActiveTab('services');
    }
  }, [searchParams]);


  const filteredProducts = useMemo(() => 
    mockProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  const filteredServices = useMemo(() =>
    mockServices.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.location.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  const filteredStores = useMemo(() =>
    mockStores.filter(st =>
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.type.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Explore Parts, Services & Stores</h1>
        <p className="text-muted-foreground">Find the best automotive products, services, and stores near you.</p>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          type="search"
          placeholder="Search products, services, or stores..."
          className="pl-10 w-full md:w-1/2 lg:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="products">Car Products</TabsTrigger>
          <TabsTrigger value="services">Car Services</TabsTrigger>
          <TabsTrigger value="stores">Nearby Stores</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-center text-muted-foreground">No products found matching your search.</p>
          )}
        </TabsContent>
        <TabsContent value="services">
           {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
             <p className="mt-6 text-center text-muted-foreground">No services found matching your search.</p>
          )}
        </TabsContent>
        <TabsContent value="stores">
          {filteredStores.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {filteredStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-center text-muted-foreground">No stores found matching your search.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
