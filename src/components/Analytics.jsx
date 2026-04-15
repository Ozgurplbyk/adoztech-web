import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Only initialize if tracking ID is present
    const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!trackingId) return;

    // We make sure it's only initialized once
    if (!window.ga4Initialized) {
      ReactGA.initialize(trackingId);
      window.ga4Initialized = true;
    }

    // Send pageview on route change
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null; // This component doesn't render anything visually
}

/**
 * GA Event Tracking Helpers
 * Import and call these from any component to track user actions.
 *
 * Usage:
 *   import { trackEvent } from '../components/Analytics';
 *   trackEvent('Contact', 'form_submit', 'Website Inquiry');
 */
export function trackEvent(category, action, label = '', value = 0) {
  if (window.ga4Initialized) {
    ReactGA.event({ category, action, label, value });
  }
}

export function trackOutboundLink(url, label = '') {
  if (window.ga4Initialized) {
    ReactGA.event({
      category: 'Outbound',
      action: 'click',
      label: label || url,
      transport: 'beacon',
    });
  }
}
