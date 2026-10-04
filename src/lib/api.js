export const fetchData = async (endpoint) => {
  try {
    const token = process.env.STRAPI_API_TOKEN;
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.grozone.co/api';

    const res = await fetch(`${apiUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.warn(`Failed to fetch from Strapi: ${res.statusText}. API URL: ${apiUrl}${endpoint}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`Error fetching from Strapi (${endpoint}):`, err.message);
    return null;
  }
};
