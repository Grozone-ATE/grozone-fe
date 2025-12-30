import Data from "@data/sections/team.json";
import Link from "next/link";
import ArrowIcon from "@layouts/svg-icons/Arrow";
import LinesIcon from "@layouts/svg-icons/Lines";

const TeamSection = () => {
  return (
    <>
        {/* team */}
        <section>
            <div className="container mil-p-120-30">
                <div className="row justify-content-between align-items-center">
                    <div className="col-lg-5 col-xl-4">

                        <div className="mil-mb-90">
                            <h2 className="mil-up mil-mb-60" dangerouslySetInnerHTML={{__html : Data.title}} />
                            <div className="mil-text mil-up mil-mb-60" dangerouslySetInnerHTML={{__html : Data.description}} />
                            
                            <div className="mil-up"><Link href={Data.button.link} className="mil-button mil-arrow-place mil-mb-60"><span>{Data.button.label}</span><ArrowIcon /></Link></div>

                            <h4 className="mil-up" dangerouslySetInnerHTML={{__html : Data.subtitle}} />
                        </div>

                    </div>
                    <div className="col-lg-6">

                        <div className="mil-about-photo mil-mb-90">
                            <div className="mil-lines-place">
                                <LinesIcon />
                            </div>
                            {Data.col1_items.length > 0 && (
                            <div className="mil-up">
                                <img src={Data.col1_items[0].image} alt="Grozone" className="mil-scale" data-value-1="1" data-value-2="1.1" style={{width: "100%", height: "auto", display: "block", borderRadius: "8px"}} />
                            </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </section>
        {/* team end */}
    </>
  );
};

export default TeamSection;