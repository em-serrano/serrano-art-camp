// Use relative paths in production, absolute in development
const API_BASE_URL = 'https://www.serranoartcamp.org/api' 

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
        throw new Error(errorData.message || `Registration Failed :( ... Try Again!)`);
      }

      return await response.json();
    } catch (error) {
      console.error('API error:', error.message);
      throw error; // Re-throw for error boundaries
    }
  },
};