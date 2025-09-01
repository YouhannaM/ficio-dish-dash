import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { CustomizeModal } from '@/components/CustomizeModal';
import { CartSidebar } from '@/components/CartSidebar';
import { CheckoutModal } from '@/components/CheckoutModal';
import { menuItems } from '@/data/menu';
import { MenuItemType } from '@/types/menu';

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCustomizeItem = (item: MenuItemType) => {
    setSelectedItem(item);
    setIsCustomizeModalOpen(true);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCloseCustomizeModal = () => {
    setIsCustomizeModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={handleCartClick} />
      <Hero />
      <MenuSection items={menuItems} onCustomizeItem={handleCustomizeItem} />
      
      <CustomizeModal
        item={selectedItem}
        isOpen={isCustomizeModalOpen}
        onClose={handleCloseCustomizeModal}
      />
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default Index;
