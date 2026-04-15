import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import Analytics from './components/Analytics';
import SEO from './components/SEO';
import CookieConsent from './components/CookieConsent';
import BackToTop from './components/BackToTop';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import GlukoMate from './pages/GlukoMate';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import config from './config';

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  // Set RTL direction for Arabic
  useEffect(() => {
    const lang = config.languages.find(l => l.code === i18n.language);
    document.documentElement.dir = lang?.dir || 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <SEO />
      <Analytics />
      <ScrollToTop />
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/:lang" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/:lang/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/:lang/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/:lang/projects" element={<Projects />} />
            <Route path="/glukomate" element={<GlukoMate />} />
            <Route path="/:lang/glukomate" element={<GlukoMate />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/:lang/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/:lang/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/:lang/contact" element={<Contact />} />
            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      <CookieConsent />
    </>
  );
}

export default App;
