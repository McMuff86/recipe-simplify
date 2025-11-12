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

**Documentation:** [README-EdgeFunction.md](README-EdgeFunction.md)

### Project Files

```
recipe-simple/
├── .github/
│   └── workflows/
│       └── deploy-edge-function.yml    # GitHub Actions CI/CD workflow
├── supabase/
│   └── functions/
│       └── extract-recipe/
│           └── index.ts                # Main edge function implementation
├── Agents.md                           # This file - Project overview
├── CONFIG.md                           # Configuration guide
├── DEPLOYMENT-GUIDE.md                 # Complete deployment instructions
├── README.md                           # Main project README
├── README-EdgeFunction.md              # Edge function technical docs
├── deploy-edge-function.ps1           # PowerShell deployment script
├── test-edge-function.js              # Node.js test script
├── test-page.html                     # Interactive browser test page
├── package.json                       # Node.js project configuration
└── .gitignore                         # Git ignore rules
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

## Next Steps

1. ✅ Create Supabase project
2. ✅ Create extract-recipe edge function
3. ✅ Deploy edge function
4. ✅ Configure OpenAI API key
5. ✅ Test edge function (Buffalo Hot Wings Sauce ✓)
6. ✅ Create database schema for storing recipes
7. ✅ Test database with sample recipe
8. 🔲 Build frontend application
9. 🔲 Implement user authentication
10. 🔲 Add recipe management features (CRUD operations)
11. 🔲 Add recipe search and filtering
12. 🔲 Implement recipe categories/tags
13. 🔲 Add user favorites/bookmarks

## Notes

- Project uses English for all code
- Documentation can be in German
- Edge function includes CORS headers for web access

