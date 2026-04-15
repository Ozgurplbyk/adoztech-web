import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code, Smartphone, Brain, Share2, Palette, Search, Wrench, Fingerprint, CheckCircle } from 'lucide-react';
import './Pages.css';

const serviceIcons = [Code, Smartphone, Brain, Share2, Palette, Search, Wrench, Fingerprint];

export default function Services() {
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {t('services.label')}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {t('services.title')}
          </motion.h1>
          <motion.p className="section-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
            {t('services.description')}
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gap: '1.5rem' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, idx) => {
              const Icon = serviceIcons[idx];
              const features = t(`services.s${num}Features`, { returnObjects: true }) || [];
              return (
                <motion.div
                  key={num}
                  className="service-detail card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                    <div className="service-card__icon" style={{ flexShrink: 0 }}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 style={{ marginBottom: '0.75rem' }}>{t(`services.s${num}Title`)}</h3>
                      <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>{t(`services.s${num}Desc`)}</p>
                      <div className="service-detail__features">
                        {Array.isArray(features) && features.map((f, i) => (
                          <span key={i} className="service-detail__feature">
                            <CheckCircle size={12} /> {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
