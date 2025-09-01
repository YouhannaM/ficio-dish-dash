import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, User, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Order confirmed!",
      description: "Your order has been placed successfully. Estimated delivery: 30-45 minutes.",
    });

    clearCart();
    setIsProcessing(false);
    onClose();
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">Checkout</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Order Summary
            </h3>
            
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                    {item.customizations.length > 0 && (
                      <div className="mt-1">
                        <p className="text-xs text-muted-foreground">
                          + {item.customizations.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main St, City, State 12345"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!isFormValid || isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};