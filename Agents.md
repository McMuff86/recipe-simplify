# Recipe Simplify - Project Documentation

## Project Overview

**Project Name:** recipe-simplify  
**Type:** Supabase Project  
**Purpose:** Recipe extraction and management system

## Supabase Project Details

- **Project ID:** lpxagwasrquoiknmkccw
- **Organization:** McMuff86_supabase (ID: lbselcvbrzpkmczuiqfg)
- **Region:** eu-west-1 (Europe - Ireland)
- **Status:** ACTIVE_HEALTHY
- **Cost:** $0 monthly
- **Created:** November 12, 2025

## Project Structure

### Edge Functions

#### `extract-recipe`
Extracts recipe information from website URLs using OpenAI's API.

**Location:** `supabase/functions/extract-recipe/index.ts`

**Features:**
- Takes a recipe website URL as input
- Uses OpenAI GPT-4o-mini to analyze HTML content
- Returns structured JSON with recipe data
- CORS-enabled for web access
- Error handling and validation

#### `generate-recipe`
Generates recipes from available ingredients using AI.

**Location:** `supabase/functions/generate-recipe/index.ts`

**Features:**
- Takes list of ingredients as input
- Optional preferences (cuisine style, dietary restrictions, etc.)
- Uses OpenAI GPT-4o-mini to create complete recipes
- Returns structured JSON with title, description, ingredients, and method
- CORS-enabled for web access

### Project Files

```
recipe-simple/
├── .github/
│   └── workflows/
│       └── deploy-edge-function.yml       # GitHub Actions CI/CD workflow
├── supabase/
│   ├── functions/
│   │   ├── extract-recipe/
│   │   │   └── index.ts                   # Recipe extraction edge function
│   │   └── generate-recipe/
│   │       └── index.ts                   # AI recipe generation edge function
│   └── migrations/
│       ├── create_recipes_schema.sql      # Initial database schema
│       └── add_recipe_rating_and_source.sql # Rating & source type migration
├── frontend/                              # Next.js frontend application
│   ├── app/
│   │   ├── layout.tsx                     # Root layout with navigation
│   │   ├── page.tsx                       # Homepage
│   │   ├── extract/
│   │   │   └── page.tsx                   # Recipe extraction page
│   │   ├── ai-chef/
│   │   │   └── page.tsx                   # AI recipe generator page
│   │   └── recipes/
│   │       └── page.tsx                   # Recipe collection page
│   ├── components/
│   │   ├── RecipeCard.tsx                 # Recipe display card
│   │   ├── RecipeDisplay.tsx              # Full recipe display with rating
│   │   └── StarRating.tsx                 # Star rating component
│   ├── lib/
│   │   ├── supabase.ts                    # Supabase client & types
│   │   └── api.ts                         # API functions
│   └── globals.css                        # Global styles & design system
├── Agents.md                              # This file - Project overview
├── README.md                              # Main project README
├── package.json                           # Node.js project configuration
└── .gitignore                             # Git ignore rules
```

## Deployment

### Prerequisites
- Supabase CLI installed
- OpenAI API Key
- Supabase account with access to project

### Deployment Options

#### Option 1: Automated PowerShell Script
```powershell
.\deploy-edge-function.ps1
```

#### Option 2: Manual CLI Commands
```bash
supabase login
supabase link --project-ref lpxagwasrquoiknmkccw
supabase secrets set OPENAI_API_KEY=your_key
supabase functions deploy extract-recipe
```

#### Option 3: GitHub Actions (CI/CD)
Push to main branch triggers automatic deployment

#### Option 4: Supabase Web Dashboard
Manual deployment through the web interface

**Full Documentation:** [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

## Testing

### Node.js Test Script
```bash
node test-edge-function.js
```

### Interactive Browser Test
Open `test-page.html` in a browser

### Command Line (curl)
```bash
curl -X POST https://lpxagwasrquoiknmkccw.supabase.co/functions/v1/extract-recipe \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/recipe"}'
```

## API Endpoints

### Extract Recipe
```
POST https://lpxagwasrquoiknmkccw.supabase.co/functions/v1/extract-recipe
```

**Request Body:**
```json
{
  "url": "https://example.com/recipe-page"
}
```

**Response:**
```json
{
  "title": "Recipe Title",
  "description": "Short description",
  "ingredients": ["ingredient1", "ingredient2", ...],
  "method": ["step1", "step2", ...]
}
```

## Environment Variables

### Required Secrets
- `OPENAI_API_KEY`: OpenAI API key for recipe extraction

Set with:
```bash
supabase secrets set OPENAI_API_KEY=your_key_here
```

## Technologies

- **Backend:** Supabase (PostgreSQL, Edge Functions)
- **Edge Functions Runtime:** Deno
- **AI/ML:** OpenAI API (GPT-4o-mini)
- **Language:** TypeScript

## Related Documentation

### Project Documentation
- [Main README](README.md) - Project overview and quick start
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - 📁 Project structure guide
- [NEXT-STEPS.md](docs/NEXT-STEPS.md) - ⭐ **Start here!** What to do next
- [CONFIG.md](docs/CONFIG.md) - Configuration guide and environment setup
- [DEPLOYMENT-GUIDE.md](docs/DEPLOYMENT-GUIDE.md) - Complete deployment instructions
- [README-EdgeFunction.md](docs/README-EdgeFunction.md) - Edge function technical details
- [DATABASE-SCHEMA.md](docs/DATABASE-SCHEMA.md) - Database schema documentation
- [STATUS.md](docs/STATUS.md) - Current project status

### Test & Deployment Scripts
- `scripts/deploy-edge-function.ps1` - Automated PowerShell deployment script
- `tests/test-edge-function.js` - Node.js test script
- `tests/test-hotwings.js` - Tested Hot Wings Sauce recipe extraction ✅
- `tests/test-page.html` - Interactive browser-based test interface
- `examples/save-recipe-example.js` - Complete workflow example (extract + save to DB)
- `.github/workflows/deploy-edge-function.yml` - GitHub Actions CI/CD

### External Resources
- [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli/introduction)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Deno Documentation](https://deno.land/manual)

## Completed Features

1. ✅ Create Supabase project
2. ✅ Create extract-recipe edge function
3. ✅ Deploy edge function
4. ✅ Configure OpenAI API key
5. ✅ Test edge function (Buffalo Hot Wings Sauce ✓)
6. ✅ Create database schema for storing recipes
7. ✅ Test database with sample recipe
8. ✅ Build frontend application with Next.js
9. ✅ Create modern GitHub-inspired design system
10. ✅ Recipe extraction from URLs
11. ✅ AI recipe generation from ingredients (AI Chef)
12. ✅ Recipe rating system (1-5 stars)
13. ✅ Recipe collection with search & filtering
14. ✅ Sort by date or rating
15. ✅ Full CRUD operations for recipes
16. ✅ **User Authentication** (Email/Password)
17. ✅ **Row Level Security (RLS)** - Users see only their recipes
18. ✅ **Storage Integration** - Recipe image uploads
19. ✅ Protected routes with middleware
20. ✅ User profile menu with sign out

## Future Enhancements

1. 🔲 Google OAuth authentication
2. 🔲 Recipe categories/tags
3. 🔲 Favorites/bookmarks
4. 🔲 Recipe sharing (public/private)
5. 🔲 Meal planning
6. 🔲 Shopping list generation
7. 🔲 Recipe import/export (PDF)
8. 🔲 Nutrition information

## Notes

- Project uses English for all code
- Documentation can be in German
- Edge function includes CORS headers for web access

