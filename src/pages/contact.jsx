import PageBanner from "@/src/components/PageBanner";
import Layouts from "@/src/layouts/Layouts";
import { Formik } from 'formik';
import AppData from "@data/app.json";

import ArrowIcon from "@layouts/svg-icons/Arrow";

const Contact = () => {
  return (
    <Layouts>
        <PageBanner pageTitle={"<strong>Liên hệ với chúng tôi</strong>"} breadTitle={"Liên hệ"} anchorLabel={"Gửi tin nhắn"} anchorLink={"#contact"} paddingBottom={1} align={"center"} />

        {/* map */}
        <div className="mil-map-frame mil-up">
            <div className="mil-map">
                <iframe 
                src="https://www.google.com/maps?q=11+Hồ+Xuân+Hương,+Võ+Thị+Sáu,+Quận+3,+Thành+phố+Hồ+Chí+Minh&output=embed" 
                style={{"border": "0", "width": "100%", "height": "100%"}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                />
            </div>
        </div>
        {/* map end */}

        {/* contact form */}
        <section id="contact">
            <div className="container mil-p-120-90">
                <h3 className="mil-center mil-up mil-mb-120">Liên hệ <span className="mil-thin">với Grozone!</span></h3>

                <Formik
                initialValues = {{ email: '', name: '', phone: '', company: '', message: '' }}
                validate = { values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Bắt buộc';
                    }
                    if (!values.email) {
                        errors.email = 'Bắt buộc';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Địa chỉ email không hợp lệ';
                    }
                    if (!values.phone) {
                        errors.phone = 'Bắt buộc';
                    }
                    if (!values.message) {
                        errors.message = 'Bắt buộc';
                    }
                    return errors;
                }}
                onSubmit = {( values, { setSubmitting } ) => {
                    const form = document.getElementById("contactForm");
                    const status = document.getElementById("contactFormStatus");
                    
                    // Gửi email trực tiếp bằng mailto
                    const subject = encodeURIComponent(`Liên hệ từ ${values.name}`);
                    let bodyText = `Tên: ${values.name}\nEmail: ${values.email}\nSố điện thoại: ${values.phone}`;
                    if (values.company) {
                        bodyText += `\nTên công ty / tổ chức: ${values.company}`;
                    }
                    bodyText += `\n\nNội dung:\n${values.message}`;
                    const body = encodeURIComponent(bodyText);
                    const mailtoLink = `mailto:business@grozone.vn?subject=${subject}&body=${body}`;
                    
                    // Mở mailto link
                    window.location.href = mailtoLink;
                    
                    // Hiển thị thông báo
                    status.innerHTML = "Đang mở ứng dụng email của bạn...";
                    status.style.color = "#f59e0b";
                    
                    // Reset form sau 1 giây
                    setTimeout(() => {
                        form.reset();
                        status.innerHTML = "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.";
                    }, 1000);

                    setSubmitting(false);
                }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                <form onSubmit={handleSubmit} id="contactForm" action="#" className="row align-items-center">
                    <div className="col-lg-6 mil-up">
                        <div className={`mil-floating-label ${values.name ? 'mil-has-value' : ''}`}>
                            <input 
                                type="text" 
                                name="name" 
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                id="contact-name"
                            />
                            <label htmlFor="contact-name">Tên của bạn <span style={{color: '#f59e0b'}}>*</span></label>
                            {errors.name && touched.name && errors.name !== 'Bắt buộc' && <div className="mil-error-message" style={{fontSize: '12px', color: '#f59e0b', marginTop: '4px'}}>{errors.name}</div>}
                        </div>
                    </div>
                    <div className="col-lg-6 mil-up">
                        <div className={`mil-floating-label ${values.email ? 'mil-has-value' : ''}`}>
                            <input 
                                type="email" 
                                name="email"
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                id="contact-email"
                            />
                            <label htmlFor="contact-email">Email của bạn <span style={{color: '#f59e0b'}}>*</span></label>
                            {errors.email && touched.email && errors.email !== 'Bắt buộc' && <div className="mil-error-message" style={{fontSize: '12px', color: '#f59e0b', marginTop: '4px'}}>{errors.email}</div>}
                        </div>
                    </div>
                    <div className="col-lg-6 mil-up">
                        <div className={`mil-floating-label ${values.phone ? 'mil-has-value' : ''}`}>
                            <input 
                                type="tel" 
                                name="phone"
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                id="contact-phone"
                            />
                            <label htmlFor="contact-phone">Số điện thoại của bạn <span style={{color: '#f59e0b'}}>*</span></label>
                            {errors.phone && touched.phone && errors.phone !== 'Bắt buộc' && <div className="mil-error-message" style={{fontSize: '12px', color: '#f59e0b', marginTop: '4px'}}>{errors.phone}</div>}
                        </div>
                    </div>
                    <div className="col-lg-6 mil-up">
                        <div className={`mil-floating-label ${values.company ? 'mil-has-value' : ''}`}>
                            <input 
                                type="text" 
                                name="company"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.company}
                                id="contact-company"
                            />
                            <label htmlFor="contact-company">Tên công ty / tổ chức</label>
                        </div>
                    </div>
                    <div className="col-lg-12 mil-up">
                        <div className={`mil-floating-label ${values.message ? 'mil-has-value' : ''}`}>
                            <textarea 
                                name="message" 
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.message}
                                id="contact-message"
                            />
                            <label htmlFor="contact-message">Nội dung tin nhắn của bạn <span style={{color: '#f59e0b'}}>*</span></label>
                            {errors.message && touched.message && errors.message !== 'Bắt buộc' && <div className="mil-error-message" style={{fontSize: '12px', color: '#f59e0b', marginTop: '4px'}}>{errors.message}</div>}
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <p className="mil-up mil-mb-30"><span className="mil-accent">*</span> Chúng tôi cam kết không tiết lộ thông tin cá nhân của bạn cho bên thứ ba.</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="mil-adaptive-right mil-up mil-mb-30">
                            <button type="submit" className="mil-button mil-arrow-place">
                                <span>Gửi tin nhắn</span>
                                <ArrowIcon />
                            </button>
                        </div>
                    </div>
                    <div className="form-status" id="contactFormStatus" />
                </form>
                )}
                </Formik>
            </div>
        </section>
        {/* contact form end */}    
    </Layouts>
  );
};
export default Contact;
