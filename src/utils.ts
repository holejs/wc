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

/**
 * Checks if the given text is a valid color format.
 * Valid formats include RGB, RGBA, HEX, and HSL.
 *
 * @param {string} text - The text to be checked for color format validity.
 * @returns {boolean} Returns true if the text is NOT a valid color format, false otherwise.
 */
export function isValidColorFormat (text: string): boolean {
  // Regular expressions to validate RGB, RGBA, HEX, and HSL formats
  const rgbRegex = /^(rgb|rgba)\(\s*(\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*\d*\.?\d+\s*)?)\)$/i
  const hexRegex = /^#([0-9A-F]{3}){1,2}$/i
  const hslRegex = /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/i

  // Check if the text matches any of the formats
  return !(rgbRegex.test(text) || hexRegex.test(text) || hslRegex.test(text))
}

/**
 * Checks if an attribute exists in an object.
 * @param obj - The object in which to verify the attribute's existence.
 * @param key - The name of the attribute to check.
 */
export function hasAttr (obj: Record<string, any>, key: string): boolean {
  return key in obj
}

export function generateHash (length: number = 10): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const charactersLength = characters.length

  return Array.from({ length }, (_, index) => index)
    .map(() => characters.charAt(Math.floor(Math.random() * charactersLength)))
    .join('')
}
