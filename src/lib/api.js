export const fetchData = async (endpoint) => {
    const token = process.env.STRAPI_API_TOKEN;
  
    const res = await fetch(`${process.env.STRAPI_API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch from Strapi: ${res.statusText}`);
    }
  
    const data = await res.json();
    return data;
  };
  