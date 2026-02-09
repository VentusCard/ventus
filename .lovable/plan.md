

# Deepen Content for Gamers, Creatives, and Homeowners

## What Needs Fixing

The Year Two pillars have noticeably less content depth compared to the first three. Here is the gap analysis:

### 1. Subcategories (biggest gap)
- Sports has 12, Wellness has 9, Pets has 9
- Gamers has 5, Creatives has 5, Homeowners has 5
- **Fix**: Expand each to 8-9 subcategories

### 2. Example Deals per subcategory
- First 3 pillars have 6 deals each (including a premium VIP-tier deal)
- Last 3 pillars have only 5 deals each
- **Fix**: Add a 6th VIP/exclusive deal to every subcategory in gamers, creatives, and homeowners

### 3. Item descriptions in CategoryData
- First 3 pillars use descriptive items ("Gym memberships and fitness gear", "Recovery tools")
- Last 3 pillars use single-word items ("Games", "Hardware", "Subscriptions")
- **Fix**: Expand item descriptions to be more specific and compelling

## Changes

### File: `src/components/onboarding-flow/StepOneMerged.tsx`

Update `subcategoryData` for the 3 pillars:

**Gamers** (5 to 9):
- PC Gaming, Console Gaming, Mobile Gaming, Esports and Streaming, Gaming Accessories
- ADD: VR and AR Gaming, Retro and Collectible Gaming, Game Development, Gaming Nutrition and Lifestyle

**Creatives** (5 to 9):
- Photography, Music Production, Art Supplies, Writing Tools, Online Creative Classes
- ADD: Video and Film Production, Graphic Design, Crafting and DIY, Creative Community and Events

**Homeowners** (5 to 8):
- Home Improvement, Smart Home Tech, Furniture and Decor, Gardening and Outdoors, Home Services
- ADD: Home Security and Safety, Kitchen and Appliances, Energy and Sustainability

### File: `src/components/onboarding/step-three/ExampleDealsData.ts`

Add a 6th VIP-tier deal to all existing gamers/creatives/homeowners subcategories, plus add deal arrays for the new subcategories. Example additions:

- PC Gaming: "Exclusive early access to game launches and private developer Q&A sessions"
- Photography: "VIP passes to photography exhibitions and masterclass sessions with renowned photographers"
- Home Improvement: "Priority access to contractor networks and exclusive DIY workshop experiences"

### File: `src/components/onboarding-flow/CategoryDataConstants.ts`

1. **Expand item descriptions** for existing gamers/creatives/homeowners entries (e.g., "Games" becomes "PC games and digital downloads", "Hardware" becomes "GPUs, monitors, and peripherals")
2. **Add `categoryData` entries** for all new subcategories with 5 items each, matching the detail level of Sports/Wellness/Pets

### File: `src/pages/ventus-rewards/data.ts`

Update the `lifestyleOptions` subcategories array and the `getExamplePurchases` purchase map to match the new subcategory names, keeping this file in sync with the onboarding flow.

## Summary of Content Parity After Changes

```text
                Subcategories    Deals/sub    Item detail
Sports          12               6            Descriptive
Wellness         9               6            Descriptive
Pets             9               6            Descriptive
Gamers         5 -> 9            5 -> 6       Single word -> Descriptive
Creatives      5 -> 9            5 -> 6       Single word -> Descriptive
Homeowners     5 -> 8            5 -> 6       Single word -> Descriptive
```

