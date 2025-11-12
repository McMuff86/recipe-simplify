# Frontend Setup - Recipe Simplify

## 🚀 Quick Start

### 1. Environment Variables

Create `.env.local` file in the `frontend/` directory:

```bash
# frontend/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://lpxagwasrquoiknmkccw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxweGFnd2FzcnF1b2lrbm1rY2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NzYxMTcsImV4cCI6MjA3ODU1MjExN30.8PasciJkQeH9Nap5D1RbUWFwgg1AcyArF6YLY2usP6E
```

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 📁 Structure

```
frontend/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with navigation
│   ├── globals.css           # Global styles
│   ├── extract/
│   │   └── page.tsx          # Recipe extraction page
│   └── recipes/
│       └── page.tsx          # Recipe collection page
├── components/
│   └── RecipeCard.tsx        # Recipe display component
├── lib/
│   ├── supabase.ts           # Supabase client and types
│   └── api.ts                # API functions
└── .env.local                # Environment variables (create this!)
```

## 🎨 Features

### Home Page (`/`)
- Hero section with CTA buttons
- Feature showcase
- Tech stack display

### Extract Page (`/extract`)
- URL input form
- Recipe extraction with loading state
- Beautiful recipe display
- Save to database functionality

### Recipes Page (`/recipes`)
- Grid display of saved recipes
- Expandable recipe cards
- Delete functionality
- Empty state with CTA

## 🔧 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Database:** Supabase (PostgreSQL)
- **Backend:** Supabase Edge Functions
- **AI:** OpenAI GPT-4o-mini

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 API Integration

The frontend communicates with:

1. **Supabase Database** - Direct queries via `@supabase/supabase-js`
2. **Edge Function** - Recipe extraction via `/functions/v1/extract-recipe`

### API Functions (`lib/api.ts`)

- `extractRecipe(url)` - Extract recipe from URL
- `saveRecipe(recipe)` - Save recipe to database
- `getAllRecipes()` - Get all recipes
- `getRecipe(id)` - Get single recipe
- `deleteRecipe(id)` - Delete recipe

## 🎨 Customization

### Colors

The app uses a purple/pink gradient theme. To customize, edit `tailwind.config.ts` or change the gradient classes in components.

### Layout

Navigation is in `app/layout.tsx`. Modify the navbar and footer there.

## 🐛 Troubleshooting

### "Missing environment variables"
Make sure `.env.local` exists with correct values.

### "Failed to extract recipe"
Check that:
1. OpenAI API key is set in Supabase Edge Function secrets
2. The Edge Function is deployed
3. The website URL is accessible

### "Failed to load recipes"
Verify that:
1. Database schema is applied (see `/docs/DATABASE-SCHEMA.md`)
2. Supabase connection is working
3. RLS policies allow anonymous access for reading

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- Render
- Any Node.js hosting

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

