import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Eye, Sparkles, Shield, Users, CheckCircle } from 'lucide-react';
import './Pages.css';

export default function About() {
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {t('about.label')}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {t('about.title')}
          </motion.h1>
          <motion.p className="section-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
            {t('about.description')}
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="mv-grid">
            <motion.div className="mv-card card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Target size={32} color="var(--color-primary-400)" style={{ marginBottom: '1rem' }} />
              <h3>{t('about.mission')}</h3>
              <p>{t('about.missionText')}</p>
            </motion.div>
            <motion.div className="mv-card card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Eye size={32} color="var(--color-accent-cyan)" style={{ marginBottom: '1rem' }} />
              <h3>{t('about.vision')}</h3>
              <p>{t('about.visionText')}</p>
            </motion.div>
          </div>

          {/* Values */}
          <div className="section-header">
            <h2>{t('about.label')}</h2>
          </div>
          <div className="grid grid-4" style={{ maxWidth: 1100, margin: '0 auto' }}>
            {[
              { num: 1, Icon: Sparkles },
              { num: 2, Icon: Shield },
              { num: 3, Icon: Users },
              { num: 4, Icon: CheckCircle },
            ].map(({ num, Icon }, idx) => (
              <motion.div key={num} className="card" style={{ textAlign: 'center', padding: '2rem' }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
                <Icon size={28} color="var(--color-primary-400)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: 'var(--color-primary-400)', marginBottom: '0.5rem' }}>{t(`about.value${num}`)}</h4>
                <p style={{ fontSize: '0.9375rem' }}>{t(`about.value${num}Desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="section section--featured">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('about.founderTitle')}</h2>
          </div>
          <div className="founders-grid">
            {[1, 2].map(num => (
              <motion.div key={num} className="founder-card card"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: num * 0.1 }}>
                <div className="founder-card__avatar">
                  {t(`about.founder${num}Name`).split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="founder-card__name">{t(`about.founder${num}Name`)}</h3>
                <p className="founder-card__role">{t(`about.founder${num}Role`)}</p>
                <p className="founder-card__bio">{t(`about.founder${num}Bio`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
