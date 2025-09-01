import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold tracking-tight">FICIO</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#menu" className="text-sm font-medium transition-colors hover:text-primary">
            Menu
          </a>
          <a href="#about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </a>
          <a href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </a>
        </nav>

        <Button
          variant="outline"
          size="sm"
          onClick={onCartClick}
          className="relative"
        >
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};