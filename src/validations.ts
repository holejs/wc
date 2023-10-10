export interface ValidationOptions {
  message?: string;
}

export interface Feedback {
  status: 'complete' | 'invalid';
  message?: string;
}

export interface ValidationContext {
  input: HTMLInputElement;
  [key: string]: unknown;
}

export type RuleHandler = (ctx: ValidationContext) => Promise<Feedback>

export type RuleEntity = { name: string; handler: RuleHandler }

export const RULES_MAP = {
  Required: 'required',
  MinLength: 'minlength',
  MaxLength: 'maxlength',
  Email: 'email',
  Min: 'min',
  Max: 'max',
  Pattern: 'pattern'
} as const

export type RuleMethods = typeof RULES_MAP[keyof typeof RULES_MAP]

export const required: RuleHandler = async ({ input, el }: ValidationContext) => {
  const { valueMissing } = input.validity

  const message = (el as any).getAttribute('data-error-message-required') ||
    input.validationMessage ||
    'This field is required.'

  if (valueMissing) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const email: RuleHandler = async ({ input, el }: ValidationContext) => {
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value)

  const message = (el as any).getAttribute('data-error-message-email') ||
    input.validationMessage ||
    'Email is invalid.'

  if (!isValid) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const minlength: RuleHandler = async ({ input, el }: ValidationContext) => {
  const { value, minLength } = input

  const message = (el as any).getAttribute('data-error-message-minlength') ||
  input.validationMessage ||
  `It must contain at least ${minLength} characters.`

  if (!(value.length >= minLength)) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const maxlength: RuleHandler = async ({ input, el }: ValidationContext) => {
  const { value, maxLength } = input

  const message = (el as any).getAttribute('data-error-message-maxlength') ||
  input.validationMessage ||
  `It must contain a maximum of ${maxLength} characters.`

  if (!(value.length <= maxLength)) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const min: RuleHandler = async ({ input, el }: ValidationContext) => {
  const message = (el as any).getAttribute('data-error-message-min') ||
  input.validationMessage ||
  `The value must be greater than or equal to ${input.min}.`

  const { rangeUnderflow } = input.validity || {}

  if (rangeUnderflow) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const max: RuleHandler = async ({ input, el }: ValidationContext) => {
  const message = (el as any).getAttribute('data-error-message-max') ||
  input.validationMessage ||
  `The value must be less than or equal to ${input.max}.`

  const { rangeOverflow } = input.validity || {}

  if (rangeOverflow) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const pattern: RuleHandler = async ({ input, el }: ValidationContext) => {
  const message = (el as any).getAttribute('data-error-message-pattern') ||
  input.validationMessage ||
  'The value does not comply with the valid format.'

  const { patternMismatch } = input.validity || {}

  if (patternMismatch) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const Validations: Record<RuleMethods, RuleHandler> = {
  required,
  minlength,
  maxlength,
  email,
  min,
  max,
  pattern
}
