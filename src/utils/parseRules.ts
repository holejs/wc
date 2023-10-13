const RULES_FUNCTIONS = [
  [/required/, 'required'],
  [/email/, 'email'],
  [/min:(\d+)/, 'min'],
  [/max:(\d+)/, 'max'],
  [/minlength:(\d+)/, 'minlength'],
  [/maxlength:(\d+)/, 'maxlength'],
  [/pattern:(.+)/, 'pattern']
]

/**
 * Parses a rules string and returns an array of rule items.
 *
 * The rules string should have a format like "key:value|key:value|...".
 * Each rule is separated by the "|" character, and key-value pairs are separated by ":".
 *
 * @param {string} rules - The rules string to be parsed.
 * @returns {{ key: string; value: string | null }[]} An array of rule items.
 * Each item contains a 'key' property representing the rule name,
 * and an optional 'value' property representing the rule value if provided.
 */
export const parseRules = (rules: string): { key: string; value: string }[] => {
  return RULES_FUNCTIONS
    .map(([regex, key]) => {
      const match = rules.match(regex)

      if (!match) return null

      return { key, value: match[1] || '' }
    })
    .filter((rule) => rule !== null) as { key: string; value: string }[]
}
