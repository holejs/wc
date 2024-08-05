/**
 * Creates a parsing rules map from a string of rules.
 *
 * Each rule in the string should be separated by a pipe (`|`) character.
 * A rule can either be a key-value pair separated by a colon (`:`), or just a key, which will have a default value of `true`.
 *
 * @param {string} rules The string of rules to parse.
 */
export const createParsingRules = (rules: string) => {
  const parsingMap = new Map<string, string | number | boolean>()

  for (const rule of rules.split('|')) {
    const [key, value] = rule.split(':')

    if (key === 'minlength' || key === 'maxlength' || key === 'min' || key === 'max') {
      parsingMap.set(key, Number(value))
    }

    // TODO: The email rule should be removed from the parsing rules map.
    if (key === 'required' || key === 'email') {
      parsingMap.set(key, true)
    }

    if (key === 'pattern') {
      parsingMap.set(key, value)
    }
  }

  /**
   * Retrieves the value associated with a given key.
   *
   * @param key The key to retrieve the value for.
   */
  const get = (key: string) => parsingMap.get(key)

  /**
   * Checks if a given key exists in the rules map.
   *
   * @param key The key to check for.
   */
  const has = (key: string) => parsingMap.has(key)

  return { get, has }
}
