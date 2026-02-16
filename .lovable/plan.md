

## Fix: Mobile Auto-Scroll Overshooting on /smartrewards

**Problem:** On mobile, every scroll action lands too far down the page -- "a couple rows too deep." On the last step (step 3, the waitlist), it sometimes scrolls all the way to the footer. This happens because:

1. **No navbar offset**: `scrollIntoView` and the custom scroll functions don't subtract the fixed navbar height (48px on mobile), so the target element gets hidden behind it -- and visually it looks like the page scrolled past the content.
2. **Wrong target on step changes**: `goToNextStep` and `goToPreviousStep` scroll to `#onboarding-content` (the outer wrapper), but on step 3 the content inside is short (just the waitlist form). The browser scrolls the top of the tall wrapper into view, which on a short step means the visible content is above the fold and the viewport shows mostly footer.
3. **StepOneMerged uses only 20px offset**: The subcategory scroll subtracts 20px, but the navbar is 48px on mobile -- so it lands 28px too deep.

**Solution:** Create a shared scroll utility that always accounts for the navbar, and scroll to the step content container (not the outer wrapper) so short steps don't overshoot.

---

### Technical Details

**1. New file: `src/utils/smoothScroll.ts`**

A single reusable function:

```typescript
export function smoothScrollTo(
  element: HTMLElement, 
  options?: { extraOffset?: number; duration?: number }
) {
  // Navbar heights: h-12 (48px) mobile, h-14 (56px) tablet, h-16 (64px) desktop
  const navbarHeight = window.innerWidth >= 1024 ? 64 
                     : window.innerWidth >= 768 ? 56 
                     : 48;
  const extraOffset = options?.extraOffset ?? 12;
  const duration = options?.duration ?? 600;
  
  const targetY = element.getBoundingClientRect().top + window.scrollY - navbarHeight - extraOffset;
  const startY = window.scrollY;
  const distance = targetY - startY;
  let start: number | null = null;

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```

**2. Update `src/pages/OnboardingFlow.tsx`**

- Import `smoothScrollTo` from the new utility
- **"See How It Works" button** (lines 219-239): Replace the entire inline scroll with `smoothScrollTo(target)`
- **`goToNextStep`** (lines 50-52): Replace `scrollIntoView` with scrolling to `#onboarding-step-content` (the inner card, not the outer wrapper) -- this prevents overshooting on short steps like the waitlist
- **`goToPreviousStep`** (lines 101-103): Same change -- scroll to `#onboarding-step-content`

**3. Update `src/components/onboarding-flow/StepOneMerged.tsx`**

- Import `smoothScrollTo` from the utility
- Remove the local `slowScrollTo` function (lines 207-230)
- Replace the `useEffect` scroll call (line 239) with `smoothScrollTo(subcategorySectionRef.current!, { duration: 500 })`
- Reduce delay from 150ms to 100ms

**Why this fixes the "jumps to footer" issue:** Currently `goToNextStep` scrolls to `#onboarding-content` -- the full-height outer div. When step 3 renders (a short waitlist form), the top of that div is correct but the viewport ends up showing content well below the form because the scroll calculation doesn't account for the navbar pushing everything down. By scrolling to `#onboarding-step-content` (the card containing the actual step) with proper navbar offset, the form lands perfectly in view regardless of its height.

