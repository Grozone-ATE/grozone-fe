import React from 'react'; 
import Layouts from "@layouts/Layouts";
import { getAllPostsIds, getPostData, getRelatedPosts } from "@library/posts";
import Date from '@library/date';
import PageBanner from "@components/PageBanner";
import RelatedPostsSection from "@components/sections/RelatedPosts";
import { removeHtmlTags } from "@/src/common/utilits";

// Helper function to construct full image URL
function getFullImageUrl(image) {
    const baseUrl = process.env.STRAPI_URL || 'https://cms.grozone.vn';
    return `${baseUrl}${image || ''}`;
}

// Function to handle rendering content from Strapi
function renderContent(content) {
    return content.map((block, index) => {
        let element;
        switch (block.type) {
            case 'paragraph':
                element = <p key={index}>{renderChildren(block.children)}</p>;
                break;
            case 'heading':
                element = React.createElement(`h${block.level}`, { key: index }, renderChildren(block.children));
                break;
            case 'list':
                const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
                element = (
                    <ListTag key={index}>
                        {block.children.map((listItem, listIndex) => (
                            <li key={listIndex}>{renderChildren(listItem.children)}</li>
                        ))}
                    </ListTag>
                );
                break;
            case 'image':
                element = (
                    <img
                        key={index}
                        src={block.image.url}
                        alt={block.image.alternativeText || 'Image'}
                        style={{ maxWidth: '100%' }}
                    />
                );
                break;
            case 'quote':
                element = <blockquote key={index}>{renderChildren(block.children)}</blockquote>;
                break;
            case 'code':
                element = (
                    <pre key={index}>
                        <code>{block.children[0]?.text}</code>
                    </pre>
                );
                break;
            default:
                element = null;
        }
        return element;
    });
}

// Function to handle rendering text with inline styles like bold, italic, etc.
function renderChildren(children) {
    return children.map((child, index) => {
        let element = <span key={index}>{child.text}</span>;
        if (child.bold) {
            element = <strong key={index}>{child.text}</strong>;
        }
        if (child.italic) {
            element = <em key={index}>{child.text}</em>;
        }
        if (child.underline) {
            element = <u key={index}>{child.text}</u>;
        }
        if (child.strikethrough) {
            element = <del key={index}>{child.text}</del>;
        }
        if (child.code) {
            element = <code key={index}>{child.text}</code>;
        }
        if (child.type === 'link') {
            element = (
                <a key={index} href={child.url} target="_blank" rel="noopener noreferrer">
                    {child.children[0]?.text}
                </a>
            );
        }
        return element;
    });
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
                            <div className="mil-text mil-up mil-mb-60">
                                {postData.content ? renderContent(postData.content) : 'No content available'}
                            </div>
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

export async function getStaticPaths() {
    const paths = await getAllPostsIds();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
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
