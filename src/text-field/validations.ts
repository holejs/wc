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

export const VALIDATION_REQUIRED_KEY = 'required'

export const VALIDATION_MINLENGTH_KEY = 'minlength'

export const VALIDATION_MAXLENGTH_KEY = 'maxlength'

export const VALIDATION_PATTERN_KEY = 'pattern'

export const VALIDATION_EMAIL_KEY = 'email'

export const VALIDATION_MIN_KEY = 'min'

export const VALIDATION_MAX_KEY = 'max'

const createValidator = (handler: (ctx: ValidationContext, options: ValidationOptions) => Promise<Feedback>) => {
  return ({ message }: ValidationOptions = {}): ValidationFn => {
    const _message = message

    const validatorHandler = async (ctx: ValidationContext) => handler(ctx, { message: _message })

    return validatorHandler
  }
}

export const required = createValidator(async ({ input }: ValidationContext) => {
  const { valueMissing } = input.validity

  if (valueMissing) return { status: 'invalid', message: 'This field is required.' }

  return { status: 'complete' }
})

export const email = createValidator(async ({ input }: ValidationContext) => {
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value)

  if (!isValid) return { status: 'invalid', message: 'Email is invalid.' }

  return { status: 'complete' }
})

export const minlength = createValidator(async ({ input }: ValidationContext) => {
  const { value, minLength } = input

  const _message = `It must contain at least ${minLength} characters.`

  if (!(value.length >= minLength)) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const maxlength = createValidator(async ({ input }: ValidationContext) => {
  const { value, maxLength } = input

  const _message = `It must contain a maximum of ${maxLength} characters.`

  if (!(value.length <= maxLength)) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const min = createValidator(async ({ input }: ValidationContext) => {
  const _message = `The value must be greater than or equal to ${input.min}.`

  const { rangeUnderflow } = input.validity || {}

  if (rangeUnderflow) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const max = createValidator(async ({ input }: ValidationContext) => {
  const _message = `The value must be less than or equal to ${input.max}.`

  const { rangeOverflow } = input.validity || {}

  if (rangeOverflow) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const pattern = createValidator(async ({ input }: ValidationContext) => {
  const _message = 'The value does not comply with the valid format.'

  const { patternMismatch } = input.validity || {}

  if (patternMismatch) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const createValidationControl = () => {
  const validationMap = new Map<string, ValidationFn>()

  const setValidation = (name: string, handler: ValidationFn) => {
    if (getValidation(name)) {
      return console.error(`There is already a validation function for the field '${name}`)
    }

    validationMap.set(name, handler)
  }

  const getAllValidations = () => [...validationMap].map(([name, handler]) => ({ name, handler }))

  const getValidation = (name: string) => validationMap.get(name)

  const validate = async (ctx: ValidationContext) => {
    const validations = getAllValidations()

    const feedbacks: Feedback[] = []

    const { input } = ctx

    for (const validation of validations) {
      if (validations.at(0)?.name !== VALIDATION_REQUIRED_KEY && !input?.value) break

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
