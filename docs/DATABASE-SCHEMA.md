# Datenbank-Schema - Recipe Simplify

## Übersicht

Das Datenbank-Schema besteht aus drei Haupttabellen zur Speicherung von Rezept-Informationen und einer View für einfachen Zugriff auf vollständige Rezepte.

## Tabellen

### 1. `recipes` - Haupt-Rezept-Tabelle

Speichert die grundlegenden Informationen zu jedem Rezept.

**Spalten:**
- `id` (UUID, Primary Key) - Eindeutige Rezept-ID
- `title` (TEXT, NOT NULL) - Rezept-Titel
- `description` (TEXT) - Kurze Beschreibung des Rezepts
- `source_url` (TEXT) - Original-URL der Website
- `created_at` (TIMESTAMPTZ) - Erstellungszeitpunkt
- `updated_at` (TIMESTAMPTZ) - Letzte Aktualisierung (mit Auto-Update Trigger)
- `user_id` (UUID) - Referenz zum Benutzer (auth.users)

**Constraints:**
- `title_not_empty`: Titel muss mindestens 1 Zeichen haben

**Indizes:**
- `idx_recipes_user_id` - Für User-Abfragen
- `idx_recipes_created_at` - Für zeitbasierte Sortierung

### 2. `ingredients` - Zutaten-Tabelle

Speichert die Zutaten für jedes Rezept.

**Spalten:**
- `id` (UUID, Primary Key) - Eindeutige Zutaten-ID
- `recipe_id` (UUID, Foreign Key → recipes.id) - Referenz zum Rezept
- `ingredient_text` (TEXT, NOT NULL) - Zutat (z.B. "1 cup flour")
- `order_index` (INTEGER, DEFAULT 0) - Sortierreihenfolge
- `created_at` (TIMESTAMPTZ) - Erstellungszeitpunkt

**Constraints:**
- `ingredient_not_empty`: Zutat muss mindestens 1 Zeichen haben
- Cascade Delete: Wird gelöscht wenn Rezept gelöscht wird

**Indizes:**
- `idx_ingredients_recipe_id` - Für Rezept-Abfragen
- `idx_ingredients_order` - Für sortierte Ausgabe

### 3. `method_steps` - Zubereitungsschritte-Tabelle

Speichert die Zubereitungsschritte für jedes Rezept.

**Spalten:**
- `id` (UUID, Primary Key) - Eindeutige Schritt-ID
- `recipe_id` (UUID, Foreign Key → recipes.id) - Referenz zum Rezept
- `step_number` (INTEGER, NOT NULL) - Schrittnummer (1, 2, 3, ...)
- `step_description` (TEXT, NOT NULL) - Beschreibung des Schritts
- `created_at` (TIMESTAMPTZ) - Erstellungszeitpunkt

**Constraints:**
- `step_not_empty`: Schritt-Beschreibung muss mindestens 1 Zeichen haben
- `step_number_positive`: Schrittnummer muss positiv sein
- Cascade Delete: Wird gelöscht wenn Rezept gelöscht wird

**Indizes:**
- `idx_method_steps_recipe_id` - Für Rezept-Abfragen
- `idx_method_steps_order` - Für sortierte Ausgabe

## Views

### `recipes_with_details` - Vollständige Rezept-Ansicht

Eine View die alle Rezept-Informationen inklusive Zutaten und Schritte in einem JSON-Format zurückgibt.

**Struktur:**
```json
{
  "id": "uuid",
  "title": "Rezept-Titel",
  "description": "Beschreibung",
  "source_url": "https://...",
  "created_at": "timestamp",
  "updated_at": "timestamp",
  "user_id": "uuid",
  "ingredients": [
    {
      "id": "uuid",
      "text": "Zutat",
      "order": 1
    }
  ],
  "method_steps": [
    {
      "id": "uuid",
      "step_number": 1,
      "description": "Schritt-Beschreibung"
    }
  ]
}
```

## Row Level Security (RLS)

Alle Tabellen haben Row Level Security aktiviert mit folgenden Policies:

### `recipes` Policies:
- ✅ **SELECT**: Jeder kann alle Rezepte sehen
- ✅ **INSERT**: Benutzer können nur eigene Rezepte erstellen
- ✅ **UPDATE**: Benutzer können nur eigene Rezepte aktualisieren
- ✅ **DELETE**: Benutzer können nur eigene Rezepte löschen

### `ingredients` Policies:
- ✅ **SELECT**: Jeder kann alle Zutaten sehen
- ✅ **INSERT/UPDATE/DELETE**: Nur für eigene Rezepte

### `method_steps` Policies:
- ✅ **SELECT**: Jeder kann alle Schritte sehen
- ✅ **INSERT/UPDATE/DELETE**: Nur für eigene Rezepte

## Trigger

### `update_recipes_updated_at`

Automatischer Trigger der das `updated_at` Feld bei jeder Änderung aktualisiert.

## SQL Beispiele

### Rezept einfügen
```sql
-- 1. Rezept erstellen
INSERT INTO recipes (title, description, source_url, user_id)
VALUES (
    'Mein Rezept',
    'Eine tolle Beschreibung',
    'https://example.com/recipe',
    auth.uid()
)
RETURNING id;

-- 2. Zutaten hinzufügen
INSERT INTO ingredients (recipe_id, ingredient_text, order_index)
VALUES
    ('recipe-uuid', '1 Tasse Mehl', 1),
    ('recipe-uuid', '2 Eier', 2);

-- 3. Zubereitungsschritte hinzufügen
INSERT INTO method_steps (recipe_id, step_number, step_description)
VALUES
    ('recipe-uuid', 1, 'Mehl sieben'),
    ('recipe-uuid', 2, 'Eier hinzufügen');
```

### Rezept mit allen Details abrufen
```sql
SELECT * FROM recipes_with_details WHERE id = 'recipe-uuid';
```

### Alle Rezepte eines Benutzers
```sql
SELECT * FROM recipes_with_details 
WHERE user_id = auth.uid()
ORDER BY created_at DESC;
```

### Rezept suchen
```sql
SELECT * FROM recipes_with_details
WHERE title ILIKE '%chicken%'
   OR description ILIKE '%chicken%';
```

### Rezept löschen (mit Cascade)
```sql
-- Löscht automatisch alle zugehörigen Zutaten und Schritte
DELETE FROM recipes WHERE id = 'recipe-uuid' AND user_id = auth.uid();
```

## TypeScript Types

Für die Verwendung mit TypeScript können Sie die Types generieren:

```bash
supabase gen types typescript --local > types/database.types.ts
```

**Beispiel-Types:**
```typescript
interface Recipe {
  id: string;
  title: string;
  description: string | null;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

interface Ingredient {
  id: string;
  recipe_id: string;
  ingredient_text: string;
  order_index: number;
  created_at: string;
}

interface MethodStep {
  id: string;
  recipe_id: string;
  step_number: number;
  step_description: string;
  created_at: string;
}

interface RecipeWithDetails extends Recipe {
  ingredients: Array<{
    id: string;
    text: string;
    order: number;
  }>;
  method_steps: Array<{
    id: string;
    step_number: number;
    description: string;
  }>;
}
```

## API Integration

### Mit Supabase JavaScript Client

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Rezept erstellen
async function createRecipe(recipeData) {
  // 1. Rezept einfügen
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .insert({
      title: recipeData.title,
      description: recipeData.description,
      source_url: recipeData.url,
    })
    .select()
    .single();

  if (recipeError) throw recipeError;

  // 2. Zutaten einfügen
  const ingredients = recipeData.ingredients.map((text, index) => ({
    recipe_id: recipe.id,
    ingredient_text: text,
    order_index: index + 1,
  }));

  const { error: ingredientsError } = await supabase
    .from('ingredients')
    .insert(ingredients);

  if (ingredientsError) throw ingredientsError;

  // 3. Zubereitungsschritte einfügen
  const steps = recipeData.method.map((text, index) => ({
    recipe_id: recipe.id,
    step_number: index + 1,
    step_description: text,
  }));

  const { error: stepsError } = await supabase
    .from('method_steps')
    .insert(steps);

  if (stepsError) throw stepsError;

  return recipe;
}

// Rezept mit Details abrufen
async function getRecipe(recipeId) {
  const { data, error } = await supabase
    .from('recipes_with_details')
    .select('*')
    .eq('id', recipeId)
    .single();

  if (error) throw error;
  return data;
}

// Alle Rezepte abrufen
async function getAllRecipes() {
  const { data, error } = await supabase
    .from('recipes_with_details')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
```

## Migration Info

**Migration Name:** `create_recipes_schema`

**Angewendet am:** 2025-11-12

**Enthält:**
- 3 Tabellen: recipes, ingredients, method_steps
- 1 View: recipes_with_details
- 6 Indizes für Performance
- 1 Trigger für updated_at
- RLS Policies für alle Tabellen

## Nächste Schritte

### Mögliche Erweiterungen:

1. **Tags/Kategorien Tabelle**
   ```sql
   CREATE TABLE recipe_tags (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
     tag TEXT NOT NULL
   );
   ```

2. **Favoriten/Bookmarks**
   ```sql
   CREATE TABLE user_favorites (
     user_id UUID REFERENCES auth.users(id),
     recipe_id UUID REFERENCES recipes(id),
     created_at TIMESTAMPTZ DEFAULT NOW(),
     PRIMARY KEY (user_id, recipe_id)
   );
   ```

3. **Bewertungen**
   ```sql
   CREATE TABLE recipe_ratings (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     recipe_id UUID REFERENCES recipes(id),
     user_id UUID REFERENCES auth.users(id),
     rating INTEGER CHECK (rating >= 1 AND rating <= 5),
     comment TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

4. **Bilder**
   ```sql
   CREATE TABLE recipe_images (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     recipe_id UUID REFERENCES recipes(id),
     image_url TEXT NOT NULL,
     is_primary BOOLEAN DEFAULT false,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

## Support

Bei Fragen zum Schema:
- [Supabase Database Docs](https://supabase.com/docs/guides/database)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

