import { useEffect, useRef } from 'react';

const GoogleTranslateWrapper = () => {
    const isScriptAdded = useRef(false);
    useEffect(() => {
        const addGoogleTranslateScript = () => {
          if (isScriptAdded.current) return; // Don't add the script again if it already exists
    
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
          script.async = true;
          document.body.appendChild(script);
          isScriptAdded.current = true; // Mark script as added
        };
    
        const googleTranslateElementInit = () => {
            if (window.google && window.google.translate) {
              const translateElement = document.getElementById('google_translate_element');
              
              if (translateElement && !translateElement.children.length) {
                new window.google.translate.TranslateElement(
                  { pageLanguage: 'en' },
                  'google_translate_element'
                );
              }
            }
          };
    
        // Attach the function to the window object
        window.googleTranslateElementInit = googleTranslateElementInit;
    
        // Add the Google Translate script to the document if not already added
        addGoogleTranslateScript();
      }, []);

  return (
    <div className="googleTranslateWrapper font-satoshi">
      <div id="google_translate_element" className='font-satoshi'></div>
    </div>
  );
};

export default GoogleTranslateWrapper;
