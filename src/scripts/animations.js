/**
 * Centralized Animation System
 * Handles scroll-triggered animations, transitions, and visual effects
 */

/**
 * Default animation configuration
 */
export const ANIMATION_CONFIG = {
  // IntersectionObserver settings
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',

  // Animation selectors
  selectors: {
    fadeUp: '.fade-in-up, .animate-fade-in-up',
    fadeLeft: '.fade-in-left',
    scaleIn: '.scale-in',
    all: '.fade-in-up, .animate-fade-in-up, .fade-in-left, .scale-in',
  },

  // Animation delays (in ms)
  delays: {
    base: 0,
    increment: 100,
    stagger: 150,
  },
};

/**
 * Main animation controller class
 */
export class AnimationController {
  constructor(options = {}) {
    this.config = { ...ANIMATION_CONFIG, ...options };
    this.observers = new Map();
    this.isInitialized = false;
  }

  /**
   * Initialize the animation system
   */
  init() {
    if (this.isInitialized) return;

    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.disableAnimations();
      return;
    }

    // Initialize scroll animations
    this.initScrollAnimations();
    this.isInitialized = true;
  }

  /**
   * Initialize scroll-triggered animations
   */
  initScrollAnimations(selector = this.config.selectors.all, options = {}) {
    const observerOptions = {
      threshold: this.config.threshold,
      rootMargin: this.config.rootMargin,
      ...options,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Optional: stop observing after animation for performance
          if (options.once !== false) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe all matching elements
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => observer.observe(el));

    // Store observer for cleanup
    this.observers.set(selector, observer);
    return observer;
  }

  /**
   * Apply staggered animation to a group of elements
   */
  staggerElements(selector, options = {}) {
    const {
      baseDelay = this.config.delays.base,
      increment = this.config.delays.stagger,
      animationClass = 'visible',
    } = options;

    const elements = document.querySelectorAll(selector);

    elements.forEach((el, index) => {
      const delay = baseDelay + index * increment;

      setTimeout(() => {
        el.classList.add(animationClass);
      }, delay);
    });

    return elements;
  }

  /**
   * Animate element on scroll with custom callback
   */
  onScrollReveal(selector, callback, options = {}) {
    const observerOptions = {
      threshold: this.config.threshold,
      rootMargin: this.config.rootMargin,
      ...options,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target, entry);

          if (options.once !== false) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll(selector).forEach(el => {
      observer.observe(el);
    });

    return observer;
  }

  /**
   * Disable all animations (for accessibility)
   */
  disableAnimations() {
    // Add class to body to disable animations via CSS
    document.body.classList.add('no-animations');

    // Make all animation elements visible immediately
    const allAnimElements = document.querySelectorAll(
      this.config.selectors.all
    );
    allAnimElements.forEach(el => {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /**
   * Cleanup observers (useful for SPA navigation)
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.isInitialized = false;
  }
}

/**
 * Utility functions for common animation patterns
 */
export const animationUtils = {
  /**
   * Animate element with class toggle
   */
  animate(element, className, delay = 0) {
    if (delay > 0) {
      setTimeout(() => element.classList.add(className), delay);
    } else {
      element.classList.add(className);
    }
  },

  /**
   * Counter animation for numbers
   */
  animateCounter(element, start = 0, end, duration = 1000) {
    const startTime = performance.now();
    const startNum = parseInt(start);
    const endNum = parseInt(end);
    const diff = endNum - startNum;

    const updateCounter = currentTime => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startNum + diff * easeProgress);

      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = endNum.toLocaleString();
      }
    };

    requestAnimationFrame(updateCounter);
  },

  /**
   * Typewriter effect
   */
  typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;

    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  },
};

/**
 * Global animation controller instance
 */
let globalController = null;

/**
 * Initialize animations (backwards compatible)
 */
export function initScrollAnimations(selector, options) {
  if (!globalController) {
    globalController = new AnimationController();
  }

  return globalController.initScrollAnimations(selector, options);
}

/**
 * Initialize complete animation system
 */
export function initAnimations(options = {}) {
  if (!globalController) {
    globalController = new AnimationController(options);
  }

  globalController.init();
  return globalController;
}

/**
 * Get global animation controller
 */
export function getAnimationController() {
  return globalController;
}

/**
 * Auto-initialize animations when DOM is ready
 */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
  });
}
