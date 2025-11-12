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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        {recipe.description && (
          <p className="text-white/90 text-sm line-clamp-2">{recipe.description}</p>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            🛒 {ingredientsCount} ingredients
          </span>
          <span className="flex items-center gap-1">
            👨‍🍳 {stepsCount} steps
          </span>
        </div>

        {recipe.source_url && (
          <a
            href={recipe.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 text-sm block mb-4 truncate"
          >
            🔗 Source
          </a>
        )}

        {/* Expandable Details */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-center text-purple-600 hover:text-purple-700 font-medium text-sm py-2 border-t border-gray-200"
        >
          {expanded ? '▲ Hide Details' : '▼ Show Details'}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
            {/* Ingredients */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Ingredients:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {recipe.ingredients.map((ing) => (
                    <li key={ing.id} className="flex items-start gap-2">
                      <span className="text-purple-600">•</span>
                      <span>{ing.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Method Steps */}
            {recipe.method_steps && recipe.method_steps.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Method:</h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  {recipe.method_steps.map((step) => (
                    <li key={step.id} className="flex gap-2">
                      <span className="font-semibold text-purple-600">
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
          className="w-full mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 text-sm font-medium"
        >
          {deleting ? 'Deleting...' : '🗑️ Delete'}
        </button>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        Added {new Date(recipe.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}

