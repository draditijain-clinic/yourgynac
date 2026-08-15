import React from 'react';
import { Helmet } from 'react-helmet-async';
import { API_CONFIG } from '../config';

export default function SEO({ title, description, path = '', image = '/images/p1.png', schema = null, noindex = false, keywords = null }) {
  const baseUrl = API_CONFIG.SITE_URL || 'https://yourgynac.vercel.app';
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const canonicalUrl = `${baseUrl}${cleanPath}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image.startsWith('/') ? image : `/${image}`}`;

  const defaultKeywords = "Dr. Aditi Jain, Dr Aditi Jain Jaipur, Gynaecologist in Jaipur, Obstetrician in Jaipur, Infertility Specialist Jaipur, Gynae Laparoscopic Surgeon Jaipur, SMS Medical College Jaipur, Jhalawar Medical College, Agarwal Clinic Raja Park, BST Medical College Achrol, PCOS specialist Jaipur";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      {description && <meta name="description" content={description} />}
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="Dr. Aditi Jain" />
      
      {/* Robots & AI Indexing Directives */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* GEO Location Metadata */}
      <meta name="geo.region" content="IN-RJ" />
      <meta name="geo.placename" content="Jaipur" />
      <meta name="geo.position" content="26.899508;75.831518" />
      <meta name="ICBM" content="26.899508, 75.831518" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content={API_CONFIG.CLINIC_NAME} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      {description && <meta property="twitter:description" content={description} />}
      <meta property="twitter:image" content={fullImageUrl} />

      {/* Canonical URL */}
      {!noindex && <link rel="canonical" href={canonicalUrl} />}

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
