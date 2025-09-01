import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, MenuItemType } from '@/types/menu';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItemType, customizations: string[]) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItemType, customizations: string[]) => {
    setCartItems(prev => {
      const existingItem = prev.find(
        cartItem => cartItem.id === item.id && 
        JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
      );

      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id && 
          JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity: 1, customizations }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};