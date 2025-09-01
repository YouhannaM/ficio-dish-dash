export interface RecipeIngredient {
  name: string;
  weight: string;
  notes?: string;
}

export interface RecipeStep {
  id: number;
  instruction: string;
  timeMinutes: number;
  temperature?: string;
  notes?: string;
}

export interface Recipe {
  id: string;
  name: string;
  servings: number;
  totalTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips?: string[];
}