export const fetchData = async (endpoint) => {
  const token = process.env.STRAPI_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const res = await fetch(`${apiUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch from Strapi: ${res.statusText}. API URL: ${apiUrl}${endpoint}, Token: ${token}`);
  }

  const data = await res.json();
  return data;
};
