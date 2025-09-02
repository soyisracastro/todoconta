/**
 * Utilidades compartidas para manejo de formularios
 * Centralizadas para evitar duplicación de código
 */

/**
 * Valida un formulario y muestra errores
 * @param {HTMLFormElement} form - El formulario a validar
 * @returns {boolean} - true si es válido, false si no
 */
export function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  // Limpiar errores previos
  clearFormErrors(form);

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      showFieldError(field, 'Este campo es obligatorio');
      isValid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      showFieldError(field, 'Ingresa un correo electrónico válido');
      isValid = false;
    } else if (field.type === 'tel' && !isValidPhone(field.value)) {
      showFieldError(field, 'Ingresa un teléfono válido');
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Valida formato de email
 * @param {string} email 
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida formato de teléfono (mexicano)
 * @param {string} phone 
 * @returns {boolean}
 */
function isValidPhone(phone) {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 12;
}

/**
 * Muestra error en un campo específico
 * @param {HTMLElement} field 
 * @param {string} message 
 */
function showFieldError(field, message) {
  field.classList.add('form-error');
  
  // Crear elemento de error si no existe
  let errorElement = field.parentNode.querySelector('.field-error');
  if (!errorElement) {
    errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    field.parentNode.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
}

/**
 * Limpia todos los errores del formulario
 * @param {HTMLFormElement} form 
 */
function clearFormErrors(form) {
  const errorFields = form.querySelectorAll('.form-error');
  const errorMessages = form.querySelectorAll('.field-error');
  
  errorFields.forEach(field => field.classList.remove('form-error'));
  errorMessages.forEach(error => error.remove());
}

/**
 * Maneja el envío de formulario con estados de carga
 * @param {HTMLFormElement} form 
 * @param {Function} submitHandler - Función async que maneja el envío
 * @param {Object} options - Opciones de configuración
 */
export async function handleFormSubmit(form, submitHandler, options = {}) {
  const {
    loadingText = 'Enviando...',
    successMessage = '¡Formulario enviado con éxito!',
    errorMessage = 'Hubo un error. Inténtalo de nuevo.',
    resetOnSuccess = true
  } = options;

  // Validar antes de enviar
  if (!validateForm(form)) {
    return;
  }

  const submitButton = form.querySelector('[type="submit"]');
  const originalButtonContent = submitButton.innerHTML;
  
  try {
    // Estado de carga
    submitButton.innerHTML = loadingText;
    submitButton.disabled = true;
    form.classList.add('form-loading');

    // Ejecutar handler personalizado
    await submitHandler(form);
    
    // Mostrar éxito
    showFormSuccess(form, successMessage);
    
    if (resetOnSuccess) {
      form.reset();
    }

  } catch (error) {
    console.error('Error en envío de formulario:', error);
    showFormError(form, errorMessage);
    
  } finally {
    // Restaurar estado original
    submitButton.innerHTML = originalButtonContent;
    submitButton.disabled = false;
    form.classList.remove('form-loading');
  }
}

/**
 * Muestra mensaje de éxito en el formulario
 * @param {HTMLFormElement} form 
 * @param {string} message 
 */
function showFormSuccess(form, message) {
  const successElement = createMessageElement('form-success', message);
  form.appendChild(successElement);
  
  // Remover después de 5 segundos
  setTimeout(() => {
    successElement.remove();
  }, 5000);
}

/**
 * Muestra mensaje de error en el formulario
 * @param {HTMLFormElement} form 
 * @param {string} message 
 */
function showFormError(form, message) {
  const errorElement = createMessageElement('form-error-message', message);
  form.appendChild(errorElement);
  
  // Remover después de 5 segundos
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
}

/**
 * Crea elemento de mensaje
 * @param {string} className 
 * @param {string} message 
 * @returns {HTMLElement}
 */
function createMessageElement(className, message) {
  const element = document.createElement('div');
  element.className = className;
  element.textContent = message;
  return element;
}

/**
 * Formatea número de teléfono mexicano
 * @param {string} phone 
 * @returns {string}
 */
export function formatMexicanPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('52')) {
    return `+52 (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
  }
  
  return phone;
}

/**
 * Auto-formatea teléfonos mientras se escribe
 * @param {HTMLInputElement} phoneInput 
 */
export function setupPhoneFormatting(phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    const cursorPosition = e.target.selectionStart;
    const oldValue = e.target.value;
    const newValue = formatMexicanPhone(oldValue);
    
    if (newValue !== oldValue) {
      e.target.value = newValue;
      // Mantener posición del cursor aproximada
      e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
    }
  });
}

/**
 * Inicializar utilidades de formularios en una página
 * @param {string} formSelector - Selector del formulario
 * @param {Function} submitHandler - Handler de envío
 * @param {Object} options - Opciones
 */
export function initForm(formSelector, submitHandler, options = {}) {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector(formSelector);
    if (!form) return;

    // Configurar formateo de teléfonos
    const phoneInputs = form.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(setupPhoneFormatting);

    // Configurar envío de formulario
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleFormSubmit(form, submitHandler, options);
    });
  });
}