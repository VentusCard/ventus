

# Redesign /app Page for First-Time Visitor Conversion (Keep All Elements)

## Overview
Restructure the existing page for clarity and conversion without removing any content. All current elements stay -- hero copy, feature pills, download buttons, app screenshots, How It Works section, and Footer. The focus is on reordering, tightening copy, and improving visual hierarchy so the download action is unmissable.

## What Changes

### 1. Hero copy -- punchier, scannable
- Shorten the headline to **"Free Deals, Matched to You"**
- Replace the long paragraph with a concise single-line value prop: **"AI finds personalized deals from thousands of brands, matched to your lifestyle. Free forever."**
- Keep the eyebrow text but update to **"Your Free AI Deal Finder"**

### 2. Reorder hero content for faster conversion
- Move download buttons **above** the feature pills so the primary CTA is higher on the page
- Add a small trust line below the buttons: "No credit card required"
- Feature pills remain below the buttons as supporting proof points

### 3. Hero height optimization
- Change `min-h-screen` to `min-h-[85vh]` so the How It Works section peeks above the fold, inviting scroll
- Follows the existing landing-page-visual-flow-standard from project memory

### 4. How It Works -- stays, gets tighter
- Keep the full 3-card grid section
- Reduce section padding from `py-16 md:py-20` to `py-12 md:py-16` per the spacing-and-density standard
- Keep all card content, titles, and descriptions as-is

### 5. Footer stays
- No changes to the Footer component

## Technical Details

### File: `src/pages/AppDownload.tsx`
- Update eyebrow text (line 53)
- Update h1 text (lines 55-57)
- Update paragraph text (lines 59-61)
- Move download buttons div (lines 77-105) above the feature pills div (lines 64-74)
- Add a trust line `<p>` ("No credit card required") below the download buttons
- Change hero section `min-h-screen` to `min-h-[85vh]` (line 41)
- Reduce How It Works section padding (line 128)

### No other files changed
