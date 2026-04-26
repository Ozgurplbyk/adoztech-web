import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Code2, Cpu, Layout, Sparkles, Rocket, CheckCircle, ExternalLink } from 'lucide-react';
import './Pages.css';
import SEO from '../components/SEO';

const techIcons = [Globe, Layout, Code2, Cpu];

export default function MetinDuzdag() {
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO titleKey="metinduzdag.title" descriptionKey="metinduzdag.heroDesc" />
      {/* Hero */}
      <section className="page-header" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="glukomate-hero">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="section-label">{t('metinduzdag.label')}</span>
              <h1>{t('metinduzdag.title')}</h1>
              <p className="glukomate-hero__subtitle">{t('metinduzdag.subtitle')}</p>
              <p>{t('metinduzdag.heroDesc')}</p>
              <a href="https://www.metomkp.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                {t('metinduzdag.visitSite')} <ExternalLink size={20} />
              </a>
            </motion.div>
            <motion.div className="glukomate-hero__image" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <img src="/images/projects/metinduzdag-1.png" alt="Metin Düzdağ Portfolio" style={{ borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About the Project */}
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-header">
            <h2 className="section-title">{t('metinduzdag.whatTitle')}</h2>
            <p className="section-description">{t('metinduzdag.whatDesc')}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section--featured">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('metinduzdag.featuresTitle')}</h2>
          </div>
          <div className="glukomate-features metin-grid">
            {[1, 2, 3, 4].map((num, idx) => {
              const icons = [Sparkles, Layout, Rocket, CheckCircle];
              const Icon = icons[idx];
              return (
                <motion.div key={num} className="glukomate-feature card"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
                  <div className="glukomate-feature__icon"><Icon size={24} /></div>
                  <h4>{t(`metinduzdag.f${num}Title`)}</h4>
                  <p>{t(`metinduzdag.f${num}Desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('metinduzdag.techTitle')}</h2>
          </div>
          <div className="glukomate-features metin-grid">
            {[1, 2, 3, 4].map((num, idx) => {
              const Icon = techIcons[idx];
              return (
                <motion.div key={num} className="glukomate-feature card"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
                  <div className="glukomate-feature__icon"><Icon size={24} /></div>
                  <h4>{t(`metinduzdag.t${num}Title`)}</h4>
                  <p>{t(`metinduzdag.t${num}Desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Adoztech */}
      <section className="section section--featured">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-header">
            <h2 className="section-title">{t('metinduzdag.whyTitle')}</h2>
            <p className="section-description">{t('metinduzdag.whyDesc')}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section text-center">
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem' }}>{t('metinduzdag.visitSite')}</h2>
          <a href="https://www.metomkp.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            {t('metinduzdag.visitSite')} <ExternalLink size={20} />
          </a>
        </div>
      </section>
    </motion.div>
  );
}
