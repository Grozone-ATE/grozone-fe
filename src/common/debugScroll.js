// Debug script to check scroll issues
export const DebugScroll = () => {
  if (typeof window === 'undefined') return;

  // console.log('=== SCROLL DEBUG INFO ===');
  
  // Check HTML/Body overflow
  const html = document.documentElement;
  const body = document.body;
  const wrapper = document.querySelector('.mil-wrapper');
  const content = document.querySelector('.mil-content');
  
  // console.log('HTML overflow-y:', window.getComputedStyle(html).overflowY);
  // console.log('HTML overflow-x:', window.getComputedStyle(html).overflowX);
  // console.log('Body overflow-y:', window.getComputedStyle(body).overflowY);
  // console.log('Body overflow-x:', window.getComputedStyle(body).overflowX);
  // console.log('Body height:', window.getComputedStyle(body).height);
  // console.log('Body max-height:', window.getComputedStyle(body).maxHeight);
  
  if (wrapper) {
    // console.log('Wrapper overflow-y:', window.getComputedStyle(wrapper).overflowY);
    // console.log('Wrapper overflow-x:', window.getComputedStyle(wrapper).overflowX);
    // console.log('Wrapper height:', window.getComputedStyle(wrapper).height);
  }
  
  if (content) {
    // console.log('Content overflow-y:', window.getComputedStyle(content).overflowY);
    // console.log('Content height:', window.getComputedStyle(content).height);
  }
  
  // Check scroll height
  // console.log('Document scrollHeight:', document.documentElement.scrollHeight);
  // console.log('Document clientHeight:', document.documentElement.clientHeight);
  // console.log('Body scrollHeight:', body.scrollHeight);
  // console.log('Body clientHeight:', body.clientHeight);
  // console.log('Window innerHeight:', window.innerHeight);
  
  // Check if scrollable
  const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
  // console.log('Is scrollable:', isScrollable);
  
  // Check for event listeners that might prevent scroll
  // console.log('Window width:', window.innerWidth);
  // console.log('Window height:', window.innerHeight);
  // console.log('Device pixel ratio:', window.devicePixelRatio);
  // console.log('User agent:', navigator.userAgent);
  
  // Test scroll
  // console.log('Current scroll position:', window.pageYOffset || document.documentElement.scrollTop);
  
  // Try to scroll programmatically
  setTimeout(() => {
    const initialScroll = window.pageYOffset || document.documentElement.scrollTop;
    window.scrollTo(0, 100);
    setTimeout(() => {
      const afterScroll = window.pageYOffset || document.documentElement.scrollTop;
      // console.log('Scroll test - Initial:', initialScroll, 'After:', afterScroll, 'Success:', afterScroll !== initialScroll);
    }, 100);
  }, 500);
  
  // console.log('=== END SCROLL DEBUG ===');
};

// Function to check scroll on page load
export const CheckScrollOnLoad = () => {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      DebugScroll();
    }, 1000);
  });
  
  // Also check after a delay
  setTimeout(() => {
    DebugScroll();
  }, 2000);
};

