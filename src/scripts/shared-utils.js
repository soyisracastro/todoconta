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
      }
    });
  }, observerOptions);

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

/**
 * Initialize all shared utilities
 */
export function initSharedUtils() {
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initScrollAnimations();
  });
}
