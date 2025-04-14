// Use absolute URLs in all environments
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://www.serranoartcamp.org/api'  // Full production URL
    : 'http://localhost:3000/api');

export const ApiService = {
  submitRegistration: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Required for cookies if using auth
        body: JSON.stringify(formData),
      });

      // Handle non-JSON responses (like 308 redirects)
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API error:', error.message);
      throw new Error(`Registration failed: ${error.message}`);
    }
  },
};