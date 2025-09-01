import React from 'react';
import { useCart } from '@/contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  onCheckout,
}) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button onClick={onClose} variant="outline">
                Continue Shopping
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({cartItems.length} items)</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="space-y-3">
              <div className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    ${item.price.toFixed(2)} each
                  </p>
                  
                  {item.customizations.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium">Customizations:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.customizations.map((customization, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-muted rounded-full"
                          >
                            {customization}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
            </div>
          ))}
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <Button onClick={onCheckout} className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};