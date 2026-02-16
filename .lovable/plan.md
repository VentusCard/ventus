
## Fix: Mobile Menu Overlay Spilling Over Content

**Problem:** When the hamburger menu is expanded on mobile, the dropdown overlay doesn't fully cover the page content beneath it. Menu items and page content overlap and are both visible, creating a messy, unreadable state.

**Root Causes:**
1. The overlay background uses `bg-background/98` (98% opacity) -- not fully opaque, so content bleeds through
2. The overlay has no explicit z-index, so page content with higher stacking context can appear on top
3. The X icon uses `text-white/90` making it look faded when open

**Fix (single file: `src/components/Navbar.tsx`):**

1. **Make overlay fully opaque** -- change `bg-background/98` to `bg-background` (100% opacity)
2. **Add z-index** to the overlay div -- add `z-40` so it sits above all page content
3. **Make X icon fully white when open** -- conditionally set `text-white` when menu is expanded vs `text-white/90` when collapsed

These are 3 small class changes in one file. No structural changes needed.
