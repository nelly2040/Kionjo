// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Add this console log to see what URL is being used
console.log('🔗 API Base URL:', API_BASE_URL);
console.log('🌍 Environment mode:', import.meta.env.MODE);

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  
  console.log('🌐 Making API call to:', fullUrl);
  console.log('🔧 Method:', options.method || 'GET');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Add body to config if provided
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(fullUrl, config);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Response is not JSON:', text);
      throw new Error(`Server returned non-JSON response: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('📡 Response status:', response.status);
    console.log('📦 Response data:', data);
    
    if (!response.ok) {
      throw new Error(data.message || `API request failed with status ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('❌ API call error:', error.message);
    console.error('📡 Failed URL:', fullUrl);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: userData,
  }),
  
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: credentials,
  }),
  
  getProfile: () => apiCall('/auth/me'),
  
  updateProfile: (profileData) => apiCall('/auth/profile', {
    method: 'PUT',
    body: profileData,
  }),
};

// Products API calls
export const productsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/products${queryString ? `?${queryString}` : ''}`);
  },
  
  getFeatured: () => apiCall('/products/featured'),
  
  getById: (id) => apiCall(`/products/${id}`),
  
  create: (productData) => apiCall('/products', {
    method: 'POST',
    body: productData,
  }),
  
  update: (id, productData) => apiCall(`/products/${id}`, {
    method: 'PUT',
    body: productData,
  }),
  
  delete: (id) => apiCall(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// Users API calls (Admin only)
export const usersAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/users${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => apiCall(`/users/${id}`),
  
  update: (id, userData) => apiCall(`/users/${id}`, {
    method: 'PUT',
    body: userData,
  }),
};

// Orders API calls
export const ordersAPI = {
  create: (orderData) => apiCall('/orders', {
    method: 'POST',
    body: orderData,
  }),
  
  getMyOrders: () => apiCall('/orders/my-orders'),
  
  getById: (id) => apiCall(`/orders/${id}`),
  
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/orders${queryString ? `?${queryString}` : ''}`);
  },
  
  updateStatus: (id, status) => apiCall(`/orders/${id}/status`, {
    method: 'PUT',
    body: { status },
  }),
};

// Utility API calls
export const utilityAPI = {
  healthCheck: () => apiCall('/health'),
  testDB: () => apiCall('/test-db'),
};