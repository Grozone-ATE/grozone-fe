import Data from "@data/sections/latest-posts.json";
import Date from '@library/date';
import Link from "next/link";
import ArrowIcon from "@layouts/svg-icons/Arrow";
import { removeHtmlTags } from "@/src/common/utilits";

const LatestPostsSection = ( { posts, layout, imageHorizontal } ) => {
    return (
        <>
            {/* blog */}
            <section>
                <div className="container mil-p-120-60">
                    <div className="row align-items-center mil-mb-30">
                        <div className="col-lg-6 mil-mb-30">
                            <h3 className="mil-up">{Data.title}</h3>
                        </div>
                        <div className="col-lg-6 mil-mb-30">
                            <div className="mil-adaptive-right mil-up">
                                <a href={Data.button.link} className="mil-link mil-dark mil-arrow-place">
                                    <span>{Data.button.label}</span>
                                    <ArrowIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {posts.slice(0, Data.numOfItems).map((item, key) => (
                        <div className="col-lg-6" key={`blog-post-${key}`}>

                            <Link href={`/blog/${item.id}`} className="mil-blog-card mil-mb-60">
                                <div className="mil-cover-frame mil-up">
                                    <img src={`${process.env.STRAPI_URL}${item.attributes.image.data.attributes.url}`} alt={removeHtmlTags(item.attributes.title)} />
                                </div>
                                <div className="mil-post-descr">
                                    <div className="mil-labels mil-up mil-mb-30">
                                        <div className="mil-label mil-upper mil-accent">{item.attributes.category.data.attributes.name}</div>
                                        <div className="mil-label mil-upper"><Date dateString={item.attributes.createdAt} /></div>
                                    </div>
                                    <h4 className="mil-up mil-mb-30" dangerouslySetInnerHTML={{__html: item.attributes.title}}></h4>
                                    <p className="mil-post-text mil-up mil-mb-30">{item.attributes.shortDescription}</p>
                                    <div className="mil-link mil-dark mil-arrow-place mil-up">
                                        <span>Read more</span>
                                        <ArrowIcon />
                                    </div>
                                </div>
                            </Link>

                        </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* blog end */}
        </>
    );
};

export default LatestPostsSection;