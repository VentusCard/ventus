
# Move Progress Bar Above Navigation Buttons

## Current Layout (lines 222-259)

```text
┌─────────────────────────────┐
│      Progress Bar           │  ← Currently at top (lines 223-235)
│      (1) ─── (2) ─── (3)    │
├─────────────────────────────┤
│                             │
│      Step Content           │  ← Step 1, 2, or 3 content (lines 237-244)
│      (areas of interest)    │
│                             │
├─────────────────────────────┤
│   [Back]          [Next]    │  ← Navigation buttons (lines 246-259)
└─────────────────────────────┘
```

## Proposed Layout

```text
┌─────────────────────────────┐
│                             │
│      Step Content           │  ← Step 1, 2, or 3 content
│      (areas of interest)    │
│                             │
├─────────────────────────────┤
│      Progress Bar           │  ← Move to here (between content and buttons)
│      (1) ─── (2) ─── (3)    │
├─────────────────────────────┤
│   [Back]          [Next]    │  ← Navigation buttons stay at bottom
└─────────────────────────────┘
```

---

## Changes Required

**File:** `src/pages/OnboardingFlow.tsx`

### Step 1: Remove Progress Bar from Current Position (lines 222-235)

Delete the entire progress section wrapper:
```tsx
{/* Progress Section */}
<div className="mb-4 md:mb-6 lg:mb-8">
  {/* Step Progress Bar */}
  <div className="flex items-center justify-center mb-4 md:mb-6 lg:mb-8 overflow-x-auto pt-2 pb-2 md:pt-4 md:pb-4 px-4 md:px-8">
    ...
  </div>
</div>
```

### Step 2: Insert Progress Bar Between Step Content and Navigation (after line 244, before line 246)

Add the progress bar with adjusted spacing (no bottom margin needed since navigation buttons follow):

```tsx
{/* Step Content */}
<div className="bg-card/80 md:border ...">
  {renderStep()}
</div>

{/* Progress Bar - Between content and navigation */}
<div className="flex items-center justify-center overflow-x-auto pt-2 pb-2 md:pt-4 md:pb-4 px-4 md:px-8 mb-4 md:mb-6">
  {Array.from({ length: totalSteps }, (_, i) => i + 1).map(stepNumber => (
    <div key={stepNumber} className="flex items-center">
      <div className={`h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
        step > stepNumber 
          ? 'bg-primary text-white' 
          : step === stepNumber 
            ? 'bg-primary text-white ring-4 ring-primary/30' 
            : 'bg-muted text-muted-foreground border-2 border-border'
      }`}>
        {step > stepNumber ? <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" /> : stepNumber}
      </div>
      {stepNumber < totalSteps && (
        <div className={`h-0.5 md:h-1 w-12 md:w-20 lg:w-32 transition-all duration-300 flex-shrink-0 ${
          step > stepNumber ? 'bg-primary' : 'bg-border'
        }`}></div>
      )}
    </div>
  ))}
</div>

{/* Navigation */}
<div className="flex justify-between items-center max-w-2xl mx-auto">
  ...
</div>
```

---

## Summary

- Remove the progress bar from lines 222-235
- Insert it between the step content (line 244) and navigation buttons (line 246)
- Adjust margins: add `mb-4 md:mb-6` to provide spacing before the navigation buttons
- The step content card margin changes from `mb-4 md:mb-6 lg:mb-8` to `mb-4 md:mb-6` since the progress bar now sits below it

**File to modify:** `src/pages/OnboardingFlow.tsx`
