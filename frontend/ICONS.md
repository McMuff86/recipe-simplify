# Icons & SVGs - Recipe Simplify

## 📍 Wo befinden sich die Icons?

Die Icons sind **inline SVGs** von **[Heroicons](https://heroicons.com/)** - direkt im JSX Code eingebettet, **keine separaten Dateien**.

## 🎨 Verwendete Icons

### Navigation & Layout

**Book Icon** (Logo)
```tsx
// Verwendet in: layout.tsx
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
</svg>
```

**GitHub Icon**
```tsx
// Verwendet in: layout.tsx (Footer)
<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484..." clipRule="evenodd" />
</svg>
```

### Home Page

**Search Icon** (Extract Recipe Button)
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
```

**Archive/Collection Icon** (View Collection Button)
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
</svg>
```

**Monitor Icon** (AI Feature)
```tsx
<svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>
```

**Lightning Icon** (Speed Feature)
```tsx
<svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
</svg>
```

**Archive Icon** (Collection Feature)
```tsx
<svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
</svg>
```

### Extract Page

**Clipboard Icon** (Ingredients)
```tsx
<svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
</svg>
```

**Clipboard Check Icon** (Method Steps)
```tsx
<svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
</svg>
```

**Download Icon** (Save to Collection)
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
</svg>
```

### Recipes Page & Cards

**Plus Icon** (Add Recipe)
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
</svg>
```

**External Link Icon** (View Source)
```tsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
</svg>
```

**ChevronDown Icon** (Show Details)
```tsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
</svg>
```

**ChevronUp Icon** (Hide Details)
```tsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
</svg>
```

**Trash Icon** (Delete Recipe)
```tsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
```

**X Icon** (Clear Search)
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
</svg>
```

## 🎯 Icon Eigenschaften

### Sizing
```tsx
w-4 h-4   // 16px - Small (Card elements)
w-5 h-5   // 20px - Medium (Buttons)
w-6 h-6   // 24px - Large (Features, Logo)
w-8 h-8   // 32px - XL (Hero elements)
```

### Colors
```tsx
text-accent           // Grün für wichtige Elemente
text-text-primary     // Primäre Textfarbe
text-text-secondary   // Sekundäre Textfarbe
text-error           // Rot für Fehler/Löschen
currentColor         // Erbt Farbe vom Parent
```

### Styling
```tsx
stroke="currentColor"     // Outline Icons (meist verwendet)
fill="currentColor"       // Solid Icons (GitHub)
strokeWidth={2}          // Linienstärke
strokeLinecap="round"    // Abgerundete Enden
strokeLinejoin="round"   // Abgerundete Ecken
```

## 📚 Ressourcen

### Heroicons
- **Website:** https://heroicons.com/
- **Lizenz:** MIT (kostenlos)
- **Versionen:** Outline, Solid, Mini
- **Integration:** Copy/Paste SVG Code

### Alternativen
- **Lucide Icons:** https://lucide.dev/ (React Components)
- **Phosphor Icons:** https://phosphoricons.com/
- **Feather Icons:** https://feathericons.com/
- **Font Awesome:** https://fontawesome.com/ (v6+ React)

## 🛠️ Wie man Icons hinzufügt

### 1. Heroicons Website besuchen
```
https://heroicons.com/
```

### 2. Icon suchen
Suche nach z.B. "search", "heart", "user"

### 3. SVG Code kopieren
Klick auf "Copy SVG" (Outline Version)

### 4. In Code einfügen
```tsx
<svg 
  className="w-5 h-5 text-accent" 
  fill="none" 
  stroke="currentColor" 
  viewBox="0 0 24 24"
>
  <path ... />
</svg>
```

### 5. Anpassen
```tsx
className="w-5 h-5 text-accent"  // Größe & Farbe
```

## 💡 Best Practices

### ✅ Do:
- Verwende `currentColor` für automatische Farbvererbung
- Konsistente Größen (w-4, w-5, w-6)
- Outline Icons für UI-Elemente
- Solid Icons nur für Logos/Branding
- Accessibility: `aria-label` für Icon-only Buttons

### ❌ Don't:
- Zu viele verschiedene Größen mischen
- Icons ohne Kontext (immer mit Text oder Label)
- Zu dicke/dünne strokeWidth
- Icons als Bilder laden (performance!)

## 🎨 Icon als React Component (Optional)

Für häufig verwendete Icons:

```tsx
// components/icons/SearchIcon.tsx
export function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

// Verwendung:
import { SearchIcon } from '@/components/icons/SearchIcon';
<SearchIcon className="w-6 h-6 text-accent" />
```

## 📊 Icon Übersicht

| Icon | Verwendung | Datei | Farbe |
|------|-----------|-------|-------|
| 📚 Book | Logo | layout.tsx | text-primary |
| 🔍 Search | Suche | page.tsx, recipes/page.tsx | accent |
| 📦 Archive | Collection | page.tsx, RecipeCard | accent |
| ⚡ Lightning | Features | page.tsx | accent |
| 💻 Monitor | Features | page.tsx | accent |
| 📋 Clipboard | Ingredients | extract/page.tsx | accent |
| ✅ Check | Method | extract/page.tsx | accent |
| 💾 Download | Save | extract/page.tsx | white |
| ➕ Plus | Add | recipes/page.tsx | white |
| 🔗 External | Link | RecipeCard | accent |
| 🗑️ Trash | Delete | RecipeCard | error |
| ↕️ Chevron | Toggle | RecipeCard | text-primary |
| ❌ X | Clear | recipes/page.tsx | text-secondary |

---

**Icons von:** [Heroicons](https://heroicons.com/) - MIT License  
**Design:** Tailwind Labs

