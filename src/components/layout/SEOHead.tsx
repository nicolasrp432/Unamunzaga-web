import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  locale?: string;
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Unamunzaga Obras - Reformas y Construcción en Bilbao',
  description = 'Más de 20 años de experiencia en reformas integrales, obra nueva y rehabilitación en Bilbao. Presupuestos sin compromiso. Servicios profesionales de construcción.',
  keywords = ['reformas Bilbao', 'construcción Bilbao', 'reformas integrales', 'obra nueva', 'rehabilitación', 'Unamunzaga Obras'],
  image = 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Modern%20construction%20company%20logo%20with%20professional%20blue%20and%20white%20design%2C%20clean%20typography%2C%20building%20elements%2C%20Spanish%20Basque%20style&image_size=square',
  url = 'https://unamunzagaobras.com',
  type = 'website',
  locale = 'es_ES',
  noindex = false
}) => {
  const siteName = 'Unamunzaga Obras';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Unamunzaga Obras" />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Language */}
      <html lang="es" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content="eu_ES" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content="@unamunzagaobras" />
      
      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Alternate languages */}
      <link rel="alternate" hrefLang="es" href={`${url}/es`} />
      <link rel="alternate" hrefLang="eu" href={`${url}/eu`} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Unamunzaga Obras",
          "description": "Reformas y construcción en Bilbao con más de 20 años de experiencia",
          "url": url,
          "telephone": "+34944123456",
          "email": "info@unamunzagaobras.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Calle Licenciado Poza 30",
            "addressLocality": "Bilbao",
            "addressRegion": "Vizcaya",
            "postalCode": "48011",
            "addressCountry": "ES"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 43.263779,
            "longitude": -2.925290
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "08:00",
              "closes": "18:00"
            }
          ],
          "priceRange": "€€",
          "image": image,
          "sameAs": [
            "https://www.facebook.com/unamunzagaobras",
            "https://www.instagram.com/unamunzagaobras",
            "https://www.linkedin.com/company/unamunzagaobras"
          ]
        })}
      </script>
      
      {/* Service Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Reformas Integrales Bilbao",
          "description": "Servicios profesionales de reformas integrales en Bilbao y alrededores",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Unamunzaga Obras"
          },
          "areaServed": {
            "@type": "City",
            "name": "Bilbao"
          },
          "serviceType": "Construction and Renovation Services",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            "priceSpecification": "Presupuesto sin compromiso"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;