/**
 * Retrieves all ARIA (Accessible Rich Internet Applications) properties of an HTML element.
 *
 * @param {HTMLElement} el - The HTML element for which ARIA properties need to be retrieved.
 * @returns {Array<Attr>} An array of attributes representing ARIA properties.
 *
 * @example
 * // Get all ARIA properties of an element with id "myElement"
 * const myElement = document.getElementById('myElement');
 * const ariaProps = getAllAriaProps(myElement);
 * console.log(ariaProps);
 * // Output: [Attr, Attr, ...] (an array of attributes)
 */
export function getAllAriaProps (el: HTMLElement): Attr[] {
  const _attr = el.attributes

  return Array.from(_attr).filter(attr => attr.name.startsWith('aria-'))
}
