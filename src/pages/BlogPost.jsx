import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import blogPosts from '../data/blogPosts';
import './Pages.css';

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const post = blogPosts.find(p => p.id === slug);

  if (!post) {
    return (
      <div className="section text-center" style={{ paddingTop: '12rem' }}>
        <h2>{t('common.error')}</h2>
        <Link to="/blog" className="btn btn-secondary mt-lg">{t('common.backToHome')}</Link>
      </div>
    );
  }

  const handleShare = async () => {
    const shareData = {
      title: t(post.titleKey),
      text: t(post.descKey),
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div className="blog-post">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <Link to="/blog" className="btn btn-ghost">
                <ArrowLeft size={16} /> {t('blog.allPosts')}
              </Link>
              <button className="btn btn-ghost" onClick={handleShare} aria-label="Share">
                <Share2 size={16} />
              </button>
            </div>

            <div className="blog-post__hero-image">
              <img src={post.image} alt={t(post.titleKey)} />
            </div>

            <div className="blog-post__meta">
              <span className="blog-card__category">{t(`blog.categories.${post.category}`)}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <Calendar size={14} /> {post.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <Clock size={14} /> {post.readTime} {t('blog.readTime')}
              </span>
            </div>

            <h1 style={{ marginBottom: '1rem', fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.5rem)' }}>{t(post.titleKey)}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <div className="blog-card__avatar" style={{ width: 36, height: 36, fontSize: '0.8rem' }}>
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{post.author}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{post.authorRole}</p>
              </div>
            </div>

            <div className="blog-post__content">
              {/* Lead paragraph */}
              <p style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '2rem' }}>
                {t(post.descKey)}
              </p>

              {/* Rich content sections */}
              {post.contentSections && post.contentSections.map((section, idx) => (
                <div key={idx} className="blog-post__section">
                  {section.heading && (
                    <h2 style={{
                      fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                      marginTop: idx > 0 ? '2.5rem' : '1rem',
                      marginBottom: '1rem',
                      color: 'var(--text-primary)',
                    }}>
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              ))}

              {/* Divider + Author CTA */}
              <div className="divider divider-glow" style={{ margin: '3rem 0' }} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xl)',
              }}>
                <div className="blog-card__avatar" style={{ width: 48, height: 48, fontSize: '1rem', flexShrink: 0 }}>
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {post.author}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {post.authorRole} @ Adoztech
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
