# Deployment Guide - Recipe Simplify Edge Function

Es gibt zwei Methoden, um die Edge Function zu deployen:

## Methode 1: Supabase CLI (Empfohlen)

### Schritt 1: Installation der Supabase CLI

#### Windows (PowerShell als Administrator):
```powershell
# Scoop installieren (falls noch nicht vorhanden)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Supabase CLI installieren
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

#### macOS/Linux:
```bash
# Mit Homebrew (macOS)
brew install supabase/tap/supabase

# Mit npm (alle Plattformen) - nicht empfohlen
# Siehe https://github.com/supabase/cli#install-the-cli
```

### Schritt 2: Login und Projekt-Verknüpfung
```bash
# Bei Supabase anmelden
supabase login

# Projekt verknüpfen
supabase link --project-ref lpxagwasrquoiknmkccw
```

### Schritt 3: OpenAI API Key setzen
```bash
supabase secrets set OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Schritt 4: Edge Function deployen
```bash
supabase functions deploy extract-recipe
```

### Oder: Automatisches Deployment mit Skript
```powershell
# PowerShell
.\deploy-edge-function.ps1
```

---

## Methode 2: Supabase Web Dashboard (Manuell)

### Schritt 1: Zum Supabase Dashboard navigieren
1. Öffnen Sie: https://supabase.com/dashboard
2. Wählen Sie das Projekt **recipe-simplify**
3. Gehen Sie zu **Edge Functions** im linken Menü

### Schritt 2: Neue Function erstellen
1. Klicken Sie auf **"Create a new function"**
2. Name: `extract-recipe`
3. Wählen Sie **"Create function"**

### Schritt 3: Code einfügen
1. Öffnen Sie die Datei `supabase/functions/extract-recipe/index.ts`
2. Kopieren Sie den gesamten Code
3. Fügen Sie ihn im Web-Editor ein
4. Klicken Sie auf **"Deploy"**

### Schritt 4: Environment Variable (Secret) setzen
1. Gehen Sie zu **Project Settings** → **Edge Functions**
2. Scrollen Sie zu **"Secrets"**
3. Klicken Sie auf **"Add Secret"**
4. Name: `OPENAI_API_KEY`
5. Value: Ihr OpenAI API Key (beginnt mit `sk-`)
6. Klicken Sie auf **"Save"**

### Schritt 5: Function aktivieren
1. Zurück zu **Edge Functions**
2. Stellen Sie sicher, dass `extract-recipe` aktiviert ist
3. Notieren Sie sich die Function URL

---

## Methode 3: GitHub Integration (CI/CD)

### Voraussetzungen
- GitHub Repository
- Supabase Access Token

### Schritt 1: GitHub Secrets konfigurieren
In Ihrem GitHub Repository unter **Settings** → **Secrets and variables** → **Actions**:

1. `SUPABASE_ACCESS_TOKEN`: Ihr Supabase Access Token
   - Erstellen unter: https://supabase.com/dashboard/account/tokens
2. `SUPABASE_PROJECT_ID`: `lpxagwasrquoiknmkccw`
3. `OPENAI_API_KEY`: Ihr OpenAI API Key

### Schritt 2: GitHub Actions Workflow erstellen
Erstellen Sie `.github/workflows/deploy-edge-function.yml`:

```yaml
name: Deploy Edge Function

on:
  push:
    branches:
      - main
    paths:
      - 'supabase/functions/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: supabase/setup-cli@v1
        with:
          version: latest

      - name: Deploy Edge Function
        run: |
          supabase functions deploy extract-recipe --project-ref ${{ secrets.SUPABASE_PROJECT_ID }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}

      - name: Set OpenAI API Key
        run: |
          supabase secrets set OPENAI_API_KEY=${{ secrets.OPENAI_API_KEY }} --project-ref ${{ secrets.SUPABASE_PROJECT_ID }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

### Schritt 3: Push to GitHub
```bash
git add .
git commit -m "Add edge function for recipe extraction"
git push origin main
```

Die Function wird automatisch bei jedem Push deployed!

---

## Verification - Function testen

### Methode 1: Mit Node.js
```bash
node test-edge-function.js
```

### Methode 2: Mit curl
```bash
curl -X POST \
  https://lpxagwasrquoiknmkccw.supabase.co/functions/v1/extract-recipe \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.allrecipes.com/recipe/16354/easy-meatloaf/"}'
```

### Methode 3: Mit Browser
1. Öffnen Sie `test-page.html` in einem Browser
2. Tragen Sie Ihren Supabase Anon Key im Script ein
3. Geben Sie eine Rezept-URL ein und testen Sie

---

## Troubleshooting

### Problem: "Command not found: supabase"
**Lösung:** Supabase CLI ist nicht installiert oder nicht im PATH. Siehe Installationsanleitung oben.

### Problem: "Not logged in"
**Lösung:** 
```bash
supabase login
```

### Problem: "OpenAI API key not configured"
**Lösung:**
```bash
supabase secrets set OPENAI_API_KEY=sk-your-key-here
```

### Problem: "CORS error" beim Testen
**Lösung:** Die Function enthält bereits CORS-Header. Stellen Sie sicher, dass Sie einen gültigen Anon Key verwenden.

### Problem: "Failed to fetch website"
**Lösung:** 
- Überprüfen Sie, ob die URL korrekt ist
- Manche Websites blockieren automatisierte Requests
- Versuchen Sie eine andere Rezept-Website

---

## Nächste Schritte

Nach erfolgreichem Deployment:

1. ✅ Function ist deployed
2. 🔲 Holen Sie Ihren Supabase Anon Key:
   - Dashboard → Settings → API → anon public key
3. 🔲 Testen Sie die Function mit `test-page.html`
4. 🔲 Integrieren Sie die Function in Ihre Anwendung
5. 🔲 Erstellen Sie die Datenbank-Schema für Rezepte
6. 🔲 Entwickeln Sie das Frontend

## Hilfreiche Links

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli/introduction)
- [OpenAI API Docs](https://platform.openai.com/docs)

