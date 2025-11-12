import { ExtractedRecipe, RecipeWithDetails } from './supabase';
import { createClient } from './supabase-browser';

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
  recipeData: ExtractedRecipe & { url?: string; imageUrl?: string }, 
  rating?: number,
  sourceType: 'extracted' | 'generated' = 'extracted'
): Promise<string> {
  const supabase = createClient();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // 1. Insert recipe
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .insert({
      title: recipeData.title,
      description: recipeData.description,
      source_url: recipeData.url || null,
      rating: rating || null,
      source_type: sourceType,
      user_id: user.id,
      image_url: recipeData.imageUrl || null,
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
 * Upload recipe image to storage
 */
export async function uploadRecipeImage(file: File, recipeId: string): Promise<string> {
  const supabase = createClient();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // Create unique file path: userId/recipeId/filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}/${recipeId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('recipe-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) throw uploadError;

  // Get public URL
  const { data } = supabase.storage
    .from('recipe-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

/**
 * Delete recipe image from storage
 */
export async function deleteRecipeImage(imageUrl: string): Promise<void> {
  const supabase = createClient();
  
  // Extract file path from URL
  const url = new URL(imageUrl);
  const pathParts = url.pathname.split('/');
  const filePath = pathParts.slice(pathParts.indexOf('recipe-images') + 1).join('/');

  const { error } = await supabase.storage
    .from('recipe-images')
    .remove([filePath]);

  if (error) throw error;
}

/**
 * Update recipe rating
 */
export async function updateRecipeRating(recipeId: string, rating: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('recipes')
    .update({ rating })
    .eq('id', recipeId);

  if (error) throw error;
}

/**
 * Update recipe image
 */
export async function updateRecipeImage(recipeId: string, imageUrl: string): Promise<void> {
  const supabase = createClient();
  
  console.log('updateRecipeImage called with:', { recipeId, imageUrl });
  
  const { data, error } = await supabase
    .from('recipes')
    .update({ image_url: imageUrl })
    .eq('id', recipeId)
    .select();

  console.log('Update result:', { data, error });

  if (error) {
    console.error('Update error:', error);
    throw error;
  }
}

/**
 * Get all recipes for current user
 */
export async function getAllRecipes(): Promise<RecipeWithDetails[]> {
  const supabase = createClient();
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
  const supabase = createClient();
  const { data, error } = await supabase
    .from('recipes_with_details')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete recipe (and its image if exists)
 */
export async function deleteRecipe(id: string): Promise<void> {
  const supabase = createClient();
  
  // Get recipe to check for image
  const { data: recipe } = await supabase
    .from('recipes')
    .select('image_url')
    .eq('id', id)
    .single();

  // Delete image if exists
  if (recipe?.image_url) {
    try {
      await deleteRecipeImage(recipe.image_url);
    } catch (err) {
      console.error('Failed to delete image:', err);
      // Continue with recipe deletion even if image deletion fails
    }
  }

  // Delete recipe (cascades to ingredients and method_steps)
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
