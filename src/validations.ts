import { ValidationError } from './error'

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

export type ValidationFn = (ctx: ValidationContext) => Promise<Feedback>

export type Validation = { name: string; handler: ValidationFn };

export const VALIDATION_REQUIRED_KEY = 'required'

export const VALIDATION_MINLENGTH_KEY = 'minlength'

export const VALIDATION_MAXLENGTH_KEY = 'maxlength'

export const VALIDATION_PATTERN_KEY = 'pattern'

export const VALIDATION_EMAIL_KEY = 'email'

export const VALIDATION_MIN_KEY = 'min'

export const VALIDATION_MAX_KEY = 'max'

export const required: ValidationFn = async ({ input }: ValidationContext) => {
  const { valueMissing } = input.validity

  const message = input.getAttribute('data-error-message-required') || input.validationMessage || 'This field is required.'

  if (valueMissing) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const email: ValidationFn = async ({ input }: ValidationContext) => {
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value)

  const message = input.getAttribute('data-error-message-email') || input.validationMessage || 'Email is invalid.'

  if (!isValid) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const minlength: ValidationFn = async ({ input }: ValidationContext) => {
  const { value, minLength } = input

  const message = input.getAttribute('data-error-message-minlength') || input.validationMessage || `It must contain at least ${minLength} characters.`

  if (!(value.length >= minLength)) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const maxlength: ValidationFn = async ({ input }: ValidationContext) => {
  const { value, maxLength } = input

  const message = input.getAttribute('data-error-message-maxlength') || input.validationMessage || `It must contain a maximum of ${maxLength} characters.`

  if (!(value.length <= maxLength)) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const min: ValidationFn = async ({ input }: ValidationContext) => {
  const message = input.getAttribute('data-error-message-min') || input.validationMessage || `The value must be greater than or equal to ${input.min}.`

  const { rangeUnderflow } = input.validity || {}

  if (rangeUnderflow) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const max: ValidationFn = async ({ input }: ValidationContext) => {
  const message = input.getAttribute('data-error-message-max') || input.validationMessage || `The value must be less than or equal to ${input.max}.`

  const { rangeOverflow } = input.validity || {}

  if (rangeOverflow) return { status: 'invalid', message }

  return { status: 'complete' }
}

export const pattern: ValidationFn = async ({ input }: ValidationContext) => {
  const message = input.getAttribute('data-error-message-pattern') || input.validationMessage || 'The value does not comply with the valid format.'

  const { patternMismatch } = input.validity || {}

  if (patternMismatch) return { status: 'invalid', message }

  return { status: 'complete' }
}

/**
 * Creates a validation control instance.
 * This control manages a set of validation functions and their application on input fields.
 */
export const createValidationControl = () => {
  const validations: Validation[] = []

  /**
   * Register a new validation function for a specific field.
   * @param {string} name - The name of the field to validate.
   * @param {ValidationFn} handler - The validation function to register.
   * @returns {void}
   */
  const setValidation = (name: string, handler: ValidationFn): void => {
    if (getValidation(name)) {
      throw new ValidationError(`There is already a validation function for the field '${name}`)
    }

    validations.push({ name, handler })
  }

  /**
   * Get an array of objects containing all registered validation functions and their names.
   *
   * @returns {Validation[]} Array of validation function objects.
   */
  const getAllValidations = (): Validation[] => validations

  /**
   * Get the validation function registered for a specific field.
   *
   * @param {string} name - The name of the field to get the validation function for.
   * @returns {Validation|undefined} The validation function or undefined if not found.
   */
  const getValidation = (name: string): Validation | undefined => {
    return validations.find((v) => v.name === name)
  }

  /**
   * Run all registered validation functions on the provided context.
   *
   * @async
   * @param {ValidationContext} ctx - The context containing input data for validation.
   * @returns {Promise<Feedback[]>} Array of feedback objects for each validation failure.
   */
  const validate = async (ctx: ValidationContext): Promise<Array<Feedback>> => {
    const validations = getAllValidations()

    const feedbacks = []

    const { input } = ctx

    for (const validation of validations) {
      if (validations[0]?.name !== VALIDATION_REQUIRED_KEY && !input?.value) {
        break
      }

      const result = await validation.handler(ctx)

      if (result.status === 'invalid') {
        feedbacks.push(result)
      }
    }

    return feedbacks
  }

  return {
    getAllValidations,
    setValidation,
    getValidation,
    validate
  }
}

export const validationsMap = new Map([
  [VALIDATION_REQUIRED_KEY, required],
  [VALIDATION_MINLENGTH_KEY, minlength],
  [VALIDATION_MAXLENGTH_KEY, maxlength],
  [VALIDATION_EMAIL_KEY, email],
  [VALIDATION_MIN_KEY, min],
  [VALIDATION_MAX_KEY, max],
  [VALIDATION_PATTERN_KEY, pattern]
])
