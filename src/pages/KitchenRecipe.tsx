import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, ChefHat, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { caesarSaladRecipe } from '@/data/recipes';

const KitchenRecipe = () => {
  const { recipeId } = useParams();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // For now we only have Caesar salad, but this structure allows for future recipes
  const recipe = recipeId === 'caesar-salad' ? caesarSaladRecipe : null;

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Recipe Not Found</h1>
          <Link to="/">
            <Button variant="outline">Back to Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-secondary text-secondary-foreground';
      case 'Medium': return 'bg-muted text-muted-foreground';
      case 'Hard': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Menu</span>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-medium tracking-wide">FICIO KITCHEN</h1>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Recipe Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-medium">{recipe.name}</h1>
            <Badge className={getDifficultyColor(recipe.difficulty)}>
              {recipe.difficulty}
            </Badge>
          </div>
          
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{recipe.totalTime} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              <span>{recipe.difficulty} level</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <Card className="restaurant-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Ingredients & Weights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ingredient</TableHead>
                      <TableHead>Weight</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipe.ingredients.map((ingredient, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {ingredient.name}
                          {ingredient.notes && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {ingredient.notes}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {ingredient.weight}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <Card className="restaurant-card mt-6">
                <CardHeader>
                  <CardTitle>Pro Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recipe.tips.map((tip, index) => (
                    <div key={index} className="text-sm text-muted-foreground leading-relaxed">
                      • {tip}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Cooking Steps */}
          <div className="lg:col-span-2">
            <Card className="restaurant-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Cooking Instructions
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  Click on each step when completed
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <div key={step.id}>
                    <div 
                      className={`p-4 rounded-sm border transition-all duration-200 cursor-pointer ${
                        completedSteps.includes(step.id)
                          ? 'bg-secondary border-primary'
                          : 'bg-background border-border hover:border-muted-foreground'
                      }`}
                      onClick={() => toggleStep(step.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            completedSteps.includes(step.id)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {completedSteps.includes(step.id) ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              step.id
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {step.timeMinutes} min
                            </Badge>
                            {step.temperature && (
                              <Badge variant="outline" className="text-xs">
                                {step.temperature}
                              </Badge>
                            )}
                          </div>
                          
                          <p className={`text-sm leading-relaxed ${
                            completedSteps.includes(step.id) 
                              ? 'text-muted-foreground line-through' 
                              : 'text-foreground'
                          }`}>
                            {step.instruction}
                          </p>
                          
                          {step.notes && (
                            <div className="mt-2 text-xs text-muted-foreground italic">
                              💡 {step.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {index < recipe.steps.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-secondary rounded-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {completedSteps.length} of {recipe.steps.length} steps completed
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedSteps.length / recipe.steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KitchenRecipe;