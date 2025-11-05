// import { useEffect } from 'react';

// interface SEOHeadProps {
//   title?: string;
//   description: string;
//   keywords?: string;
//   image?: string;
//   url?: string;
//   type?: string;
// }

// const SEOHead = ({ 
//   title="", 
//   description, 
//   keywords = 'UAE tours, Dubai packages, Abu Dhabi travel, UAE tourism',
//   image = '/og-image.jpg',
//   url,
//   type = 'website'
// }: SEOHeadProps) => {
//   useEffect(() => {
//     // Set page title
//     document.title = `${title}  Shree Sanwariya Seth World Tourism Company`;

//     // Set meta tags
//     const setMetaTag = (name: string, content: string, isProperty = false) => {
//       const attribute = isProperty ? 'property' : 'name';
//       let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
//       if (!meta) {
//         meta = document.createElement('meta');
//         meta.setAttribute(attribute, name);
//         document.head.appendChild(meta);
//       }
//       meta.setAttribute('content', content);
//     };

//     // Basic meta tags
//     setMetaTag('description', description);
//     setMetaTag('keywords', keywords);

//     // Open Graph tags
//     setMetaTag('og:title', title, true);
//     setMetaTag('og:description', description, true);
//     setMetaTag('og:type', type, true);
//     setMetaTag('og:image', image, true);
//     if (url) setMetaTag('og:url', url, true);

//     // Twitter Card tags
//     setMetaTag('twitter:card', 'summary_large_image');
//     setMetaTag('twitter:title', title);
//     setMetaTag('twitter:description', description);
//     setMetaTag('twitter:image', image);
//   }, [title, description, keywords, image, url, type]);

//   return null;
// };

// export default SEOHead;

import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  canonical?: string;
  robots?: string;
  locale?: string;
  author?: string;
  siteName?: string;
}

const SEOHead = ({
  title = "Shree Sanwariya Seth World Tourism Company | UAE Tours & Packages",
  description,
  keywords = 'UAE tours, Dubai packages, Abu Dhabi travel, UAE tourism, UAE holiday, Dubai honeymoon',
  image = '/og-image.jpg',
  url = 'https://shreesanwariyasethworldtourism.com/',
  type = 'website',
  canonical,
  robots = 'index, follow',
  locale = 'en_IN',
  author = 'Shree Sanwariya Seth World Tourism Company',
  siteName = 'Shree Sanwariya Seth World Tourism Company',
}: SEOHeadProps) => {
  useEffect(() => {
    document.title =  `${title} Shree Sanwariya Seth World Tourism Company`;

    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // ✅ Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('robots', robots);
    setMetaTag('author', author);

    // ✅ Open Graph
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:locale', locale, true);
    setMetaTag('og:url', url, true);
    setMetaTag('og:site_name', siteName, true);

    // ✅ Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);

    // ✅ Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // ✅ JSON-LD (Structured Data)
    const existingJsonLd = document.getElementById('jsonld');
    if (existingJsonLd) existingJsonLd.remove();

    const jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.id = 'jsonld';
    jsonLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteName,
      "url": url,
      "logo": `${url}/img/logo.png`,
      "sameAs": [
        "https://www.facebook.com/",
        "https://www.instagram.com/",
        "https://twitter.com/"
      ]
    });
    document.head.appendChild(jsonLd);

  }, [title, description, keywords, image, url, type, canonical, robots, locale, author, siteName]);

  return null;
};

export default SEOHead;

