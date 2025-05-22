
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Order } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { QrCodeIcon, AlertTriangle, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function generateAlphanumericCode(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Simple SVG QR Code placeholder
function MockQrCode({ value }: { value: string }) {
  // Simple visual representation, not a real QR code.
  return (
    <div className="p-2 bg-white border rounded-lg shadow-md inline-block" aria-label={`QR Code for ${value}`}>
      <svg width="160" height="160" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="50" fill="white"/>
        {[...Array(10)].map((_, r) =>
          [...Array(10)].map((_, c) =>
            (Math.random() > 0.4) && !( (r<3 && c<3) || (r<3 && c>6) || (r>6 && c<3) ) ? ( // Basic positioning for "eyes"
              <rect key={`${r}-${c}`} x={c*5} y={r*5} width="5" height="5" fill="black"/>
            ) : null
          )
        )}
        {/* Basic finder patterns */}
        <rect x="0" y="0" width="15" height="15" fill="black"/>
        <rect x="5" y="5" width="5" height="5" fill="white"/>
        <rect x="35" y="0" width="15" height="15" fill="black"/>
        <rect x="40" y="5" width="5" height="5" fill="white"/>
        <rect x="0" y="35" width="15" height="15" fill="black"/>
        <rect x="5" y="40" width="5" height="5" fill="white"/>
      </svg>
    </div>
  );
}


function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const itemId = searchParams.get('itemId');
    const itemType = searchParams.get('itemType') as 'product' | 'service' | null;
    const itemName = searchParams.get('itemName');
    const priceStr = searchParams.get('price');

    if (!itemId || !itemType || !itemName || !priceStr) {
      setError('Missing order details in URL. Please try again.');
      return;
    }

    const price = parseFloat(priceStr);
    if (isNaN(price)) {
      setError('Invalid price format. Please try again.');
      return;
    }

    const existingOrder = orders.find(o => 
      o.itemId === itemId && 
      o.itemType === itemType &&
      (Date.now() - o.timestamp < 5 * 60 * 1000) // Check if a similar order was placed in last 5 mins
    );

    if (existingOrder) {
      setCurrentOrder(existingOrder);
    } else {
      const orderId = `ORD-${Date.now()}-${generateAlphanumericCode(4)}`;
      const timestamp = Date.now();
      const buyerId = 'AutoDinarUser001'; // Mock buyer ID
      const confirmationCode = generateAlphanumericCode(6);
      const qrCodeValue = `AUTODINAR_ORDER:${orderId}|ITEM:${itemId}|BUYER:${buyerId}`;

      const newOrder: Order = {
        orderId,
        itemId,
        itemType,
        itemName,
        itemPrice: price,
        timestamp,
        buyerId,
        qrCodeValue,
        confirmationCode,
      };
      
      setOrders(prevOrders => [...prevOrders, newOrder]);
      setCurrentOrder(newOrder);
    }
  }, [searchParams, orders, setOrders]);

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto text-center shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-destructive flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 mr-2" /> Order Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!currentOrder) {
    return (
      <Card className="w-full max-w-md mx-auto text-center shadow-xl">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-40 w-40 rounded-lg" />
            <Skeleton className="h-10 w-1/2" />
          </div>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto text-center shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">Purchase Confirmed!</CardTitle>
        <CardDescription className="text-lg">Thank you for your order of {currentOrder.itemName}.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Scan this QR code at the store:</p>
          <MockQrCode value={currentOrder.qrCodeValue} />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Or provide this confirmation code:</p>
          <p className="text-4xl font-mono font-bold tracking-wider p-3 bg-primary text-primary-foreground rounded-lg inline-block shadow-sm">
            {currentOrder.confirmationCode}
          </p>
        </div>

        <div className="p-4 border border-primary/30 bg-primary/5 rounded-lg text-left">
            <h3 className="font-semibold text-primary mb-2 flex items-center"><Info className="w-5 h-5 mr-2"/>Pickup Instructions:</h3>
            <ul className="list-disc list-inside text-sm text-foreground space-y-1">
              <li>Visit the store: {currentOrder.itemType === 'product' ? 'the parts supplier' : 'the service center'}.</li>
              <li>Show this confirmation page to the store owner.</li>
              <li>They will scan the QR code or enter the confirmation code to complete your pickup/service.</li>
            </ul>
        </div>
        <p className="text-xs text-muted-foreground">Order ID: {currentOrder.orderId}</p>
      </CardContent>
    </Card>
  );
}

export default function ConfirmationClient() {
  return (
    // Suspense is required by Next.js when using useSearchParams client-side during SSR
    <Suspense fallback={
      <Card className="w-full max-w-md mx-auto text-center shadow-xl">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-40 w-40 rounded-lg" />
            <Skeleton className="h-10 w-1/2" />
          </div>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
