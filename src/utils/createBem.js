const ELEMENT_DIVIDER = '__';
const MODIFIER_DIVIDER = '--';

/**
 *
 * @param {string} block - Назва блока
 * @param {Object} [classes] - Мапа класів для заміни (опціонально, для препроцесора чи CSS-модуля)
 * @returns {function} - Функція для створення класів: bem(element?, modifiers?)
 */
export const createBem = (block, classes = {}) => {
  const getClassName = (className) => classes[className] || className;

  return (element = '', modifiers = {}) => {
    let base = element ? `${block}${ELEMENT_DIVIDER}${element}` : block;
    base = getClassName(base);

    const classList = [base];

    for (const [key, value] of Object.entries(modifiers || {})) {
      if (value === true) {
        classList.push(getClassName(`${base}${MODIFIER_DIVIDER}${key}`));
      } else if (typeof value === 'string' || typeof value === 'number') {
        classList.push(getClassName(`${base}${MODIFIER_DIVIDER}${key}-${value}`));
      }
    }

    return classList.join(' ');
  };
};
