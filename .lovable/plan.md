

# Add Email Subscribe to Footer (Google Sheets Integration)

## Overview
Replace the "Get in Touch" column's static "Contact Us" button with a compact email input + subscribe button that submits to the **same Google Apps Script endpoint** used by the waitlist forms on `/smartrewards` and `/join-waitlist`.

## What Changes

### Footer "Get in Touch" column becomes "Stay Updated"
- Heading: "Stay Updated"
- Subtitle: "Get the latest on Ventus Card"
- Inline email input + "Subscribe" button (compact, fits the column)
- "Contact Us" link preserved below
- Toast feedback on success/error
- No database table needed -- emails go directly to the existing Google Sheet

## Technical Details

### File: `src/components/Footer.tsx`
- Add imports: `useState` from React, `Input` from UI, `useToast`, `z` from zod
- Replace lines 69-77 (the "Get in Touch" div content) with:
  - "Stay Updated" heading
  - Small subtitle text
  - A `form` with a `flex` row containing an `Input` (email, `h-9 text-sm`) and a `Button` ("Subscribe", `size="sm"`)
  - A "Contact Us" `Link` below the form
- On submit:
  - Validate email with zod (`z.string().trim().email().max(255)`)
  - POST to `https://script.google.com/macros/s/AKfycbxi7ANbqg5kkeS-WCDE7MewaNl3rSI84d9Ql4BVqXzxCz75HttUogAQBAXMOUT1VLfQ/exec` with `email` and `source: "footer"` fields (using `FormData`, matching the existing waitlist form pattern)
  - Show success toast, reset input
  - Show error toast on failure
- No changes to the other three columns or grid layout

