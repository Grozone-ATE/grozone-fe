import Data from "@data/sections/call-to-action.json";
import Link from "next/link";

import ArrowIcon from "@layouts/svg-icons/Arrow";

const CallToActionSection = ({ bg }) => {
  return (
    <>
      {/* call to action - restructured for clarity and conversion */}
      <section className={bg === "dark" ? "mil-dark-bg" : "mil-soft-bg"}>
        <div className="container mil-p-120-90">
          
          {/* Main CTA Headline */}
          <div className="mil-center mil-mb-60">
            <h2 className="mil-up" dangerouslySetInnerHTML={{__html : Data.headline}} />
            <p className="mil-text-lg mil-up mil-mt-30" style={{maxWidth: '600px', margin: '30px auto 0'}}>{Data.description}</p>
          </div>

          {/* Capabilities & Differentiators - Two Column Layout */}
          <div className="row justify-content-center mil-mb-60">
            
            {/* Capabilities List */}
            <div className="col-lg-5 col-md-6 mil-mb-30">
              <div className="mil-up">
                <h5 className="mil-mb-20" style={{borderBottom: '2px solid #f59e0b', paddingBottom: '10px', display: 'inline-block'}}>
                  {Data.capabilities.title}
                </h5>
                <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                  {Data.capabilities.items.map((item, key) => (
                    <li key={`capability-${key}`} className="mil-mb-15" style={{display: 'flex', alignItems: 'flex-start', gap: '10px'}}>
                      <span style={{color: '#f59e0b', fontWeight: 'bold', flexShrink: 0}}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Differentiators */}
            <div className="col-lg-5 col-md-6 mil-mb-30">
              <div className="mil-up">
                <h5 className="mil-mb-20" style={{borderBottom: '2px solid #f59e0b', paddingBottom: '10px', display: 'inline-block'}}>
                  {Data.differentiators.title}
                </h5>
                <div>
                  {Data.differentiators.items.map((item, key) => (
                    <div key={`diff-${key}`} className="mil-mb-20" style={{padding: '15px', background: bg === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: '8px'}}>
                      <strong style={{color: '#f59e0b', display: 'block', marginBottom: '5px'}}>{item.label}</strong>
                      <span style={{fontSize: '14px', opacity: 0.8}}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Primary CTA Action */}
          <div className="mil-center mil-up">
            <p className="mil-mb-30" style={{fontSize: '18px', fontWeight: '500'}}>
              {Data.cta.text}
            </p>
            <Link href={Data.cta.button.link} className="mil-button mil-arrow-place">
              <span>{Data.cta.button.label}</span>
              <ArrowIcon />
            </Link>
          </div>

        </div>
      </section>
      {/* call to action end */}
    </>
  );
};

export default CallToActionSection;
