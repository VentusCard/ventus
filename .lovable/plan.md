

# Add Email Subscribe Section to /about Page

## Overview
Add a compact email subscription section directly above the "What drives us / Our Values" section on the About page, using the same Google Sheets integration pattern already in the Footer.

## What Changes

### New section between "Our Story" content and "Our Values"
- A short, centered section with a one-line prompt (e.g., "Stay in the loop") and an inline email input + "Subscribe" button
- Same Google Apps Script POST endpoint, FormData pattern, zod validation, and toast feedback as the Footer
- Styled to match the page's compact density standard (minimal vertical padding, border-t separator)
- Source field set to `"about"` to distinguish from footer subscriptions in the Google Sheet

## Technical Details

### File: `src/pages/AboutUs.tsx`
- Add imports: `useState`, `Input`, `Button`, `useToast`, `z` from zod
- Insert a new `section` between the Story section (ending ~line 54) and the Values section (starting ~line 57)
- Section layout:
  - `py-8 px-4 md:px-8 border-t border-border/50` (matches existing separators)
  - `max-w-3xl mx-auto text-center`
  - Short heading text
  - Inline `form` with `flex justify-center gap-2`: white-bg `Input` (email, `h-10 max-w-xs`) + `Button` ("Subscribe", `size="sm"`)
- Submit handler: identical pattern to Footer -- zod validate, POST FormData with `email` + `source: "about"`, toast on success/error

### No other files changed

