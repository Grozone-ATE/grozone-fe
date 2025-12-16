import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";

import ArrowIcon from "@layouts/svg-icons/Arrow";
import Pentagon from "@layouts/pentagon/Index";

const E404 = () => {
  return (
    <Layouts noFooter>
      {/* 404 */}
      <div className="mil-404-banner mil-dark-bg">
          <div className="mil-animation-frame">
              <div className="mil-animation mil-position-4 mil-scale" data-value-1="9" data-value-2="1.4" style={{"right": "40%"}}>
                <Pentagon />
              </div>
          </div>
          <div className="mi-invert-fix mil-up">
              <div className="container">
                  <div className="mil-404-frame">
                      <div className="mil-scale-frame">
                          <h1 className="mil-404" data-text="Coming soon">Coming soon</h1>
                      </div>

                      <h4 className="mil-404-text mil-dark mil-mb-60">We will be celebrating the launch of our new site very soon!</h4>

                      <Link href="/404" className="mil-button mil-arrow-place">
                        <span>Stay here</span>
                        <ArrowIcon />
                      </Link>
                  </div>
              </div>
          </div>
      </div>
      {/* 404 end */}
    </Layouts>
  );
};
export default E404;
