/**
 * Generate a random hex color.
 *
 * @example
 * ```ts
 * randomHexColor() // '#f0f0f0'
 * ```
 */
export const randomHexColor = () => {
  const MAX_HEX_COLOR_VALUE = 16777215

  return `#${Math.floor(Math.random() * MAX_HEX_COLOR_VALUE).toString(16)}`
}
