

# Remake /app Page -- App Store Style, Clean, Social Proof

## Overview
Rebuild the page from scratch with an App Store listing feel: clean white space, prominent app screenshots, star ratings, user counts, concise feature bullets, and clear download CTAs. The page will be minimal yet trust-heavy.

## Page Structure (top to bottom)

### 1. Navbar (unchanged)

### 2. Hero Section
- **Left side**: Clean, minimal text stack
  - Small app icon placeholder + "Ventus" app name + star rating (4.8 stars, styled inline)
  - Headline: **"Free Deals, Matched to Your Lifestyle"**
  - One-line subtitle: "AI finds personalized offers from thousands of brands. Free forever."
  - Download buttons (App Store + Google Play, existing dark style)
  - Trust line: "No credit card required"
- **Right side**: App screenshots image (existing asset, slightly smaller)
- Height: `min-h-[85vh]` per project standard

### 3. Social Proof Bar
- Horizontal strip with 3 stats in a row, centered
  - "4.8 Star Rating" | "10,000+ Deals" | "100% Free"
- Clean dividers between items, subtle background

### 4. How It Works (3 steps, kept but restyled)
- Keep the existing 3 steps content (Pick Passions, AI Curates, All in One Place)
- Restyle as a horizontal numbered list with small icons, more compact than current cards
- Clean white cards with subtle shadows instead of backdrop-blur

### 5. Feature Highlights
- Reuse the 4 feature items (Smart Matching, Instant Alerts, Bank-Level Security, Exclusive Offers)
- Display as a 2x2 grid of minimal cards with icon + title + short description
- Scroll-triggered fade-in animations per project standard

### 6. Final CTA Section
- Centered block: "Ready to save?" + download buttons repeated
- Trust line below

### 7. Footer (unchanged)

## Technical Details

### File: `src/pages/AppDownload.tsx`
- Full rewrite of the component
- Add `Star` icon import from lucide-react
- Add `motion` import from framer-motion for scroll animations
- Keep existing imports: Navbar, Footer, appScreensPreview, Button
- Keep existing App Store / Google Play URLs
- Structure as 5 sections: Hero, Social Proof Bar, How It Works, Features Grid, Final CTA
- Use project conventions: `max-w-7xl`, `px-4 md:px-8`, Tailwind utilities
- Follow spacing standard: `py-12 md:py-16` for sections
- Scroll-triggered animations using framer-motion `whileInView` with staggered delays

### No other files changed
