/**
 * Utilidades compartidas para manejo de modales
 * Sistema centralizado para futuras implementaciones
 */

/**
 * Crea y muestra un modal
 * @param {Object} config - Configuración del modal
 */
export function showModal(config) {
  const {
    title = '',
    content = '',
    size = 'medium',
    closeOnBackdrop = true,
    closeOnEscape = true,
    showCloseButton = true,
    className = '',
    onOpen = null,
    onClose = null,
    buttons = []
  } = config;

  // Crear estructura del modal
  const modalOverlay = createModalOverlay();
  const modalContainer = createModalContainer(size, className);
  const modalContent = createModalContent(title, content, showCloseButton, buttons);

  modalContainer.appendChild(modalContent);
  modalOverlay.appendChild(modalContainer);
  document.body.appendChild(modalOverlay);

  // Configurar eventos
  setupModalEvents(modalOverlay, modalContainer, {
    closeOnBackdrop,
    closeOnEscape,
    onClose
  });

  // Mostrar modal con animación
  requestAnimationFrame(() => {
    modalOverlay.classList.add('modal-show');
    document.body.classList.add('modal-open');
  });

  // Callback de apertura
  if (onOpen) {
    onOpen(modalOverlay);
  }

  return modalOverlay;
}

/**
 * Cierra un modal específico
 * @param {HTMLElement} modal 
 * @param {Function} onClose 
 */
export function closeModal(modal, onClose = null) {
  if (!modal) return;

  modal.classList.remove('modal-show');
  modal.classList.add('modal-hide');

  // Callback de cierre
  if (onClose) {
    onClose(modal);
  }

  // Remover del DOM después de la animación
  setTimeout(() => {
    if (modal.parentNode) {
      modal.parentNode.removeChild(modal);
    }
    document.body.classList.remove('modal-open');
  }, 300);
}

/**
 * Cierra todos los modales abiertos
 */
export function closeAllModals() {
  const openModals = document.querySelectorAll('.modal-overlay.modal-show');
  openModals.forEach(modal => {
    closeModal(modal);
  });
}

/**
 * Crea el overlay del modal
 * @returns {HTMLElement}
 */
function createModalOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  return overlay;
}

/**
 * Crea el contenedor del modal
 * @param {string} size 
 * @param {string} className 
 * @returns {HTMLElement}
 */
function createModalContainer(size, className) {
  const container = document.createElement('div');
  container.className = `modal-container modal-${size} ${className}`.trim();
  return container;
}

/**
 * Crea el contenido del modal
 * @param {string} title 
 * @param {string} content 
 * @param {boolean} showCloseButton 
 * @param {Array} buttons 
 * @returns {HTMLElement}
 */
function createModalContent(title, content, showCloseButton, buttons) {
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Header
  if (title || showCloseButton) {
    const header = document.createElement('div');
    header.className = 'modal-header';

    if (title) {
      const titleElement = document.createElement('h2');
      titleElement.className = 'modal-title';
      titleElement.textContent = title;
      header.appendChild(titleElement);
    }

    if (showCloseButton) {
      const closeButton = document.createElement('button');
      closeButton.className = 'modal-close';
      closeButton.innerHTML = '×';
      closeButton.setAttribute('aria-label', 'Cerrar modal');
      closeButton.addEventListener('click', () => {
        const modal = closeButton.closest('.modal-overlay');
        closeModal(modal);
      });
      header.appendChild(closeButton);
    }

    modalContent.appendChild(header);
  }

  // Body
  const body = document.createElement('div');
  body.className = 'modal-body';
  
  if (typeof content === 'string') {
    body.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    body.appendChild(content);
  }
  
  modalContent.appendChild(body);

  // Footer con botones
  if (buttons.length > 0) {
    const footer = document.createElement('div');
    footer.className = 'modal-footer';

    buttons.forEach(buttonConfig => {
      const button = document.createElement('button');
      button.className = `btn ${buttonConfig.className || 'btn-primary'}`;
      button.textContent = buttonConfig.text;
      
      if (buttonConfig.onClick) {
        button.addEventListener('click', (e) => {
          const modal = e.target.closest('.modal-overlay');
          buttonConfig.onClick(modal, e);
        });
      }

      footer.appendChild(button);
    });

    modalContent.appendChild(footer);
  }

  return modalContent;
}

/**
 * Configura eventos del modal
 * @param {HTMLElement} overlay 
 * @param {HTMLElement} container 
 * @param {Object} options 
 */
function setupModalEvents(overlay, container, options) {
  const { closeOnBackdrop, closeOnEscape, onClose } = options;

  // Cerrar al hacer click en el backdrop
  if (closeOnBackdrop) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay, onClose);
      }
    });
  }

  // Cerrar con Escape
  if (closeOnEscape) {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal(overlay, onClose);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  // Trap focus dentro del modal
  setupFocusTrap(container);
}

/**
 * Configura el trap de foco dentro del modal
 * @param {HTMLElement} container 
 */
function setupFocusTrap(container) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  // Focus inicial
  setTimeout(() => {
    firstFocusable.focus();
  }, 100);

  // Trap del Tab
  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });
}

/**
 * Modal de confirmación
 * @param {Object} config 
 * @returns {Promise<boolean>}
 */
export function showConfirmModal(config) {
  return new Promise((resolve) => {
    const {
      title = 'Confirmar acción',
      message = '¿Estás seguro de que deseas continuar?',
      confirmText = 'Confirmar',
      cancelText = 'Cancelar',
      confirmClass = 'btn-danger',
      cancelClass = 'btn-outline'
    } = config;

    showModal({
      title,
      content: `<p>${message}</p>`,
      size: 'small',
      closeOnBackdrop: false,
      showCloseButton: false,
      buttons: [
        {
          text: cancelText,
          className: cancelClass,
          onClick: (modal) => {
            closeModal(modal);
            resolve(false);
          }
        },
        {
          text: confirmText,
          className: confirmClass,
          onClick: (modal) => {
            closeModal(modal);
            resolve(true);
          }
        }
      ]
    });
  });
}

/**
 * Modal de alerta
 * @param {Object} config 
 * @returns {Promise<void>}
 */
export function showAlertModal(config) {
  return new Promise((resolve) => {
    const {
      title = 'Información',
      message = '',
      buttonText = 'Aceptar',
      type = 'info' // info, success, warning, error
    } = config;

    const icon = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    }[type];

    showModal({
      title,
      content: `<div class="alert-content alert-${type}">
        <div class="alert-icon">${icon}</div>
        <p class="alert-message">${message}</p>
      </div>`,
      size: 'small',
      className: `alert-modal alert-${type}`,
      buttons: [
        {
          text: buttonText,
          className: 'btn-primary',
          onClick: (modal) => {
            closeModal(modal);
            resolve();
          }
        }
      ]
    });
  });
}

/**
 * Inicializar modales desde atributos HTML
 */
export function initModalTriggers() {
  document.addEventListener('DOMContentLoaded', () => {
    // Botones con data-modal
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal]');
      if (!trigger) return;

      e.preventDefault();
      
      const modalSelector = trigger.getAttribute('data-modal');
      const modalElement = document.querySelector(modalSelector);
      
      if (modalElement) {
        showModal({
          content: modalElement.cloneNode(true),
          title: trigger.getAttribute('data-modal-title') || '',
          size: trigger.getAttribute('data-modal-size') || 'medium'
        });
      }
    });
  });
}