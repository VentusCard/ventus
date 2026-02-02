
# Desktop-Only Check for /tepilot - Before Password Gate

## Overview
Add a device check as the **first render gate** in the TePilot component, so users on mobile or tablet devices see the "Desktop Experience Required" message immediately when the page loads, before even seeing the password prompt.

## Implementation

### File to Modify
`src/pages/TePilot.tsx`

### Changes

1. **Import the device detection hook**
   Add `useDeviceType` from `@/hooks/use-mobile` to the imports

2. **Import Monitor icon**
   Add `Monitor` to the lucide-react imports (line 12)

3. **Add desktop check as first gate**
   Inside the component (around line 50), call the hook and add a return statement before any other logic:

   ```tsx
   const { isDesktop } = useDeviceType();

   // Desktop-only gate - check before password authentication
   if (!isDesktop) {
     return (
       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
         <div className="text-center space-y-6 max-w-md">
           <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
             <Monitor className="w-10 h-10 text-primary" />
           </div>
           <div className="space-y-3">
             <h1 className="text-2xl font-bold text-white">Desktop Experience Required</h1>
             <p className="text-slate-300 leading-relaxed">
               TEPilot's advanced analytics dashboard features interactive data visualizations, 
               multi-step workflows, and detailed reporting tools that require a larger screen 
               for the best experience.
             </p>
             <p className="text-slate-400 text-sm">
               Please switch to a desktop or laptop computer to access the full Transaction 
               Enrichment Pilot toolkit.
             </p>
           </div>
         </div>
       </div>
     );
   }
   ```

### Technical Details

**Placement**: The desktop check will be added right after the state declarations begin (after line 50-51) but before the `useEffect` hooks and any conditional rendering logic. This ensures:
- The check runs on every render
- It returns early before the password form or any other content is shown
- Mobile/tablet users never see the password prompt

**Breakpoint**: Uses the existing `useDeviceType` hook which defines desktop as screen width >= 1024px. Users on screens smaller than this will see the informative message.
