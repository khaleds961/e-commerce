export async function GET_SITE_PROPERTIES() {
    try {
      const response = await fetch('https://api.yoursite.com/site-properties');
      if (!response.ok) throw new Error('Failed to fetch site properties');
      return await response.json();
    } catch (error) {
      console.error('Error fetching site properties:', error);
      throw error;
    }
  }