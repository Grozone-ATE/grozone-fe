import { fetchData } from './api';

export async function getSortedPostsData() {
  const res = await fetchData('/posts?populate=*&sort=createdAt:desc');

  if (res) return res.data;

  return [];
}

export async function getCategoryPosts(cat_id) {
  const res = await fetchData('/posts?populate=*&sort=createdAt:desc&filters[category][documentId][$eq]=' + cat_id);

  if (res) return res.data;

  return [];
}

export async function getPaginatedPostsData(limit, page) {
  const res = await fetchData(`/posts?populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${limit}`);

  return { posts: res.data, total: res.meta.pagination.total };
}

export async function getFeaturedPostsData() {
  const res = await fetchData('/posts?populate=*&sort=createdAt:desc&filters[isFeatured][$eq]=true');

  if (res) return res.data;

  return [];
}

export async function getRelatedPosts(cat_id, current_id) {
  const res = await fetchData('/posts?populate=*&sort=createdAt:desc&filters[category][documentId][$eq]=' + cat_id + '&filters[documentId][$ne]=' + current_id);

  if (res) return res.data;

  return [];
}

export async function getAllPostsIds() {
  const res = await fetchData('/posts?fields[0]=documentId');

  if (res) {
    return res.data.map(post => {
      return {
        params: {
          documentId: post.documentId.toString(),
        },
      };
    });
  }
}

export async function getPostData(id) {
  const res = await fetchData('/posts?populate=*&filters[documentId][$eq]=' + id);

  if (res) return res.data[0];

  return [];
}
