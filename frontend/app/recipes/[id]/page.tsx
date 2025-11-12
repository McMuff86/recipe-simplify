'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getRecipe, deleteRecipe } from '@/lib/api';
import { RecipeWithDetails } from '@/lib/supabase';
import StarRating from '@/components/StarRating';
import ImageUpload from '@/components/ImageUpload';
import { updateRecipeRating } from '@/lib/api';
import Link from 'next/link';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.id as string;

  const [recipe, setRecipe] = useState<RecipeWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [updatingRating, setUpdatingRating] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);

  useEffect(() => {
    loadRecipe();
  }, [recipeId]);

  const loadRecipe = async () => {
    try {
      const data = await getRecipe(recipeId);
      setRecipe(data);
      setRating(data.rating || null);
    } catch (err: any) {
      setError(err.message || 'Failed to load recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = async (newRating: number) => {
    setRating(newRating);
    setUpdatingRating(true);
    try {
      await updateRecipeRating(recipeId, newRating);
      if (recipe) {
        setRecipe({ ...recipe, rating: newRating });
      }
    } catch (err) {
      alert('Failed to update rating');
      setRating(recipe?.rating || null);
    } finally {
      setUpdatingRating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    setDeleting(true);
    try {
      await deleteRecipe(recipeId);
      router.push('/recipes');
    } catch (err: any) {
      alert('Failed to delete recipe: ' + err.message);
      setDeleting(false);
    }
  };

  const handleImageUploaded = async (imageUrl: string) => {
    if (recipe) {
      setRecipe({ ...recipe, image_url: imageUrl });
    }
    // Show success message
    setImageSuccess(true);
    setTimeout(() => setImageSuccess(false), 3000);
    
    // Reload recipe to ensure we have the latest data
    await loadRecipe();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
            <p className="text-text-primary font-medium">Loading recipe...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-error/10 border border-error/20 rounded-xl p-8 text-center">
            <p className="text-error font-medium mb-4">{error || 'Recipe not found'}</p>
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors"
            >
              ← Back to Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <Link
            href="/recipes"
            onClick={() => window.location.href = '/recipes'} // Force full page reload
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Collection
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-4 py-2 bg-error/10 hover:bg-error/20 border border-error/20 text-error rounded-lg transition-colors disabled:opacity-50 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {deleting ? 'Deleting...' : 'Delete Recipe'}
          </button>
        </div>

        {/* Recipe Card */}
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {/* Image Section */}
          <div className="p-6 border-b border-border">
            {imageSuccess && (
              <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-lg text-accent text-sm flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Image saved successfully!</span>
              </div>
            )}
            <ImageUpload
              recipeId={recipeId}
              currentImageUrl={recipe.image_url}
              onImageUploaded={handleImageUploaded}
            />
            <p className="mt-2 text-xs text-text-secondary">
              💡 Your image is saved automatically when uploaded
            </p>
          </div>

          {/* Title & Badges */}
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between gap-3 mb-4">
              <h1 className="text-3xl font-bold text-text-primary flex-1">{recipe.title}</h1>
              {recipe.source_type === 'generated' && (
                <span className="flex-shrink-0 inline-flex items-center gap-1 bg-accent/10 border border-accent/20 text-accent px-3 py-1 rounded text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Generated
                </span>
              )}
            </div>

            {recipe.description && (
              <p className="text-text-secondary mb-4">{recipe.description}</p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-4">
              <StarRating value={rating} onChange={handleRatingChange} size="md" />
              {rating && (
                <span className="text-sm text-text-secondary">
                  {rating === 5 ? 'Amazing!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Okay' : 'Meh'}
                </span>
              )}
              {updatingRating && (
                <span className="text-xs text-text-secondary">Saving...</span>
              )}
            </div>

            {/* Source URL */}
            {recipe.source_url && (
              <a
                href={recipe.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-hover text-sm mt-4 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Original Source
              </a>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Ingredients */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h2 className="text-xl font-semibold text-text-primary">Ingredients</h2>
                <span className="text-text-secondary text-sm">
                  ({recipe.ingredients?.length || 0})
                </span>
              </div>
              <ul className="space-y-2">
                {recipe.ingredients?.map((ing) => (
                  <li key={ing.id} className="flex items-start gap-3 text-text-primary bg-background border border-border rounded-lg p-3">
                    <span className="text-accent font-semibold min-w-[24px]">{ing.order}.</span>
                    <span>{ing.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Method */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <h2 className="text-xl font-semibold text-text-primary">Method</h2>
                <span className="text-text-secondary text-sm">
                  ({recipe.method_steps?.length || 0} steps)
                </span>
              </div>
              <ol className="space-y-3">
                {recipe.method_steps?.map((step) => (
                  <li key={step.id} className="flex gap-4 bg-background border border-border rounded-lg p-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {step.step_number}
                    </span>
                    <p className="text-text-primary pt-1">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-muted border-t border-border text-xs text-text-secondary">
            Added {new Date(recipe.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

