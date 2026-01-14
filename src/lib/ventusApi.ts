// Ventus API Utilities
const API_URL = 'https://ventusserver.onrender.com/web';
const CHATBOT_URL = 'https://ventusserver.onrender.com/chatbot-v2';
const LOGO_DEV_TOKEN = 'pk_a2V3X5oRR7iKwGFODFlS3A';

// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('ventus_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

// Auth APIs
export const authApi = {
  signup: async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Signup failed' }));
      throw new Error(error.message || 'Signup failed');
    }
    return response.json();
  },

  login: async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(error.message || 'Login failed');
    }
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getSession: async () => {
    const response = await fetch(`${API_URL}/auth/session`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Session invalid');
    return response.json();
  },
};

// Signup flow APIs
export const signupFlowApi = {
  getLifestyles: async () => {
    const response = await fetch(`${API_URL}/signup/lifestyles`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to get lifestyles');
    return response.json();
  },

  saveLifestyle: async (lifestyle: string) => {
    const response = await fetch(`${API_URL}/signup/lifestyle`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ lifestyle }),
    });
    if (!response.ok) throw new Error('Failed to save lifestyle');
    return response.json();
  },

  saveSubcategories: async (subcategories: string[]) => {
    const response = await fetch(`${API_URL}/signup/subcategories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ subcategories }),
    });
    if (!response.ok) throw new Error('Failed to save subcategories');
    return response.json();
  },

  saveLocation: async (data: { city: string; state: string; zipcode: string }) => {
    const response = await fetch(`${API_URL}/signup/location`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to save location');
    return response.json();
  },
};

// Offers APIs
export const offersApi = {
  getOffers: async () => {
    const response = await fetch(`${API_URL}/offers`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to get offers');
    return response.json();
  },

  getBySubcategory: async (subcategory: string) => {
    const response = await fetch(`${API_URL}/offers/subcategory/${encodeURIComponent(subcategory)}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to get offers');
    return response.json();
  },

  getByMerchant: async (merchantName: string) => {
    const response = await fetch(`${API_URL}/offers/merchant/${encodeURIComponent(merchantName)}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to get offers');
    return response.json();
  },
};

// Categories APIs
export const categoriesApi = {
  getCategories: async () => {
    const response = await fetch(`${API_URL}/categories`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to get categories');
    return response.json();
  },

  getSubcategories: async () => {
    const response = await fetch(`${API_URL}/categories/subcategories`);
    if (!response.ok) throw new Error('Failed to get subcategories');
    return response.json();
  },
};

// Profile APIs
export const profileApi = {
  getProfile: async (userId: string) => {
    const response = await fetch(`${API_URL}/profile/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to get profile');
    return response.json();
  },

  updateProfile: async (userId: string, data: Partial<VentusUserProfile>) => {
    const response = await fetch(`${API_URL}/profile/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },
};

// Tracking APIs
export const trackingApi = {
  trackClick: async (offerId: string) => {
    const response = await fetch(`${API_URL}/track/click`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ offerId }),
    });
    return response.json();
  },
};

// Search/Chatbot API
export const chatbotApi = {
  search: async (query: string, conversationHistory: { role: string; content: string }[]) => {
    const response = await fetch(CHATBOT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, conversationHistory }),
    });
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  },
};

// Helper to get merchant logo URL
export const getMerchantLogoUrl = (domain: string) => {
  if (!domain) return null;
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}`;
};

// Types
export interface VentusUserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  lifestyle: string;
  subcategories: string[];
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

export interface VentusOffer {
  id: string;
  merchant_name: string;
  domain: string;
  title: string;
  description: string;
  url: string;
  merchant_logo_url?: string;
  source?: string;
  is_offer: boolean;
  subcategory: string;
  deal_category?: string;
  deal_categories?: string[];
  updated_at: string;
}

export interface VentusCategory {
  subcategory: string;
  main_category: string;
  deal_category?: string;
  deal_categories?: string[];
  display_order: number;
  emoji?: string;
  color?: string;
}

export interface ChatbotResponse {
  type: 'search' | 'advice';
  success: boolean;
  message: string;
  products?: VentusProduct[];
  item?: string;
}

export interface VentusProduct {
  name: string;
  price: number;
  original_price?: number;
  merchant: string;
  domain: string;
  url: string;
  description?: string;
}
