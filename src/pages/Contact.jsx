import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Linkedin, CheckCircle, Send, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ReactGA from 'react-ga4';
import config from '../config';
import './Pages.css';
import SEO from '../components/SEO';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', dialCode: '+90', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t('contact.validation.nameRequired');
    if (!form.email.trim()) errs.email = t('contact.validation.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = t('contact.validation.emailInvalid');
    if (!form.message.trim()) errs.message = t('contact.validation.messageRequired');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSendError(false);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // If EmailJS is not configured, fallback to simulated send
    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS not configured. Simulating send...');
      setTimeout(() => {
        setSending(false);
        setSent(true);
        setForm({ name: '', email: '', dialCode: '+90', phone: '', subject: '', message: '' });
      }, 1500);
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone ? `${form.dialCode} ${form.phone}` : '',
        subject: form.subject,
        message: form.message,
      }, publicKey);

      setSent(true);
      setForm({ name: '', email: '', dialCode: '+90', phone: '', subject: '', message: '' });

      // Track successful form submission in GA
      if (window.ga4Initialized) {
        ReactGA.event({
          category: 'Contact',
          action: 'form_submit',
          label: form.subject || 'No subject',
        });
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('EmailJS Hatası (Lütfen Ekran Görüntüsü Atın):\\n' + JSON.stringify(error?.text || error?.message || error));
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO titleKey="nav.contact" descriptionKey="contact.description" />
      <section className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {t('contact.label')}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {t('contact.title')}
          </motion.h1>
          <motion.p className="section-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
            {t('contact.description')}
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <motion.div className="contact-form card"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {sent ? (
                <div className="contact-success">
                  <div className="contact-success__icon"><CheckCircle size={32} /></div>
                  <h3>{t('contact.successTitle')}</h3>
                  <p>{t('contact.successDesc')}</p>
                  <button className="btn btn-secondary" onClick={() => setSent(false)}>
                    {t('contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ marginBottom: '1.5rem' }}>{t('contact.formTitle')}</h3>
                  {sendError && (
                    <div className="contact-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', color: 'var(--color-error)', fontSize: '0.875rem' }}>
                      <AlertCircle size={16} />
                      {t('contact.sendError')}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">{t('contact.nameLabel')}</label>
                      <input id="name" name="name" className="form-input" placeholder={t('contact.namePlaceholder')} value={form.name} onChange={handleChange} />
                      {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">{t('contact.emailLabel')}</label>
                      <input id="email" name="email" type="email" className="form-input" placeholder={t('contact.emailPlaceholder')} value={form.email} onChange={handleChange} />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">{t('contact.phoneLabel')}</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select 
                          name="dialCode" 
                          className="form-input" 
                          style={{ width: '130px', paddingRight: '0.5rem' }}
                          value={form.dialCode} 
                          onChange={handleChange}
                        >
                          <option value="+90">🇹🇷 +90</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+34">🇪🇸 +34</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+86">🇨🇳 +86</option>
                          <option value="+7">🇷🇺 +7</option>
                        </select>
                        <input id="phone" name="phone" className="form-input" style={{ flex: 1 }} placeholder={t('contact.phonePlaceholder')} value={form.phone} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="subject">{t('contact.subjectLabel')}</label>
                      <input id="subject" name="subject" className="form-input" placeholder={t('contact.subjectPlaceholder')} value={form.subject} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="message">{t('contact.messageLabel')}</label>
                      <textarea id="message" name="message" className="form-textarea" placeholder={t('contact.messagePlaceholder')} value={form.message} onChange={handleChange} />
                      {errors.message && <p className="form-error">{errors.message}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={sending}>
                      {sending ? (
                        <>{t('contact.sending')}</>
                      ) : (
                        <>{t('contact.submit')} <Send size={16} /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Info */}
            <motion.div className="contact-info-cards"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="contact-info-card card">
                <div className="contact-info-card__icon"><Mail size={20} /></div>
                <div>
                  <h4>{t('contact.emailInfo')}</h4>
                  <a href={`mailto:${config.contact.email}`}>{config.contact.email}</a>
                </div>
              </div>
              <div className="contact-info-card card">
                <div className="contact-info-card__icon"><Phone size={20} /></div>
                <div>
                  <h4>{t('contact.phoneInfo')}</h4>
                  <a href={`https://wa.me/${config.contact.whatsapp}`}>{config.contact.phone}</a>
                </div>
              </div>
              <div className="contact-info-card card">
                <div className="contact-info-card__icon"><MapPin size={20} /></div>
                <div>
                  <h4>{t('contact.locationInfo')}</h4>
                  <p>{t('contact.location')}</p>
                </div>
              </div>
              <div className="contact-info-card card">
                <div className="contact-info-card__icon"><Instagram size={20} /></div>
                <div>
                  <h4>Instagram</h4>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer">@adoztech</a>
                  </div>
                </div>
              </div>
              <div className="contact-info-card card">
                <div className="contact-info-card__icon"><Linkedin size={20} /></div>
                <div>
                  <h4>LinkedIn</h4>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer">Adoztech</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
