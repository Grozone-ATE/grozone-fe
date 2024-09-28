import { fetchData } from './api'

export async function getSortedCategoriesData() {
  // /categories?sort=name
  const res = await fetchData('/categories?sort=name');

  if (res) return res.data;

  return [];
}

export async function getAllCategoriesIds() {
  const res = await fetchData('/categories?fields[0]id');

  if (res) {
    return res.data.map(category => {
      return {
        params: {
          documentId: category.documentId.toString()
        }
      }
    });
  }
}

export async function getCategoryData(id) {
  const res = await fetchData('/categories?populate=*&filters[id][$eq]=' + id);

  if (res) return res.data[0];

  return [];
}