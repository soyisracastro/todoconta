/**
 * Utilidades compartidas para manejo de acordeones (FAQ)
 * Extraído del código duplicado de componentes FAQ
 */

/**
 * Inicializa funcionalidad de acordeón
 * @param {string} containerSelector - Selector del contenedor del acordeón
 * @param {Object} options - Opciones de configuración
 */
export function initAccordion(containerSelector, options = {}) {
  const {
    itemSelector = '.faq-item',
    triggerSelector = '.faq-question',
    contentSelector = '.faq-answer',
    activeClass = 'faq-open',
    allowMultiple = false,
    animationDuration = 300
  } = options;

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const accordionItems = container.querySelectorAll(itemSelector);
    
    accordionItems.forEach(item => {
      const trigger = item.querySelector(triggerSelector);
      const content = item.querySelector(contentSelector);
      
      if (!trigger || !content) return;

      // Configurar estado inicial
      content.style.maxHeight = '0';
      content.style.overflow = 'hidden';
      content.style.transition = `max-height ${animationDuration}ms ease-out`;

      // Event listener para toggle
      trigger.addEventListener('click', () => {
        toggleAccordionItem(item, content, activeClass, allowMultiple, accordionItems);
      });

      // Soporte para teclado (Enter y Space)
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleAccordionItem(item, content, activeClass, allowMultiple, accordionItems);
        }
      });

      // Hacer trigger focusable
      if (!trigger.hasAttribute('tabindex')) {
        trigger.setAttribute('tabindex', '0');
      }
    });
  });
}

/**
 * Toggle de un item del acordeón
 * @param {HTMLElement} item 
 * @param {HTMLElement} content 
 * @param {string} activeClass 
 * @param {boolean} allowMultiple 
 * @param {NodeList} allItems 
 */
function toggleAccordionItem(item, content, activeClass, allowMultiple, allItems) {
  const isOpen = item.classList.contains(activeClass);

  // Cerrar otros items si no se permite múltiples abiertos
  if (!allowMultiple && !isOpen) {
    allItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains(activeClass)) {
        closeAccordionItem(otherItem, activeClass);
      }
    });
  }

  // Toggle del item actual
  if (isOpen) {
    closeAccordionItem(item, activeClass);
  } else {
    openAccordionItem(item, content, activeClass);
  }
}

/**
 * Abre un item del acordeón
 * @param {HTMLElement} item 
 * @param {HTMLElement} content 
 * @param {string} activeClass 
 */
function openAccordionItem(item, content, activeClass) {
  item.classList.add(activeClass);
  
  // Calcular altura real del contenido
  content.style.maxHeight = content.scrollHeight + 'px';
  
  // Actualizar aria-expanded si existe
  const trigger = item.querySelector('[aria-expanded]');
  if (trigger) {
    trigger.setAttribute('aria-expanded', 'true');
  }
}

/**
 * Cierra un item del acordeón
 * @param {HTMLElement} item 
 * @param {string} activeClass 
 */
function closeAccordionItem(item, activeClass) {
  const content = item.querySelector('.faq-answer') || item.querySelector('[data-accordion-content]');
  
  item.classList.remove(activeClass);
  
  if (content) {
    content.style.maxHeight = '0';
  }
  
  // Actualizar aria-expanded si existe
  const trigger = item.querySelector('[aria-expanded]');
  if (trigger) {
    trigger.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Abre un item específico por su índice
 * @param {string} containerSelector 
 * @param {number} index 
 */
export function openAccordionItemByIndex(containerSelector, index) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = container.querySelectorAll('.faq-item');
  const item = items[index];
  
  if (item && !item.classList.contains('faq-open')) {
    const content = item.querySelector('.faq-answer');
    if (content) {
      openAccordionItem(item, content, 'faq-open');
    }
  }
}

/**
 * Cierra todos los items del acordeón
 * @param {string} containerSelector 
 */
export function closeAllAccordionItems(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const openItems = container.querySelectorAll('.faq-open');
  openItems.forEach(item => {
    closeAccordionItem(item, 'faq-open');
  });
}

/**
 * Configuración predeterminada para FAQs
 * @param {string} containerSelector 
 */
export function initFAQ(containerSelector) {
  initAccordion(containerSelector, {
    itemSelector: '.faq-item',
    triggerSelector: '.faq-question',
    contentSelector: '.faq-answer',
    activeClass: 'faq-open',
    allowMultiple: false,
    animationDuration: 300
  });
}

/**
 * Buscar en FAQs y destacar resultados
 * @param {string} containerSelector 
 * @param {string} searchTerm 
 */
export function searchFAQs(containerSelector, searchTerm) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = container.querySelectorAll('.faq-item');
  const term = searchTerm.toLowerCase();
  let hasResults = false;

  items.forEach(item => {
    const question = item.querySelector('.faq-question')?.textContent?.toLowerCase() || '';
    const answer = item.querySelector('.faq-answer')?.textContent?.toLowerCase() || '';
    
    const matches = question.includes(term) || answer.includes(term);
    
    if (matches || term === '') {
      item.style.display = '';
      hasResults = true;
      
      // Destacar término si hay búsqueda activa
      if (term && term.length > 2) {
        highlightSearchTerm(item, searchTerm);
      } else {
        removeHighlights(item);
      }
    } else {
      item.style.display = 'none';
      closeAccordionItem(item, 'faq-open');
    }
  });

  return hasResults;
}

/**
 * Destaca el término de búsqueda en el item
 * @param {HTMLElement} item 
 * @param {string} term 
 */
function highlightSearchTerm(item, term) {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  
  [question, answer].forEach(element => {
    if (!element) return;
    
    const originalText = element.textContent;
    const highlightedText = originalText.replace(
      new RegExp(term, 'gi'),
      match => `<mark class="search-highlight">${match}</mark>`
    );
    
    if (highlightedText !== originalText) {
      element.innerHTML = highlightedText;
    }
  });
}

/**
 * Remueve destacados de búsqueda
 * @param {HTMLElement} item 
 */
function removeHighlights(item) {
  const highlights = item.querySelectorAll('.search-highlight');
  highlights.forEach(highlight => {
    highlight.outerHTML = highlight.textContent;
  });
}