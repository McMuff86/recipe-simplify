// Example: Extract and Save Recipe to Database
// This script demonstrates the complete workflow:
// 1. Call the extract-recipe edge function
// 2. Save the extracted recipe to the database

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lpxagwasrquoiknmkccw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxweGFnd2FzcnF1b2lrbm1rY2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NzYxMTcsImV4cCI6MjA3ODU1MjExN30.8PasciJkQeH9Nap5D1RbUWFwgg1AcyArF6YLY2usP6E';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Extract recipe from URL using the edge function
 */
async function extractRecipe(url) {
  console.log('📡 Extracting recipe from:', url);
  
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/extract-recipe`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ url })
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Extraction failed: ${error.error}`);
  }

  const data = await response.json();
  console.log('✅ Recipe extracted successfully');
  return data;
}

/**
 * Save extracted recipe to database
 */
async function saveRecipe(recipeData) {
  console.log('💾 Saving recipe to database...');

  // 1. Insert recipe
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .insert({
      title: recipeData.title,
      description: recipeData.description,
      source_url: recipeData.url || null,
    })
    .select()
    .single();

  if (recipeError) {
    throw new Error(`Failed to save recipe: ${recipeError.message}`);
  }

  console.log('  ✓ Recipe saved:', recipe.id);

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

    if (ingredientsError) {
      throw new Error(`Failed to save ingredients: ${ingredientsError.message}`);
    }

    console.log(`  ✓ ${ingredients.length} ingredients saved`);
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

    if (stepsError) {
      throw new Error(`Failed to save method steps: ${stepsError.message}`);
    }

    console.log(`  ✓ ${steps.length} method steps saved`);
  }

  return recipe.id;
}

/**
 * Get recipe with all details from database
 */
async function getRecipe(recipeId) {
  const { data, error } = await supabase
    .from('recipes_with_details')
    .select('*')
    .eq('id', recipeId)
    .single();

  if (error) {
    throw new Error(`Failed to get recipe: ${error.message}`);
  }

  return data;
}

/**
 * Complete workflow: Extract and Save
 */
async function extractAndSaveRecipe(url) {
  try {
    console.log('🍳 Starting recipe extraction and save workflow');
    console.log('='.repeat(60));
    console.log('');

    // Step 1: Extract recipe
    const extractedData = await extractRecipe(url);
    extractedData.url = url; // Add URL for saving

    console.log('');
    console.log('📋 Extracted Recipe:');
    console.log('  Title:', extractedData.title);
    console.log('  Ingredients:', extractedData.ingredients.length);
    console.log('  Steps:', extractedData.method.length);
    console.log('');

    // Step 2: Save to database
    const recipeId = await saveRecipe(extractedData);
    
    console.log('');
    console.log('✅ Recipe saved successfully!');
    console.log('   Recipe ID:', recipeId);
    console.log('');

    // Step 3: Retrieve and display
    console.log('📖 Retrieving complete recipe from database...');
    const savedRecipe = await getRecipe(recipeId);

    console.log('');
    console.log('='.repeat(60));
    console.log('📝 COMPLETE RECIPE FROM DATABASE');
    console.log('='.repeat(60));
    console.log('');
    console.log('Title:', savedRecipe.title);
    console.log('Description:', savedRecipe.description);
    console.log('Source:', savedRecipe.source_url);
    console.log('');
    console.log('Ingredients:');
    savedRecipe.ingredients?.forEach((ing) => {
      console.log(`  ${ing.order}. ${ing.text}`);
    });
    console.log('');
    console.log('Method:');
    savedRecipe.method_steps?.forEach((step) => {
      console.log(`  ${step.step_number}. ${step.description}`);
    });
    console.log('');
    console.log('='.repeat(60));

    return recipeId;

  } catch (error) {
    console.error('');
    console.error('❌ Error:', error.message);
    console.error('');
    throw error;
  }
}

// Example usage
if (import.meta.url === `file://${process.argv[1]}`) {
  // Get URL from command line or use default
  const url = process.argv[2] || 'https://www.allrecipes.com/recipe/219109/buffalo-chicken-wing-sauce/';
  
  extractAndSaveRecipe(url)
    .then((recipeId) => {
      console.log('✅ Success! Recipe ID:', recipeId);
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Failed:', error.message);
      process.exit(1);
    });
}

// Export functions for use in other modules
export {
  extractRecipe,
  saveRecipe,
  getRecipe,
  extractAndSaveRecipe
};

