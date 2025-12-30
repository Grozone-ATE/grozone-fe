import Link from "next/link";
import ImageView from "@components/ImageView";

const ProjectInner1 = ({ postData, prev, next }) => {
    return (
    <>
    {/* project */}
    <section className="mil-p-120-0">
        <div className="container mil-p-0-120" id="project">
            {typeof postData.fullImage != "undefined" &&
            <div className="mil-up mil-mb-60" style={{position: 'relative'}}>
                <img src={postData.fullImage} alt={postData.title} style={{width: '100%', height: 'auto', display: 'block', borderRadius: '8px'}} />
                <a data-fancybox="gallery" data-no-swup href={postData.fullImage} className="mil-zoom-btn">
                    <img src="/img/icons/zoom.svg" alt="zoom" />
                </a>
            </div>
            }
            {typeof postData.details != "undefined" &&
            <div className="mil-info mil-up">
                {postData.details.map((item, key) => (
                <div key={`project-details-item-${key}`}>{item.label} &nbsp;<span className="mil-dark">{item.value}</span></div>
                ))}
            </div>
            }

            <div className="mil-p-120-0">
                {typeof postData.description != "undefined" &&
                <>
                {postData.description.enabled == 1 &&
                <>
                    {postData.description.title && (
                        <div className="row justify-content-center mil-mb-90">
                            <div className="col-lg-10">
                                <h3 className="mil-up mil-mb-60 mil-center">{postData.description.title}</h3>
                            </div>
                        </div>
                    )}
                    
                    {/* Layout xen kẽ: text và image */}
                    {typeof postData.gallery != "undefined" && postData.gallery.enabled == 1 && postData.gallery.items.length > 0 ? (
                        <>
                            {postData.gallery.items.map((item, key) => (
                                <div key={`alternating-item-${key}`} className={`row align-items-center mil-mb-120 ${key % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                                    <div className="col-lg-6">
                                        <div className="mil-up" style={{position: 'relative'}}>
                                            <img src={item.image} alt={item.alt} style={{width: '100%', height: 'auto', display: 'block', borderRadius: '8px'}} />
                                            <a data-fancybox="gallery" data-no-swup href={item.image} className="mil-zoom-btn">
                                                <img src="/img/icons/zoom.svg" alt="zoom" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        {key === 0 && (
                                            <div className="mil-text mil-up" dangerouslySetInnerHTML={{__html : postData.description.content.split('<!--SPLIT-->')[0] || postData.description.content}} />
                                        )}
                                        {key > 0 && postData.description.content.split('<!--SPLIT-->')[key] && (
                                            <div className="mil-text mil-up" dangerouslySetInnerHTML={{__html : postData.description.content.split('<!--SPLIT-->')[key]}} />
                                        )}
                                    </div>
                                </div>
                            ))}
                            {/* Phần text còn lại nếu có */}
                            {postData.description.content.split('<!--SPLIT-->').length > postData.gallery.items.length && (
                                <div className="row justify-content-center mil-mt-60">
                                    <div className="col-lg-10">
                                        <div className="mil-text mil-up" dangerouslySetInnerHTML={{__html : postData.description.content.split('<!--SPLIT-->').slice(postData.gallery.items.length).join('')}} />
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="row justify-content-center mil-p-90-120">
                            <div className="col-lg-10">
                                <div className="mil-text mil-up" dangerouslySetInnerHTML={{__html : postData.description.content}} />
                            </div>
                        </div>
                    )}
                </>
                }
                </>
                }

                {typeof postData.gallery2 != "undefined" &&
                <>
                {postData.gallery2.enabled == 1 &&
                <div className="row mil-p-0-90">
                    {postData.gallery2.items.map((item, key) => (
                    <div className="col-lg-6" key={`gallery2-item-${key}`}>

                        <div className="mil-up mil-mb-30" style={{position: 'relative'}}>
                            <img src={item.image} alt={item.alt} style={{width: '100%', height: 'auto', display: 'block', borderRadius: '8px'}} />
                            <a data-fancybox="gallery" data-no-swup href={item.image} className="mil-zoom-btn">
                                <img src="/img/icons/zoom.svg" alt="zoom" />
                            </a>
                        </div>

                    </div>
                    ))}
                </div>
                }
                </>
                }

            </div>

            <div className="mil-works-nav mil-up">
                <Link href={(prev.id != 0 && prev.id != undefined) ? `/projects/${prev.id}` : ""} className={(prev.id != 0 && prev.id != undefined) ? "mil-link mil-dark mil-arrow-place mil-icon-left" : "mil-link mil-dark mil-arrow-place mil-icon-left mil-disabled"}>
                    <span>Prev project</span>
                </Link>
                <Link href="/projects" className="mil-link mil-dark">
                    <span>All projects</span>
                </Link>
                <Link href={(next.id != 0 && next.id != undefined) ? `/projects/${next.id}` : ""} className={(next.id != 0 && next.id != undefined) ? "mil-link mil-dark mil-arrow-place" : "mil-link mil-dark mil-arrow-place mil-disabled"}>
                    <span>Next project</span>
                </Link>
            </div>
        </div>

        <ImageView />
    </section>
    {/* project end */}
    </>
    )
};
export default ProjectInner1;