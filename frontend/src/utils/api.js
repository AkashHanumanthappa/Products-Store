const API_URL = import.meta.env.VITE_API_URL;

// Helper utility to make API requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // Set default headers
  if (!options.headers) {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }
  
  // Add authorization token if available
  const token = localStorage.getItem('token');
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    return { 
      success: data.success, 
      data: data.data, 
      message: data.message,
      status: response.status
    };
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return {
      success: false,
      message: error.message || 'Network error',
      status: 0
    };
  }
};

// Export API URL for direct use
export { API_URL };