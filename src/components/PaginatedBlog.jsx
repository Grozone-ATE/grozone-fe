import Link from "next/link";
import Date from '@library/date';
import { removeHtmlTags } from "../common/utilits";

// Helper function to construct full image URL
function getFullImageUrl(image) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.grozone.co';
    return `${baseUrl}${image || ''}`;
}

const PaginationPage = ({ items }) => {

    return (
        <>
            {items.map((item, index) => (
                <div className="col-lg-12" key={`post-${index}`}>

                    <Link href={`/blog/${item.documentId}`} className="mil-blog-card mil-blog-card-hori mil-more mil-mb-60">
                        <div className="mil-cover-frame mil-up">
                            <img src={getFullImageUrl(item.image?.url)} alt={removeHtmlTags(item.title)} />
                        </div>
                        <div className="mil-post-descr">
                            <div className="mil-labels mil-up mil-mb-30">
                                <div className="mil-label mil-upper mil-accent">{item.category?.name}</div>
                                <div className="mil-label mil-upper">
                                    <Date dateString={item.createdAt} />
                                </div>
                            </div>
                            <h4 className="mil-up mil-mb-30" dangerouslySetInnerHTML={{ __html: item.title }}></h4>
                            <p className="mil-post-text mil-up mil-mb-30">{item.shortDescription}</p>
                            <div className="mil-link mil-dark mil-arrow-place mil-up">
                                <span>Read more</span>
                            </div>
                        </div>
                    </Link>

                </div>
            ))}
        </>
    );
};

export default PaginationPage;
