import React from 'react';
import { MenuItemType } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MenuItemProps {
  item: MenuItemType;
  onCustomize: (item: MenuItemType) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onCustomize }) => {
  return (
    <Card className="restaurant-card overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-medium">{item.name}</h3>
            <span className="text-lg font-semibold">${item.price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
        
        <div className="pt-2">
          <Button
            onClick={() => onCustomize(item)}
            className="w-full"
            variant="outline"
          >
            Customize & Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};