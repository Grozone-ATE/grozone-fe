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
                <div className="row justify-content-between">
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
                    <div className="col-md-7 col-lg-6">
                        <div className="row justify-content-end">
                            <div className="col-md-6 col-lg-7">

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

                            </div>
                            <div className="col-md-6 col-lg-5">

                                <ul className="mil-menu-list mil-up mil-mb-40">
                                    <li className="mil-light-soft"><strong>Grozone</strong></li>
                                    <li><a href="mailto:business@grozone.vn" className="mil-light-soft">business@grozone.vn</a></li>
                                    <li><a href="tel:+84915011395" className="mil-light-soft">+84 915 011 395</a></li>
                                    <li className="mil-light-soft" style={{marginTop: '8px', fontSize: '14px'}}>TP. Hồ Chí Minh</li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-between flex-sm-row-reverse">
                    {/* Tạm ẩn phần địa chỉ Canada và Germany */}
                    {false && (
                    <div className="col-md-7 col-lg-6">

                        <div className="row justify-content-between">

                            <div className="col-md-6 col-lg-5 mil-mb-60">

                                <h6 className="mil-muted mil-up mil-mb-30">Canada</h6>

                                <p className="mil-light-soft mil-up">71 South Los Carneros Road, California <span className="mil-no-wrap">+51 174 705 812</span></p>

                            </div>
                            <div className="col-md-6 col-lg-5 mil-mb-60">

                                <h6 className="mil-muted mil-up mil-mb-30">Germany</h6>

                                <p className="mil-light-soft mil-up">Leehove 40, 2678 MC De Lier, Netherlands <span className="mil-no-wrap">+31 174 705 811</span></p>

                            </div>
                        </div>

                    </div>
                    )}
                    <div className="col-md-4 col-lg-6 mil-mb-30">

                        <div className="mil-vert-between">
                            <div className="mil-mb-20">
                                <ul className="mil-social-icons mil-up">
                                    {AppData.social.map((item, key) => (
                                    <li key={`footer-social-item-${key}`}><a href={item.link} target="_blank" className="social-icon"><i className={item.icon} /></a></li>
                                    ))}
                                </ul>
                            </div>
                            <p className="mil-light-soft mil-up">{AppData.footer.copy}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </footer>
    {/* footer end */}
    </>
  );
};
export default DefaultFooter;
