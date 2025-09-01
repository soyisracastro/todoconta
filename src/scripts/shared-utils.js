// Shared utilities for all layouts
// This file contains common functionality used across different layouts

/**
 * Initialize smooth scrolling for anchor links
 */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/**
 * Initialize intersection observer for animations
 * @param {string} selector - CSS selector for elements to observe
 * @param {Object} options - IntersectionObserver options
 */
export function initScrollAnimations(
  selector = '.fade-in-up, .fade-in-left, .scale-in, .animate-fade-in-up',
  options = {}
) {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observerOptions = { ...defaultOptions, ...options };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: stop observing after animation triggers (performance)
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all matching elements
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => observer.observe(el));
  
  // Return observer for manual control if needed
  return observer;
}

/**
 * Advanced animation utilities for more complex scenarios
 */
export const AnimationUtils = {
  /**
   * Animate elements with staggered delay
   * @param {string} selector - CSS selector for elements
   * @param {number} baseDelay - Base delay in ms
   * @param {number} increment - Delay increment per element
   */
  staggerAnimation(selector, baseDelay = 0, increment = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.style.transitionDelay = `${baseDelay + (index * increment)}ms`;
    });
  },

  /**
   * Create custom intersection observer with callbacks
   * @param {string} selector - CSS selector
   * @param {function} onEnter - Callback when element enters viewport
   * @param {function} onExit - Callback when element exits viewport (optional)
   * @param {Object} options - Observer options
   */
  observeElements(selector, onEnter, onExit = null, options = {}) {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observerOptions = { ...defaultOptions, ...options };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onEnter(entry.target, entry);
        } else if (onExit) {
          onExit(entry.target, entry);
        }
      });
    }, observerOptions);

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
    return observer;
  },

  /**
   * Apply animation classes with optional delay
   * @param {HTMLElement} element - Target element
   * @param {string|Array} classes - Animation class(es) to add
   * @param {number} delay - Delay in ms
   */
  animate(element, classes, delay = 0) {
    const classArray = Array.isArray(classes) ? classes : [classes];
    
    if (delay > 0) {
      setTimeout(() => {
        classArray.forEach(cls => element.classList.add(cls));
      }, delay);
    } else {
      classArray.forEach(cls => element.classList.add(cls));
    }
  }
};

/**
 * Initialize all shared utilities
 */
export function initSharedUtils() {
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initScrollAnimations();
  });
}
