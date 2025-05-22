"use client";

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PackageOpen, ShoppingCart, CalendarDays, Tag, QrCodeIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrderHistoryClient() {
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Show skeleton or loading state until localStorage is read
    return (
      <div className="space-y-6">
        {[1,2,3].map(i => (
          <Card key={i} className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-32" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }
  
  const sortedOrders = [...orders].sort((a, b) => b.timestamp - a.timestamp);

  if (sortedOrders.length === 0) {
    return (
      <div className="text-center py-10">
        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">No Orders Yet</h2>
        <p className="text-muted-foreground mb-6">You haven't placed any orders. Start exploring products and services!</p>
        <Button asChild>
          <Link href="/">Explore Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedOrders.map((order) => (
        <Card key={order.orderId} className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl flex items-center justify-between">
              <span>{order.itemName}</span>
              <span className="text-base sm:text-lg font-semibold text-primary">{order.itemPrice} DZD</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Order ID: {order.orderId}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center text-muted-foreground">
              <CalendarDays className="w-4 h-4 mr-2 text-primary" /> 
              Ordered on: {format(new Date(order.timestamp), 'PPP p')}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Tag className="w-4 h-4 mr-2 text-primary" /> 
              Type: {order.itemType === 'product' ? 'Product' : 'Service'}
            </div>
            <div className="flex items-center text-muted-foreground">
              <PackageOpen className="w-4 h-4 mr-2 text-primary" /> 
              Status: Mock Pickup Pending
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
              {/* 
                To re-open QR: Pass all necessary details for confirmation page.
                A simpler approach for this prototype is just to link to a generic confirmation page again
                or enhance confirmation page to lookup by orderId from localStorage.
                For now, we pass relevant params for the QR page.
              */}
              <Link href={`/confirmation?itemId=${order.itemId}&itemType=${order.itemType}&itemName=${encodeURIComponent(order.itemName)}&price=${order.itemPrice}&orderId=${order.orderId}`}>
                <QrCodeIcon className="w-4 h-4 mr-2" /> View Confirmation
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
