import Layouts from "@layouts/Layouts";
import { getAllPostsIds, getPostData, getRelatedPosts } from "@library/posts";
import Date from '@library/date';
import PageBanner from "@components/PageBanner";
import RelatedPostsSection from "@components/sections/RelatedPosts";
import { removeHtmlTags } from "@/src/common/utilits";

// Helper function to construct full image URL
function getFullImageUrl(image) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.grozone.co';
    return `${baseUrl}${image || ''}`;
}

const PostsDetail = (props) => {
    const postData = props.data;

    if (!postData) {
        return <p>No post data available</p>;
    }

    return (
        <Layouts>
            <PageBanner
                pageTitle={postData.title || 'Untitled'}
                breadTitle={removeHtmlTags(postData.title || 'Untitled')}
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
                                    src={getFullImageUrl(postData?.image?.url)}
                                    alt={removeHtmlTags(postData.title || 'Untitled')}
                                    className="mil-scale"
                                    data-value-1=".90"
                                    data-value-2="1.15"
                                />
                            </div>
                            <div className="mil-info mil-up mil-mb-90">
                                <div>
                                    Category: &nbsp;
                                    <span className="mil-dark">
                                        {postData?.category?.name || 'Uncategorized'}
                                    </span>
                                </div>
                                <div>
                                    Date: &nbsp;
                                    <span className="mil-dark">
                                        <Date dateString={postData.createdAt || ''} />
                                    </span>
                                </div>
                                <div>
                                    Author: &nbsp;
                                    <span className="mil-dark">
                                        {postData.author || 'Unknown Author'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div
                                className="mil-text mil-up mil-mb-60"
                                dangerouslySetInnerHTML={{ __html: postData.content || '' }}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* publication end */}

            <RelatedPostsSection items={props.related || []} /> {/* Ensure related posts are not undefined */}
        </Layouts>
    );
};

export default PostsDetail;

export async function getServerSideProps({ params }) {
    try {
        const postData = await getPostData(params.documentId);

        if (!postData) {
            return {
                notFound: true,
            };
        }

        const relatedPosts = postData?.category
            ? await getRelatedPosts(postData.category.documentId, params.documentId)
            : [];

        return {
            props: {
                data: postData || {},
                related: relatedPosts || [],
            },
        };
    } catch (error) {
        return {
            props: {
                data: {},
                related: [],
            },
        };
    }
}