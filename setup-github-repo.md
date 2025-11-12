# GitHub Repository Setup - Recipe Simplify

## ✅ Was wurde bereits gemacht:

- ✅ Git Repository lokal initialisiert
- ✅ Alle 19 Dateien hinzugefügt
- ✅ Erster Commit erstellt: "Initial commit: Recipe Simplify project with Supabase Edge Function and Database Schema"
- ✅ 3003 Zeilen Code committed

## 🚀 Nächste Schritte:

### Option 1: Repository manuell auf GitHub erstellen (Einfach)

1. **Gehen Sie zu:** https://github.com/new

2. **Repository-Details:**
   - **Repository name:** `recipe-simplify`
   - **Description:** `Recipe extraction and management system using Supabase, OpenAI, and Next.js`
   - **Visibility:** Public (oder Private)
   - **❌ NICHT "Initialize with README" ankreuzen** (wir haben bereits einen)

3. **Klicken Sie auf:** "Create repository"

4. **Dann führen Sie diese Befehle aus:**

```bash
# Remote hinzufügen
git remote add origin https://github.com/McMuff86/recipe-simplify.git

# Zum main branch wechseln (falls noch master)
git branch -M main

# Pushen
git push -u origin main
```

### Option 2: Automatisch mit PowerShell

Führen Sie das Skript `push-to-github.ps1` aus:

```powershell
.\push-to-github.ps1
```

---

## 📊 Commit-Details

**Commit Hash:** 2de07dc  
**Branch:** main  
**Dateien:** 19  
**Änderungen:** 3003 Zeilen

### Inkludierte Dateien:

```
✅ .cursor/mcp.json
✅ .github/workflows/deploy-edge-function.yml
✅ .gitignore
✅ Agents.md
✅ PROJECT-STRUCTURE.md
✅ README.md
✅ docs/CONFIG.md
✅ docs/DATABASE-SCHEMA.md
✅ docs/DEPLOYMENT-GUIDE.md
✅ docs/NEXT-STEPS.md
✅ docs/README-EdgeFunction.md
✅ docs/STATUS.md
✅ examples/save-recipe-example.js
✅ package.json
✅ scripts/deploy-edge-function.ps1
✅ supabase/functions/extract-recipe/index.ts
✅ tests/test-edge-function.js
✅ tests/test-hotwings.js
✅ tests/test-page.html
```

---

## ⚡ Quick Command (nach Repository-Erstellung)

```bash
git remote add origin https://github.com/McMuff86/recipe-simplify.git && git branch -M main && git push -u origin main
```

---

## 🔧 Troubleshooting

### Problem: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/McMuff86/recipe-simplify.git
```

### Problem: "Permission denied"
Stellen Sie sicher, dass Sie eingeloggt sind:
```bash
git config --global user.name "McMuff86"
git config --global user.email "your-email@example.com"
```

### Problem: "failed to push"
```bash
# Force push (nur beim ersten Mal OK)
git push -u origin main --force
```

---

## ✨ Nach dem Push

Ihr Repository wird verfügbar sein unter:
**https://github.com/McMuff86/recipe-simplify**

Dann können Sie:
- ✅ GitHub Actions wird automatisch die Edge Functions deployen
- ✅ Issues und Pull Requests verwalten
- ✅ Collaborators einladen
- ✅ GitHub Pages aktivieren (für Dokumentation)

