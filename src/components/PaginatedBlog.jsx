import Link from "next/link";
import Date from '@library/date';
import { removeHtmlTags } from "../common/utilits";

const PaginationPage = ({ items }) => {
    return (
        <>
            {items.map((item, index) => (
                <div className="col-lg-12" key={`post-${index}`}>

                    <Link href={`/blog/${item.id}`} className="mil-blog-card mil-blog-card-hori mil-more mil-mb-60">
                        <div className="mil-cover-frame mil-up">
                            <img src={`${process.env.STRAPI_URL}${item.attributes.image.data.attributes.url}`} alt={removeHtmlTags(item.attributes.title)} />
                        </div>
                        <div className="mil-post-descr">
                            <div className="mil-labels mil-up mil-mb-30">
                                <div className="mil-label mil-upper mil-accent">{item.attributes.category.data.attributes.name}</div>
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
        </>
    );
};
export default PaginationPage;
