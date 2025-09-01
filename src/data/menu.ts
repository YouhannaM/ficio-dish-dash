import { MenuItemType } from '@/types/menu';
import caesarSaladImage from '@/assets/caesar-salad.jpg';
import burgerImage from '@/assets/burger.jpg';
import tacosImage from '@/assets/tacos.jpg';
import steakImage from '@/assets/steak.jpg';

export const menuItems: MenuItemType[] = [
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan cheese, croutons, and our signature Caesar dressing',
    price: 14.99,
    image: caesarSaladImage,
    category: 'Salads',
    ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
    customizableIngredients: ['Grilled chicken', 'Shrimp', 'Anchovies', 'Extra parmesan', 'Extra croutons']
  },
  {
    id: '2',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and pickles on a sesame bun',
    price: 18.99,
    image: burgerImage,
    category: 'Mains',
    ingredients: ['Beef patty', 'Sesame bun', 'Lettuce', 'Tomato', 'Cheese', 'Pickles'],
    customizableIngredients: ['Bacon', 'Avocado', 'Onion rings', 'Extra cheese', 'No pickles', 'No onions']
  },
  {
    id: '3',
    name: 'Street Tacos',
    description: 'Three corn tortillas filled with seasoned meat, onions, cilantro, and lime',
    price: 16.99,
    image: tacosImage,
    category: 'Mains',
    ingredients: ['Corn tortillas', 'Seasoned beef', 'White onions', 'Cilantro', 'Lime'],
    customizableIngredients: ['Chicken instead of beef', 'Fish instead of beef', 'Extra cilantro', 'Cheese', 'Sour cream', 'Guacamole']
  },
  {
    id: '4',
    name: 'Grilled Steak',
    description: 'Premium cut steak grilled to perfection, served with seasonal roasted vegetables',
    price: 28.99,
    image: steakImage,
    category: 'Mains',
    ingredients: ['Premium steak', 'Roasted vegetables', 'Herb butter'],
    customizableIngredients: ['Mashed potatoes', 'French fries', 'Side salad', 'Mushrooms', 'Peppercorn sauce']
  }
];