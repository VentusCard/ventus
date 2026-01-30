
# Update AI Tools Section Content

## Overview
Complete rewrite of the AI Tools section to align with Ventus branding positioning while using warm, consumer-friendly language that emphasizes lifestyle benefits and includes new feature capabilities.

## Current State
The section has 6 generic AI feature cards:
- Intelligent Analysis
- Personalized Recommendations
- Real-time Optimization
- Instant Insights
- Secure & Private
- AI Shopping

## Updated Content Plan

### Section Header
**Current:**
- Title: "Our Suite of Advanced AI Tools"
- Subtitle: "Powerful capabilities that put the right deals in front of you at the right time."

**Updated:**
- Title: "Your Lifestyle, Understood"
- Subtitle: "We learn what matters to you—then put the right rewards in your hands at the perfect moment."

### New Feature Cards (6 total)

#### 1. Lifestyle Intelligence
- **Icon**: Brain
- **Title**: "Lifestyle Intelligence"
- **Description**: "We see beyond transactions to understand your passions—whether you're a weekend golfer, a coffee enthusiast, or a travel adventurer."

#### 2. Personalized Rewards
- **Icon**: Sparkles (swap from Target for more warmth)
- **Title**: "Rewards That Feel Personal"
- **Description**: "Every deal recommendation connects to how you actually live, not generic categories. Your gym visits, your favorite restaurants, your travel style."

#### 3. Semantic Deal Matching
- **Icon**: Target
- **Title**: "Deals That Make Sense"
- **Description**: "Our AI connects related merchants intelligently—golf courses with equipment stores, coffee shops with bakeries—so you never miss a relevant reward."

#### 4. Location-Aware Experiences
- **Icon**: MapPin (new icon)
- **Title**: "Rewards Wherever You Go"
- **Description**: "From your neighborhood spots to new cities you're exploring, we surface local deals that match your lifestyle—at home or on the road."

#### 5. Proactive Savings
- **Icon**: TrendingUp
- **Title**: "Savings Before You Ask"
- **Description**: "We notice your patterns and surface rewards proactively—alerting you to deals at merchants you love before you even think to look."

#### 6. Privacy-First AI
- **Icon**: Shield
- **Title**: "Your Data, Protected"
- **Description**: "All personalization happens with enterprise-grade security. We understand your lifestyle without ever sharing your specifics."

## Technical Changes

### File: `src/pages/VentusAI.tsx`

**1. Update icons import** (line 6):
```tsx
import { Brain, Target, TrendingUp, Shield, ArrowRight, Sparkles, ChevronDown, MapPin } from "lucide-react";
```
- Remove: `Zap`
- Add: `MapPin`

**2. Replace features array** (lines 10-34):
Complete replacement with new content following the card structure above.

**3. Update section header** (lines 74-78):
- New title: "Your Lifestyle, Understood"
- New subtitle: "We learn what matters to you—then put the right rewards in your hands at the perfect moment."

## Content Alignment

This update follows the branding guidelines:
- Uses warm "we" voice ("We see...", "We learn...", "We notice...")
- Focuses on lifestyle benefits rather than technical capabilities
- Avoids business jargon (no "maximize", "optimize", "algorithms")
- Connects features to real lifestyle scenarios (golf, coffee, travel)
- Aligns with Ventus positioning on semantic intelligence and lifestyle personalization
