import PaginatedBlog from '@components/PaginatedBlog';
import Pagination from '@components/Pagination';
import Link from "next/link";
import PageBanner from "@components/PageBanner";
import SubscribeSection from "@components/sections/Subscribe";
import Layouts from "@layouts/Layouts";
import { getSortedCategoriesData } from "@library/categories";
import { getPaginatedPostsData } from "@library/posts";

export const PER_PAGE = 8;

// Helper function to construct full image URL
function getFullImageUrl(image) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'; // Ensure the base URL is defined
  return `${baseUrl}${image}`;
}

const Blog = ({ posts, currentPage, totalPosts, categories }) => {
  return (
    <Layouts>
      <PageBanner
        pageTitle={`Exploring <span className="mil-thin">the World</span> <br> Through Our <span className="mil-thin">Blog</span>`}
        breadTitle={"Blog"}
        anchorLabel={"Publications"}
        anchorLink={"#blog"}
        paddingBottom={1}
      />

      {/* blog */}
      <section>
        <div className="container mil-p-120-120">
          <div className="row align-items-center mil-mb-30">
            <div className="col-lg-4 mil-mb-30">
              <h3 className="mil-up">Categories:</h3>
            </div>
            <div className="col-lg-8 mil-mb-30">
              <div className="mil-adaptive-right mil-up">
                <ul className="mil-category-list">
                  {categories.map((item, key) => (
                    <li key={`categories-item-${key}`}>
                      <Link href={`/blog/category/${item.id}`}>{item.title}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/blog" className="mil-active">
                      All categories
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <PaginatedBlog items={posts} />
            <Pagination
              currentPage={currentPage}
              totalItems={totalPosts}
              perPage={PER_PAGE}
              renderPageLink={(page) => `/blog/page/${page}`}
            />
          </div>
        </div>
      </section>
      {/* blog end */}

      <SubscribeSection />
    </Layouts>
  );
};
export default Blog;

export async function getStaticPaths() {
  // Fetch the total number of posts to calculate the number of pages
  const { total } = await getPaginatedPostsData(PER_PAGE, 1);
  const totalPages = Math.ceil(total / PER_PAGE);

  // Create paths for pages 2, 3, ..., totalPages
  const paths = Array.from({ length: totalPages - 1 }).map((_, i) => ({
    params: { page: (i + 2).toString() }, // Pages start from 2
  }));

  return {
    paths,
    fallback: 'blocking', // Allows for dynamic pages to be rendered on demand
  };
}

export async function getStaticProps({ params }) {
  const page = Number(params?.page) || 1;
  const { posts, total } = await getPaginatedPostsData(PER_PAGE, page); // Ensure this is awaited properly
  const categoriesData = await getSortedCategoriesData();

  if (!posts.length) {
    return {
      notFound: true,
    };
  }

  if (page === 1) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  }

  return {
    props: {
      posts,
      totalPosts: total,
      currentPage: page,
      categories: categoriesData,
    },
    revalidate: 60 * 60 * 24, // ISR: Revalidate once a day
  };
}
