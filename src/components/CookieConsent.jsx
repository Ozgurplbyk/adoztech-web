import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import './CookieConsent.css';

export default function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('adoztech-cookie-consent');
    if (!consent) {
      // Show after a small delay for better UX
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('adoztech-cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('adoztech-cookie-consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="cookie-consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="cookie-consent__inner">
            <div className="cookie-consent__icon">
              <Cookie size={24} />
            </div>
            <div className="cookie-consent__text">
              <p className="cookie-consent__title">{t('cookie.title')}</p>
              <p className="cookie-consent__desc">{t('cookie.description')}</p>
            </div>
            <div className="cookie-consent__actions">
              <button className="btn btn-primary btn-sm" onClick={accept}>
                {t('cookie.accept')}
              </button>
              <button className="btn btn-ghost btn-sm" onClick={decline}>
                {t('cookie.decline')}
              </button>
            </div>
            <button className="cookie-consent__close" onClick={decline} aria-label="Close">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
