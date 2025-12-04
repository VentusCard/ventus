export interface ClientProfileData {
  name: string;
  segment: 'Preferred' | 'Private' | 'Premium';
  aum: string;
  tenure: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  demographics: {
    age: string;
    occupation: string;
    familyStatus: string;
  };
  holdings: {
    deposit: string;
    credit: string;
    mortgage: string;
    investments: string;
  };
  compliance: {
    kycStatus: 'Current' | 'Under Review' | 'Pending Update';
    lastReview: string;
    nextReview: string;
    riskProfile: 'Conservative' | 'Moderate' | 'Aggressive' | 'Balanced';
  };
  milestones: Array<{
    event: string;
    date: string;
  }>;
}
