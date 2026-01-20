import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import AppData from "@data/app.json";

import BackToTop from "../back-to-top/Index";
import Pentagon from "@layouts/pentagon/Index";
import ClientNavigation from "@components/ClientNavigation";

const DefaultHeader = ({ extraClass }) => {
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setToggle(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
    
    {/* menu */}
    <div className={`mil-menu-frame ${toggle ? "mil-active" : ""}`}>
        {/* frame clone */}
        <div className="mil-frame-top">
            <Link href={AppData.header.logo.link} className="mil-logo">
                <img src="/img/G-logo.png" alt="Grozone Logo" style={{height: 'auto', maxWidth: '60px'}} />
            </Link>
            <div className={`mil-menu-btn ${toggle ? "mil-active" : ""}`} onClick={() => setToggle(!toggle)}>
                <span />
            </div>
        </div>
        {/* frame clone end */}
        <div className="container">
          <div className="mil-menu-content">
              <div className="row">
                  <div className="col-xl-5">
                      <ClientNavigation />
                  </div>
                  <div className="col-xl-7">

                      <div className="mil-menu-right-frame">
                          <div className="mil-animation-in">
                              <div className="mil-animation-frame">
                                  <div className="mil-animation mil-position-1 mil-scale" data-value-1="2" data-value-2="2">
                                    <Pentagon />
                                  </div>
                              </div>
                          </div>
                          <div className="mil-menu-right" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '0'}}>
                              <h6 className="mil-muted mil-menu-section-title" style={{paddingTop: '0', marginTop: '0', marginBottom: '50px', fontSize: '28px', width: '100%', textAlign: 'center'}}>Liên hệ</h6>
                              <div style={{display: 'flex', gap: '40px', width: '100%', flexWrap: 'wrap'}}>
                                  <div style={{flex: 1, minWidth: '200px'}}>
                                      <ul className="mil-menu-list mil-menu-list-responsive">
                                          <li className="mil-light-soft"><strong className="mil-menu-company-name">Grozone</strong></li>
                                          <li><a href="mailto:business@grozone.vn" className="mil-light-soft" style={{whiteSpace: 'nowrap'}}>business@grozone.vn</a></li>
                                          <li className="mil-light-soft" style={{marginTop: '8px', fontSize: '14px', whiteSpace: 'nowrap'}}>TP. Hồ Chí Minh</li>
                                      </ul>
                                  </div>
                                  <div style={{flex: 1, minWidth: '200px'}}>
                                      <ul className="mil-menu-list mil-menu-list-responsive">
                                          <li className="mil-light-soft">
                                              <a href="tel:0967882713" className="mil-light-soft" style={{fontSize: '14px', fontFamily: "'SVN-Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", whiteSpace: 'nowrap', display: 'block'}}>0967882713</a>
                                              <span className="mil-light-soft" style={{display: 'block', fontSize: '13px', marginTop: '4px', whiteSpace: 'nowrap'}}>
                                                  (Thuan Dinh: Founder/Project Strategist)
                                              </span>
                                          </li>
                                          <li className="mil-light-soft" style={{marginTop: '15px'}}>
                                              <a href="tel:0838673344" className="mil-light-soft" style={{fontSize: '14px', fontFamily: "'SVN-Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", whiteSpace: 'nowrap', display: 'block'}}>0838673344</a>
                                              <span className="mil-light-soft" style={{display: 'block', fontSize: '13px', marginTop: '4px', whiteSpace: 'nowrap'}}>
                                                  (Thanh Liem: Project Manager/Advisor)
                                              </span>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
        </div>
      </div>
      {/* menu */}
      
      {/* curtain */}
      <div className="mil-curtain" />
      {/* curtain end */}

      {/* frame */}
      <div className="mil-frame">
        <div className="mil-frame-top">
          <Link href={AppData.header.logo.link} className="mil-logo">
              <img src="/img/G-logo.png" alt="Grozone Logo" style={{height: 'auto', maxWidth: '60px'}} />
          </Link>
          <div className={`mil-menu-btn ${toggle ? "mil-active" : ""}`} onClick={() => setToggle(!toggle)}>
              <span />
          </div>
        </div>
        <div className="mil-frame-bottom">
            <div className="mil-current-page" />

            <BackToTop />
        </div>
      </div>
      {/* frame end */}
    </>
  );
};
export default DefaultHeader;
