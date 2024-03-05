/**
 * Checks if an attribute exists in an object.
 * @param obj - The object in which to verify the attribute's existence.
 * @param key - The name of the attribute to check.
 */
export const hasAttr = (
  obj: Record<string, any>,
  key: string
): boolean => key in obj
