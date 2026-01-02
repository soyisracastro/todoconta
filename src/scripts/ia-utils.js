/**
 * IA Specific Shared Utilities
 * Handles analytics tracking and scroll-triggered animations
 */

/**
 * Global Event Tracker for GA4, Plausible, and Facebook Pixel
 * @param {string} eventName - Name of the event to track
 * @param {Object} eventData - Optional metadata for the event
 */
export function trackEvent(eventName, eventData = {}) {
    // Console log for debugging (only in development)
    if (import.meta.env.DEV) {
        console.log('📊 Track Event:', eventName, eventData);
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
        window.gtag('event', eventName, eventData);
    }

    // Plausible Analytics
    if (typeof window !== 'undefined' && 'plausible' in window) {
        window.plausible(eventName, { props: eventData });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && 'fbq' in window) {
        window.fbq('track', eventName, eventData);
    }
}

/**
 * Initializes IntersectionObserver for elements with .animate-on-scroll
 */
export function initIAAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || '0';
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Auto-initializes CTA tracking for elements with data-track-event
 */
export function initCTAAnalytics() {
    document.querySelectorAll('[data-track-event]').forEach(button => {
        // Avoid double listeners
        if (button.getAttribute('data-analytics-ready')) return;

        button.setAttribute('data-analytics-ready', 'true');
        button.addEventListener('click', e => {
            const target = e.currentTarget;
            const eventName = target?.getAttribute('data-track-event');
            if (eventName && target) {
                trackEvent(eventName, {
                    button_text: target.textContent?.trim() || '',
                });
            }
        });
    });
}

/**
 * Initializes all IA-specific utilities
 */
export function initIAUtils() {
    if (typeof document === 'undefined') return;

    initIAAnimations();
    initCTAAnalytics();
}
