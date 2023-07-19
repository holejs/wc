import { ColorNameMap, colorsMap } from "./declarations";

/**
 * Returns a color value corresponding to the given color name.
 * @param {string} name The name of the color to be retrieved.
 * @returns {string} The color value corresponding to the given color name.
*/
export function getColor (name: ColorNameMap): string {
  return colorsMap[name]
}
