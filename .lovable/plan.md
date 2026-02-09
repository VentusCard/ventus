

# Unlock Gamers, Creatives, and Homeowners on /smartrewards

## Problem
The `StepOneMerged` component explicitly disables "gamers", "creatives", and "homeowners" via a `disabledGoals` array. This causes:
- Grey/washed-out appearance with `opacity-50`, `grayscale`, and `cursor-not-allowed`
- Click handler blocked (`!isDisabled && onSelectGoal(...)`)
- Subcategories hidden for disabled goals
- Badge text overridden to "Coming Later"

## Solution
Remove all disabling logic so all 6 cards are fully interactive, while keeping the Year One cards visually distinguished with grey/muted styling (no gradient, just a subtle grey card look) to maintain hierarchy.

## Technical Changes

### File: `src/components/onboarding-flow/StepOneMerged.tsx`

1. **Remove the `disabledGoals` array** (line 203)
   - Delete: `const disabledGoals: LifestyleGoal[] = ["gamers", "creatives", "homeowners"];`

2. **Remove all `isDisabled` checks throughout the component**:
   - Line 235: Remove `!disabledGoals.includes(selectedGoal)` from scroll useEffect
   - Line 245: Remove `!disabledGoals.includes(selectedGoal)` from subcategories variable
   - Line 266: Remove `const isDisabled = disabledGoals.includes(option.id);`
   - Line 294: Change `!isDisabled && onSelectGoal(option.id)` to just `onSelectGoal(option.id)`
   - Line 329: Remove `!disabledGoals.includes(selectedGoal)` condition

3. **Update `getCardStyles()` function** (lines 267-293):
   - Remove the disabled branch (lines 268-270)
   - Give "Year One" cards (gamers, creatives, homeowners) a grey-toned styling instead of the blue gradients used by the first 3:
     ```
     bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-600/60
     ```
   - They still get hover effects, selection ring, and scale -- just grey instead of blue

4. **Update CardContent gradient** (lines 295-301):
   - Add a grey gradient for Year One cards instead of blue

5. **Update badge logic** (lines 313-315):
   - Remove the `isDisabled` ternary; show the actual `option.availability` text for all cards
   - "Year One" badge keeps an orange or slate style to signal future availability

6. **Update text color logic** (lines 305, 308):
   - Remove `isDisabled` conditionals; all cards use white text

