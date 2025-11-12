// Note: For client components, import from supabase-browser.ts
// This file only exports types

// Types for our database
export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  user_id: string | null;
  rating: number | null;
  source_type: 'extracted' | 'generated';
}

export interface Ingredient {
  id: string;
  recipe_id: string;
  ingredient_text: string;
  order_index: number;
  created_at: string;
}

export interface MethodStep {
  id: string;
  recipe_id: string;
  step_number: number;
  step_description: string;
  created_at: string;
}

export interface RecipeWithDetails extends Recipe {
  ingredients: Array<{
    id: string;
    text: string;
    order: number;
  }> | null;
  method_steps: Array<{
    id: string;
    step_number: number;
    description: string;
  }> | null;
  image_url?: string | null;
}

export interface ExtractedRecipe {
  title: string;
  description: string;
  ingredients: string[];
  method: string[];
}

