'use client';

import { useState } from 'react';
import { ExtractedRecipe } from '@/lib/supabase';
import { saveRecipe, uploadRecipeImage } from '@/lib/api';
import { useRouter } from 'next/navigation';
import StarRating from './StarRating';
import ImageUpload from './ImageUpload';

interface RecipeDisplayProps {
  recipe: ExtractedRecipe;
  onReset: () => void;
  sourceType: 'extracted' | 'generated';
  url?: string;
}

export default function RecipeDisplay({ recipe, onReset, sourceType, url }: RecipeDisplayProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [showRating, setShowRating] = useState(sourceType === 'generated');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSave = async () => {
    setSaving(true);
    try {
      // First save the recipe
      const recipeId = await saveRecipe(
        { ...recipe, url }, 
        rating || undefined,
        sourceType
      );
      
      // Upload image if selected
      if (selectedImage) {
        await uploadRecipeImage(selectedImage, recipeId);
      }
      
      router.push('/recipes');
    } catch (err: any) {
      alert('Failed to save recipe: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {sourceType === 'generated' && (
                <span className="inline-flex items-center gap-1 bg-accent/10 border border-accent/20 text-accent px-2 py-1 rounded text-xs font-medium">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Generated
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">{recipe.title}</h2>
            {recipe.description && (
              <p className="text-text-secondary">{recipe.description}</p>
            )}
          </div>
        </div>
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

        {/* Image Upload */}
        <div className="mb-8">
          <ImageUpload onImageChange={setSelectedImage} />
        </div>

        {/* Rating (for generated recipes) */}
        {showRating && (
          <div className="mb-8 p-4 bg-muted border border-border rounded-lg">
            <label className="block text-sm font-medium text-text-primary mb-3">
              ⭐ Rate this recipe (optional)
            </label>
            <div className="flex items-center gap-4">
              <StarRating value={rating} onChange={setRating} />
              {rating && (
                <span className="text-text-secondary text-sm">
                  {rating === 5 ? 'Amazing!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Okay' : 'Not great'}
                </span>
              )}
            </div>
            <p className="text-xs text-text-secondary mt-2">
              Help yourself remember if this recipe is worth cooking again
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
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
            onClick={onReset}
            className="px-6 py-3 bg-surface hover:bg-muted border border-border text-text-primary rounded-lg font-semibold transition-colors"
          >
            {sourceType === 'generated' ? 'Create Another' : 'Extract Another'}
          </button>
        </div>
      </div>
    </div>
  );
}

