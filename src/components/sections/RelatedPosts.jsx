import { removeHtmlTags } from "@/src/common/utilits";
import Data from "@data/sections/related-posts.json";
import Date from '@library/date';
import Link from "next/link";

// Helper function to construct full image URL
function getFullImageUrl(image) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'; // Ensure the base URL is defined
    return `${baseUrl}${image}`;
}

const RelatedPostsSection = ({ items }) => {

    return (
        <>
            {/* related posts */}
            <section className="mil-soft-bg">
                <div className="container mil-p-120-60">
                    <div className="row align-items-center mil-mb-30">
                        <div className="col-lg-6 mil-mb-30">
                            <h3 className="mil-up">{Data.title}</h3>
                        </div>
                        <div className="col-lg-6 mil-mb-30">
                            <div className="mil-adaptive-right mil-up">
                                <Link href={Data.button.link} className="mil-link mil-dark mil-arrow-place">
                                    <span>{Data.button.label}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {items.slice(0, Data.numOfItems).map((item, key) => (
                            <div className="col-lg-6" key={`related-posts-item-${key}`}>
                                <Link href={`/blog/${item.id}`} className="mil-blog-card mil-mb-60">
                                    <div className="mil-cover-frame mil-up">
                                        <img
                                            src={getFullImageUrl(item.attributes.image?.data?.attributes?.url || '')}
                                            alt={removeHtmlTags(item.attributes.title)}
                                        />
                                    </div>
                                    <div className="mil-post-descr">
                                        <div className="mil-labels mil-up mil-mb-30">
                                            <div className="mil-label mil-upper mil-accent">{item.attributes.category?.data?.attributes?.name}</div>
                                            <div className="mil-label mil-upper"><Date dateString={item.attributes.createdAt} /></div>
                                        </div>
                                        <h4 className="mil-up mil-mb-30" dangerouslySetInnerHTML={{ __html: item.attributes.title }}></h4>
                                        <p className="mil-post-text mil-up mil-mb-30">{item.attributes.shortDescription}</p>
                                        <div className="mil-link mil-dark mil-arrow-place mil-up">
                                            <span>Read more</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* blog end */}

            <div className="mil-divider mil-up" />
        </>
    );
};

export default RelatedPostsSection;
