// Test script for Hot Wings Sauce Recipe
const SUPABASE_PROJECT_REF = 'lpxagwasrquoiknmkccw';
const FUNCTION_NAME = 'extract-recipe';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxweGFnd2FzcnF1b2lrbm1rY2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NzYxMTcsImV4cCI6MjA3ODU1MjExN30.8PasciJkQeH9Nap5D1RbUWFwgg1AcyArF6YLY2usP6E';

// Buffalo Hot Wings Sauce Recipe URL
const RECIPE_URL = 'https://www.allrecipes.com/recipe/219109/buffalo-chicken-wing-sauce/';

async function testHotWingsSauce() {
  console.log('Testing Hot Wings Sauce Recipe Extraction...');
  console.log('URL:', RECIPE_URL);
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
          url: RECIPE_URL
        })
      }
    );

    console.log('Response Status:', response.status);
    console.log('');

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS! Recipe extracted:');
      console.log('='.repeat(60));
      console.log('');
      console.log('📝 Title:', data.title);
      console.log('');
      console.log('💭 Description:', data.description);
      console.log('');
      console.log('🛒 Ingredients:');
      data.ingredients.forEach((ingredient, index) => {
        console.log(`   ${index + 1}. ${ingredient}`);
      });
      console.log('');
      console.log('👨‍🍳 Method:');
      data.method.forEach((step, index) => {
        console.log(`   ${index + 1}. ${step}`);
      });
      console.log('');
      console.log('='.repeat(60));
      
      return data;
    } else {
      console.log('❌ ERROR:', data.error);
      if (data.details) {
        console.log('Details:', data.details);
      }
      return null;
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
    return null;
  }
}

// Run the test
testHotWingsSauce().then((data) => {
  if (data) {
    console.log('\n✅ Test completed successfully!');
  } else {
    console.log('\n⚠️ Test failed - likely missing OpenAI API key');
    console.log('To fix: supabase secrets set OPENAI_API_KEY=your_key_here');
  }
});

