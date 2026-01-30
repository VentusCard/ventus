
# Add Free Alternative Font for Hero Headline

## Overview

Adding **Orbitron** as a free Google Font alternative to Horizon. Orbitron has the same geometric, futuristic, all-caps aesthetic that matches logo typography.

---

## Font Comparison

| Font | Style | Best For |
|------|-------|----------|
| **Orbitron** ✓ | Futuristic, geometric, squared | Logo-style headlines |
| Rajdhani | Modern, clean, lighter | Body/subheadings |
| Michroma | Futuristic, condensed | Compact displays |

**Recommendation:** Orbitron - closest match to Horizon's geometric, squared letterforms.

---

## Implementation

### Step 1: Add Google Font Import

**File:** `index.html`

Add Orbitron to the existing Google Fonts link:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Orbitron:wght@400;500;600;700;800;900&family=Rubik:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Step 2: Register in Tailwind Config

**File:** `tailwind.config.ts`

Add `logo` font family:
```typescript
fontFamily: {
  sans: ['"Rubik"', 'system-ui', '-apple-system', 'sans-serif'],
  display: ['"Rubik"', 'system-ui', 'sans-serif'],
  logo: ['"Orbitron"', 'system-ui', 'sans-serif'],  // NEW
  mono: ['"DM Mono"', 'SF Mono', 'Monaco', 'monospace'],
},
```

### Step 3: Apply to Hero Headline

**File:** `src/pages/OnboardingFlow.tsx` (line 160)

```tsx
// Current:
<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 lg:mb-4 text-foreground animate-fadeUpSoft opacity-0"

// Proposed:
<h1 className="font-logo text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 lg:mb-4 text-foreground animate-fadeUpSoft opacity-0 tracking-wider"
```

---

## Visual Result

```text
Before (Rubik):
  One Card. Your Lifestyle.

After (Orbitron):
  ONE CARD. YOUR LIFESTYLE.
  ▲ Geometric, squared letterforms
  ▲ Futuristic tech aesthetic
  ▲ Matches logo style
```

---

## Files to Modify

1. `index.html` - Add Orbitron to Google Fonts import
2. `tailwind.config.ts` - Add `font-logo` family mapping
3. `src/pages/OnboardingFlow.tsx` - Apply `font-logo` and `tracking-wider` to H1
