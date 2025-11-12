'use client';

import { useEffect, useState } from 'react';
import { getAllRecipes } from '@/lib/api';
import { RecipeWithDetails } from '@/lib/supabase';
import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';
import { checkLegacyRecipes, claimLegacyRecipes } from '@/lib/migrate-recipes';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<RecipeWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchIn, setSearchIn] = useState<'all' | 'title' | 'ingredients'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  const [showMigrationBanner, setShowMigrationBanner] = useState(false);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    loadRecipes();
    checkForLegacyRecipes();
    
    // Reload recipes when page becomes visible (e.g., when navigating back)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadRecipes();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const checkForLegacyRecipes = async () => {
    // Check if there are any legacy recipes that need migration
    const count = await checkLegacyRecipes();
    if (count > 0) {
      setShowMigrationBanner(true);
    }
  };

  const handleMigration = async () => {
    setMigrating(true);
    const result = await claimLegacyRecipes();
    
    if (result.error) {
      alert('Failed to migrate recipes: ' + result.error);
    } else if (result.count > 0) {
      alert(`Successfully migrated ${result.count} recipe(s) to your account!`);
      setShowMigrationBanner(false);
      await loadRecipes(); // Reload to show updated recipes
    }
    
    setMigrating(false);
  };

  const loadRecipes = async () => {
    try {
      const data = await getAllRecipes();
      setRecipes(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort recipes
  const filteredRecipes = recipes
    .filter((recipe) => {
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();

      switch (searchIn) {
        case 'title':
          return recipe.title.toLowerCase().includes(query);
        
        case 'ingredients':
          return recipe.ingredients?.some(ing => 
            ing.text.toLowerCase().includes(query)
          ) || false;
        
        case 'all':
        default:
          // Search in title, description, and ingredients
          const titleMatch = recipe.title.toLowerCase().includes(query);
          const descMatch = recipe.description?.toLowerCase().includes(query) || false;
          const ingredientMatch = recipe.ingredients?.some(ing => 
            ing.text.toLowerCase().includes(query)
          ) || false;
          
          return titleMatch || descMatch || ingredientMatch;
      }
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        // Sort by rating (highest first), then by date
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        if (ratingA !== ratingB) {
          return ratingB - ratingA;
        }
      }
      // Default: sort by date (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
            <p className="text-text-primary font-medium">Loading recipes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-error/10 border border-error/20 rounded-xl p-8 text-center">
            <p className="text-error font-medium mb-4">{error}</p>
            <button
              onClick={loadRecipes}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Migration Banner */}
        {showMigrationBanner && (
          <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-text-primary mb-1">
                  Legacy Recipes Found
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  We found recipes created before user authentication was enabled. 
                  Click below to assign them to your account so you can edit them.
                </p>
                <button
                  onClick={handleMigration}
                  disabled={migrating}
                  className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {migrating ? 'Migrating...' : 'Claim My Recipes'}
                </button>
              </div>
              <button
                onClick={() => setShowMigrationBanner(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">My Collection</h1>
            <p className="text-text-secondary">
              {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} in your collection
            </p>
          </div>
          <Link
            href="/extract"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Recipe
          </Link>
        </div>

        {/* Search and Filters */}
        {recipes.length > 0 && (
          <div className="bg-surface border border-border rounded-xl p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSearchIn('all')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    searchIn === 'all'
                      ? 'bg-accent text-white'
                      : 'bg-background border border-border text-text-secondary hover:text-text-primary'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSearchIn('title')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    searchIn === 'title'
                      ? 'bg-accent text-white'
                      : 'bg-background border border-border text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Title
                </button>
                <button
                  onClick={() => setSearchIn('ingredients')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    searchIn === 'ingredients'
                      ? 'bg-accent text-white'
                      : 'bg-background border border-border text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Ingredients
                </button>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <span className="text-sm text-text-secondary font-medium">Sort by:</span>
              <button
                onClick={() => setSortBy('date')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'date'
                    ? 'bg-accent text-white'
                    : 'bg-background border border-border text-text-secondary hover:text-text-primary'
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => setSortBy('rating')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'rating'
                    ? 'bg-accent text-white'
                    : 'bg-background border border-border text-text-secondary hover:text-text-primary'
                }`}
              >
                ⭐ Rating
              </button>
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <div className="mt-3 flex items-center justify-between text-sm">
                <p className="text-text-secondary">
                  Found {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} 
                  {searchIn !== 'all' && ` in ${searchIn}`}
                </p>
                {filteredRecipes.length > 0 && filteredRecipes.length < recipes.length && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-accent hover:text-accent-hover font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Recipe Grid */}
        {recipes.length === 0 ? (
          <div className="bg-surface border border-border rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">No recipes yet</h2>
            <p className="text-text-secondary mb-6">
              Start building your collection by extracting recipes from your favorite websites
            </p>
            <Link
              href="/extract"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Extract Your First Recipe
            </Link>
          </div>
        ) : filteredRecipes.length === 0 ? (
          // No search results
          <div className="bg-surface border border-border rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">No recipes found</h2>
            <p className="text-text-secondary mb-4">
              Try searching with different keywords or filters
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-accent hover:text-accent-hover font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          // Recipe Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onDelete={loadRecipes} onUpdate={loadRecipes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
