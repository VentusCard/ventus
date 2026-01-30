
# Remove Hero Section & Integrate Content into Story Section

## Overview
Remove the separate hero section from the About page and incorporate the "Our Story" heading and introductory text directly into the main Story Content section for a cleaner, more streamlined layout.

## Changes

### 1. Remove Hero Section (Lines 31-51)
Delete the entire hero section including:
- The `min-h-[70vh]` container
- The "Our Story" heading
- The introductory paragraph
- The scroll indicator button

### 2. Update Story Content Section
Modify the Story Content section to:
- Add proper top padding to account for the navbar (`pt-32`)
- Add "Our Story" as the section heading with the same styling hierarchy
- Move the introductory text as the first paragraph
- Keep existing story paragraphs in their current order

### 3. Clean Up Imports
Remove the unused `ChevronDown` import since the scroll indicator will no longer be needed.

## Result
The About page will have a more compact, content-focused layout where the story flows naturally from the heading through all paragraphs without the large hero section taking up viewport space.

---

## Technical Details

**File to modify:** `src/pages/AboutUs.tsx`

**Before structure:**
```
Navbar
Hero Section (min-h-[70vh]) - "Our Story" heading + intro
Story Content Section - remaining paragraphs
Values Section
CTA Section
Footer
```

**After structure:**
```
Navbar
Story Content Section (with pt-32) - "Our Story" heading + ALL paragraphs including intro
Values Section
CTA Section
Footer
```

**Updated Story Content section will include:**
1. Section heading: "Our Story"
2. Intro paragraph: "Ventus was born out of a simple frustration..."
3. Paragraph 2: "The cofounders, longtime friends..."
4. Paragraph 3: "As everyday spenders..."
5. Paragraph 4: "That is why we built Ventus..."
6. Paragraph 5: "Ventus takes the hassle out..."
