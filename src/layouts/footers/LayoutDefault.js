import Link from "next/link";
import { useState, useEffect } from "react";
import AppData from "@data/app.json";
import ArrowIcon from "@layouts/svg-icons/Arrow";
import { useRouter } from 'next/router';

const DefaultFooter = ( { extraClass } ) => {
  const [asPath, setAsPath] = useState('');
  const router = useRouter();

  // Only set path after component mounts to avoid hydration mismatch
  useEffect(() => {
    if (router.isReady) {
      setAsPath(router.asPath);
    }
  }, [router.isReady, router.asPath]);
  
  return (
    <>
    {/* footer */}
    <footer className="mil-dark-bg">
        <div className="mi-invert-fix">
            <div className="container mil-p-120-40">
                <div className="row">
                    <div className="col-md-4 col-lg-4 mil-mb-40">

                        <div className="mil-muted mil-logo mil-up mil-mb-20">{AppData.footer.logo.text}</div>

                        <p className="mil-light-soft mil-up mil-mb-20">Đăng ký nhận bản tin:</p>

                        <form action={AppData.settings.mailchimp.url} method="post" target="_blank" className="mil-subscribe-form mil-up">
                            <input type="email" placeholder="Nhập email của bạn" name="EMAIL" required />
                            <input type="hidden" name={AppData.settings.mailchimp.key} />
                            <button type="submit" className="mil-button mil-icon-button-sm mil-arrow-place">
                                <ArrowIcon />
                            </button>
                        </form>

                    </div>
                    <div className="col-md-4 col-lg-4 mil-mb-40">

                        <nav className="mil-footer-menu mil-mb-40">
                            <ul>
                                {AppData.footer.menu.map((item, key) => {
                                  const isActive = asPath && ((asPath.indexOf( item.link ) != -1 && item.link != '/' ) || asPath == item.link );
                                  return (
                                    <li key={`footer-menu-item-${key}`} className={isActive ? "mil-active mil-up" : "mil-up"}>
                                        <Link href={item.link}>{item.label}</Link>
                                    </li>
                                  );
                                })}
                            </ul>
                        </nav>

                        <div className="mil-footer-bottom-info" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px'}}>
                            <div className="mil-mb-10">
                                <ul className="mil-social-icons mil-up">
                                    {AppData.social.map((item, key) => (
                                    <li key={`footer-social-item-${key}`}><a href={item.link} target="_blank" className="social-icon"><i className={item.icon} /></a></li>
                                    ))}
                                </ul>
                            </div>
                            <p className="mil-light-soft mil-up mil-footer-copy-desktop" style={{whiteSpace: 'nowrap', flexShrink: 0}}>{AppData.footer.copy}</p>
                        </div>

                    </div>
                    <div className="col-md-4 col-lg-4 mil-mb-40" style={{paddingLeft: '0', paddingRight: '15px', marginLeft: '-15px'}}>
                        <div style={{display: 'flex', gap: '30px', alignItems: 'flex-start'}}>
                            <div style={{flex: '0 0 auto'}}>
                                <ul className="mil-menu-list mil-up" style={{marginBottom: '0'}}>
                                    <li className="mil-light-soft" style={{fontSize: '16px', fontWeight: 500}}><strong>Grozone</strong></li>
                                    <li><a href="mailto:business@grozone.vn" className="mil-light-soft" style={{fontSize: '16px', whiteSpace: 'nowrap'}}>business@grozone.vn</a></li>
                                    <li className="mil-light-soft" style={{marginTop: '8px', fontSize: '16px', whiteSpace: 'nowrap'}}>TP. Hồ Chí Minh</li>
                                </ul>
                            </div>
                            <div style={{flex: '1', minWidth: '0'}}>
                                <ul className="mil-menu-list mil-up" style={{marginBottom: '0'}}>
                                    <li className="mil-light-soft" style={{marginBottom: '20px'}}>
                                        <span className="mil-light-soft" style={{display: 'block', fontSize: '16px', marginBottom: '4px', whiteSpace: 'nowrap', fontWeight: 500}}>
                                            Founder / Strategist
                                        </span>
                                        <span className="mil-light-soft" style={{display: 'block', fontSize: '16px', marginBottom: '4px', whiteSpace: 'nowrap'}}>
                                            Dinh Thanh Thuan (Uruz)
                                        </span>
                                        <a href="tel:0967882713" className="mil-light-soft" style={{fontSize: '16px', whiteSpace: 'nowrap', display: 'block'}}>096.788.2713</a>
                                    </li>
                                    <li className="mil-light-soft" style={{marginBottom: '0'}}>
                                        <span className="mil-light-soft" style={{display: 'block', fontSize: '16px', marginBottom: '4px', whiteSpace: 'nowrap', fontWeight: 500}}>
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

                {/* Copyright section - separate for mobile */}
                <div className="mil-footer-copyright-mobile">
                    <p className="mil-light-soft mil-up">{AppData.footer.copy}</p>
                </div>

            </div>
        </div>
    </footer>
    {/* footer end */}
    </>
  );
};
export default DefaultFooter;


