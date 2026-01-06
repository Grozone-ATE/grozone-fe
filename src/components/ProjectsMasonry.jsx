import React from "react";
import Link from "next/link";
import LinesIcon from "@layouts/svg-icons/Lines";

const ProjectsMasonry = ({ projects }) => {
    // Chỉ hiển thị 2 project chính (project-1 và project-2), các trang con vẫn truy cập được qua link
    const displayedProjects = projects.slice(0, 2);
    const projectRows = [];

    for (var i = 0; i < displayedProjects.length; i += 2 ) {
        projectRows.push(displayedProjects.slice(i, 2 + i));
    }
    
    return (
      <>
        {/* portfolio */}
        <section id="portfolio">
            <div className="container mil-portfolio" style={{paddingTop: '0', paddingBottom: '60px'}}>

                <div className="mil-lines-place"><LinesIcon /></div>
                <div className="mil-lines-place mil-lines-long"><LinesIcon /></div>

                <div className="row justify-content-center align-items-center">
                    {projectRows.map((row, row_key) => (
                    <React.Fragment key={`projects-item-${row_key}`}>
                        {row.map((item, key) => (
                        <div className="col-lg-6" key={`projects-item-${row_key}-${key}`} style={key === 1 ? {marginTop: '250px'} : {}}>

                            <Link href={`/projects/${item.id}`} className="mil-portfolio-item mil-more mil-mb-60" data-value-1="60" data-value-2="-60">
                                <div className="mil-up" style={{overflow: 'hidden', borderRadius: '8px'}}>
                                    <img src={item.image} alt={item.title} style={{width: '100%', height: 'auto', display: 'block'}} />
                                </div>
                                <div className="mil-descr">
                                    <div className="mil-labels mil-up mil-mb-15">
                                        <div className="mil-label mil-upper mil-accent">{item.category}</div>
                                        <div className="mil-label mil-upper">{item.date}</div>
                                    </div>
                                    <h4 className="mil-up">{item.title}</h4>
                                </div>
                            </Link>

                        </div>
                        ))}
                    </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
        {/* portfolio end */}
      </>
    );
};
export default ProjectsMasonry;
  