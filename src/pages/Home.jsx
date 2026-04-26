import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Code, Smartphone, Brain, Share2, Palette, Search, Wrench, Fingerprint } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import projectsData from '../data/projectsData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Pages.css';
import SEO from '../components/SEO';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const serviceIcons = [Code, Smartphone, Brain, Share2, Palette, Search, Wrench, Fingerprint];

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target);
    if (isNaN(num)) { setCount(target); return; }
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <SEO titleKey="nav.home" descriptionKey="hero.subtitle" />
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <img src="/images/hero-bg.png" alt="" aria-hidden="true" className="hero__bg-image" />
          <div className="hero__bg-overlay" />
          <div className="hero__particles" />
        </div>

        <div className="container hero__content">
          <motion.div className="hero__text" initial="initial" animate="animate" variants={stagger}>
            <motion.span className="section-label" variants={fadeUp}>
              {t('hero.label')}
            </motion.span>

            <motion.h1 className="hero__title" variants={fadeUp}>
              {t('hero.title')}{' '}
              <span className="gradient-text">{t('hero.titleHighlight')}</span>{' '}
              {t('hero.titleEnd')}
            </motion.h1>

            <motion.p className="hero__subtitle" variants={fadeUp}>
              {t('hero.subtitle')}
            </motion.p>

            <motion.div className="hero__cta" variants={fadeUp}>
              <Link to="/contact" className="btn btn-primary btn-lg">
                {t('hero.cta1')} <ArrowRight size={18} />
              </Link>
              <Link to="/projects" className="btn btn-secondary btn-lg">
                {t('hero.cta2')}
              </Link>
            </motion.div>

            <motion.div className="hero__stats" variants={fadeUp}>
              <div className="hero__stat">
                <span className="hero__stat-value"><AnimatedCounter target={50} suffix="+" /></span>
                <span className="hero__stat-label">{t('hero.stat1Label')}</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-value"><AnimatedCounter target={100} suffix="%" /></span>
                <span className="hero__stat-label">{t('hero.stat2Label')}</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-value"><AnimatedCounter target={10} suffix="+" /></span>
                <span className="hero__stat-label">{t('hero.stat3Label')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero__scroll-indicator">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="hero__scroll-dot"
          />
        </div>
      </section>

      {/* ===== SERVICES PREVIEW ===== */}
      <section className="section" id="services-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('services.label')}</span>
            <h2 className="section-title">{t('services.title')}</h2>
            <p className="section-description">{t('services.description')}</p>
          </div>

          <div className="services-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, idx) => {
              const Icon = serviceIcons[idx];
              return (
                <motion.div
                  key={num}
                  className="service-card card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                >
                  <div className="service-card__icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="service-card__title">{t(`services.s${num}Title`)}</h3>
                  <p className="service-card__desc">{t(`services.s${num}Desc`)}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-xl">
            <Link to="/services" className="btn btn-secondary">
              {t('services.allServices')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SLIDER (APPLE STYLE) ===== */}
      <section className="section section--featured" id="featured-project" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('projects.label')}</span>
            <h2 className="section-title">{t('projects.title')}</h2>
          </div>
        </div>

        <div className="project-slider-container">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.2 },
              1440: { slidesPerView: 2.8 }
            }}
            className="project-swiper"
          >
            {(projectsData.length === 2 ? [...projectsData, ...projectsData] : projectsData).map((project, idx) => (
              <SwiperSlide key={`${project.id}-${idx}`}>
                <div className="project-slide-card card">
                  <div className="project-slide-image">
                    <img src={project.image} alt={t(project.titleKey)} />
                    <div className="project-slide-overlay">
                       <span className="project-slide-category">{t(project.categoryKey)}</span>
                       <h3>{t(project.titleKey)}</h3>
                       <Link to={project.link} className="btn btn-primary btn-sm">
                         {t('projects.viewProject')} <ArrowUpRight size={16} />
                       </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="container text-center mt-xl">
          <Link to="/projects" className="btn btn-secondary">
            {t('projects.viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="section" id="about-preview">
        <div className="container">
          <div className="about-preview">
            <motion.div
              className="about-preview__image"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img src="/images/about-team.png" alt="Adoztech Team" loading="lazy" />
            </motion.div>
            <motion.div
              className="about-preview__content"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="section-label">{t('about.label')}</span>
              <h2>{t('about.title')}</h2>
              <p>{t('about.description')}</p>
              <div className="about-preview__values">
                {[1, 2, 3, 4].map(num => (
                  <div key={num} className="about-preview__value">
                    <h4>{t(`about.value${num}`)}</h4>
                    <p>{t(`about.value${num}Desc`)}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-secondary">
                {t('common.learnMore')} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
