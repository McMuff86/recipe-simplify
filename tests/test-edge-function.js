// Test script for Recipe Extraction Edge Function

const SUPABASE_PROJECT_REF = 'lpxagwasrquoiknmkccw';
const FUNCTION_NAME = 'extract-recipe';

// Replace with your Supabase anon key
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Test recipe URL - replace with actual recipe URL
const TEST_RECIPE_URL = 'https://www.allrecipes.com/recipe/16354/easy-meatloaf/';

async function testRecipeExtraction() {
  console.log('Testing Recipe Extraction Edge Function...');
  console.log('URL:', TEST_RECIPE_URL);
  console.log('');

  try {
    const response = await fetch(
      `https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/${FUNCTION_NAME}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          url: TEST_RECIPE_URL
        })
      }
    );

    console.log('Status:', response.status);
    console.log('');

    const data = await response.json();
    
    if (response.ok) {
      console.log('✓ Success!');
      console.log('');
      console.log('Recipe Details:');
      console.log('===============');
      console.log('');
      console.log('Title:', data.title);
      console.log('');
      console.log('Description:', data.description);
      console.log('');
      console.log('Ingredients:');
      data.ingredients.forEach((ingredient, index) => {
        console.log(`  ${index + 1}. ${ingredient}`);
      });
      console.log('');
      console.log('Method:');
      data.method.forEach((step, index) => {
        console.log(`  ${index + 1}. ${step}`);
      });
    } else {
      console.log('✗ Error:', data.error);
      if (data.details) {
        console.log('Details:', data.details);
      }
    }
  } catch (error) {
    console.error('✗ Request failed:', error.message);
  }
}

// Run the test
testRecipeExtraction();

