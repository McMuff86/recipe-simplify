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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Extract Recipe 🔍</h1>

        {/* URL Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleExtract}>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Website URL
            </label>
            <div className="flex gap-4">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.example.com/recipe"
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !url}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Extracting...' : 'Extract'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              ❌ {error}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Extracting recipe information...</p>
            <p className="text-gray-400 text-sm mt-2">This may take a few seconds</p>
          </div>
        )}

        {/* Extracted Recipe Display */}
        {recipe && !loading && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6">
              <h2 className="text-3xl font-bold text-white mb-2">{recipe.title}</h2>
              {recipe.description && (
                <p className="text-white/90 text-lg">{recipe.description}</p>
              )}
            </div>

            <div className="p-8">
              {/* Ingredients */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🛒 Ingredients
                </h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-purple-600 font-semibold">{index + 1}.</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Method */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  👨‍🍳 Method
                </h3>
                <ol className="space-y-4">
                  {recipe.method.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                  {saving ? 'Saving...' : '💾 Save to Collection'}
                </button>
                <button
                  onClick={() => {
                    setRecipe(null);
                    setUrl('');
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
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

