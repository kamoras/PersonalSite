import { useEffect } from 'react';

const useInitializeTemplateScripts = (): void => {
  useEffect(() => {
    // Initialize animations using AOS
    const initializeAOS = () => {
      // @ts-ignore
      if (typeof window.AOS !== 'undefined') {
        // @ts-ignore
        window.AOS.init({
          duration: 1000,
          once: true,
          offset: 100
        });
      }
    };

    // Load and initialize main script
    const script = document.createElement('script');
    script.src = '/js/main.js';
    script.async = true;
    script.onload = initializeAOS;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useInitializeTemplateScripts;
