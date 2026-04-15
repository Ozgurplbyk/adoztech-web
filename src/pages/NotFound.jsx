import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import './Pages.css';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="not-found">
        <div className="container">
          <motion.div
            className="not-found__content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="not-found__icon">
              <Search size={48} />
            </div>
            <h1 className="not-found__title">
              <span className="gradient-text">404</span>
            </h1>
            <h2 className="not-found__subtitle">{t('notFound.title')}</h2>
            <p className="not-found__desc">{t('notFound.description')}</p>
            <div className="not-found__actions">
              <Link to="/" className="btn btn-primary btn-lg">
                <Home size={18} /> {t('notFound.goHome')}
              </Link>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={18} /> {t('notFound.goBack')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
