

## Make Pillars Display as 3x2 Grid on Mobile

**Problem:** The 6 lifestyle goal pillars currently stack into a single column on mobile (`grid-cols-1`), requiring excessive scrolling. The user wants them displayed as a 3-column, 2-row grid on all screen sizes.

**Fix (single file: `src/components/onboarding-flow/StepOneMerged.tsx`, line 237):**

Change the grid class from:
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```
to:
```
grid grid-cols-3
```

This makes all 6 pillars render in a consistent 3x2 layout across all breakpoints.

**Additional adjustments needed on the same line/cards to ensure the smaller mobile cards look good:**

- Reduce gap on mobile: `gap-1.5 md:gap-3 lg:gap-4`
- Reduce card min-height for mobile: change `min-h-[220px]` to `min-h-[140px]` (line 259)
- Reduce card padding on mobile: adjust `p-5` to `p-2 md:p-5` (line 260 area)
- Scale down text sizes inside cards for mobile so labels and icons fit in the narrower cells

All changes are in one file (`StepOneMerged.tsx`) and are purely CSS class adjustments.
