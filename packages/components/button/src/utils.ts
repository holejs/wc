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
