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
                          <div className="mil-menu-right" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '0', marginTop: '0'}}>
                              <h6 className="mil-muted mil-menu-section-title" style={{paddingTop: '0', marginTop: '0', marginBottom: '50px', fontSize: '28px', width: '100%', textAlign: 'left'}}>Liên hệ</h6>
                              <div style={{display: 'flex', gap: '40px', width: '100%', flexWrap: 'nowrap', marginTop: '0', paddingTop: '0', overflow: 'visible'}}>
                                  <div style={{flex: '0 0 auto', minWidth: '200px', maxWidth: 'none'}}>
                                      <ul className="mil-menu-list mil-menu-list-responsive" style={{overflow: 'visible', width: 'auto'}}>
                                          <li className="mil-light-soft" style={{fontSize: '16px', fontWeight: 500}}><strong className="mil-menu-company-name">Grozone</strong></li>
                                          <li><a href="mailto:business@grozone.vn" className="mil-light-soft" style={{fontSize: '16px', whiteSpace: 'nowrap'}}>business@grozone.vn</a></li>
                                          <li className="mil-light-soft" style={{marginTop: '8px', fontSize: '16px', whiteSpace: 'nowrap'}}>TP. Hồ Chí Minh</li>
                                      </ul>
                                  </div>
                                  <div style={{flex: '0 0 auto', minWidth: '280px', maxWidth: 'none'}}>
                                      <ul className="mil-menu-list mil-menu-list-responsive" style={{overflow: 'visible', width: 'auto'}}>
                                          <li className="mil-light-soft">
                                              <span className="mil-light-soft" style={{display: 'block', fontSize: '16px', marginBottom: '4px', whiteSpace: 'nowrap', fontWeight: 500}}>
                                                  Founder / Strategist
                                              </span>
                                              <span className="mil-light-soft" style={{display: 'block', fontSize: '16px', marginBottom: '4px', whiteSpace: 'nowrap'}}>
                                                  Dinh Thanh Thuan (Uruz)
                                              </span>
                                              <a href="tel:0967882713" className="mil-light-soft" style={{fontSize: '16px', whiteSpace: 'nowrap', display: 'block'}}>096.788.2713</a>
                                          </li>
                                          <li className="mil-light-soft" style={{marginTop: '15px'}}>
                                              <span className="mil-light-soft" style={{display: 'block', fontSize: '16px', marginBottom: '4px', whiteSpace: 'nowrap', fontWeight: 500, overflow: 'visible'}}>
                                                  Business Development Manager
                                              </span>
                                              <span className="mil-light-soft" style={{display: 'block', fontSize: '16px', marginBottom: '4px', whiteSpace: 'nowrap'}}>
                                                  Tran Thanh Liem
                                              </span>
                                              <a href="tel:0838673344" className="mil-light-soft" style={{fontSize: '16px', whiteSpace: 'nowrap', display: 'block'}}>083.867.3344</a>
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
