/**
 * Accordion functionality for FAQ components
 * Handles opening/closing of FAQ items with smooth animations
 */
export function setupFAQAccordion(options = {}) {
  const {
    selector = '.faq-question',
    autoOpenFirst = true,
    singleOpen = true, // Solo una pregunta abierta a la vez
    animationDuration = 300,
  } = options;

  const faqQuestions = document.querySelectorAll(selector);

  if (faqQuestions.length === 0) return;

  faqQuestions.forEach((question, index) => {
    question.addEventListener('click', () => {
      const expanded = question.getAttribute('aria-expanded') === 'true' || false;
      const answer = question.nextElementSibling;

      if (singleOpen) {
        // Cerrar todas las otras preguntas
        faqQuestions.forEach((q) => {
          if (q !== question) {
            closeQuestion(q);
          }
        });
      }

      // Toggle pregunta actual
      if (!expanded) {
        openQuestion(question, answer);
      } else {
        closeQuestion(question);
      }
    });

    // Accesibilidad: soporte para Enter y Space
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  // Auto-abrir primera pregunta si está habilitado
  if (autoOpenFirst && faqQuestions.length > 0) {
    setTimeout(() => {
      const firstQuestion = faqQuestions[0];
      const firstAnswer = firstQuestion.nextElementSibling;
      openQuestion(firstQuestion, firstAnswer);
    }, 500);
  }

  /**
   * Abre una pregunta del FAQ
   */
  function openQuestion(question, answer) {
    question.setAttribute('aria-expanded', 'true');
    
    if (answer) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    // Cambiar icono
    const icon = question.querySelector('.question-icon');
    if (icon) {
      icon.textContent = '−';
    }

    // Trigger custom event
    question.dispatchEvent(new CustomEvent('faq:opened', {
      detail: { question, answer }
    }));
  }

  /**
   * Cierra una pregunta del FAQ
   */
  function closeQuestion(question) {
    question.setAttribute('aria-expanded', 'false');
    
    const answer = question.nextElementSibling;
    if (answer) {
      answer.style.maxHeight = '0';
    }

    // Cambiar icono
    const icon = question.querySelector('.question-icon');
    if (icon) {
      icon.textContent = '+';
    }

    // Trigger custom event
    question.dispatchEvent(new CustomEvent('faq:closed', {
      detail: { question, answer }
    }));
  }

  // Retornar métodos públicos para control externo
  return {
    openQuestion,
    closeQuestion,
    openAll() {
      faqQuestions.forEach(question => {
        const answer = question.nextElementSibling;
        openQuestion(question, answer);
      });
    },
    closeAll() {
      faqQuestions.forEach(question => {
        closeQuestion(question);
      });
    },
    getOpenQuestions() {
      return Array.from(faqQuestions).filter(
        q => q.getAttribute('aria-expanded') === 'true'
      );
    }
  };
}

/**
 * Inicialización automática para uso simple
 */
export function initFAQ() {
  return setupFAQAccordion();
}