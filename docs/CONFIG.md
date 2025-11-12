# Configuration Guide

## Required Configuration

### 1. Supabase Project Details

- **Project Reference ID:** `lpxagwasrquoiknmkccw`
- **Region:** eu-west-1
- **Project URL:** `https://lpxagwasrquoiknmkccw.supabase.co`

### 2. Supabase API Keys

Get your API keys from: [Supabase Dashboard](https://supabase.com/dashboard/project/lpxagwasrquoiknmkccw/settings/api)

- **Anon Key:** Used for client-side requests
- **Service Role Key:** Used for server-side admin operations (keep secret!)

### 3. OpenAI API Key

Get your API key from: [OpenAI Platform](https://platform.openai.com/api-keys)

Format: `sk-...`

### 4. Environment Variables

For local development, create a `.env` file (never commit this!):

```env
SUPABASE_PROJECT_REF=lpxagwasrquoiknmkccw
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=sk-your-key
FUNCTION_URL=https://lpxagwasrquoiknmkccw.supabase.co/functions/v1/extract-recipe
```

### 5. Supabase Secrets (for Edge Functions)

Set secrets using the CLI:

```bash
supabase secrets set OPENAI_API_KEY=sk-your-key
```

Or via the Supabase Dashboard:
1. Go to Project Settings → Edge Functions
2. Scroll to "Secrets"
3. Add: `OPENAI_API_KEY`

### 6. GitHub Secrets (for CI/CD)

If using GitHub Actions, set these secrets in your repository:

**Settings → Secrets and variables → Actions → New repository secret**

- `SUPABASE_ACCESS_TOKEN`: Get from https://supabase.com/dashboard/account/tokens
- `SUPABASE_PROJECT_ID`: `lpxagwasrquoiknmkccw`
- `OPENAI_API_KEY`: Your OpenAI API key

## Testing Configuration

### For test-edge-function.js

Update these constants:

```javascript
const SUPABASE_PROJECT_REF = 'lpxagwasrquoiknmkccw';
const SUPABASE_ANON_KEY = 'your_supabase_anon_key';
```

### For test-page.html

Update the CONFIG object in the script section:

```javascript
const CONFIG = {
    projectRef: 'lpxagwasrquoiknmkccw',
    functionName: 'extract-recipe',
    anonKey: 'your_supabase_anon_key'
};
```

## Security Best Practices

### ✅ Do:
- Store secrets in environment variables
- Use `.env` files for local development (add to `.gitignore`)
- Use GitHub Secrets for CI/CD
- Use Supabase Secrets for Edge Functions
- Keep service role key secret (never expose client-side)

### ❌ Don't:
- Commit API keys to git
- Share API keys publicly
- Use service role key in client-side code
- Store secrets in source code

## Where to Find Your Keys

### Supabase Keys
Dashboard → Project Settings → API
- Project URL
- Anon key (public)
- Service role key (secret)

### Supabase Access Token
Dashboard → Account → Access Tokens
- Create new token for CLI/CI/CD

### OpenAI API Key
Platform → API Keys
- Create new secret key

## Verification

Test that your configuration works:

```bash
# Test Supabase connection
supabase projects list

# Test Edge Function
node test-edge-function.js

# Test in browser
# Open test-page.html
```

## Troubleshooting

### "Invalid API key"
- Check that you're using the correct key for the context
- Anon key for client-side, service role for admin operations

### "OpenAI API key not configured"
- Set the secret: `supabase secrets set OPENAI_API_KEY=...`
- Verify: Check Supabase Dashboard → Project Settings → Edge Functions → Secrets

### "CORS error"
- Ensure you're using the anon key with proper Authorization header
- Check that the function includes CORS headers (already implemented)

### "Function not found"
- Deploy the function: `supabase functions deploy extract-recipe`
- Check function list: `supabase functions list`

