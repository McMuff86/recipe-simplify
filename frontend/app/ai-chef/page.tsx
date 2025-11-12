'use client';

import { useState } from 'react';
import { generateRecipe } from '@/lib/api';
import { ExtractedRecipe } from '@/lib/supabase';
import Link from 'next/link';
import RecipeDisplay from '@/components/RecipeDisplay';

export default function AIChefPage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipe, setRecipe] = useState<ExtractedRecipe | null>(null);

  const handleAddIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const generated = await generateRecipe(ingredients, preferences || undefined);
      setRecipe(generated);
    } catch (err: any) {
      setError(err.message || 'Failed to generate recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIngredients([]);
    setCurrentIngredient('');
    setPreferences('');
    setRecipe(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 mb-4">
            <span className="text-accent text-sm font-medium">✨ AI-Powered</span>
            <span className="text-text-secondary text-sm">Recipe Generator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">
            AI Chef
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Tell me what's in your fridge, and I'll create a delicious recipe for you!
          </p>
        </div>

        {!recipe ? (
          <>
            {/* Ingredient Input */}
            <div className="bg-surface border border-border rounded-xl p-6 mb-6">
              <label className="block text-sm font-medium text-text-primary mb-3">
                🛒 What ingredients do you have?
              </label>
              
              {/* Ingredient Chips */}
              {ingredients.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {ingredients.map((ing, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-text-primary px-3 py-1.5 rounded-lg text-sm"
                    >
                      <span>{ing}</span>
                      <button
                        onClick={() => handleRemoveIngredient(index)}
                        className="text-accent hover:text-accent-hover"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g. chicken, tomatoes, pasta..."
                  className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  disabled={loading}
                />
                <button
                  onClick={handleAddIngredient}
                  disabled={!currentIngredient.trim() || loading}
                  className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-2">
                Press Enter to add, or click the Add button
              </p>
            </div>

            {/* Preferences (Optional) */}
            <div className="bg-surface border border-border rounded-xl p-6 mb-6">
              <label className="block text-sm font-medium text-text-primary mb-3">
                💭 Any preferences? (optional)
              </label>
              <textarea
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="e.g. vegetarian, spicy, quick meal, Italian style..."
                rows={3}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                disabled={loading}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={loading || ingredients.length === 0}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-accent/20"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating magic...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Generate Recipe</span>
                  </>
                )}
              </button>
              {ingredients.length > 0 && (
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="px-6 py-4 bg-surface hover:bg-muted border border-border text-text-primary rounded-lg font-semibold transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Example Suggestions */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-text-secondary mb-3">💡 Example combinations:</p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  ['chicken', 'rice', 'broccoli'],
                  ['pasta', 'tomatoes', 'garlic'],
                  ['eggs', 'cheese', 'spinach']
                ].map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setIngredients(example)}
                    className="text-left p-3 bg-surface hover:bg-muted border border-border rounded-lg text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {example.join(', ')}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Recipe Display */
          <RecipeDisplay 
            recipe={recipe} 
            onReset={handleReset}
            sourceType="generated"
          />
        )}
      </div>
    </div>
  );
}

