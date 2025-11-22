// frontend/src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getProfile: () => apiCall('/auth/me'),
  
  updateProfile: (profileData) => apiCall('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),
};

// Products API calls
export const productsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/products?${queryString}`);
  },
  
  getFeatured: () => apiCall('/products/featured'),
  
  getById: (id) => apiCall(`/products/${id}`),
  
  create: (productData) => apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  
  update: (id, productData) => apiCall(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  
  delete: (id) => apiCall(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// Users API calls (Admin only)
export const usersAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/users?${queryString}`);
  },
  
  getById: (id) => apiCall(`/users/${id}`),
  
  update: (id, userData) => apiCall(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
};

// Orders API calls
export const ordersAPI = {
  create: (orderData) => apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  getMyOrders: () => apiCall('/orders/my-orders'),
  
  getById: (id) => apiCall(`/orders/${id}`),
  
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/orders?${queryString}`);
  },
  
  updateStatus: (id, status) => apiCall(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
};