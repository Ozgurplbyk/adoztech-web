import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Activity, BarChart3, Lightbulb, Bell, FileDown, ShieldCheck, CheckCircle, Apple } from 'lucide-react';
import config from '../config';
import './Pages.css';

const featureIcons = [Activity, BarChart3, Lightbulb, Bell, FileDown, ShieldCheck];

export default function GlukoMate() {
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="page-header" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="glukomate-hero">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="section-label">{t('glukomate.label')}</span>
              <h1>{t('glukomate.title')}</h1>
              <p className="glukomate-hero__subtitle">{t('glukomate.subtitle')}</p>
              <p>{t('glukomate.heroDesc')}</p>
              <a href={config.links.glukomate} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                <Apple size={20} /> {t('glukomate.downloadCta')}
              </a>
            </motion.div>
            <motion.div className="glukomate-hero__image" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <img src="/images/glukomate-hero.png" alt="GlukoMate App" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is GlukoMate */}
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-header">
            <h2 className="section-title">{t('glukomate.whatTitle')}</h2>
            <p className="section-description">{t('glukomate.whatDesc')}</p>
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="section section--featured">
        <div className="container" style={{ maxWidth: 700 }}>
          <div className="section-header">
            <h2 className="section-title">{t('glukomate.whoTitle')}</h2>
          </div>
          <div className="glukomate-who-list">
            {(t('glukomate.whoItems', { returnObjects: true }) || []).map((item, idx) => (
              <motion.div key={idx} className="glukomate-who-item"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <div className="glukomate-who-item__check"><CheckCircle size={14} /></div>
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('glukomate.featuresTitle')}</h2>
          </div>
          <div className="glukomate-features">
            {[1, 2, 3, 4, 5, 6].map((num, idx) => {
              const Icon = featureIcons[idx];
              return (
                <motion.div key={num} className="glukomate-feature card"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
                  <div className="glukomate-feature__icon"><Icon size={24} /></div>
                  <h4>{t(`glukomate.f${num}Title`)}</h4>
                  <p>{t(`glukomate.f${num}Desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why we built it */}
      <section className="section section--featured">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-header">
            <h2 className="section-title">{t('glukomate.whyTitle')}</h2>
            <p className="section-description">{t('glukomate.whyDesc')}</p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section">
        <div className="container" style={{ maxWidth: 700 }}>
          <div className="section-header">
            <h2 className="section-title">{t('glukomate.trustTitle')}</h2>
          </div>
          <div className="glukomate-trust-items">
            {(t('glukomate.trustItems', { returnObjects: true }) || []).map((item, idx) => (
              <motion.div key={idx} className="glukomate-who-item"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <div className="glukomate-who-item__check"><CheckCircle size={14} /></div>
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section section--featured">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('glukomate.roadmapTitle')}</h2>
          </div>
          <div className="glukomate-roadmap">
            {[1, 2, 3, 4, 5].map(num => (
              <motion.div key={num} className="glukomate-roadmap__item"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: num * 0.05 }}>
                {t(`glukomate.r${num}`)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="section text-center">
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem' }}>{t('glukomate.downloadCta')}</h2>
          <a href={config.links.glukomate} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            <Apple size={20} /> {t('glukomate.downloadCta')}
          </a>
        </div>
      </section>
    </motion.div>
  );
}
