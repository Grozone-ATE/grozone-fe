import { fetchData } from './api';

// Helper to get full URL for images
function getFullImageUrl(media) {
  if (media && media.data && media.data.attributes.url) {
    const baseUrl = process.env.STRAPI_BASE_URL || 'http://localhost:1337'; // Use environment variable or fallback
    return `${baseUrl}${media.data.attributes.url}`;
  }
  return null;
}

export async function getSortedPostsData() {
  try {
    const res = await fetchData('/posts?populate=*&sort=createdAt:desc');

    if (res && res.data) {
      const posts = res.data.map((post) => {
        if (post.attributes.image) {
          post.attributes.image.url = getFullImageUrl(post.attributes.image);
        }
        return post;
      });

      return posts;
    }
  } catch (error) {
    console.error("Error fetching sorted posts:", error);
  }

  return [];
}

export async function getCategoryPosts(cat_id) {
  try {
    const res = await fetchData(`/posts?populate=*&sort=createdAt:desc&filters[category][id][$eq]=${cat_id}`);

    if (res && res.data) {
      const posts = res.data.map((post) => {
        if (post.attributes.image) {
          post.attributes.image.url = getFullImageUrl(post.attributes.image);
        }
        return post;
      });

      return posts;
    }
  } catch (error) {
    console.error("Error fetching category posts:", error);
  }

  return [];
}

export async function getPaginatedPostsData(limit, page) {
  try {
    const res = await fetchData(`/posts?populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${limit}`);

    const posts = res.data.map((post) => {
      if (post.attributes.image) {
        post.attributes.image.url = getFullImageUrl(post.attributes.image);
      }
      return post;
    });

    return { posts, total: res.meta.pagination.total };
  } catch (error) {
    console.error("Error fetching paginated posts:", error);
  }

  return { posts: [], total: 0 };
}

export async function getFeaturedPostsData() {
  try {
    const res = await fetchData('/posts?populate=*&sort=createdAt:desc&filters[isFeatured][$eq]=true');

    if (res && res.data) {
      const posts = res.data.map((post) => {
        if (post.attributes.image) {
          post.attributes.image.url = getFullImageUrl(post.attributes.image);
        }
        return post;
      });

      return posts;
    }
  } catch (error) {
    console.error("Error fetching featured posts:", error);
  }

  return [];
}

export async function getRelatedPosts(cat_id, current_id) {
  try {
    const res = await fetchData(`/posts?populate=*&sort=createdAt:desc&filters[category][id][$eq]=${cat_id}&filters[id][$ne]=${current_id}`);

    if (res && res.data) {
      const posts = res.data.map((post) => {
        if (post.attributes.image) {
          post.attributes.image.url = getFullImageUrl(post.attributes.image);
        }
        return post;
      });

      return posts;
    }
  } catch (error) {
    console.error("Error fetching related posts:", error);
  }

  return [];
}

export async function getAllPostsIds() {
  try {
    const res = await fetchData('/posts?fields[0]=id');

    if (res && res.data) {
      return res.data.map(post => ({
        params: {
          id: post.id.toString(),
        },
      }));
    }
  } catch (error) {
    console.error("Error fetching post ids:", error);
  }

  return [];
}

export async function getPostData(id) {
  try {
    const res = await fetchData(`/posts?populate=*&filters[id][$eq]=${id}`);

    if (res && res.data) {
      const post = res.data[0];
      if (post.attributes.image) {
        post.attributes.image.url = getFullImageUrl(post.attributes.image);
      }
      return post;
    }
  } catch (error) {
    console.error("Error fetching post data:", error);
  }

  return null;
}
