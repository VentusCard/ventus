

## Change Pillar Grid to 2x3 on Mobile

**Goal:** Switch the 6 lifestyle pillars from the current 3-column layout to a 2-column, 3-row grid on mobile. This gives each card more horizontal space to display descriptions and details.

**Changes (single file: `src/components/onboarding-flow/StepOneMerged.tsx`):**

1. **Grid class** (line 237): Change `grid-cols-3` to `grid-cols-2 md:grid-cols-3` -- 2 columns on mobile, 3 on tablet+
2. **Restore description visibility**: Remove the `hidden md:block` from the description paragraph so it shows on mobile again (since cards now have enough width)
3. **Slightly increase mobile text sizes** back up since cards are wider:
   - Icons: `text-2xl` -> `text-3xl`
   - Titles: `text-xs` -> `text-sm`
   - Description: restore with `text-[10px]` on mobile
   - Badges: keep current compact sizing

All changes are CSS class tweaks in one file.

