import React from 'react';
import { Helmet } from 'react-helmet-async';
import { API_CONFIG } from '../config';

export default function SEO({ title, description, path = '', image = '/images/p1.png', schema = null, noindex = false, keywords = null }) {
  const baseUrl = API_CONFIG.SITE_URL || 'https://yourgynac.vercel.app';
  const altUrl = API_CONFIG.ALTERNATE_SITE_URL || 'https://draditijain.vercel.app';
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const canonicalUrl = `${baseUrl}${cleanPath}`;
  const alternateUrl = `${altUrl}${cleanPath}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image.startsWith('/') ? image : `/${image}`}`;

  const defaultKeywords = "Dr Aditi Jain Jaipur, Dr Aditi Jain gynecologist, gynecologist Jaipur, gynaecologist Jaipur, gynae doctor Jaipur, gynecologist in Jaipur, women's health doctor Jaipur, gynecologist Tilak Nagar Jaipur, PCOS doctor Jaipur, pregnancy doctor Jaipur, online gynecologist consultation Jaipur, gynaecologist consultation Jaipur, Dr Aditi Jain gynaecologist Jaipur, Agarwal Clinic Jaipur, female gynecologist Jaipur, lady gynecologist Jaipur, Jaipur mein best gynae, Jaipur mein gynecologist, Jaipur ki gynae doctor, Jaipur ki gynecologist, Jaipur mein female gynecologist, period problem doctor Jaipur, pregnancy ke liye gynecologist Jaipur, periods irregular doctor Jaipur, online gynae consultation Jaipur, gynae doctor near me Jaipur, Jaipur gynecologist, Jaipur gynaecologist, Jaipur gynae, Jaipur gynac, Jaipur gyne, Jaipur gyne doctor, Jaipur gynae doctor, Jaipur gynac doctor, Jaipur gynecologist doctor, Jaipur gynaecologist doctor, Jaipur gynecology doctor, Jaipur gynaecology doctor, Jaipur women's health doctor, Jaipur women doctor, Jaipur women's doctor, Jaipur female doctor, Jaipur female gynecologist, Jaipur female gynaecologist, Jaipur lady gynecologist, Jaipur lady gynaecologist, Jaipur women specialist, Jaipur women health specialist, Jaipur gynaecology specialist, Jaipur gynecology specialist, Jaipur gynae specialist, Jaipur gynac specialist, gynecologist in Jaipur, gynaecologist in Jaipur, gynae doctor in Jaipur, gynac doctor in Jaipur, gyne doctor in Jaipur, gynecologist clinic in Jaipur, gynaecologist clinic in Jaipur, gynae clinic in Jaipur, women's health clinic Jaipur, women's health clinic in Jaipur, women doctor in Jaipur, female gynecologist in Jaipur, female gynaecologist in Jaipur, doctor for women's health Jaipur, women's healthcare Jaipur, women healthcare doctor Jaipur, gynecologist Tilak Nagar Jaipur, gynaecologist Tilak Nagar Jaipur, gynae doctor Tilak Nagar Jaipur, gynac doctor Tilak Nagar Jaipur, gynecologist near Tilak Nagar Jaipur, gynaecologist near Tilak Nagar Jaipur, gynecologist Shivaji Marg Jaipur, gynaecologist Shivaji Marg Jaipur, gynae doctor Shivaji Marg Jaipur, women's doctor Tilak Nagar Jaipur, women's health clinic Tilak Nagar Jaipur, gynecologist near me Jaipur, gynaecologist near me Jaipur, gynae near me Jaipur, gynac near me Jaipur, women doctor near me Jaipur, female gynecologist near me, best gynecologist Jaipur, best gynaecologist Jaipur, best gynae Jaipur, best gynac Jaipur, best gynac doctor Jaipur, best gynae doctor Jaipur, best gynecologist doctor Jaipur, best female gynecologist Jaipur, best female gynaecologist Jaipur, best lady gynecologist Jaipur, best women doctor Jaipur, top gynecologist Jaipur, top gynaecologist Jaipur, top gynae Jaipur, top gynac Jaipur, best gynecology doctor Jaipur, best gynaecology doctor Jaipur, gynac, gynae, gyno, gyne, gynec, gynaec, gynac doctor, gynae doctor, gyno doctor, gyne doctor, gynec doctor, gynac specialist, gynae specialist, gyne specialist, gynec specialist, women's health doctor Jaipur, women's health clinic Jaipur, women's healthcare Jaipur, women's healthcare doctor Jaipur, women health doctor Jaipur, women health specialist Jaipur, female health doctor Jaipur, women's wellness Jaipur, women's reproductive health Jaipur, reproductive health doctor Jaipur, women's reproductive health specialist Jaipur, gynaecology and women's health Jaipur, PCOS doctor Jaipur, PCOD doctor Jaipur, PCOS specialist Jaipur, PCOD specialist Jaipur, PCOS consultation Jaipur, PCOD consultation Jaipur, gynecologist for PCOS Jaipur, gynaecologist for PCOS Jaipur, PCOS treatment doctor Jaipur, PCOS doctor in Jaipur, PCOD doctor in Jaipur, PCOS consultation online, online PCOS consultation, PCOS women's health doctor, irregular periods PCOS doctor Jaipur, period doctor Jaipur, period problem doctor Jaipur, irregular periods doctor Jaipur, irregular periods gynecologist Jaipur, irregular menstruation doctor Jaipur, painful periods doctor Jaipur, heavy periods doctor Jaipur, menstrual health doctor Jaipur, menstrual problems Jaipur, period problems Jaipur, period pain gynecologist Jaipur, abnormal bleeding gynecologist Jaipur, women's menstrual health Jaipur, pregnancy doctor Jaipur, pregnancy consultation Jaipur, pregnancy specialist Jaipur, pregnancy gynecologist Jaipur, pregnancy gynaecologist Jaipur, antenatal care Jaipur, antenatal consultation Jaipur, pregnancy consultation doctor Jaipur, pregnancy doctor in Jaipur, pregnancy gynecologist in Jaipur, online pregnancy consultation, pregnancy consultation online, women's pregnancy doctor Jaipur, gynaecologist for pregnancy Jaipur, fertility doctor Jaipur, fertility consultation Jaipur, fertility gynecologist Jaipur, fertility gynaecologist Jaipur, pre pregnancy consultation Jaipur, preconception consultation Jaipur, pre-conception counselling Jaipur, pregnancy planning doctor Jaipur, pregnancy planning consultation Jaipur, fertility consultation online, pre-pregnancy consultation Jaipur, hormonal health doctor Jaipur, hormonal imbalance gynecologist Jaipur, women's hormonal doctor Jaipur, hormonal health consultation Jaipur, menopause doctor Jaipur, menopause specialist Jaipur, menopause consultation Jaipur, perimenopause doctor Jaipur, midlife women's health Jaipur, gynaecological consultation Jaipur, gynecological consultation Jaipur, gynae consultation Jaipur, gynac consultation Jaipur, gynecologist consultation Jaipur, gynaecologist consultation Jaipur, women's health consultation Jaipur, online gynecologist consultation Jaipur, online gynaecologist consultation Jaipur, online gynae consultation Jaipur, online gynac consultation Jaipur, online women's health consultation Jaipur, video consultation gynecologist Jaipur, online doctor consultation women's health Jaipur, laparoscopic gynecologist Jaipur, laparoscopic gynaecologist Jaipur, laparoscopic gynae surgeon Jaipur, gynaecological laparoscopic surgeon Jaipur, gynecological laparoscopic surgeon Jaipur, laparoscopic gynaecological surgeon Jaipur, laparoscopy gynecologist Jaipur, laparoscopy gynaecologist Jaipur, women's laparoscopic surgeon Jaipur, online gynecologist Jaipur, online gynaecologist Jaipur, online gynae doctor Jaipur, online gynac doctor Jaipur, online women's health doctor Jaipur, online gynecology consultation Jaipur, online gynaecology consultation Jaipur, online gynae consultation Jaipur, online pregnancy consultation Jaipur, online PCOS consultation Jaipur, online women's health consultation, video consultation gynecologist, virtual gynecologist consultation, online doctor for women's health, gynaecologist clinic Jaipur, gynecologist clinic Jaipur, gynae clinic Jaipur, gynac clinic Jaipur, women's health clinic Jaipur, women's clinic Jaipur, gynecology clinic Jaipur, gynaecology clinic Jaipur, gynecologist appointment Jaipur, gynaecologist appointment Jaipur, gynae appointment Jaipur, book gynecologist appointment Jaipur, book gynaecologist appointment Jaipur, online appointment gynecologist Jaipur, gynecologist consultation booking Jaipur, Jaipur mein best gynae, Jaipur mein gynecologist, Jaipur ki gynae doctor, Jaipur ki gynecologist, Jaipur mein gynac doctor, Jaipur mein female gynecologist, period problem doctor Jaipur, PCOS doctor Jaipur, pregnancy doctor Jaipur, pregnancy ke liye gynecologist Jaipur, periods irregular doctor Jaipur, online gynae consultation Jaipur, online gynecologist consultation Jaipur, women health doctor Jaipur, gynae doctor near me Jaipur, Agarwal Clinic Jaipur, Agarwal Clinic Tilak Nagar, Agarwal Clinic Shivaji Marg, Agarwal Clinic Jaipur gynecologist, Dr Aditi Jain Agarwal Clinic, Dr Aditi Jain Tilak Nagar, Dr Aditi Jain Shivaji Marg, Dr Aditi Jain Agarwal Clinic Jaipur, Jaipur स्त्री रोग विशेषज्ञ, Jaipur की स्त्री रोग विशेषज्ञ, Jaipur महिला डॉक्टर, Jaipur की महिला डॉक्टर, Jaipur गायनेकोलॉजिस्ट, Jaipur गाइनेकोलॉजिस्ट, Jaipur गाइनी डॉक्टर, Jaipur गाइने डॉक्टर, स्त्री रोग डॉक्टर Jaipur, स्त्री रोग विशेषज्ञ Jaipur, महिला रोग विशेषज्ञ Jaipur, महिलाओं की डॉक्टर Jaipur, महिलाओं के लिए डॉक्टर Jaipur, महिला स्वास्थ्य डॉक्टर Jaipur, महिला स्वास्थ्य विशेषज्ञ Jaipur, Jaipur में स्त्री रोग विशेषज्ञ, Jaipur में महिला डॉक्टर, टिलक नगर Jaipur स्त्री रोग विशेषज्ञ, टिलक नगर Jaipur गायनेकोलॉजिस्ट, Jaipur गर्भावस्था डॉक्टर, गर्भावस्था डॉक्टर Jaipur, प्रेगनेंसी डॉक्टर Jaipur, प्रेगनेंसी डॉक्टर, पीरियड डॉक्टर Jaipur, अनियमित पीरियड डॉक्टर Jaipur, पीरियड की समस्या डॉक्टर Jaipur, पीसीओएस डॉक्टर Jaipur, पीसीओडी डॉक्टर Jaipur, महिलाओं की हेल्थ डॉक्टर Jaipur";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      {description && <meta name="description" content={description} />}
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="Dr. Aditi Jain" />
      
      {/* Alternate Domain Headers */}
      <link rel="alternate" hreflang="en" href={alternateUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />

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
