
# Apply Glass Transition Effect Across the Site

## Overview
Apply the `.glass-transition-card` class to create a consistent glass transition effect on hover across all interactive cards throughout the site. This will unify the premium visual aesthetic.

## Cards to Update

### 1. VentusAI Page - Feature Cards
**File:** `src/pages/VentusAI.tsx` (lines 83-103)

**Current classes:**
```
p-6 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 transition-all duration-300
```

**New classes:**
```
glass-transition-card p-6 rounded-xl
```

Six feature cards will receive the glass effect.

---

### 2. VentusAI Page - CTA Card
**File:** `src/pages/VentusAI.tsx` (line 116)

**Current classes:**
```
max-w-4xl mx-auto p-8 md:p-12 bg-card border border-border/50 shadow-lg
```

**New classes:**
```
glass-transition-card max-w-4xl mx-auto p-8 md:p-12
```

---

### 3. Benefits Page - Pricing Tier Cards
**File:** `src/components/Benefits.tsx` (lines 65-87)

**Current classes:**
```
bg-card border-border [+ highlighted ring styles]
```

**New classes:**
```
glass-transition-card [+ highlighted ring styles]
```

Three pricing tier cards will receive the effect.

---

### 4. Partners Page - Tool Cards
**File:** `src/components/partners/PartnerToolsSection.tsx` (lines 176-228)

**Current classes:**
```
group hover:shadow-xl transition-all duration-500 border-border bg-card hover:scale-[1.02] animate-fade-in overflow-hidden relative
```

**New classes:**
```
glass-transition-card group animate-fade-in overflow-hidden relative
```

Six partner tool cards will receive the effect.

---

### 5. JoinWaitlist Page - Form Card
**File:** `src/pages/JoinWaitlist.tsx` (line 116)

**Current classes:**
```
bg-card border-border overflow-hidden mx-2 md:mx-0 rounded-xl
```

**New classes:**
```
glass-transition-card overflow-hidden mx-2 md:mx-0 rounded-xl
```

---

## Technical Summary

| Page | Component | Cards Count |
|------|-----------|-------------|
| `/ventus-ai` | Feature grid | 6 |
| `/ventus-ai` | CTA section | 1 |
| `/benefits` | Pricing tiers | 3 |
| `/partners` | Tool cards | 6 |
| `/waitlist` | Form card | 1 |
| **Total** | | **17 cards** |

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/VentusAI.tsx` | Apply class to 6 feature cards + 1 CTA card |
| `src/components/Benefits.tsx` | Apply class to 3 pricing tier cards |
| `src/components/partners/PartnerToolsSection.tsx` | Apply class to 6 tool cards |
| `src/pages/JoinWaitlist.tsx` | Apply class to form card |

## Effect Behavior
All cards will share the same premium glass transition:
- Smooth 0.4s transition on hover
- Semi-transparent background with 20px blur
- Subtle gradient overlay fade-in
- Primary color border glow
- Slight lift with scale and translateY
- Premium shadow appearance
