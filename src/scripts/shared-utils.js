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
      el.style.transitionDelay = `${baseDelay + index * increment}ms`;
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
  },
};

/**
 * Initialize dynamic payment buttons
 */
export function initPaymentButtons() {
  // Use a more robust approach that works with dynamic content
  function setupPaymentButtons() {
    const paymentButtons = document.querySelectorAll(
      '.pricing-payment-btn, .cta-payment-btn, [data-payment-button="true"]'
    );

    paymentButtons.forEach(button => {
      // Skip if already has event listener
      if (button.hasAttribute('data-payment-initialized')) {
        return;
      }

      button.setAttribute('data-payment-initialized', 'true');

      button.addEventListener('click', async e => {
        e.preventDefault();

        const productId = button.getAttribute('data-product-id');
        const planId = button.getAttribute('data-plan-id');

        if (!productId || !planId) {
          console.error('Missing productId or planId for payment button');
          return;
        }

        // Show loading state
        const originalText = button.textContent || '';
        button.textContent = 'Generando enlace...';
        button.setAttribute('disabled', 'true');

        try {
          // Get product info for modal
          const productId = button.getAttribute('data-product-id');
          const planId = button.getAttribute('data-plan-id');

          // Get product details (simplified mapping)
          let productTitle = 'Producto Digital';
          let productPrice = '0';

          if (productId) {
            const productNames = {
              xmlsat: 'XMLSAT++',
              'xmlsat-premium': 'XMLSAT Premium',
              'plantilla-carga-batch-diot': 'Carga Batch DIOT 2025',
              'control-xml-nomina':
                'Control XML Nómina - Plantilla Excel para Manejo de CFDI de Nómina',
              'centinela-xpress': 'CENTINELA XPRESS',
            };
            productTitle = productNames[productId] || 'Producto Digital';

            // Try to get price from product data if available
            try {
              // Look for price in nearby elements or data attributes
              const priceElement = button
                .closest('.pricing-card')
                ?.querySelector('.pricing-price');
              if (priceElement) {
                const priceText = priceElement.textContent || '';
                const priceMatch = priceText.match(/\$([0-9,]+)/);
                if (priceMatch) {
                  productPrice = priceMatch[1];
                }
              }
            } catch (e) {
              // Fallback to default price
              console.log('Could not extract price, using default');
            }
          }

          // Show elegant modal instead of prompt
          const customerEmail = await window.showEmailModal(
            productTitle,
            productPrice
          );

          if (!customerEmail) {
            button.textContent = originalText;
            button.removeAttribute('disabled');
            return;
          }

          // Call the API to create payment link
          const response = await fetch('/api/stripe/create-payment-link', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId,
              planId,
              customerEmail,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to create payment link');
          }

          const data = await response.json();

          // Redirect to Stripe payment link
          window.location.href = data.url;
        } catch (error) {
          console.error('Error creating payment link:', error);

          // Handle modal close/cancel separately
          if (
            error.message === 'Modal closed' ||
            error.message === 'User cancelled'
          ) {
            console.log('User cancelled the payment process');
            button.textContent = originalText;
            button.removeAttribute('disabled');
            return; // Exit without showing error message
          }

          // More specific error messages for actual errors
          let errorMessage =
            'Error al generar el enlace de pago. Por favor intenta de nuevo.';

          if (error.message) {
            if (
              error.message.includes('Stripe configuration error') ||
              error.message.includes('STRIPE_SECRET_KEY')
            ) {
              errorMessage =
                'Error de configuración: Las claves de Stripe no están configuradas correctamente. Revisa tu archivo .env';
            } else if (
              error.message.includes('Stripe authentication failed') ||
              error.message.includes('Invalid Stripe API key')
            ) {
              errorMessage =
                'Error de autenticación con Stripe. Verifica que tus claves API sean válidas.';
            } else if (
              error.message.includes('network') ||
              error.message.includes('fetch') ||
              error.message.includes('Connection error')
            ) {
              errorMessage =
                'Error de conexión. Verifica tu conexión a internet.';
            } else if (error.message.includes('Stripe API error')) {
              errorMessage =
                'Error en la API de Stripe. Intenta de nuevo en unos minutos.';
            } else if (error.message.includes('Invalid request')) {
              errorMessage =
                'Datos inválidos enviados a Stripe. Verifica la información del producto.';
            } else if (
              error.message.includes('Failed to create payment link')
            ) {
              errorMessage =
                'Error al crear el enlace de pago. Verifica la configuración de Stripe.';
            }
          }

          // Try to parse error details if available
          try {
            const errorData = JSON.parse(error.message);
            if (errorData.details) {
              console.error('Stripe error details:', errorData.details);
            }
          } catch (e) {
            // Error message is not JSON, continue with normal handling
          }

          // Log detailed error for debugging
          console.error('Payment link creation failed:', {
            error: error.message,
            productId,
            planId,
            hasCustomerEmail: typeof customerEmail !== 'undefined',
          });

          alert(errorMessage);
          button.textContent = originalText;
          button.removeAttribute('disabled');
        }
      });
    });
  }

  // Setup immediately and also on DOMContentLoaded for safety
  setupPaymentButtons();
  document.addEventListener('DOMContentLoaded', setupPaymentButtons);

  // Also setup on any DOM changes (for dynamic content)
  const observer = new MutationObserver(setupPaymentButtons);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

/**
 * Email modal for payment flow
 */
export function showEmailModal(productTitle, productPrice) {
  return new Promise((resolve, reject) => {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay email-modal-overlay';
    modalOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'email-modal-content';
    modalContent.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      transform: scale(0.9);
      transition: transform 0.3s ease;
    `;

    modalContent.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <h2 style="margin: 0 0 0.5rem 0; color: #1f2937; font-size: 1.5rem;">Información de Pago</h2>
        <p style="margin: 0; color: #6b7280;">Ingresa tu correo electrónico para recibir el enlace de pago</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
          <strong style="color: #1f2937;">Producto:</strong> ${productTitle}<br>
          <strong style="color: #1f2937;">Precio:</strong> $${productPrice}
        </div>

        <label for="email-input" style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">
          Correo electrónico:
        </label>
        <input
          type="email"
          id="email-input"
          placeholder="tu@email.com"
          style="
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
            box-sizing: border-box;
          "
        />
      </div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button id="cancel-btn" style="
          padding: 0.75rem 1.5rem;
          border: 2px solid #d1d5db;
          background: white;
          color: #6b7280;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        ">Cancelar</button>
        <button id="submit-btn" style="
          padding: 0.75rem 1.5rem;
          border: none;
          background: #3b82f6;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        ">Continuar</button>
      </div>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Show modal with animation
    requestAnimationFrame(() => {
      modalOverlay.style.opacity = '1';
      modalContent.style.transform = 'scale(1)';
    });

    const emailInput = modalContent.querySelector('#email-input');
    const submitBtn = modalContent.querySelector('#submit-btn');
    const cancelBtn = modalContent.querySelector('#cancel-btn');

    // Handle form submission
    const handleSubmit = () => {
      const email = emailInput.value.trim();
      if (!email) {
        emailInput.style.borderColor = '#ef4444';
        emailInput.focus();
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.style.borderColor = '#ef4444';
        emailInput.focus();
        return;
      }

      // Close modal and resolve with email
      closeModal();
      resolve(email);
    };

    // Handle cancel
    const handleCancel = () => {
      closeModal();
      reject(new Error('Modal closed'));
    };

    // Event listeners
    submitBtn.addEventListener('click', handleSubmit);
    cancelBtn.addEventListener('click', handleCancel);

    emailInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    });

    // Close on backdrop click
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) {
        handleCancel();
      }
    });

    // Focus email input
    setTimeout(() => emailInput.focus(), 100);

    // Close modal function
    function closeModal() {
      modalOverlay.style.opacity = '0';
      modalContent.style.transform = 'scale(0.9)';
      setTimeout(() => {
        if (modalOverlay.parentNode) {
          modalOverlay.parentNode.removeChild(modalOverlay);
        }
      }, 300);
    }
  });
}

/**
 * Initialize all shared utilities
 */
export function initSharedUtils() {
  // Make email modal available globally
  window.showEmailModal = showEmailModal;

  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initScrollAnimations();
    initPaymentButtons();
  });
}
