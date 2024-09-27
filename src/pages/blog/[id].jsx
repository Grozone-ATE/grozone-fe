import Layouts from "@layouts/Layouts";
import { getAllPostsIds, getPostData, getRelatedPosts } from "@library/posts";
import Date from '@library/date';
import PageBanner from "@components/PageBanner";
import RelatedPostsSection from "@components/sections/RelatedPosts";
import { removeHtmlTags } from "@/src/common/utilits";

// Helper function to construct full image URL
function getFullImageUrl(image) {
    const baseUrl = process.env.STRAPI_URL || 'http://localhost:1337'; // Use environment variable or fallback
    return `${baseUrl}${image}`;
}

const PostsDetail = (props) => {
    const postData = props.data;

    return (
        <Layouts>
            <PageBanner
                pageTitle={postData.attributes.title}
                breadTitle={removeHtmlTags(postData.attributes.title)}
                align={"center"}
                headingSize={2}
            />

            {/* publication */}
            <section id="blog">
                <div className="container mil-p-120-90">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="mil-image-frame mil-horizontal mil-up">
                                <img
                                    src={getFullImageUrl(postData?.attributes?.image?.data?.attributes?.url || '')}
                                    alt={removeHtmlTags(postData.attributes.title)}
                                    className="mil-scale"
                                    data-value-1=".90"
                                    data-value-2="1.15"
                                />
                            </div>
                            <div className="mil-info mil-up mil-mb-90">
                                <div>
                                    Category: &nbsp;
                                    <span className="mil-dark">
                                        {postData?.attributes?.category?.data?.attributes?.name || 'Uncategorized'}
                                    </span>
                                </div>
                                <div>
                                    Date: &nbsp;
                                    <span className="mil-dark">
                                        <Date dateString={postData.attributes.createdAt} />
                                    </span>
                                </div>
                                <div>
                                    Author: &nbsp;
                                    <span className="mil-dark">
                                        {postData.attributes.author || 'Unknown Author'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div
                                className="mil-text mil-up mil-mb-60"
                                dangerouslySetInnerHTML={{ __html: postData.attributes.content }}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* publication end */}

            <RelatedPostsSection items={props.related} />
        </Layouts>
    );
};

export default PostsDetail;

export async function getStaticPaths() {
    const paths = await getAllPostsIds();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    const relatedPosts = await getRelatedPosts(postData?.attributes?.category?.data?.id || '', params.id);

    return {
        props: {
            data: postData,
            related: relatedPosts,
        },
    };
}
