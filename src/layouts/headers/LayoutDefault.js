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
                          <div className="mil-menu-right" style={{display: 'flex', alignItems: 'center', paddingTop: '0'}}>
                              <div className="row" style={{width: '100%', display: 'flex', alignItems: 'flex-start'}}>
                                  <div className="col-lg-6 mil-mb-60" style={{display: 'flex', flexDirection: 'column'}}>

                                      <h6 className="mil-muted mil-mb-30 mil-menu-section-title">Sản phẩm</h6>

                                      <ul className="mil-menu-list mil-menu-list-responsive">
                                          <li><Link href="/projects/project-1" className="mil-light-soft">GroTimetable - Sắp xếp thời khóa biểu</Link></li>
                                          <li><Link href="/projects/project-2" className="mil-light-soft">Giải pháp RFID Toàn diện</Link></li>
                                      </ul>

                                  </div>
                                  <div className="col-lg-6 mil-mb-60" style={{display: 'flex', flexDirection: 'column'}}>

                                      <h6 className="mil-muted mil-mb-30 mil-menu-section-title">Liên hệ</h6>

                                      <ul className="mil-menu-list mil-menu-list-responsive">
                                          <li className="mil-light-soft"><strong className="mil-menu-company-name">Grozone</strong></li>
                                          <li><a href="mailto:business@grozone.vn" className="mil-light-soft">business@grozone.vn</a></li>
                                          <li><a href="tel:+84915011395" className="mil-light-soft">+84 915 011 395</a></li>
                                          <li className="mil-light-soft mil-menu-address">TP. Hồ Chí Minh</li>
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
