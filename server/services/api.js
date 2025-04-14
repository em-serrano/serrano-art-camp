// Use relative paths in production, absolute in development
const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // Relative path works with your custom domain
  : import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const ApiService = {
  submitRegistration: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API error:', error.message);
      throw error; // Re-throw for error boundaries
    }
  },
};