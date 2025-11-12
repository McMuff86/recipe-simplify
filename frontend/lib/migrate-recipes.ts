import { createClient } from './supabase-browser';

/**
 * Checks if there are any recipes without a user_id
 */
export async function checkLegacyRecipes(): Promise<number> {
  const supabase = createClient();
  
  try {
    const { count, error } = await supabase
      .from('recipes')
      .select('id', { count: 'exact', head: true })
      .is('user_id', null);

    if (error) throw error;
    return count || 0;
  } catch (err: any) {
    console.error('Error checking legacy recipes:', err);
    return 0;
  }
}

/**
 * Assigns all recipes without a user_id to the current user
 * This is useful for migrating legacy recipes created before auth was implemented
 */
export async function claimLegacyRecipes(): Promise<{ count: number; error?: string }> {
  const supabase = createClient();
  
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { count: 0, error: 'Not authenticated' };
    }

    // Find all recipes without user_id
    const { data: legacyRecipes, error: fetchError } = await supabase
      .from('recipes')
      .select('id')
      .is('user_id', null);

    if (fetchError) throw fetchError;
    if (!legacyRecipes || legacyRecipes.length === 0) {
      return { count: 0 };
    }

    console.log(`Found ${legacyRecipes.length} legacy recipes without user_id`);

    // Update all legacy recipes to current user
    const { error: updateError } = await supabase
      .from('recipes')
      .update({ user_id: user.id })
      .is('user_id', null);

    if (updateError) throw updateError;

    console.log(`Successfully assigned ${legacyRecipes.length} recipes to current user`);
    return { count: legacyRecipes.length };

  } catch (err: any) {
    console.error('Error claiming legacy recipes:', err);
    return { count: 0, error: err.message };
  }
}

