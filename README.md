# Recipe Simplify 🍳

A modern recipe extraction and management system powered by Supabase and OpenAI.

## Overview

Recipe Simplify extracts structured recipe information from any recipe website URL using AI. Simply provide a URL, and the system automatically extracts:

- 📝 Recipe Title
- 💭 Short Description
- 🛒 Ingredients List
- 👨‍🍳 Step-by-step Method

## Features

- ✨ AI-powered recipe extraction using OpenAI GPT-4o-mini
- 🚀 Serverless Edge Functions on Supabase
- 🌍 Deployed in EU (eu-west-1)
- 🔒 Secure API with CORS support
- 💰 $0 monthly cost

## Project Details

- **Project ID:** `lpxagwasrquoiknmkccw`
- **Region:** Europe West (Ireland)
- **Status:** Active
- **Organization:** McMuff86_supabase

## Quick Start

### Prerequisites

- Node.js 18+
- Supabase account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/McMuff86/recipe-simplify.git
   cd recipe-simplify
   ```

2. **Backend Setup (Already Done! ✅)**
   
   The backend is already deployed and working:
   - ✅ Supabase project created
   - ✅ Edge function deployed
   - ✅ Database schema applied
   - ✅ OpenAI API configured

3. **Frontend Setup**
   
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Variables**
   
   The `.env.local` file is already created with correct values!

5. **Start Development Server**
   
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

6. **Or use root commands**
   
   ```bash
   # From project root
   npm run dev    # Start frontend
   npm test       # Test edge function
   ```

## Usage

### API Endpoint

```
POST https://lpxagwasrquoiknmkccw.supabase.co/functions/v1/extract-recipe
```

### Request

```javascript
const response = await fetch(
  'https://lpxagwasrquoiknmkccw.supabase.co/functions/v1/extract-recipe',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_SUPABASE_ANON_KEY'
    },
    body: JSON.stringify({
      url: 'https://www.example.com/recipe-page'
    })
  }
);

const recipe = await response.json();
```

### Response

```json
{
  "title": "Delicious Chocolate Cake",
  "description": "A rich and moist chocolate cake perfect for any occasion",
  "ingredients": [
    "2 cups all-purpose flour",
    "1 3/4 cups granulated sugar",
    "3/4 cup cocoa powder",
    "..."
  ],
  "method": [
    "Preheat oven to 350°F (175°C)",
    "Mix dry ingredients in a large bowl",
    "Add wet ingredients and mix until smooth",
    "..."
  ]
}
```

## Testing

### Test with Node.js
```bash
node test-edge-function.js
```

### Test with Browser
1. Open `test-page.html` in your browser
2. Configure your Supabase Anon Key in the script
3. Enter a recipe URL and click "Extract Recipe"

### Test with curl
```bash
curl -X POST \
  https://lpxagwasrquoiknmkccw.supabase.co/functions/v1/extract-recipe \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.allrecipes.com/recipe/16354/easy-meatloaf/"}'
```

## Project Structure

```
recipe-simple/
├── .github/
│   └── workflows/
│       └── deploy-edge-function.yml    # GitHub Actions CI/CD
├── supabase/
│   └── functions/
│       └── extract-recipe/
│           └── index.ts                # Edge function code
├── Agents.md                           # Project documentation
├── DEPLOYMENT-GUIDE.md                 # Deployment instructions
├── README.md                           # This file
├── README-EdgeFunction.md              # Edge function details
├── deploy-edge-function.ps1           # PowerShell deployment script
├── test-edge-function.js              # Node.js test script
├── test-page.html                     # Browser-based test interface
├── package.json                       # Project configuration
└── .gitignore                         # Git ignore rules
```

## Documentation

- [Agents.md](Agents.md) - Complete project documentation
- [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) - Detailed deployment instructions
- [README-EdgeFunction.md](README-EdgeFunction.md) - Edge function documentation

## CI/CD with GitHub Actions

This project includes automatic deployment via GitHub Actions:

1. Set up GitHub secrets:
   - `SUPABASE_ACCESS_TOKEN`
   - `SUPABASE_PROJECT_ID`
   - `OPENAI_API_KEY`

2. Push to main branch
3. Edge function deploys automatically!

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for details.

## Technologies

- **Backend:** Supabase (PostgreSQL + Edge Functions)
- **Runtime:** Deno
- **AI/ML:** OpenAI API (GPT-4o-mini)
- **Language:** TypeScript
- **CI/CD:** GitHub Actions

## Roadmap

- [x] Create Supabase project
- [x] Develop recipe extraction edge function
- [x] Add deployment scripts and documentation
- [ ] Create database schema for storing recipes
- [ ] Build frontend application
- [ ] Implement user authentication
- [ ] Add recipe management features (CRUD)
- [ ] Add recipe search and filtering
- [ ] Create mobile-responsive UI

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

For issues and questions:
- Check [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for troubleshooting
- Review [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)
- Open an issue in this repository

---

Made with ❤️ using Supabase and OpenAI

