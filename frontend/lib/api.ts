import { supabase, ExtractedRecipe, RecipeWithDetails } from './supabase';

const EXTRACT_FUNCTION_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/extract-recipe`;
const GENERATE_FUNCTION_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-recipe`;

/**
 * Extract recipe from URL using the Supabase Edge Function
 */
export async function extractRecipe(url: string): Promise<ExtractedRecipe> {
  const response = await fetch(EXTRACT_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to extract recipe');
  }

  return response.json();
}

/**
 * Generate recipe from ingredients using AI
 */
export async function generateRecipe(ingredients: string[], preferences?: string): Promise<ExtractedRecipe> {
  const response = await fetch(GENERATE_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ ingredients, preferences }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate recipe');
  }

  return response.json();
}

/**
 * Save extracted recipe to database
 */
export async function saveRecipe(
  recipeData: ExtractedRecipe & { url?: string }, 
  rating?: number,
  sourceType: 'extracted' | 'generated' = 'extracted'
): Promise<string> {
  // 1. Insert recipe
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .insert({
      title: recipeData.title,
      description: recipeData.description,
      source_url: recipeData.url || null,
      rating: rating || null,
      source_type: sourceType,
    })
    .select()
    .single();

  if (recipeError) throw recipeError;

  // 2. Insert ingredients
  if (recipeData.ingredients && recipeData.ingredients.length > 0) {
    const ingredients = recipeData.ingredients.map((text, index) => ({
      recipe_id: recipe.id,
      ingredient_text: text,
      order_index: index + 1,
    }));

    const { error: ingredientsError } = await supabase
      .from('ingredients')
      .insert(ingredients);

    if (ingredientsError) throw ingredientsError;
  }

  // 3. Insert method steps
  if (recipeData.method && recipeData.method.length > 0) {
    const steps = recipeData.method.map((text, index) => ({
      recipe_id: recipe.id,
      step_number: index + 1,
      step_description: text,
    }));

    const { error: stepsError } = await supabase
      .from('method_steps')
      .insert(steps);

    if (stepsError) throw stepsError;
  }

  return recipe.id;
}

/**
 * Update recipe rating
 */
export async function updateRecipeRating(recipeId: string, rating: number): Promise<void> {
  const { error } = await supabase
    .from('recipes')
    .update({ rating })
    .eq('id', recipeId);

  if (error) throw error;
}

/**
 * Get all recipes
 */
export async function getAllRecipes(): Promise<RecipeWithDetails[]> {
  const { data, error } = await supabase
    .from('recipes_with_details')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get single recipe by ID
 */
export async function getRecipe(id: string): Promise<RecipeWithDetails> {
  const { data, error } = await supabase
    .from('recipes_with_details')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete recipe
 */
export async function deleteRecipe(id: string): Promise<void> {
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
