import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { ingredients, preferences } = await req.json()

    if (!ingredients || ingredients.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Ingredients are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Build prompt for OpenAI
    const ingredientsList = Array.isArray(ingredients) 
      ? ingredients.join(', ') 
      : ingredients;

    const prompt = `Create a delicious recipe using these ingredients: ${ingredientsList}

${preferences ? `Additional preferences: ${preferences}` : ''}

Please provide:
1. A creative recipe title
2. A short description (1-2 sentences)
3. Complete list of ingredients with quantities (including the mentioned ingredients)
4. Step-by-step cooking instructions

Return the response in JSON format with these keys:
{
  "title": "Recipe name",
  "description": "Short description",
  "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity", ...],
  "method": ["Step 1", "Step 2", ...]
}

Make it practical, tasty, and easy to follow!`;

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional chef and recipe creator. Create practical, delicious recipes based on available ingredients. Always return valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.8, // More creative
      }),
    })

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text()
      return new Response(
        JSON.stringify({ error: 'OpenAI API error', details: error }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const openaiData = await openaiResponse.json()
    const generatedRecipe = JSON.parse(openaiData.choices[0].message.content)

    return new Response(
      JSON.stringify({
        title: generatedRecipe.title || 'Delicious Recipe',
        description: generatedRecipe.description || 'A tasty dish made with your ingredients',
        ingredients: generatedRecipe.ingredients || [],
        method: generatedRecipe.method || []
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

