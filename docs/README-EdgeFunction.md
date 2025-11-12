# Recipe Extraction Edge Function

## Overview
Diese Edge Function extrahiert Rezeptinformationen von einer Website-URL mithilfe der OpenAI API.

## Installation der Supabase CLI

### Für Windows (PowerShell als Administrator):
```powershell
# Mit Scoop
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Alternativ: Direkt-Download
Laden Sie die neueste Version von: https://github.com/supabase/cli/releases

## Setup

### 1. Supabase Login
```bash
supabase login
```

### 2. Projekt verknüpfen
```bash
supabase link --project-ref lpxagwasrquoiknmkccw
```

### 3. OpenAI API Key als Secret setzen
```bash
supabase secrets set OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Edge Function deployen
```bash
supabase functions deploy extract-recipe
```

## Verwendung

### Endpoint URL
```
https://lpxagwasrquoiknmkccw.supabase.co/functions/v1/extract-recipe
```

### Request Beispiel
```javascript
const response = await fetch('https://lpxagwasrquoiknmkccw.supabase.co/functions/v1/extract-recipe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_SUPABASE_ANON_KEY'
  },
  body: JSON.stringify({
    url: 'https://example.com/recipe-page'
  })
});

const recipe = await response.json();
```

### Response Format
```json
{
  "title": "Recipe Title",
  "description": "Short description of the recipe",
  "ingredients": [
    "Ingredient 1",
    "Ingredient 2",
    "Ingredient 3"
  ],
  "method": [
    "Step 1: First instruction",
    "Step 2: Second instruction",
    "Step 3: Third instruction"
  ]
}
```

## Fehlerbehandlung

Die Function gibt entsprechende HTTP Status Codes zurück:
- `200`: Erfolgreiche Extraktion
- `400`: Fehlende oder ungültige URL
- `500`: Server-Fehler (OpenAI API Fehler, fehlender API Key, etc.)

