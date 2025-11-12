'use client';

import { useState } from 'react';
import { extractRecipe } from '@/lib/api';
import { ExtractedRecipe } from '@/lib/supabase';
import RecipeDisplay from '@/components/RecipeDisplay';

export default function ExtractPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipe, setRecipe] = useState<ExtractedRecipe | null>(null);
  const [extractedUrl, setExtractedUrl] = useState('');

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const extracted = await extractRecipe(url);
      setRecipe(extracted);
      setExtractedUrl(url);
    } catch (err: any) {
      setError(err.message || 'Failed to extract recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRecipe(null);
    setUrl('');
    setExtractedUrl('');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Extract Recipe</h1>
          <p className="text-text-secondary">
            Paste a recipe URL and let AI extract the details for you
          </p>
        </div>

        {/* URL Input Form */}
        <div className="bg-surface border border-border rounded-xl p-6 mb-8">
          <form onSubmit={handleExtract}>
            <label htmlFor="url" className="block text-sm font-medium text-text-primary mb-2">
              Recipe Website URL
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.example.com/recipe"
                required
                className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !url}
                className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Extracting...' : 'Extract'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-surface border border-border rounded-xl p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
            <p className="text-text-primary font-medium">Extracting recipe information...</p>
            <p className="text-text-secondary text-sm mt-2">This may take a few seconds</p>
          </div>
        )}

        {/* Extracted Recipe Display */}
        {recipe && !loading && (
          <RecipeDisplay 
            recipe={recipe} 
            onReset={handleReset}
            sourceType="extracted"
            url={extractedUrl}
          />
        )}
      </div>
    </div>
  );
}
