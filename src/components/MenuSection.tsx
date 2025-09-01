import React from 'react';
import { MenuItemType } from '@/types/menu';
import { MenuItem } from './MenuItem';

interface MenuSectionProps {
  items: MenuItemType[];
  onCustomizeItem: (item: MenuItemType) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ items, onCustomizeItem }) => {
  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our signature dishes, each crafted with passion and the finest ingredients
          </p>
        </div>
        
        <div className="menu-grid max-w-6xl mx-auto">
          {items.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onCustomize={onCustomizeItem}
            />
          ))}
        </div>
      </div>
    </section>
  );
};