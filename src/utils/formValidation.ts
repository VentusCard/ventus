
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateBusinessInfo = (
  selectedCategory: string,
  businessType: string,
  selectedSubcategories: string[],
  subcategories: Record<string, string[]>
): ValidationResult => {
  const errors: string[] = [];

  if (!selectedCategory) {
    errors.push('Please select a business category');
  }

  if (!businessType) {
    errors.push('Please select a business type');
  }

  if (selectedCategory && subcategories[selectedCategory] && selectedSubcategories.length === 0) {
    errors.push('Please select at least one subcategory');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateTargetingTools = (selectedTargeting: string[]): ValidationResult => {
  const errors: string[] = [];
  const nonGeographicTools = selectedTargeting.filter(tool => tool !== "geographic");

  if (nonGeographicTools.length === 0) {
    errors.push('Please select at least one additional targeting tool');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateBudget = (budgetPeriod: string, budgetValue: number[]): ValidationResult => {
  const errors: string[] = [];

  if (!budgetPeriod) {
    errors.push('Please select a budget period');
  }

  if (!budgetValue || budgetValue.length === 0 || budgetValue[0] <= 0) {
    errors.push('Please set a valid budget amount');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateContactInfo = (formData: FormData): ValidationResult => {
  const errors: string[] = [];
  const requiredFields = [
    { key: 'companyName', label: 'Company Name' },
    { key: 'companyWebsite', label: 'Company Website' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'roleTitle', label: 'Role/Title' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone Number' }
  ];

  requiredFields.forEach(field => {
    const value = formData.get(field.key) as string;
    if (!value || value.trim() === '') {
      errors.push(`${field.label} is required`);
    }
  });

  // Email validation
  const email = formData.get('email') as string;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email address');
  }

  // Website validation
  const website = formData.get('companyWebsite') as string;
  if (website && !/^https?:\/\/.+\..+/.test(website)) {
    errors.push('Please enter a valid website URL');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
