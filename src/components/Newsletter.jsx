import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, MailPlus } from 'lucide-react';
import { trackEvent } from './Analytics';
import './Newsletter.css';

export default function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;

    setStatus('loading');

    // Simulate API call for newsletter subscription
    // In a real app, this would be your backend or Mailchimp/Sendgrid API
    setTimeout(() => {
      setStatus('success');
      trackEvent('Newsletter', 'subscribe', 'Footer Box');
      setEmail('');

      // Reset back to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <motion.div
          className="newsletter-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Decorative elements */}
          <div className="newsletter-box__glow" />
          <div className="newsletter-box__icon">
            <MailPlus size={32} />
          </div>

          <div className="newsletter-box__content">
            <h3>{t('newsletter.title')}</h3>
            <p>{t('newsletter.description')}</p>
          </div>

          <form className="newsletter-box__form" onSubmit={handleSubmit}>
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading' || status === 'success'}
              >
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <CheckCircle size={18} />
                    </motion.div>
                  ) : status === 'loading' ? (
                    <motion.div
                      key="loading"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      style={{ display: 'flex' }}
                    >
                      <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {t('newsletter.button')}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
            {status === 'success' && (
              <motion.p
                className="newsletter-success-msg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('newsletter.successMessage')}
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
