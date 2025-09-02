import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, ChefHat, CheckCircle, Thermometer, Camera, Wifi, Activity, AlertTriangle } from 'lucide-react';
import lettuceAnalysisImage from '@/assets/lettuce-analysis.jpg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { caesarSaladRecipe } from '@/data/recipes';

const KitchenRecipe = () => {
  const { recipeId } = useParams();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [iotData, setIotData] = useState({
    temperature: 72,
    humidity: 45,
    weightScale: 0,
    ovenTemp: 0,
    aiAnalysis: 'Ready to begin',
    cameraStatus: 'Active',
    lastUpdate: new Date(),
    ingredientTemps: {
      lettuce: 38,
      parmesan: 42,
      croutons: 68,
      anchovies: 36,
      dressing: 40
    },
    lettuceAnalysis: {
      freshness: 95,
      color: 'Vibrant green',
      texture: 'Crisp and firm',
      cutQuality: 'Uniform 1-inch pieces',
      contamination: 'None detected',
      defects: [],
      overallGrade: 'A'
    }
  });

  // Simulate real-time IoT data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIotData(prev => ({
        ...prev,
        temperature: Math.round((prev.temperature + (Math.random() - 0.5) * 2) * 10) / 10,
        humidity: Math.max(35, Math.min(65, prev.humidity + (Math.random() - 0.5) * 5)),
        weightScale: Math.max(0, prev.weightScale + (Math.random() - 0.3) * 10),
        ovenTemp: completedSteps.length > 0 ? Math.random() * 400 + 200 : 0,
        aiAnalysis: getAIAnalysis(completedSteps.length),
        cameraStatus: Math.random() > 0.95 ? 'Reconnecting...' : 'Active',
        lastUpdate: new Date(),
        ingredientTemps: {
          lettuce: Math.round((38 + (Math.random() - 0.5) * 4) * 10) / 10,
          parmesan: Math.round((42 + (Math.random() - 0.5) * 6) * 10) / 10,
          croutons: Math.round((68 + (Math.random() - 0.5) * 8) * 10) / 10,
          anchovies: Math.round((36 + (Math.random() - 0.5) * 4) * 10) / 10,
          dressing: Math.round((40 + (Math.random() - 0.5) * 6) * 10) / 10
        },
        lettuceAnalysis: {
          freshness: Math.max(85, Math.min(98, prev.lettuceAnalysis.freshness + (Math.random() - 0.5) * 2)),
          color: Math.random() > 0.9 ? 'Good green' : 'Vibrant green',
          texture: Math.random() > 0.8 ? 'Firm' : 'Crisp and firm',
          cutQuality: getLettuceQuality(completedSteps.length),
          contamination: Math.random() > 0.95 ? 'Minor debris detected' : 'None detected',
          defects: getDetectedDefects(),
          overallGrade: getOverallGrade()
        }
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [completedSteps]);

  const getLettuceQuality = (step: number): string => {
    if (step === 0) return 'Whole leaves detected';
    if (step === 1) return 'Cutting in progress';
    if (step >= 2) return 'Uniform 1-inch pieces';
    return 'Ready for prep';
  };

  const getDetectedDefects = (): string[] => {
    const possibleDefects = [
      'Color mismatch detected in 3 leaves',
      'Minor browning on leaf edges',
      'Inconsistent leaf thickness',
      'Small brown spots identified'
    ];
    
    // Randomly add defects
    const defects = [];
    if (Math.random() > 0.7) defects.push(possibleDefects[0]); // Color mismatch
    if (Math.random() > 0.85) defects.push(possibleDefects[1]); // Browning
    if (Math.random() > 0.9) defects.push(possibleDefects[2]); // Thickness
    if (Math.random() > 0.95) defects.push(possibleDefects[3]); // Spots
    
    return defects;
  };

  const getOverallGrade = (): string => {
    const rand = Math.random();
    if (rand > 0.8) return 'A';
    if (rand > 0.6) return 'B';
    if (rand > 0.4) return 'C';
    return 'B'; // Default to B for demo
  };

  const getAIAnalysis = (completedSteps: number): string => {
    const analyses = [
      'Ready to begin',
      'Ingredients prepared correctly',
      'Lettuce chopping detected - Good knife technique',
      'Dressing consistency optimal',
      'Plating in progress - Good presentation',
      'Dish completed successfully'
    ];
    return analyses[Math.min(completedSteps, analyses.length - 1)];
  };
  
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
              <h1 className="text-2xl font-medium tracking-wide">Inteli Kitchen</h1>
              <p className="text-xs text-muted-foreground mt-1">Employee Access Only</p>
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

        {/* Real-time Telemetry Dashboard */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="restaurant-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Kitchen Temp</span>
                </div>
                <span className="text-lg font-mono">{iotData.temperature}°F</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">Humidity: {iotData.humidity}%</div>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Scale Reading</span>
                </div>
                <span className="text-lg font-mono">{iotData.weightScale.toFixed(1)}g</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">Real-time weight</div>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">AI Vision</span>
                </div>
                <div className={`h-2 w-2 rounded-full ${iotData.cameraStatus === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{iotData.cameraStatus}</div>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">IoT Status</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-muted-foreground mt-1">All systems online</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Analysis Panel */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="restaurant-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-purple-500" />
                Live Lettuce Analysis
                <div className={`h-2 w-2 rounded-full ml-auto ${
                  iotData.lettuceAnalysis.defects.length > 0 ? 'bg-yellow-500' : 'bg-green-500'
                } animate-pulse`} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Live Camera Feed */}
              <div className="relative rounded-sm overflow-hidden border">
                <img 
                  src={lettuceAnalysisImage} 
                  alt="Live lettuce analysis" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  LIVE FEED • {iotData.lastUpdate.toLocaleTimeString()}
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  Grade: {iotData.lettuceAnalysis.overallGrade}
                </div>
                
                {/* Defect Overlays */}
                {iotData.lettuceAnalysis.defects.length > 0 && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-yellow-500/90 text-black px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {iotData.lettuceAnalysis.defects.length} defect(s) detected
                    </div>
                  </div>
                )}
              </div>

              {/* Analysis Data */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Freshness:</span>
                  <div className="font-mono text-green-600">{iotData.lettuceAnalysis.freshness.toFixed(1)}%</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Color:</span>
                  <div className="font-medium">{iotData.lettuceAnalysis.color}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Texture:</span>
                  <div className="font-medium">{iotData.lettuceAnalysis.texture}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Cut Quality:</span>
                  <div className="font-medium">{iotData.lettuceAnalysis.cutQuality}</div>
                </div>
              </div>

              {/* Defect Details */}
              {iotData.lettuceAnalysis.defects.length > 0 && (
                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium text-sm">Detected Issues:</span>
                  </div>
                  <div className="space-y-1">
                    {iotData.lettuceAnalysis.defects.map((defect, index) => (
                      <div key={index} className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1 rounded">
                        • {defect}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t">
                <span className="text-muted-foreground text-sm">Contamination: </span>
                <span className={`font-medium text-sm ${
                  iotData.lettuceAnalysis.contamination === 'None detected' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {iotData.lettuceAnalysis.contamination}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="restaurant-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-blue-500" />
                Ingredient Temperatures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(iotData.ingredientTemps).map(([ingredient, temp]) => (
                <div key={ingredient} className="flex items-center justify-between">
                  <span className="capitalize text-sm font-medium">{ingredient}:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{temp}°F</span>
                    <div className={`h-2 w-2 rounded-full ${
                      temp < 40 ? 'bg-blue-500' : temp < 50 ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t text-xs text-muted-foreground">
                Last update: {iotData.lastUpdate.toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>
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
                      className={`p-4 rounded-sm border transition-all duration-200 cursor-pointer relative ${
                        completedSteps.includes(step.id)
                          ? 'bg-secondary border-primary'
                          : 'bg-background border-border hover:border-muted-foreground'
                      }`}
                      onClick={() => toggleStep(step.id)}
                    >
                      {/* IoT Indicator */}
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground">Live</span>
                      </div>
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