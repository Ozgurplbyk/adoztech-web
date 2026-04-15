import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function SEO({ titleKey, descriptionKey, image = '/images/hero-bg.png', type = 'website' }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentUrl = `https://adoztech.com${location.pathname}`;

  // Translated or direct strings
  const siteName = 'Adoztech';
  const metaTitle = titleKey ? `${t(titleKey)} | ${siteName}` : siteName;
  const metaDescription = descriptionKey ? t(descriptionKey) : t('seo.defaultDescription');

  return (
    <Helmet htmlAttributes={{ lang: i18n.language }}>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
