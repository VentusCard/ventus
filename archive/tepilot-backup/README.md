# TEPilot Backup

This is a complete backup of the TEPilot module from the main Ventus repository.

## Created
Date: 2026-01-25

## Purpose
Safety backup before migrating TEPilot to a standalone repository.

## Contents

### Pages (`/pages/`)
- `TePilot.tsx` - Main entry point
- `AdvisorConsolePage.tsx` - Wealth management advisor console
- `RecommendationsPage.tsx` - Partner recommendations
- `FinancialPlanningPage.tsx` - Financial planning tools
- `RewardsPipelinePage.tsx` - Rewards pipeline management

### Components (`/components/tepilot/`)
Core components for the TEPilot workflow:
- `AfterInsightsPanel.tsx`, `BeforeInsightsPanel.tsx` - Before/after analysis views
- `ColumnMapper.tsx`, `FileUploader.tsx`, `PasteInput.tsx` - Data input components
- `EnrichActionBar.tsx` - AI enrichment controls
- `ResultsTable.tsx`, `PreviewTable.tsx` - Data display
- `FilterControls.tsx`, `ExportControls.tsx` - Data management

#### Advisor Console (`/advisor-console/`)
32 components for the wealth management advisor interface including:
- `AdvisorConsole.tsx` - Main 3-panel layout
- `VentusChatPanel.tsx` - AI chat interface
- `ClientSnapshotPanel.tsx` - Client information display
- `FinancialTimelineTool.tsx` - Life event planning
- `MonteCarloSimulator.tsx` - Retirement projections
- And more...

#### Insights (`/insights/`)
19 components for analytics and visualization:
- `BankwideView.tsx` - Bank-wide analytics dashboard
- `PillarExplorer.tsx` - 12-pillar lifestyle analysis
- `CrossSellMatrix.tsx`, `DemographicBreakdown.tsx` - Segmentation tools

#### Rewards Pipeline (`/rewards-pipeline/`)
8 components for merchant partnership management

### Types (`/types/`)
- `transaction.ts` - Transaction data structures
- `lifestyle-signals.ts` - AI insight types
- `financial-planning.ts` - Planning tool types
- `clientProfile.ts` - Client profile types
- `bankwide.ts` - Bank-wide analytics types

### Lib/Utils (`/lib/`)
- `advisorContextBuilder.ts` - Context building for AI
- `mockBankwideData.ts` - Sample bank-wide data
- `randomProfileGenerator.ts` - Demo profile generation
- `financialTimelinePdfExport.ts` - PDF export utilities
- `aggregations.ts` - Transaction aggregation logic
- `travelPreFilter.ts` - Travel detection preprocessing
- `availableDealsData.ts` - Deal data
- `sampleData.ts` - Sample transaction data

### Hooks (`/hooks/`)
- `useAdvisorChat.ts` - Chat state management
- `useSSEEnrichment.ts` - Server-sent events for real-time enrichment
- `usePipelineStatus.ts` - Pipeline status tracking

### Edge Functions (`/edge-functions/`)
Backend serverless functions:
- `advisor-chat/` - AI chat API
- `analyze-lifestyle-signals/` - Lifestyle analysis
- `analyze-pillar-transactions/` - Pillar breakdown
- `classify-transactions/` - Transaction classification
- `parse-bank-statement-pdf/` - PDF parsing
- `travel-detection/` - Travel pattern detection

## Restoration
To restore this backup, copy the relevant files back to their original locations in the `src/` and `supabase/functions/` directories.

## Notes
- The backup files retain their original import paths, which will need to be updated if used in a different project structure
- Edge functions are deployment-ready when copied to `supabase/functions/`
