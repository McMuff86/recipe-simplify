# Projekt-Struktur - Recipe Simplify

## 📁 Übersicht

```
recipe-simple/
├── .github/                    # GitHub Actions & CI/CD
│   └── workflows/
│       └── deploy-edge-function.yml
│
├── .cursor/                    # Cursor IDE Konfiguration
│   └── mcp.json
│
├── docs/                       # 📚 Dokumentation
│   ├── CONFIG.md              # Konfigurations-Guide
│   ├── DATABASE-SCHEMA.md     # Datenbank-Schema Dokumentation
│   ├── DEPLOYMENT-GUIDE.md    # Deployment-Anleitung
│   ├── NEXT-STEPS.md          # Nächste Schritte
│   ├── README-EdgeFunction.md # Edge Function Details
│   └── STATUS.md              # Projekt-Status
│
├── examples/                   # 💡 Beispiel-Code
│   └── save-recipe-example.js # Workflow: Extract + Save
│
├── scripts/                    # 🔧 Deployment & Utility Scripts
│   └── deploy-edge-function.ps1
│
├── supabase/                   # ⚡ Backend (Supabase)
│   └── functions/
│       └── extract-recipe/
│           └── index.ts       # Edge Function für Rezept-Extraktion
│
├── tests/                      # 🧪 Tests
│   ├── test-edge-function.js  # Allgemeiner Test
│   ├── test-hotwings.js       # Hot Wings Sauce Test
│   └── test-page.html         # Browser-basierter Test
│
├── frontend/                   # 🎨 Frontend App (Next.js)
│   └── (wird erstellt)
│
├── .gitignore                  # Git Ignore Regeln
├── Agents.md                   # 📖 Haupt-Projekt-Dokumentation
├── package.json                # Node.js Konfiguration
├── PROJECT-STRUCTURE.md        # 📁 Diese Datei
└── README.md                   # ⭐ Haupt-README
```

## 📚 Dokumentation (`docs/`)

Alle Dokumentations-Dateien sind hier zentral organisiert:

- **CONFIG.md** - Konfigurations-Guide für API Keys und Secrets
- **DATABASE-SCHEMA.md** - Vollständige Datenbank-Dokumentation
- **DEPLOYMENT-GUIDE.md** - Schritt-für-Schritt Deployment-Anleitung
- **NEXT-STEPS.md** - Was als nächstes zu tun ist
- **README-EdgeFunction.md** - Technische Details zur Edge Function
- **STATUS.md** - Aktueller Projekt-Status und Test-Ergebnisse

## 💡 Beispiele (`examples/`)

Praktische Beispiele für die Verwendung der API:

- **save-recipe-example.js** - Komplettes Workflow-Beispiel:
  - Rezept von URL extrahieren
  - In Datenbank speichern
  - Aus Datenbank abrufen

## 🔧 Scripts (`scripts/`)

Deployment und Utility Scripts:

- **deploy-edge-function.ps1** - Automatisiertes PowerShell-Skript für Edge Function Deployment

## ⚡ Backend (`supabase/`)

Supabase Backend-Code:

- **functions/extract-recipe/** - Edge Function zur Rezept-Extraktion
  - Verwendet OpenAI GPT-4o-mini
  - Extrahiert: Title, Description, Ingredients, Method
  - CORS-enabled für Web-Zugriff

## 🧪 Tests (`tests/`)

Test-Dateien für verschiedene Szenarien:

- **test-edge-function.js** - Allgemeiner Node.js Test
- **test-hotwings.js** - Getestet mit Buffalo Hot Wings Sauce ✅
- **test-page.html** - Interaktiver Browser-Test mit UI

## 🎨 Frontend (`frontend/`)

Das Frontend wird hier erstellt (Next.js):
- React-basierte Web-Anwendung
- Integration mit Supabase
- Rezept-Extraktion und -Verwaltung

## 🚀 npm Scripts

Verfügbare Scripts in `package.json`:

```bash
# Tests ausführen
npm test                # Allgemeiner Edge Function Test
npm run test:hotwings   # Hot Wings Sauce Test

# Edge Function deployen
npm run deploy

# Frontend (nach Erstellung)
npm run dev            # Development Server
npm run build          # Production Build
```

## 📖 Haupt-Dokumentation

- **README.md** - Haupt-README mit Quick Start
- **Agents.md** - Vollständige Projekt-Übersicht und Dokumentation
- **PROJECT-STRUCTURE.md** - Diese Datei

## 🎯 Navigations-Guide

### "Ich möchte..."

**...das Projekt verstehen**
→ Lies `README.md` und `Agents.md`

**...die Edge Function deployen**
→ Lies `docs/DEPLOYMENT-GUIDE.md`
→ Führe aus: `npm run deploy`

**...die Datenbank verstehen**
→ Lies `docs/DATABASE-SCHEMA.md`

**...die API konfigurieren**
→ Lies `docs/CONFIG.md`

**...Tests ausführen**
→ `npm test` oder öffne `tests/test-page.html`

**...ein Beispiel sehen**
→ Schau dir `examples/save-recipe-example.js` an

**...den aktuellen Status wissen**
→ Lies `docs/STATUS.md`

**...wissen was als nächstes kommt**
→ Lies `docs/NEXT-STEPS.md`

## 🔄 Workflow

### 1. Development Workflow

```bash
# 1. Code ändern
# 2. Testen
npm test

# 3. Edge Function deployen
npm run deploy

# 4. Frontend entwickeln
npm run dev
```

### 2. Neue Feature hinzufügen

```bash
# 1. Branch erstellen
git checkout -b feature/neue-funktion

# 2. Code schreiben in entsprechendem Ordner
#    - Backend: supabase/functions/
#    - Frontend: frontend/
#    - Tests: tests/

# 3. Testen
npm test

# 4. Commit & Push
git add .
git commit -m "Add neue-funktion"
git push
```

### 3. Test Workflow

```bash
# Edge Function testen
npm test

# Spezifischer Test
npm run test:hotwings

# Browser-Test
# Öffne: tests/test-page.html
```

## 📦 Dependencies

### Root-Level
- Node.js 18+
- npm/yarn

### Backend (Edge Functions)
- Deno (automatisch von Supabase)
- OpenAI API Key

### Frontend (wird erstellt)
- Next.js
- React
- @supabase/supabase-js
- TailwindCSS (geplant)

## 🎨 Code-Organisation

### Backend
- Alle Supabase Edge Functions in `supabase/functions/`
- Jede Function in eigenem Unterordner
- TypeScript für Type Safety

### Frontend
- Wird in `frontend/` erstellt
- Komponenten-basierte Architektur
- Trennung von UI und Business Logic

### Tests
- Unit Tests für Edge Functions
- Integration Tests für Datenbank
- E2E Tests im Browser

### Dokumentation
- Markdown-Format
- Zentral in `docs/`
- Verlinkt von `README.md` und `Agents.md`

## 🔐 Sensitive Daten

### Nie committen:
- `.env` Dateien (in `.gitignore`)
- API Keys
- Secrets
- Service Role Keys

### Sicher speichern:
- Supabase Secrets für Edge Functions
- GitHub Secrets für CI/CD
- Lokale `.env` für Development

## 🚧 Ordnung halten

### Regeln:
1. ✅ Dokumentation → `docs/`
2. ✅ Beispiele → `examples/`
3. ✅ Scripts → `scripts/`
4. ✅ Tests → `tests/`
5. ✅ Backend → `supabase/`
6. ✅ Frontend → `frontend/`
7. ✅ Root nur für zentrale Dateien (README, package.json, etc.)

### Neue Dateien:
- Überlege zuerst: Wo gehört diese Datei hin?
- Dokumentation → `docs/`
- Test → `tests/`
- Beispiel → `examples/`
- Tool/Script → `scripts/`

## 📊 Statistik

- **Gesamt:** ~20 Dateien (ohne node_modules, .git)
- **Dokumentation:** 6 Dateien in `docs/`
- **Tests:** 3 Dateien in `tests/`
- **Backend:** 1 Edge Function
- **Scripts:** 1 Deployment-Script
- **Beispiele:** 1 Workflow-Beispiel

---

**Letzte Aktualisierung:** 12. November 2025

Diese Struktur macht das Projekt übersichtlich, wartbar und leicht erweiterbar! 🚀

