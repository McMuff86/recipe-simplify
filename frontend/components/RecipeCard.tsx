import { RecipeWithDetails } from '@/lib/supabase';
import { deleteRecipe, updateRecipeRating } from '@/lib/api';
import { useState } from 'react';
import StarRating from './StarRating';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: RecipeWithDetails;
  onDelete: () => void;
  onUpdate?: () => void;
}

export default function RecipeCard({ recipe, onDelete, onUpdate }: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [rating, setRating] = useState(recipe.rating || null);
  const [updatingRating, setUpdatingRating] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    setDeleting(true);
    try {
      await deleteRecipe(recipe.id);
      onDelete();
    } catch (err) {
      alert('Failed to delete recipe');
    } finally {
      setDeleting(false);
    }
  };

  const handleRatingChange = async (newRating: number) => {
    setRating(newRating);
    setUpdatingRating(true);
    try {
      await updateRecipeRating(recipe.id, newRating);
      if (onUpdate) onUpdate();
    } catch (err) {
      alert('Failed to update rating');
      setRating(recipe.rating || null); // Revert on error
    } finally {
      setUpdatingRating(false);
    }
  };

  const ingredientsCount = recipe.ingredients?.length || 0;
  const stepsCount = recipe.method_steps?.length || 0;

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all">
      {/* Recipe Image */}
      {recipe.image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Card Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-semibold text-text-primary line-clamp-2 flex-1">
            {recipe.title}
          </h3>
          {recipe.source_type === 'generated' && (
            <span className="flex-shrink-0 inline-flex items-center gap-1 bg-accent/10 border border-accent/20 text-accent px-2 py-0.5 rounded text-xs font-medium">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI
            </span>
          )}
        </div>
        {recipe.description && (
          <p className="text-text-secondary text-sm line-clamp-2 mb-3">{recipe.description}</p>
        )}
        {/* Rating */}
        <div className="flex items-center gap-3">
          <StarRating 
            value={rating} 
            onChange={handleRatingChange}
            size="sm"
          />
          {rating && (
            <span className="text-xs text-text-secondary">
              {rating === 5 ? 'Amazing!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Okay' : 'Meh'}
            </span>
          )}
          {updatingRating && (
            <span className="text-xs text-text-secondary">Saving...</span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Stats */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>{ingredientsCount} ingredients</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>{stepsCount} steps</span>
          </div>
        </div>

        {/* Source Link */}
        {recipe.source_url && (
          <a
            href={recipe.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:text-accent-hover text-sm mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="truncate">View Source</span>
          </a>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/recipes/${recipe.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>View & Edit</span>
          </Link>
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-2 bg-background hover:bg-muted border border-border rounded-lg text-text-primary text-sm font-medium transition-colors"
          >
            {expanded ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-4">
            {/* Ingredients */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div>
                <h4 className="font-semibold text-text-primary mb-2 text-sm">Ingredients:</h4>
                <ul className="space-y-1.5">
                  {recipe.ingredients.map((ing) => (
                    <li key={ing.id} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-accent mt-0.5">•</span>
                      <span>{ing.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Method Steps */}
            {recipe.method_steps && recipe.method_steps.length > 0 && (
              <div>
                <h4 className="font-semibold text-text-primary mb-2 text-sm">Method:</h4>
                <ol className="space-y-2">
                  {recipe.method_steps.map((step) => (
                    <li key={step.id} className="flex gap-2 text-sm text-text-secondary">
                      <span className="font-semibold text-accent min-w-[20px]">
                        {step.step_number}.
                      </span>
                      <span>{step.description}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Card Footer */}
      <div className="px-6 py-3 bg-muted border-t border-border text-xs text-text-secondary">
        Added {new Date(recipe.created_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
}
