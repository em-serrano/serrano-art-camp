export const ApiService = {
  submitRegistration: async (formData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/registrations`, {
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
  
};