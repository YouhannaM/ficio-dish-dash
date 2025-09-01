import { Recipe } from '@/types/recipe';

export const caesarSaladRecipe: Recipe = {
  id: 'caesar-salad',
  name: 'Caesar Salad',
  servings: 4,
  totalTime: 15,
  difficulty: 'Easy',
  ingredients: [
    { name: 'Romaine lettuce', weight: '2 heads (600g)', notes: 'Crisp, cold lettuce' },
    { name: 'Parmesan cheese', weight: '100g', notes: 'Freshly grated' },
    { name: 'Day-old bread', weight: '150g', notes: 'For croutons' },
    { name: 'Garlic', weight: '3 cloves (15g)', notes: 'Minced' },
    { name: 'Anchovies', weight: '4 fillets (20g)', notes: 'Optional' },
    { name: 'Egg yolk', weight: '1 large (20g)', notes: 'Room temperature' },
    { name: 'Lemon juice', weight: '60ml', notes: 'Fresh squeezed' },
    { name: 'Olive oil', weight: '120ml', notes: 'Extra virgin' },
    { name: 'Dijon mustard', weight: '5ml', notes: '1 tsp' },
    { name: 'Worcestershire sauce', weight: '5ml', notes: '1 tsp' },
    { name: 'Salt', weight: 'To taste', notes: 'Sea salt preferred' },
    { name: 'Black pepper', weight: 'To taste', notes: 'Freshly ground' }
  ],
  steps: [
    {
      id: 1,
      instruction: 'Preheat oven and prepare croutons. Cut day-old bread into 1cm cubes, toss with olive oil and minced garlic.',
      timeMinutes: 3,
      temperature: '200°C',
      notes: 'Use 2 tbsp olive oil and 1 clove garlic for croutons'
    },
    {
      id: 2,
      instruction: 'Bake croutons in preheated oven until golden brown and crispy.',
      timeMinutes: 8,
      temperature: '200°C',
      notes: 'Shake pan halfway through for even browning'
    },
    {
      id: 3,
      instruction: 'Wash romaine lettuce thoroughly, dry completely, and tear into bite-sized pieces.',
      timeMinutes: 2,
      notes: 'Pat dry with paper towels - wet lettuce will dilute dressing'
    },
    {
      id: 4,
      instruction: 'Make dressing: In a large bowl, mash anchovies and remaining garlic into a paste.',
      timeMinutes: 1,
      notes: 'Use the back of a spoon or fork'
    },
    {
      id: 5,
      instruction: 'Whisk egg yolk, lemon juice, Dijon mustard, and Worcestershire sauce into the anchovy paste.',
      timeMinutes: 1,
      notes: 'Whisk vigorously to emulsify'
    },
    {
      id: 6,
      instruction: 'Slowly drizzle in olive oil while whisking constantly to create a creamy emulsion.',
      timeMinutes: 2,
      notes: 'Add oil drop by drop at first, then in a thin stream'
    },
    {
      id: 7,
      instruction: 'Season dressing with salt and pepper to taste.',
      timeMinutes: 1,
      notes: 'Start with 1/4 tsp salt, adjust as needed'
    },
    {
      id: 8,
      instruction: 'Add lettuce to bowl with dressing and toss gently to coat evenly.',
      timeMinutes: 1,
      notes: 'Use clean hands for best mixing'
    },
    {
      id: 9,
      instruction: 'Add half the Parmesan cheese and croutons, toss again.',
      timeMinutes: 1,
      notes: 'Reserve remaining cheese and croutons for garnish'
    },
    {
      id: 10,
      instruction: 'Plate immediately and top with remaining Parmesan and croutons. Serve fresh.',
      timeMinutes: 1,
      notes: 'Serve on chilled plates for best presentation'
    }
  ],
  tips: [
    'Use only the freshest romaine lettuce for the best crunch',
    'Make sure lettuce is completely dry before dressing',
    'For food safety, use pasteurized eggs if serving to pregnant women or elderly',
    'Dressing can be made 2 hours ahead and refrigerated',
    'Add croutons just before serving to maintain crispness'
  ]
};