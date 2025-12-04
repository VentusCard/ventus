import { ClientProfileData } from "@/types/clientProfile";

const firstNames = ['Sarah', 'James', 'Michelle', 'Robert', 'Emily', 'David', 'Jennifer', 'Michael', 'Amanda', 'Christopher', 'Jessica', 'Daniel', 'Ashley', 'Matthew', 'Lauren'];
const lastNames = ['Mitchell', 'Patterson', 'Wong', 'Thompson', 'Garcia', 'Johnson', 'Williams', 'Chen', 'Anderson', 'Martinez', 'Taylor', 'Lee', 'Harris', 'Clark', 'Robinson'];

const cities = [
  { city: 'San Francisco', state: 'CA', zip: '94102' },
  { city: 'New York', state: 'NY', zip: '10001' },
  { city: 'Chicago', state: 'IL', zip: '60601' },
  { city: 'Austin', state: 'TX', zip: '78701' },
  { city: 'Seattle', state: 'WA', zip: '98101' },
  { city: 'Boston', state: 'MA', zip: '02101' },
  { city: 'Denver', state: 'CO', zip: '80202' },
  { city: 'Miami', state: 'FL', zip: '33101' },
];

type Persona = 'youngProfessional' | 'growingFamily' | 'establishedProfessional' | 'preRetiree';

const personaConfig: Record<Persona, {
  ageRange: [number, number];
  familyStatuses: string[];
  occupations: string[];
  segments: ClientProfileData['segment'][];
  aumRange: [number, number];
  riskProfiles: ClientProfileData['compliance']['riskProfile'][];
  tenureRange: [number, number];
}> = {
  youngProfessional: {
    ageRange: [28, 35],
    familyStatuses: ['Single', 'Engaged', 'Married, no children'],
    occupations: ['Software Engineer', 'Product Manager', 'Marketing Director', 'Financial Analyst', 'UX Designer', 'Data Scientist'],
    segments: ['Preferred'],
    aumRange: [300000, 800000],
    riskProfiles: ['Aggressive', 'Moderate'],
    tenureRange: [0.5, 4],
  },
  growingFamily: {
    ageRange: [32, 45],
    familyStatuses: ['Married, 1 child', 'Married, 2 children', 'Married, 3 children'],
    occupations: ['Senior Manager', 'Director of Operations', 'Physician', 'Attorney', 'Business Owner', 'VP of Sales'],
    segments: ['Preferred', 'Private'],
    aumRange: [800000, 2000000],
    riskProfiles: ['Moderate', 'Balanced'],
    tenureRange: [3, 8],
  },
  establishedProfessional: {
    ageRange: [40, 55],
    familyStatuses: ['Married, 2 children', 'Married, adult children', 'Divorced, children'],
    occupations: ['Chief Technology Officer', 'Managing Partner', 'Surgeon', 'Investment Banker', 'Entrepreneur', 'Corporate Executive'],
    segments: ['Private', 'Premium'],
    aumRange: [1500000, 3500000],
    riskProfiles: ['Balanced', 'Moderate'],
    tenureRange: [5, 12],
  },
  preRetiree: {
    ageRange: [55, 65],
    familyStatuses: ['Married, adult children', 'Empty nester', 'Married, grandchildren'],
    occupations: ['Senior Vice President', 'Retired Executive', 'Business Owner', 'Partner Emeritus', 'Board Member', 'Consultant'],
    segments: ['Premium'],
    aumRange: [2000000, 5000000],
    riskProfiles: ['Conservative', 'Balanced'],
    tenureRange: [8, 15],
  },
};

const milestoneEvents = [
  'Account Opening',
  'Added Investment Account',
  'Credit Card Upgrade',
  'Mortgage Refinance',
  'Annual Portfolio Review',
  'Added Joint Account',
  'Wealth Planning Session',
  'Trust Account Established',
  'IRA Rollover Completed',
  'Premium Status Achieved',
  'College Savings Plan Setup',
  'Estate Planning Review',
];

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${(amount / 1000).toFixed(0)}K`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function generateMilestones(tenure: number, segment: ClientProfileData['segment']): ClientProfileData['milestones'] {
  const numMilestones = randomInRange(3, 5);
  const milestones: ClientProfileData['milestones'] = [];
  const now = new Date();
  const tenureMonths = Math.floor(tenure * 12);
  
  // Always start with Account Opening
  const openingDate = new Date(now);
  openingDate.setMonth(openingDate.getMonth() - tenureMonths);
  milestones.push({ event: 'Account Opening', date: formatDate(openingDate) });
  
  // Add random milestones
  const availableEvents = milestoneEvents.filter(e => e !== 'Account Opening');
  const selectedEvents = new Set<string>();
  
  while (milestones.length < numMilestones && selectedEvents.size < availableEvents.length) {
    const event = randomFromArray(availableEvents);
    if (!selectedEvents.has(event)) {
      selectedEvents.add(event);
      const monthsAgo = randomInRange(1, tenureMonths - 1);
      const eventDate = new Date(now);
      eventDate.setMonth(eventDate.getMonth() - monthsAgo);
      milestones.push({ event, date: formatDate(eventDate) });
    }
  }
  
  // Sort by date (most recent first)
  return milestones.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function generateRandomProfile(): ClientProfileData {
  // Pick a random persona
  const personas: Persona[] = ['youngProfessional', 'growingFamily', 'establishedProfessional', 'preRetiree'];
  const persona = randomFromArray(personas);
  const config = personaConfig[persona];
  
  // Generate basic info
  const firstName = randomFromArray(firstNames);
  const lastName = randomFromArray(lastNames);
  const name = `${firstName} ${lastName}`;
  
  const segment = randomFromArray(config.segments);
  const age = randomInRange(...config.ageRange);
  const tenure = parseFloat((Math.random() * (config.tenureRange[1] - config.tenureRange[0]) + config.tenureRange[0]).toFixed(1));
  const aum = randomInRange(...config.aumRange);
  
  // Generate contact info
  const location = randomFromArray(cities);
  const emailDomain = randomFromArray(['gmail.com', 'outlook.com', 'icloud.com', 'yahoo.com']);
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomain}`;
  const phone = `(${randomInRange(200, 999)}) ${randomInRange(200, 999)}-${randomInRange(1000, 9999)}`;
  const streetNum = randomInRange(100, 9999);
  const streets = ['Oak St', 'Main Ave', 'Park Blvd', 'Cedar Lane', 'Elm Drive', 'Highland Rd'];
  const address = `${streetNum} ${randomFromArray(streets)}, ${location.city}, ${location.state} ${location.zip}`;
  
  // Generate holdings proportional to AUM
  const investmentRatio = randomInRange(60, 80) / 100;
  const depositRatio = randomInRange(10, 25) / 100;
  const investments = Math.floor(aum * investmentRatio);
  const deposits = Math.floor(aum * depositRatio);
  const credit = randomInRange(5000, 100000);
  const hasMortgage = persona !== 'youngProfessional' || Math.random() > 0.5;
  const mortgage = hasMortgage ? randomInRange(200000, 1500000) : 0;
  
  // Generate compliance info
  const kycStatuses: ClientProfileData['compliance']['kycStatus'][] = ['Current', 'Current', 'Current', 'Under Review', 'Pending Update'];
  const kycStatus = randomFromArray(kycStatuses);
  const riskProfile = randomFromArray(config.riskProfiles);
  
  const now = new Date();
  const lastReviewMonths = randomInRange(1, 11);
  const lastReview = new Date(now);
  lastReview.setMonth(lastReview.getMonth() - lastReviewMonths);
  
  const nextReview = new Date(now);
  nextReview.setMonth(nextReview.getMonth() + randomInRange(1, 6));
  
  return {
    name,
    segment,
    aum: formatCurrency(aum),
    tenure: `${tenure} years`,
    contact: {
      email,
      phone,
      address,
    },
    demographics: {
      age: `${age}`,
      occupation: randomFromArray(config.occupations),
      familyStatus: randomFromArray(config.familyStatuses),
    },
    holdings: {
      deposit: formatCurrency(deposits),
      credit: formatCurrency(credit),
      mortgage: mortgage > 0 ? formatCurrency(mortgage) : '$0',
      investments: formatCurrency(investments),
    },
    holdingsChange: {
      deposit: { percent: randomInRange(1, 15), direction: Math.random() > 0.3 ? 'up' : 'down' },
      credit: { percent: randomInRange(5, 25), direction: Math.random() > 0.5 ? 'up' : 'down' },
      mortgage: { percent: randomInRange(1, 5), direction: 'down' as const },
      investments: { percent: randomInRange(2, 20), direction: Math.random() > 0.4 ? 'up' : 'down' },
    },
    compliance: {
      kycStatus,
      lastReview: formatDate(lastReview),
      nextReview: formatDate(nextReview),
      riskProfile,
    },
    milestones: generateMilestones(tenure, segment),
  };
}
