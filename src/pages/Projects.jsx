import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import projectsData from '../data/projectsData';
import './Pages.css';

export default function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const categories = ['all', 'web', 'mobile', 'ai'];

  const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.categoryFilter === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {t('projects.label')}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {t('projects.title')}
          </motion.h1>
          <motion.p className="section-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
            {t('projects.description')}
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="projects-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={filter === cat ? 'active' : ''}
                onClick={() => setFilter(cat)}
              >
                {t(`projects.category.${cat}`)}
              </button>
            ))}
          </div>

          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  className="project-card card"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="project-card__image">
                    <img src={p.image} alt={p.titleKey} loading="lazy" />
                    <div className="project-card__overlay">
                      <span>
                        {p.link ? (
                          <Link to={p.link} style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            {t('projects.viewProject')} <ArrowUpRight size={14} />
                          </Link>
                        ) : (
                          <>{t('projects.viewProject')} <ArrowUpRight size={14} /></>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="project-card__body">
                    <p className="project-card__category">{p.categoryKey}</p>
                    <h3 className="project-card__title">{p.titleKey}</h3>
                    <p className="project-card__desc">{p.descKey}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
