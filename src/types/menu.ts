export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  customizableIngredients: string[];
}

export interface CartItem extends MenuItemType {
  quantity: number;
  customizations: string[];
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}