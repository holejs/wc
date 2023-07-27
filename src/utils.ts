import { ColorNameMap, ElevationNameMap, colorsMap, elevationMap } from './declarations'

/**
 * Returns a color value corresponding to the given color name.
 * @param {string} name The name of the color to be retrieved.
 * @returns {string} The color value corresponding to the given color name.
*/
export function getColor (name: ColorNameMap): string {
  return colorsMap[name]
}

/**
 * Returns a elevation value.
 * @param name The name of the elevation.
 * @returns The elevation value corresponding to the given elevation name.
 */
export function getElevation (name: ElevationNameMap): string {
  return elevationMap[name]
}

/**
 * Converts a hexadecimal color to the corresponding RGBA format.
 *
 * @param {string} hex - The hexadecimal color value to convert.
 * @param {number} [alpha=1] - The alpha value (transparency) for the RGBA format. Must be a number between 0 and 1. Default value is 1 (fully opaque).
 * @throws {Error} If the `alpha` value is not between 0 and 1.
 * @returns {string} The RGBA color representation in the format "rgba(r, g, b, alpha)".
 *
 * @example
 * const hexColor = "#E53935";
 * const alphaValue = 0.5;
 * const rgbaColor = hexToRgba(hexColor, alphaValue);
 * console.log(rgbaColor); // Output: "rgba(229, 57, 53, 0.5)"
 */
export function hexToRgba (hex: string, alpha = 1): string {
  const _hex = hex.toString().replace('#', '')

  // Convert hexadecimal value to RGB components
  const r = parseInt(_hex.substring(0, 2), 16)
  const g = parseInt(_hex.substring(2, 4), 16)
  const b = parseInt(_hex.substring(4, 6), 16)

  // Validate the value of the alpha channel (transparency)
  if (alpha < 0 || alpha > 1) {
    throw new Error('The value of the alpha channel must be between 0 and 1.')
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Checks if the given text is a valid hexadecimal color format.
 *
 * @param {string} text - The text to validate.
 * @returns {boolean} `true` if the text is a valid hexadecimal color format, otherwise `false`.
 *
 * @example
 * console.log(isHexColor("#E53935")); // Output: true
 * console.log(isHexColor("#123")); // Output: true
 * console.log(isHexColor("#abc")); // Output: true
 * console.log(isHexColor("#GHI")); // Output: false
 * console.log(isHexColor("red")); // Output: false
 */
export function isHexColor (text: string): boolean {
  const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/

  return hexColorRegex.test(text)
}

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
