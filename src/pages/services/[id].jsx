import Layouts from "@layouts/Layouts";
import PageBanner from "@/src/components/PageBanner";

import { useEffect } from "react";

import { Accordion } from "../../common/utilits";

import Link from "next/link";

import { getAllServicesIds, getServiceData, getRelatedServices } from "@library/services";

import PricingSection from "@components/sections/Pricing";
import RelatedServices from "@components/sections/RelatedServices";
import SafeHTML from "@components/SafeHTML";

const ServiceDetail = ( { data, related } ) => {
  const postData = data;

  useEffect(() => {
    Accordion();
  }, []);

  return (
    <Layouts>
      <PageBanner pageTitle={postData.introTitle} breadTitle={postData.title} anchorLabel={"Về dịch vụ"} anchorLink={"#service"} />

      {/* service */}
      <section id="service">
          <div className="container mil-p-120-90">
              <div className="row justify-content-between">
                  <div className="col-lg-4 mil-relative mil-mb-90">

                      {postData.description?.title && (
                        <SafeHTML html={postData.description.title} tag="h4" className="mil-up mil-mb-30" />
                      )}
                      {postData.description?.content && (
                        <SafeHTML html={postData.description.content} tag="div" className="mil-up mil-mb-60" />
                      )}
                      {postData.description?.button && (
                        <div className="mil-up mil-mt-30">
                            <Link href={postData.description.button.link} className="mil-link mil-dark mil-arrow-place">
                                <span>{postData.description.button.label}</span>
                            </Link>
                        </div>
                      )}

                  </div>
                  <div className="col-lg-6">
                  {postData.list != undefined && postData.list.items && postData.list.items.length > 0 &&
                  <>
                      {postData.list.items.map((item, key) => (
                      <div className={`mil-accordion-group mil-up ${key > 0 ? 'mil-mt-30' : ''}`} key={`service-list-${key}`}>
                          <div className="mil-accordion-menu">

                              <p className="mil-accordion-head">{item.label || ''}</p>

                              <div className="mil-symbol mil-h3">
                                  <div className="mil-plus">+</div>
                                  <div className="mil-minus">-</div>
                              </div>

                          </div>
                          {item.value && (
                            <SafeHTML html={item.value} className="mil-accordion-content mil-text mil-content-spacing" />
                          )}
                      </div>
                      ))}
                  </>
                  }
                  </div>
              </div>
          </div>
      </section>
      {/* service end */}
      
      {false && <PricingSection />}

      <RelatedServices services={related} />
      
    </Layouts>
  );
};
export default ServiceDetail;

export async function getStaticPaths() {
    const paths = getAllServicesIds()

    return {
      paths,
      fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const postData = await getServiceData(params.id)
    const relatedServices = await getRelatedServices(params.id)

    return {
      props: {
        data: postData,
        related: relatedServices
      }
    }
}