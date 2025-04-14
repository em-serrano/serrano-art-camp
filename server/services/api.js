// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const ApiService = {
  // Submit registration form
  submitRegistration: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Server error');
      }
      
      return data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  
  // Get flyer PDF URL
//   getFlyerUrl: () => {
//     return `${API_BASE_URL.replace('/api', '')}/flyers/artcamp_flyer.pdf`;
//   }
};