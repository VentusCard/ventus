

# Enhance `/app` Landing Page

## Summary
Update `src/pages/ventus-app/VentusLanding.tsx` to position the app as a deals aggregator built as the first step toward the Ventus Card. Frame it as "we built this so you can start saving now."

## Changes (single file: `VentusLanding.tsx`)

### A. Hero Copy Updates
- Tagline: "Ventus helps you to" becomes **"Start saving before the card"**
- Subtitle rewritten: "We built the Ventus app so you can start discovering deals today. AI-powered, organized by your lifestyle -- and when the Ventus Card launches, everything connects."
- Feature pills updated: "AI-Powered Deals", "Cross-Category Deals", "Weekly Curated Finds"

### B. New Section: "How It Works" (below hero)
3-column grid:
1. **Pick Your Sports** -- Tell us what you love. We organize deals around your lifestyle.
2. **Everything in One Place** -- All deals from every merchant for your sport, in one feed.
3. **AI Search + Weekly Finds** -- Chat with our AI to find specific deals, or get a weekly digest.

### C. New Section: "The Ventus Journey" (below How It Works)
3-step roadmap connecting app to card:
1. **Now: The App** -- Discover cross-category deals organized by your interests.
2. **Soon: The Card** -- Your spending unlocks personalized deals tied to your lifestyle.
3. **Together** -- The app learns what you love. The card rewards you for it.

Subtle connecting line between steps, framer-motion scroll animations.

## Technical Details

### Single file modified
`src/pages/ventus-app/VentusLanding.tsx`

### Implementation
- Import `motion` from `framer-motion` and additional lucide icons (Target, LayoutGrid, Bot, CreditCard, Layers)
- Update hero text and feature pills array
- Add two new `<section>` elements between the hero closing and `<Footer />`
- Use existing design tokens: bg-background, bg-card, text-foreground, text-muted-foreground, border-border, text-primary
- Responsive: 1-col mobile, 3-col desktop (grid-cols-1 md:grid-cols-3)
- framer-motion `whileInView` fade-in for scroll animations
- No new files or dependencies

