import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Instagram, Linkedin, ArrowUpRight, MessageCircle } from 'lucide-react';
import config from '../../config';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Top CTA */}
        <div className="footer__cta">
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.description')}</p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            <MessageCircle size={18} /> {t('contact.formTitle')}
          </Link>
        </div>

        <div className="divider divider-glow" style={{ margin: '3rem 0' }} />

        {/* Links Grid */}
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="header__logo" style={{ marginBottom: '1rem' }}>
              <div className="header__logo-icon">
                <div className="logo-circle">A</div>
              </div>
              <span className="header__logo-text">Adoztech</span>
            </div>
            <p>{t('footer.description')}</p>
          </div>

          <div className="footer__col">
            <h4>{t('footer.quickLinks')}</h4>
            <Link to="/about">{t('nav.about')}</Link>
            <Link to="/services">{t('nav.services')}</Link>
            <Link to="/projects">{t('nav.projects')}</Link>
            <Link to="/glukomate">{t('nav.glukomate')}</Link>
            <Link to="/blog">{t('nav.blog')}</Link>
          </div>

          <div className="footer__col">
            <h4>{t('footer.servicesTitle')}</h4>
            <Link to="/services">{t('services.s1Title')}</Link>
            <Link to="/services">{t('services.s2Title')}</Link>
            <Link to="/services">{t('services.s3Title')}</Link>
            <Link to="/services">{t('services.s4Title')}</Link>
            <Link to="/services">{t('services.s5Title')}</Link>
          </div>

          <div className="footer__col">
            <h4>{t('footer.contactTitle')}</h4>
            <a href={`mailto:${config.contact.email}`}>
              <Mail size={14} /> {config.contact.email}
            </a>
            <a href={`tel:${config.contact.phone}`}>
              <Phone size={14} /> {config.contact.phone}
            </a>
            <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram size={14} /> Instagram
            </a>
            <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>
        </div>

        <div className="divider" style={{ margin: '2rem 0' }} />

        {/* Bottom */}
        <div className="footer__bottom">
          <p>{t('footer.copyright', { year })}</p>
          <p className="footer__made-with" dangerouslySetInnerHTML={{ __html: t('footer.madeWith') }}></p>
        </div>
      </div>
    </footer>
  );
}
