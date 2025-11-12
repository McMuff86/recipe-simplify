'use client';

import { useState } from 'react';
import { extractRecipe, saveRecipe } from '@/lib/api';
import { ExtractedRecipe } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ExtractPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipe, setRecipe] = useState<ExtractedRecipe | null>(null);
  const [saving, setSaving] = useState(false);

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const extracted = await extractRecipe(url);
      setRecipe(extracted);
    } catch (err: any) {
      setError(err.message || 'Failed to extract recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!recipe) return;

    setSaving(true);
    try {
      await saveRecipe({ ...recipe, url });
      router.push('/recipes');
    } catch (err: any) {
      setError('Failed to save recipe: ' + err.message);
    } finally {
      setSaving(false);
    }
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
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            {/* Recipe Header */}
            <div className="border-b border-border p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-2">{recipe.title}</h2>
              {recipe.description && (
                <p className="text-text-secondary">{recipe.description}</p>
              )}
            </div>

            <div className="p-6">
              {/* Ingredients */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-lg font-semibold text-text-primary">Ingredients</h3>
                  <span className="text-text-secondary text-sm">({recipe.ingredients.length})</span>
                </div>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3 text-text-primary bg-background border border-border rounded-lg p-3">
                      <span className="text-accent font-semibold min-w-[24px]">{index + 1}.</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Method */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <h3 className="text-lg font-semibold text-text-primary">Method</h3>
                  <span className="text-text-secondary text-sm">({recipe.method.length} steps)</span>
                </div>
                <ol className="space-y-3">
                  {recipe.method.map((step, index) => (
                    <li key={index} className="flex gap-4 bg-background border border-border rounded-lg p-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-text-primary pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-border">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold disabled:opacity-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  {saving ? 'Saving...' : 'Save to Collection'}
                </button>
                <button
                  onClick={() => {
                    setRecipe(null);
                    setUrl('');
                  }}
                  className="px-6 py-3 bg-surface hover:bg-muted border border-border text-text-primary rounded-lg font-semibold transition-colors"
                >
                  Extract Another
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
