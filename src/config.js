/**
 * Adoztech Brand Configuration
 * =============================
 * Edit colors, fonts, and brand info here.
 * All changes propagate throughout the website.
 */

const config = {
  brand: {
    name: 'Adoztech',
    tagline: 'Premium Technology Solutions',
    description: 'Web, mobile application, artificial intelligence and digital growth solutions provider delivering scalable, modern and high-quality products.',
    founded: 2022,
    founders: [
      { name: 'Adem Aydemir', role: 'Co-Founder' },
      { name: 'Özgür Palabıyık', role: 'Co-Founder' },
    ],
  },

  contact: {
    email: 'info@adoztech.com',
    phone: '+90 534 783 48 68',
    whatsapp: '+905347834868',
    instagram: 'https://www.instagram.com/adoztech/',
    linkedin: 'https://www.linkedin.com/company/adoztech',
  },

  links: {
    glukomate: 'https://apps.apple.com/tr/app/glukomate-blood-sugar-diabetes/id6749870258',
  },

  /* 
   * COLOR SYSTEM — 60/30/10 Rule
   * Edit these to change the entire site palette.
   * Dark mode colors are auto-generated but can be overridden.
   */
  colors: {
    // Primary palette
    primary: {
      50:  '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',  // Main accent
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    // Dark base tones
    dark: {
      50:  '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#080d1a',
    },
    // Accent / Highlight
    accent: {
      cyan:   '#06b6d4',
      teal:   '#14b8a6',
      purple: '#8b5cf6',
      pink:   '#ec4899',
    },
    // Semantic
    success: '#10b981',
    warning: '#f59e0b',
    error:   '#ef4444',
  },

  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body:    "'Inter', sans-serif",
  },

  /* Supported languages */
  languages: [
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'tr', name: 'Türkçe', dir: 'ltr' },
    { code: 'de', name: 'Deutsch', dir: 'ltr' },
    { code: 'es', name: 'Español', dir: 'ltr' },
    { code: 'fr', name: 'Français', dir: 'ltr' },
    { code: 'ar', name: 'العربية', dir: 'rtl' },
    { code: 'zh', name: '中文', dir: 'ltr' },
  ],
};

export default config;
