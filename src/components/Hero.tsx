import React from 'react';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-background to-muted/50">
      <div className="container px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            FICIO
          </h1>
          <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Contemporary dining experience featuring carefully crafted dishes made with the finest ingredients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              onClick={scrollToMenu}
              className="hero-button"
              size="lg"
            >
              View Menu
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Make Reservation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};