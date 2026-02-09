

# Fix Coloring on /partners Page

## Issues Identified
1. **Glass-transition-card hover effect** -- The tool cards use `glass-transition-card` which transitions to a white/glassy appearance on hover (`hsl(0 0% 100% / 0.08)` background with white borders), creating a jarring contrast against the dark theme
2. **Section background consistency** -- The hero and tools sections use the default `bg-background` but the sections themselves don't explicitly set backgrounds, potentially causing subtle inconsistencies

## Changes

### 1. PartnerToolsSection.tsx
- Replace `glass-transition-card` on the tool cards with a dark-theme-consistent hover effect using Tailwind classes directly (e.g., `bg-card border-border hover:border-primary/30 transition-all duration-300`)
- This keeps hover feedback without the white glass effect

### 2. PartnerHero.tsx
- Ensure the hero section explicitly uses `bg-background` for consistency

### 3. Partners.tsx
- Add `bg-background` to the wrapper div to ensure the entire page has a consistent base color

## Technical Details

**PartnerToolsSection.tsx (line 178)**
Change the Card className from:
```
glass-transition-card group animate-fade-in overflow-hidden relative
```
to:
```
bg-card border-border hover:border-primary/30 transition-all duration-300 group animate-fade-in overflow-hidden relative
```

This removes the white glass hover effect and replaces it with a subtle blue border glow on hover that matches the dark theme's primary color accent.

