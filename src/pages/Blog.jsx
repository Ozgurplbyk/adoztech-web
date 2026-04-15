import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import blogPosts from '../data/blogPosts';
import './Pages.css';

const categoryKeys = ['all', 'webDev', 'mobile', 'ai', 'growth', 'uiux', 'social'];
const categoryMap = {
  webDev: 'webDev',
  mobile: 'mobile',
  ai: 'ai',
  growth: 'growth',
  uiux: 'uiux',
  social: 'social',
};

export default function Blog() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {t('blog.label')}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {t('blog.title')}
          </motion.h1>
          <motion.p className="section-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
            {t('blog.description')}
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="projects-filter">
            {categoryKeys.map(cat => (
              <button key={cat} className={filter === cat ? 'active' : ''} onClick={() => setFilter(cat)}>
                {t(`blog.categories.${cat}`)}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {filtered.map((post, idx) => (
              <motion.div key={post.id} className="blog-card card"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <div className="blog-card__image">
                  <img src={post.image} alt={post.titleKey} loading="lazy" />
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-card__category">
                      {t(`blog.categories.${post.category}`)}
                    </span>
                    <span><Clock size={12} /> {post.readTime} {t('blog.readTime')}</span>
                  </div>
                  <h3 className="blog-card__title">{t(post.titleKey)}</h3>
                  <p className="blog-card__desc">{t(post.descKey)}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="blog-card__author">
                      <div className="blog-card__avatar">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} className="btn btn-ghost btn-sm">
                      {t('blog.readMore')} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
