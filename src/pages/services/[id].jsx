import Layouts from "@layouts/Layouts";
import PageBanner from "@/src/components/PageBanner";

import { getAllServicesIds, getServiceData, getRelatedServices } from "@library/services";

import PricingSection from "@components/sections/Pricing";
import RelatedServices from "@components/sections/RelatedServices";
import SafeHTML from "@components/SafeHTML";

const ServiceDetail = ( { data, related } ) => {
  const postData = data;

  return (
    <Layouts>
      <PageBanner pageTitle={postData.introTitle} breadTitle={postData.title} anchorLabel={"Về dịch vụ"} anchorLink={"#service"} />

      {/* service */}
      <section id="service">
          <div className="container mil-p-120-90">
              <div className="row justify-content-center">
                  <div className="col-lg-10">
                      {/* Title section */}
                      {postData.description?.title && (
                        <SafeHTML html={postData.description.title} tag="h3" className="mil-up mil-mb-60 mil-center" />
                      )}
                      
                      {/* Description content */}
                      {postData.description?.content && (
                        <div className="mil-up mil-mb-90">
                            <SafeHTML html={postData.description.content} tag="div" className="mil-text mil-content-spacing" />
                        </div>
                      )}

                      {/* List items - vertical layout */}
                      {postData.list != undefined && postData.list.items && postData.list.items.length > 0 &&
                      <>
                          {(() => {
                            const isService1 = postData.id === 'service-1';
                            const part2 = postData.list.items[1];
                            const part3 = postData.list.items[2];
                            
                            // Special layout for service-1: parts 2 and 3 side by side
                            if (isService1 && part2 && part3) {
                              return (
                                <>
                                  {/* Part 1 - normal layout */}
                                  {postData.list.items[0] && (
                                    <div key={`service-list-0`} className="mil-up mil-mb-60">
                                        <h5 className="mil-mb-20" style={{fontSize: '22px', fontWeight: 500}}>{postData.list.items[0].label || ''}</h5>
                                        {postData.list.items[0].value && (
                                          <SafeHTML html={postData.list.items[0].value} className="mil-text mil-content-spacing" />
                                        )}
                                    </div>
                                  )}
                                  
                                  {/* Parts 2 and 3 side by side */}
                                  <div className="row mil-up mil-mb-60">
                                      <div className="col-lg-6">
                                          <h5 className="mil-mb-20" style={{fontSize: '22px', fontWeight: 500}}>{part2.label || ''}</h5>
                                          {part2.value && (
                                            <SafeHTML html={part2.value} className="mil-text mil-content-spacing" />
                                          )}
                                      </div>
                                      <div className="col-lg-6">
                                          <h5 className="mil-mb-20" style={{fontSize: '22px', fontWeight: 500}}>{part3.label || ''}</h5>
                                          {part3.value && (
                                            <SafeHTML html={part3.value} className="mil-text mil-content-spacing" />
                                          )}
                                      </div>
                                  </div>
                                  
                                  {/* Remaining items - normal layout */}
                                  {postData.list.items.slice(3).map((item, key) => (
                                    <div key={`service-list-${key + 3}`} className="mil-up mil-mb-60">
                                        <h5 className="mil-mb-20" style={{fontSize: '22px', fontWeight: 500}}>{item.label || ''}</h5>
                                        {item.value && (
                                          <SafeHTML html={item.value} className="mil-text mil-content-spacing" />
                                        )}
                                    </div>
                                  ))}
                                </>
                              );
                            }
                            
                            // Normal layout for other services - staggered layout
                            return postData.list.items.map((item, key) => (
                              <div 
                                key={`service-list-${key}`} 
                                className={`mil-up ${key > 0 ? 'mil-mt-60' : ''}`}
                                style={key % 2 === 1 ? { display: 'flex', flexDirection: 'column' } : {}}
                              >
                                  <h5 className="mil-mb-20" style={{fontSize: '22px', fontWeight: 500}}>{item.label || ''}</h5>
                                  {item.value && (
                                    <SafeHTML html={item.value} className="mil-text mil-content-spacing" />
                                  )}
                              </div>
                            ));
                          })()}
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