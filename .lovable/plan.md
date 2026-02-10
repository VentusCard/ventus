
# Update /app Page Copy to Reflect Actual App Experience

## Overview
Rewrite the page copy to accurately describe what Ventus does today: it is sports-focused, lets you pick a sport (e.g., Golf), then finds deals across every subcategory (balls, clubs, accessories, apparel) in one place. It also highlights two key features: the AI bot that keeps a wishlist and hunts for specific deals on demand, and the Ventus team's hand-curated "Interesting Finds."

## Changes (all in `src/pages/AppDownload.tsx`)

### 1. Hero Section
- **Headline**: "Pick Your Sport. We Find Every Deal."
- **Subtitle**: "Choose a sport you love, like golf, tennis, or running, and Ventus instantly pulls together deals on equipment, apparel, accessories, and more. All in one place, all free."

### 2. Social Proof Bar
- Update labels to be more specific:
  - "4.8" / "App Store Rating"
  - "10,000+" / "Deals Across Every Sport"
  - "100%" / "Free, No Catches"

### 3. How It Works (rewrite all 3 steps)
- **Step 1 -- "Pick Your Sport"**: "Select a sport like Golf, Tennis, Running, or Fitness. Ventus organizes everything around the sports you care about."
- **Step 2 -- "See Deals Across Every Subcategory"**: "Picked Golf? We find deals on balls, clubs, bags, gloves, apparel, and accessories, all from top brands, organized in one feed."
- **Step 3 -- "Wishlist It or Browse Curated Finds"**: "Add items to your wishlist and our AI bot hunts for deals on exactly what you want. Plus, the Ventus team hand-picks 'Interesting Finds' you might love."

### 4. Feature Highlights (rewrite all 4)
- **AI Wishlist Bot** (replaces Smart Matching): "Add any item to your wishlist, like a new driver or running shoes, and our AI bot scans for the best deals and alerts you when it finds one."
- **Interesting Finds** (replaces Exclusive Offers): "Our team hand-curates standout deals and hidden gems across sports categories, so you never miss something great."
- **Every Subcategory Covered** (replaces Instant Alerts): "From balls and clubs to apparel and accessories, Ventus covers every corner of your sport so you do not have to search multiple sites."
- **Free and Private** (replaces Bank-Level Security): "No subscriptions, no hidden fees, no selling your data. Ventus is 100% free and your information stays yours."

### 5. Section Subtitles
- How It Works: "From download to deals in under a minute"
- Why Ventus: "Built for people who love their sport and love a good deal"

### 6. Final CTA
- Headline: "Your Sport. Your Deals. One App."
- Subtitle: "Download Ventus and let AI find every deal across your favorite sport, or tell it exactly what you are looking for."

## Technical Details
- Only `src/pages/AppDownload.tsx` is modified
- All changes are text/copy updates within existing data arrays and JSX strings
- No layout, structural, or styling changes
- Icon swaps: replace `Zap` usage in features with a `Heart` or `Search` icon for the Wishlist Bot card, and keep `Gift` for Interesting Finds (import adjustments as needed from lucide-react)
