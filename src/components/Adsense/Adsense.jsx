import React, { useEffect } from 'react';

const AdSense = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block', textAlign: 'center' }}
         data-ad-layout="in-article"
         data-ad-format="fluid"
         data-ad-client="ca-pub-4131180580860903"
         data-ad-slot="9733934845"
    />
  );
}; 

export default AdSense;
