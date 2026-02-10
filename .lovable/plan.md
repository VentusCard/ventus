

# Replace Double Auth Buttons with Single "Get Started" Dropdown

## Change

Replace the two desktop buttons ("Sign In" + "Sign Up") with a single **"Get Started"** dropdown button. When clicked, it expands to show:

- **Sign up for Ventus Card** -- navigates to `/smartrewards`
- **Sign in to Ventus Rewards** -- navigates to `/app/login`

The mobile menu keeps its current stacked layout.

## Technical Details

### File: `src/components/Navbar.tsx`

1. Add imports for `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` from `@/components/ui/dropdown-menu`, and `ChevronDown` from `lucide-react`

2. Replace the logged-out desktop block (the two Link/Button pairs for Sign In and Sign Up) with a single `DropdownMenu`:
   - Trigger: primary-styled button labeled **"Get Started"** with a `ChevronDown` icon
   - Two menu items:
     - "Sign up for Ventus Card" → navigates to `/smartrewards`
     - "Sign in to Ventus Rewards" → navigates to `/app/login`
   - Dropdown content styled with solid dark background (`bg-slate-900 border-slate-700`) to prevent transparency issues

3. Mobile menu: update the "Sign Up" button to also point to `/smartrewards` for consistency

