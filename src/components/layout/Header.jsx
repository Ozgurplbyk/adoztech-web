import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import config from '../../config';
import './Header.css';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/glukomate', label: t('nav.glukomate') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('adoztech-lang', code);
    setIsLangOpen(false);
  };

  const currentLang = config.languages.find(l => l.code === i18n.language) || config.languages[0];

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__inner">
          <Link to="/" className="header__logo" aria-label="Adoztech Home">
            <div className="header__logo-icon">
              <div className="logo-circle">A</div>
            </div>
            <span className="header__logo-text">Adoztech</span>
          </Link>

          <nav className="header__nav hide-mobile" aria-label="Main Navigation">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`header__nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            {/* Language Switcher */}
            <div className="header__lang" onClick={() => setIsLangOpen(!isLangOpen)}>
              <button className="header__lang-btn" aria-label="Change Language">
                <Globe size={16} />
                <span>{currentLang.code.toUpperCase()}</span>
                <ChevronDown size={14} className={isLangOpen ? 'rotated' : ''} />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    className="header__lang-dropdown"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                  >
                    {config.languages.map(lang => (
                      <button
                        key={lang.code}
                        className={`header__lang-option ${lang.code === i18n.language ? 'active' : ''}`}
                        onClick={() => changeLanguage(lang.code)}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button className="header__theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA Button */}
            <Link to="/contact" className="btn btn-primary btn-sm hide-mobile">
              {t('nav.startProject')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="header__menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.nav
              className="mobile-menu__nav"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`mobile-menu__link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={() => setIsMobileMenuOpen(false)}>
                {t('nav.startProject')}
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
