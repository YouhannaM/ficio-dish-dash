import React, { useState } from 'react';
import { MenuItemType } from '@/types/menu';
import { useCart } from '@/contexts/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomizeModalProps {
  item: MenuItemType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const handleCustomizationChange = (customization: string, checked: boolean) => {
    setSelectedCustomizations(prev =>
      checked
        ? [...prev, customization]
        : prev.filter(c => c !== customization)
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item, selectedCustomizations);
    }
    
    toast({
      title: "Added to cart",
      description: `${quantity}x ${item.name} added to your cart`,
    });
    
    setSelectedCustomizations([]);
    setQuantity(1);
    onClose();
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">{item.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-sm"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-muted-foreground">{item.description}</p>
            <p className="text-2xl font-semibold">${item.price.toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Included Ingredients:</h4>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="px-3 py-1 bg-muted rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {item.customizableIngredients.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Customize Your Order:</h4>
              <div className="space-y-3">
                {item.customizableIngredients.map((customization) => (
                  <div key={customization} className="flex items-center space-x-3">
                    <Checkbox
                      id={customization}
                      checked={selectedCustomizations.includes(customization)}
                      onCheckedChange={(checked) =>
                        handleCustomizationChange(customization, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={customization}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {customization}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-4 border-t">
            <div className="flex items-center space-x-3">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-semibold">
                Total: ${(item.price * quantity).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAddToCart} className="flex-1">
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};