import Link from "next/link";
import ImageView from "@components/ImageView";

const ProjectInner2 = ({ postData, prev, next }) => {
    return (
    <>
    {/* project */}
    <section>
        <div className="container mil-p-120-90" id="project">
            <div className="row justify-content-between mil-mb-90">
                {/* Left column: Description */}
                <div className="col-lg-6">
                    {typeof postData.details != "undefined" &&
                    <ul className="mil-service-list mil-dark mil-mb-30">
                        {postData.details.map((item, key) => (
                        <li className="mil-up" key={`project-details-item-${key}`}>{item.label} &nbsp;<span className="mil-dark">{item.value}</span></li>
                        ))}
                    </ul>
                    }

                    {typeof postData.description != "undefined" &&
                    <>
                        {postData.description.enabled == 1 &&
                        <>
                            <h5 className="mil-up mil-mb-20">{postData.description.title}</h5>
                            <div className="mil-text mil-up mil-mb-30 mil-content-spacing" dangerouslySetInnerHTML={{__html : postData.description.content}} />
                        </>
                        }
                    </>
                    }

                    {typeof postData.demoLink != "undefined" &&
                    <a data-no-swup href={postData.demoLink} target="_blank" className="mil-link mil-dark mil-up mil-arrow-place">
                        <span>Visit website</span>
                    </a>
                    }
                </div>
                
                {/* Right column: Gallery + Right Content */}
                <div className="col-lg-5">
                    {typeof postData.gallery != "undefined" &&
                    <>
                    {postData.gallery.enabled == 1 &&
                        <>
                        {postData.gallery.items.map((item, key) => (
                        <div className="mil-up mil-mb-30" key={`gallery-item-${key}`}>
                            <a data-fancybox="gallery" data-no-swup href={item.image} style={{display: 'block', cursor: 'pointer'}}>
                                <img src={item.image} alt={item.alt} style={{width: '100%', height: 'auto', display: 'block', borderRadius: '8px'}} />
                            </a>
                        </div>
                        ))}
                        </>
                    }
                    </>
                    }
                    
                    {typeof postData.rightContent != "undefined" &&
                    <>
                    {postData.rightContent.enabled == 1 &&
                        <div className="mil-text mil-up mil-mt-30 mil-content-spacing" dangerouslySetInnerHTML={{__html : postData.rightContent.content}} />
                    }
                    </>
                    }
                    
                    {/* YouTube Video */}
                    {typeof postData.youtubeVideo != "undefined" && postData.youtubeVideo.enabled == 1 &&
                    <div className="mil-up mil-mt-30" style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px'}}>
                        <iframe 
                            src={`https://www.youtube.com/embed/${postData.youtubeVideo.videoId}`}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 'none'
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video player"
                        />
                    </div>
                    }
                </div>
            </div>
            
            {/* CTA Section - Centered */}
            {typeof postData.ctaSection != "undefined" && postData.ctaSection.enabled == 1 &&
            <div className="row mil-mb-90">
                <div className="col-12">
                    <div className="mil-up" style={{textAlign: 'center', padding: '60px 40px', background: '#f9f9f9', borderRadius: '12px'}}>
                        <h3 className="mil-mb-20">{postData.ctaSection.title}</h3>
                        <p className="mil-mb-30" style={{maxWidth: '600px', margin: '0 auto 30px'}}>{postData.ctaSection.description}</p>
                        <a href={postData.ctaSection.buttonLink} className="mil-button mil-border" style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                            <span>{postData.ctaSection.buttonText}</span>
                        </a>
                    </div>
                </div>
            </div>
            }
            
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
export default ProjectInner2;