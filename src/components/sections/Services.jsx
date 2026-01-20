import Data from "@data/sections/services.json";
import Link from "next/link";
import ArrowIcon from "@layouts/svg-icons/Arrow";
import Pentagon from "@layouts/pentagon/Index";

const ServicesSection = ({ projects = [], allProjects = [] }) => {
  return (
    <>
        {/* services */}
        <section className="mil-dark-bg">
            <div className="mi-invert-fix">
                <div className="mil-animation-frame">
                    <div className="mil-animation mil-position-1 mil-scale" data-value-1="2.4" data-value-2="1.4" style={{"top": "300px", "right": "-100px"}}>
                        <Pentagon />
                    </div>
                    <div className="mil-animation mil-position-2 mil-scale" data-value-1="2" data-value-2="1" style={{"left": "150px"}}>
                        <Pentagon />
                    </div>
                </div>
                <div className="container" style={{paddingTop: '60px', paddingBottom: '0'}}>

                    <div className="mil-mb-60">
                        <div className="mil-complex-text justify-content-center mil-up mil-mb-15">
                            <span className="mil-text-image"><img src="img/photo/2.jpg" alt="team" /></span>
                            <h2 className="mil-h1 mil-muted mil-center" dangerouslySetInnerHTML={{__html : Data.title1}} />
                        </div>

                        <div className="mil-complex-text justify-content-center mil-up">
                            <h2 className="mil-h1 mil-muted mil-center" dangerouslySetInnerHTML={{__html : Data.title2}} />
                            <Link href={Data.button.link} className="mil-services-button mil-button mil-arrow-place">
                                <span>{Data.button.label}</span>
                                <ArrowIcon />
                            </Link>
                        </div>
                    </div>

                    {/* Featured Projects - 2 project banners */}
                    {projects && projects.length > 0 && (
                        <div className="mil-featured-projects mil-up mil-mb-60" style={{display: 'flex', flexDirection: 'row', gap: '30px', flexWrap: 'wrap'}}>
                            {projects.slice(0, 2).map((project, key) => (
                                <Link 
                                    key={`featured-project-${key}`} 
                                    href={`/projects/${project.id}`}
                                    className="mil-project-banner"
                                    style={{flex: 1, minWidth: 'calc(50% - 15px)', display: 'flex', flexDirection: 'row', gap: '20px'}}
                                >
                                    <div className="mil-project-banner-image" style={{width: '40%', paddingBottom: '30%', position: 'relative', overflow: 'hidden', flexShrink: 0}}>
                                        <img 
                                            src={project.image || project.sliderImage} 
                                            alt={project.title}
                                            style={{width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0}}
                                        />
                                    </div>
                                    <div className="mil-project-banner-content" style={{flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                        <span className="mil-label" style={{marginBottom: '10px', fontSize: '14px'}}>{project.date || project.category}</span>
                                        <h4 className="mil-muted mil-mb-15" style={{fontSize: '20px', fontWeight: 600}}>{project.title}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="row mil-services-grid m-0">
                        {allProjects && allProjects.length > 0 && allProjects.slice(0, 6).map((project, key) => (
                        <div key={`project-card-${key}`} className="col-md-6 col-lg-4 mil-services-grid-item p-0">

                            <Link href={`/projects/${project.id}`} className="mil-service-card-sm mil-project-card mil-up" style={{position: 'relative'}}>
                                <div className="mil-project-card-arrow" style={{position: 'absolute', top: '15px', right: '15px', zIndex: 10}}>
                                    <ArrowIcon />
                                </div>
                                <div className="mil-labels mil-mb-10" style={{fontSize: '11px'}}>
                                    <span className="mil-label mil-upper mil-accent" style={{marginRight: '10px'}}>{project.category}</span>
                                    <span className="mil-label mil-upper">{project.date}</span>
                                </div>
                                <h5 className="mil-muted mil-mb-15" style={{fontSize: '16px', fontWeight: 600, lineHeight: '1.4'}}>{project.title}</h5>
                                {project.description && project.description.title && (
                                    <p className="mil-light-soft" style={{fontSize: '13px', lineHeight: '1.6', marginBottom: 0, opacity: 0.8}}>
                                        {project.description.title.length > 100 
                                            ? project.description.title.substring(0, 100) + '...' 
                                            : project.description.title}
                                    </p>
                                )}
                            </Link>

                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        {/* services end */}
    </>
  );
};

export default ServicesSection;