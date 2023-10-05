/**
 * Generate a random hash.
 *
 * @param {number} length The length of the hash.
 * @returns {string} The generated hash.
 */
export const generateHash = (length: number = 10): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const charactersLength = characters.length

  return Array.from({ length }, (_, index) => index)
    .map(() => characters.charAt(Math.floor(Math.random() * charactersLength)))
    .join('')
}
