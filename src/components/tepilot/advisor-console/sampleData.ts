// TypeScript interfaces for Advisor Console data structures

export interface ClientData {
  name: string;
  segment: 'Preferred' | 'Private' | 'Merrill';
  aum: string;
  tenure: string;
  advisor: string;
  holdings: {
    deposit: number;
    credit: number;
    mortgage: boolean;
    mortgageAmount?: number;
    merrill: number;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  demographics: {
    age: number;
    occupation: string;
    familyStatus: string;
  };
}

export interface LifestyleSignal {
  category: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  confidence: number;
  icon: string;
}

export interface LifeTrigger {
  date: string;
  event: string;
  type: 'family' | 'financial' | 'lifestyle' | 'professional';
  description: string;
}

export interface ComplianceData {
  kycStatus: 'Current' | 'Pending' | 'Expired';
  lastReview: string;
  nextReview: string;
  riskProfile: string;
  notes: string;
}

export interface Milestone {
  date: string;
  event: string;
  category: 'account' | 'investment' | 'banking' | 'rewards';
}

export interface ChatMessage {
  id: string;
  role: 'ai' | 'advisor';
  content: string;
  timestamp: Date;
  actions?: {
    savedToDoc?: boolean;
    addedToTodo?: boolean;
    completed?: boolean;
  };
  relatedLifestyleChip?: string;
}

export interface Task {
  id: string;
  title: string;
  category: 'today' | 'this-week' | 'later';
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export interface Meeting {
  date: string;
  time: string;
  duration: number;
  participants: string[];
  talkingPoints: string[];
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface DocumentBlock {
  id: string;
  type: 'client-overview' | 'lifestyle-summary' | 'portfolio-snapshot' | 'next-steps';
  title: string;
  content: string;
  order: number;
  lastEdited: string;
}

export interface EngagementHealth {
  status: 'high' | 'medium' | 'low';
  metrics: {
    lastContact: string;
    meetingAttendance: number;
    responseRate: number;
    reviewFrequency: string;
    proactiveInquiries: number;
  };
}

// Sample Client Profile Data
export const sampleClientData: ClientData = {
  name: "Emma R.",
  segment: "Private",
  aum: "$2.3M",
  tenure: "4.2 years",
  advisor: "Michael Chen",
  holdings: {
    deposit: 450000,
    credit: 15000,
    mortgage: true,
    mortgageAmount: 680000,
    merrill: 1850000
  },
  contact: {
    email: "emma.r@email.com",
    phone: "(206) 555-0147",
    address: "Bellevue, WA 98004"
  },
  demographics: {
    age: 42,
    occupation: "Senior Product Manager, Tech",
    familyStatus: "Married, 1 child"
  }
};

// Lifestyle Signals (Transaction-derived insights)
export const sampleLifestyleSignals: LifestyleSignal[] = [
  {
    category: "Travel",
    trend: "up",
    change: 21,
    confidence: 87,
    icon: "Plane"
  },
  {
    category: "Family",
    trend: "down",
    change: -8,
    confidence: 73,
    icon: "Users"
  },
  {
    category: "Philanthropy",
    trend: "up",
    change: 15,
    confidence: 91,
    icon: "Heart"
  },
  {
    category: "Dining",
    trend: "up",
    change: 12,
    confidence: 79,
    icon: "UtensilsCrossed"
  },
  {
    category: "Health & Wellness",
    trend: "up",
    change: 18,
    confidence: 84,
    icon: "Activity"
  }
];

// Recent Life Triggers
export const sampleLifeTriggers: LifeTrigger[] = [
  {
    date: "2024-02-18",
    event: "Major Donation",
    type: "financial",
    description: "$25K donation to Seattle Children's Foundation"
  },
  {
    date: "2023-12-15",
    event: "New Dependent",
    type: "family",
    description: "Birth of first child, updated beneficiaries"
  },
  {
    date: "2023-10-22",
    event: "Relocation",
    type: "lifestyle",
    description: "Moved from downtown Seattle to Bellevue suburb"
  },
  {
    date: "2023-08-10",
    event: "Mortgage Increase",
    type: "financial",
    description: "Refinanced to larger home, +$180K mortgage balance"
  }
];

// Compliance & Risk Data
export const sampleComplianceData: ComplianceData = {
  kycStatus: "Current",
  lastReview: "January 15, 2024",
  nextReview: "January 15, 2025",
  riskProfile: "Moderate-Aggressive",
  notes: "Annual review completed. Estate planning documents updated for new dependent."
};

// Client Milestones Timeline
export const sampleMilestones: Milestone[] = [
  {
    date: "March 2020",
    event: "Account Opening",
    category: "account"
  },
  {
    date: "May 2020",
    event: "First Merrill Investment ($850K)",
    category: "investment"
  },
  {
    date: "August 2021",
    event: "Mortgage Origination ($500K)",
    category: "banking"
  },
  {
    date: "January 2022",
    event: "Private Banking Upgrade",
    category: "account"
  },
  {
    date: "December 2023",
    event: "Estate Planning Update",
    category: "account"
  }
];

// Chat Messages
export const sampleChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "ai",
    content: "Good afternoon, Michael. I've analyzed Emma's recent transaction patterns and identified several opportunities for your upcoming review meeting. Her travel spending is up 21% over the past 6 months, with frequent premium airline and hotel bookings. This suggests she may benefit from our Premium Travel Rewards card with 5x points on travel and complementary lounge access.",
    timestamp: new Date("2024-03-10T14:30:00"),
    relatedLifestyleChip: "Travel"
  },
  {
    id: "msg-2",
    role: "advisor",
    content: "That's helpful context. Can you generate talking points for our Q2 portfolio review meeting scheduled for March 15th?",
    timestamp: new Date("2024-03-10T14:32:00")
  },
  {
    id: "msg-3",
    role: "ai",
    content: "Here are the key discussion topics for Emma's Q2 review:\n\n1. **Portfolio Performance**: YTD return of +8.2%, outperforming benchmark by 1.4%\n2. **Travel Rewards Opportunity**: Premium card upgrade could save ~$3,200 annually based on current spending\n3. **Estate Planning**: Review beneficiary designations following birth of first child\n4. **529 Education Plan**: Recommend opening plan for newborn with $10K initial funding\n5. **Philanthropic Strategy**: Discuss donor-advised fund to optimize $25K+ annual giving\n6. **Tax-Loss Harvesting**: Identify $12K in potential tax savings from strategic rebalancing\n\nWould you like me to generate a detailed brief for any of these topics?",
    timestamp: new Date("2024-03-10T14:33:15"),
    actions: {
      savedToDoc: true,
      addedToTodo: false,
      completed: false
    }
  },
  {
    id: "msg-4",
    role: "advisor",
    content: "Yes, please provide more detail on the 529 education plan recommendation.",
    timestamp: new Date("2024-03-10T14:35:00")
  },
  {
    id: "msg-5",
    role: "ai",
    content: "**529 Education Savings Plan Recommendation for Emma R.**\n\n**Current Situation:**\n- New parent (child born Dec 2023, 3 months old)\n- Strong income profile (Senior PM in tech)\n- High tax bracket (likely 35-37% federal)\n- Demonstrated commitment to long-term planning\n\n**Recommendation:**\n- Open Washington State 529 DreamAhead plan\n- Initial funding: $10,000\n- Monthly contributions: $500 (automatic)\n- Projected value at age 18: ~$185,000 (assuming 7% growth)\n\n**Tax Benefits:**\n- Washington state offers no state income tax, but federal tax-free growth\n- Contributions reduce taxable estate (important for HNW clients)\n- Withdrawals for qualified education expenses are tax-free\n\n**Action Items:**\n- Present at March 15 meeting\n- Provide DreamAhead enrollment packet\n- Set up automatic monthly contributions\n- Discuss gift-giving strategy (grandparents can contribute up to $18K/year)\n\n**Talking Point:** 'Emma, congratulations again on your new addition. Many of our clients find that starting a 529 plan early provides tremendous flexibility for future education expenses, whether that's private school, college, or graduate programs. Based on your current tax situation and long-term planning mindset, I'd recommend we establish this account with an initial $10K investment.'",
    timestamp: new Date("2024-03-10T14:36:30"),
    actions: {
      savedToDoc: true,
      addedToTodo: false,
      completed: false
    }
  },
  {
    id: "msg-6",
    role: "advisor",
    content: "Perfect. Add a task to prepare the 529 enrollment packet before our meeting.",
    timestamp: new Date("2024-03-10T14:38:00"),
    actions: {
      addedToTodo: true
    }
  },
  {
    id: "msg-7",
    role: "ai",
    content: "✓ Task added: 'Prepare 529 enrollment packet for Emma R.' — Priority: High, Due: March 14, 2024\n\nI've also noticed Emma's increased philanthropic activity. Her $25K donation in February represents a significant uptick from her historical $8-12K annual giving. This could indicate:\n\n1. **Unexpected windfall** (bonus, stock options vesting)\n2. **Tax planning strategy** (maximizing 2024 deductions)\n3. **Values shift** (new parent seeking to support children's causes)\n\nRecommendation: Discuss establishing a donor-advised fund (DAF) to optimize her charitable giving strategy. A DAF would allow her to:\n- Make a large tax-deductible contribution in high-income years\n- Distribute to charities over time as she identifies causes\n- Potentially donate appreciated securities for additional tax benefits\n- Involve family in giving decisions (values education for child)\n\nShould I add this as a discussion topic for the March 15 meeting?",
    timestamp: new Date("2024-03-10T14:39:00"),
    relatedLifestyleChip: "Philanthropy"
  },
  {
    id: "msg-8",
    role: "advisor",
    content: "Yes, add that to the meeting agenda. Also mark the 529 talking points as ready to present.",
    timestamp: new Date("2024-03-10T14:41:00"),
    actions: {
      completed: true
    }
  }
];

// Tasks & To-Dos
export const sampleTasks: Task[] = [
  {
    id: "task-1",
    title: "Review Emma's Q1 portfolio performance report",
    category: "today",
    completed: false,
    priority: "high",
    dueDate: "2024-03-11"
  },
  {
    id: "task-2",
    title: "Prepare travel rewards card comparison sheet",
    category: "today",
    completed: false,
    priority: "high",
    dueDate: "2024-03-11"
  },
  {
    id: "task-3",
    title: "Prepare 529 enrollment packet for Emma R.",
    category: "today",
    completed: false,
    priority: "high",
    dueDate: "2024-03-14"
  },
  {
    id: "task-4",
    title: "Schedule Q2 portfolio review meeting",
    category: "this-week",
    completed: true,
    priority: "medium",
    dueDate: "2024-03-15"
  },
  {
    id: "task-5",
    title: "Update estate planning documents (new dependent)",
    category: "this-week",
    completed: true,
    priority: "high",
    dueDate: "2024-03-13"
  },
  {
    id: "task-6",
    title: "Prepare donor-advised fund presentation materials",
    category: "this-week",
    completed: false,
    priority: "medium",
    dueDate: "2024-03-14"
  },
  {
    id: "task-7",
    title: "Research 529 education plans and tax strategies",
    category: "later",
    completed: true,
    priority: "low"
  },
  {
    id: "task-8",
    title: "Analyze tax-loss harvesting opportunities",
    category: "later",
    completed: false,
    priority: "medium"
  },
  {
    id: "task-9",
    title: "Prepare beneficiary update forms",
    category: "later",
    completed: false,
    priority: "low"
  }
];

// Upcoming Meeting
export const sampleMeeting: Meeting = {
  date: "March 15, 2024",
  time: "2:00 PM PT",
  duration: 60,
  participants: [
    "Emma R. (Client)",
    "Michael Chen (Advisor)",
    "Sarah Liu (Wealth Planning Specialist)"
  ],
  talkingPoints: [
    "Q1 Portfolio Performance Review (+8.2% YTD)",
    "Travel Rewards Card Upgrade Opportunity (~$3,200 annual value)",
    "Estate Planning Updates (New Dependent Beneficiary)",
    "529 Education Savings Plan Recommendation ($10K initial + $500/mo)",
    "Donor-Advised Fund for Philanthropic Giving Strategy",
    "Tax-Loss Harvesting Opportunities (~$12K potential savings)",
    "Merrill Portfolio Rebalancing (Reduce tech concentration)",
    "Mortgage Refinancing Review (Current rates vs. Emma's 3.2%)"
  ],
  status: "upcoming"
};

// Document Blocks (for Client Brief Builder)
export const sampleDocumentBlocks: DocumentBlock[] = [
  {
    id: "block-1",
    type: "client-overview",
    title: "Client Overview",
    content: `**Emma R. — Private Banking Client**

*Profile Summary:*
Emma is a 42-year-old Senior Product Manager in the technology sector with $2.3M in assets under management. She has been a valued client for 4.2 years, progressing from Preferred to Private Banking status. Emma recently became a first-time parent (December 2023) and relocated to Bellevue, WA.

*Account Structure:*
• Deposit Accounts: $450,000
• Credit Facilities: $15,000 utilization
• Mortgage: $680,000 (3.2% fixed, refinanced 2023)
• Merrill Investment Portfolio: $1,850,000

*Advisor:* Michael Chen, Senior Wealth Advisor
*Risk Profile:* Moderate-Aggressive (suitable for 80/20 equity/fixed allocation)
*Relationship Tenure:* 4.2 years (since March 2020)`,
    order: 1,
    lastEdited: "2024-03-10T14:36:00"
  },
  {
    id: "block-2",
    type: "lifestyle-summary",
    title: "Lifestyle & Spending Insights",
    content: `**Transaction-Derived Lifestyle Analysis**

*Key Trends (Last 6 Months):*
• **Travel ↑ 21%** (Confidence: 87%) — Frequent premium airline bookings, international hotels, consistent business/leisure travel patterns. Opportunity: Premium Travel Rewards card upgrade.

• **Philanthropy ↑ 15%** (Confidence: 91%) — Significant increase in charitable giving, including $25K donation to Seattle Children's Foundation in February 2024. Recommendation: Donor-advised fund for tax optimization.

• **Health & Wellness ↑ 18%** (Confidence: 84%) — Increased spending on fitness, wellness services, and premium gym memberships post-relocation.

• **Dining ↑ 12%** (Confidence: 79%) — Elevated restaurant spending, premium takeout services. Correlation with new parent lifestyle adjustment.

• **Family ↓ 8%** (Confidence: 73%) — Slight decrease in traditional "family" category spending, potentially due to newborn care focus vs. discretionary family activities.

*Recent Life Triggers:*
• New dependent (December 2023) — Estate planning updated
• Relocation to Bellevue suburb (October 2023) — Larger home, family-focused
• Major charitable donation (February 2024) — Values-driven giving
• Mortgage refinance (August 2023) — +$180K balance for home upgrade`,
    order: 2,
    lastEdited: "2024-03-10T14:33:00"
  },
  {
    id: "block-3",
    type: "portfolio-snapshot",
    title: "Portfolio Performance Snapshot",
    content: `**Merrill Investment Portfolio — Q1 2024 Performance**

*Current Market Value:* $1,850,000 (+$140,000 YTD)

*Asset Allocation:*
• US Equities: 55% ($1,017,500)
• International Equities: 25% ($462,500)
• Fixed Income: 15% ($277,500)
• Alternative Investments: 5% ($92,500)

*Performance Metrics:*
• YTD Return: +8.2%
• Benchmark (60/40): +6.8%
• Alpha: +1.4%
• Sharpe Ratio: 1.32

*Holdings Analysis:*
• Tech sector concentration: 42% (above target 35%)
• Recommendation: Rebalance $130K from tech to diversified sectors
• Tax-loss harvesting opportunity: ~$12K in unrealized losses available

*Portfolio Health:*
✓ Well-diversified across asset classes
✓ Strong performance vs. benchmark
⚠ Tech sector overweight (rebalancing recommended)
✓ Risk profile aligned with client objectives

*Next Review:* March 15, 2024 (Q2 Planning Meeting)`,
    order: 3,
    lastEdited: "2024-03-10T14:28:00"
  },
  {
    id: "block-4",
    type: "next-steps",
    title: "Recommended Next Steps",
    content: `**Action Items & Recommendations — March 2024**

*Immediate Actions (Before March 15 Meeting):*
1. ✓ Complete Q1 portfolio performance analysis
2. ⏳ Prepare Premium Travel Rewards card comparison
3. ⏳ Assemble 529 education savings plan materials
4. ⏳ Draft donor-advised fund presentation
5. ✓ Update estate planning documents for new dependent

*Discussion Topics for March 15 Meeting:*
1. **Portfolio Performance & Rebalancing**
   - Review +8.2% YTD performance
   - Discuss tech sector reduction strategy
   - Execute tax-loss harvesting (~$12K savings)

2. **Travel Rewards Optimization**
   - Present Premium Travel card benefits
   - Calculate ~$3,200 annual value based on spending
   - Process upgrade application if client agrees

3. **Family Planning & Education Savings**
   - Recommend 529 plan: $10K initial + $500/month
   - Discuss grandparent gifting strategy
   - Provide enrollment packet

4. **Philanthropic Giving Strategy**
   - Present donor-advised fund concept
   - Discuss tax benefits of lumpy giving
   - Review Emma's charitable goals and values

5. **Estate Planning Review**
   - Confirm beneficiary updates completed
   - Discuss trust structures for newborn
   - Review life insurance coverage adequacy

*Follow-Up Actions (Post-Meeting):*
• Process any account applications/changes
• Schedule next quarterly review (June 2024)
• Implement approved portfolio rebalancing
• Monitor lifestyle signal changes for proactive outreach

*Engagement Health:* 🟢 Strong (Last contact: 12 days ago | 95% meeting attendance)`,
    order: 4,
    lastEdited: "2024-03-10T14:39:00"
  }
];

// Engagement Health Metrics
export const sampleEngagementData: EngagementHealth = {
  status: "high",
  metrics: {
    lastContact: "12 days ago",
    meetingAttendance: 95,
    responseRate: 88,
    reviewFrequency: "Quarterly",
    proactiveInquiries: 3
  }
};
