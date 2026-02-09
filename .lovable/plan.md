
# Fix: Make Glassmorphism Background Visible on /smartrewards (and all pages)

## Problem
The animated gradient background from `.glass-page-bg::before` is invisible because:
1. The gradient orb opacities are too low (0.10-0.15) -- barely visible even without obstruction
2. Every section uses `.glass-section` which adds `backdrop-filter: blur(8px)` on top, further washing out the gradient
3. The sections stack vertically covering 100% of the page, so there is no gap where the raw gradient shows through

## Fix

### 1. Increase gradient orb visibility (`src/styles/base.css`)
Bump the radial gradient opacities from 0.10-0.15 to 0.25-0.35 so the orbs are actually noticeable. Also increase the orb sizes slightly for better coverage:

```css
.glass-page-bg::before {
  background:
    radial-gradient(ellipse 800px 800px at 15% 20%, hsl(217 91% 40% / 0.3) 0%, transparent 70%),
    radial-gradient(ellipse 700px 700px at 85% 60%, hsl(260 60% 40% / 0.25) 0%, transparent 70%),
    radial-gradient(ellipse 600px 600px at 50% 80%, hsl(200 80% 35% / 0.2) 0%, transparent 70%);
}
```

### 2. Reduce glass-section opacity (`src/styles/components.css`)
Make `.glass-section` more transparent so the gradient shows through:

```css
.glass-section {
  background: hsl(220 50% 10% / 0.25);  /* was 0.5 */
  backdrop-filter: blur(4px) saturate(1.1);  /* reduced blur from 8px */
}
```

### 3. Make glass-card slightly more transparent (`src/styles/components.css`)
Reduce `.glass-card` background opacity slightly so cards feel more integrated with the gradient:

```css
.glass-card {
  background: hsl(220 50% 12% / 0.3);  /* was 0.4 */
}
```

These three changes together will make the gradient orbs clearly visible behind all sections while maintaining the frosted glass layering effect.
