import { RecipeWithDetails } from '@/lib/supabase';
import { deleteRecipe } from '@/lib/api';
import { useState } from 'react';

interface RecipeCardProps {
  recipe: RecipeWithDetails;
  onDelete: () => void;
}

export default function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const ingredientsCount = recipe.ingredients?.length || 0;
  const stepsCount = recipe.method_steps?.length || 0;

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all">
      {/* Card Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-semibold text-text-primary mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        {recipe.description && (
          <p className="text-text-secondary text-sm line-clamp-2">{recipe.description}</p>
        )}
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

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-background hover:bg-muted border border-border rounded-lg text-text-primary text-sm font-medium transition-colors"
        >
          {expanded ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span>Hide Details</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span>Show Details</span>
            </>
          )}
        </button>

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

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-error/10 hover:bg-error/20 border border-error/20 text-error rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {deleting ? 'Deleting...' : 'Delete Recipe'}
        </button>
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
