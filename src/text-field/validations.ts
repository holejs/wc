export interface ValidationOptions {
  message?: string;
}

export interface Feedback {
  status: 'complete' | 'invalid';
  message?: string;
}

export type ValidationFn = (event: InputEvent) => Promise<Feedback>

export const VALIDATION_REQUIRED_KEY = 'required'

export const VALIDATION_MINLENGTH_KEY = 'minlength'

export const VALIDATION_MAXLENGTH_KEY = 'maxlength'

export const VALIDATION_PATTERN_KEY = 'pattern'

export const VALIDATION_EMAIL_KEY = 'email'

export const VALIDATION_MIN_KEY = 'min'

export const VALIDATION_MAX_KEY = 'max'

const createValidator = (handler: (ev: InputEvent, options: ValidationOptions) => Promise<Feedback>) => {
  return ({ message }: ValidationOptions = {}): ValidationFn => {
    const _message = message

    const validatorHandler = async (ev: InputEvent) => handler(ev, { message: _message })

    return validatorHandler
  }
}

export const required = createValidator(async (ev: InputEvent) => {
  const $input = ev.target as HTMLInputElement

  const { valueMissing } = $input.validity

  if (valueMissing) return { status: 'invalid', message: 'This field is required.' }

  return { status: 'complete' }
})

export const email = createValidator(async (ev: InputEvent) => {
  const $el = ev.target as HTMLInputElement

  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test($el.value)

  if (!isValid) return { status: 'invalid', message: 'Email is invalid.' }

  return { status: 'complete' }
})

export const minlength = createValidator(async (ev: InputEvent) => {
  const $el = ev.target as HTMLInputElement

  const _message = `It must contain at least ${$el.minLength} characters.`

  const { tooShort } = $el.validity

  if (tooShort) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const maxlength = createValidator(async (ev: InputEvent) => {
  const $el = ev.target as HTMLInputElement

  const _message = `It must contain a maximum of ${$el.maxLength} characters.`

  const { tooLong } = $el.validity

  if (tooLong) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const min = createValidator(async (ev: InputEvent) => {
  const $el = ev.target as HTMLInputElement

  const _message = `The value must be greater than or equal to ${$el.min}.`

  const { rangeUnderflow } = $el.validity

  if (rangeUnderflow) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const max = createValidator(async (ev: InputEvent) => {
  const $el = ev.target as HTMLInputElement

  const _message = `The value must be less than or equal to ${$el.max}.`

  const { rangeOverflow } = $el.validity

  if (rangeOverflow) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const pattern = createValidator(async (ev) => {
  const $el = ev.target as HTMLInputElement

  const _message = 'The value does not comply with the valid format.'

  const { patternMismatch } = $el.validity

  if (patternMismatch) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const createValidationControl = () => {
  const validationMap = new Map<string, ValidationFn>()

  const setValidation = (name: string, handler: ValidationFn) => {
    if (getValidation(name)) {
      return console.warn()
    }

    validationMap.set(name, handler)
  }

  const getAllValidations = () => [...validationMap].map(([name, handler]) => ({ name, handler }))

  const getValidation = (name: string) => validationMap.get(name)

  const validate = async (ev: InputEvent) => {
    const feedbacks: Feedback[] = []

    const validations = getAllValidations()

    for (const validation of validations) {
      const $input = ev.target as HTMLInputElement

      if (validations.at(0)?.name !== VALIDATION_REQUIRED_KEY && !$input?.value) break

      const result = await validation.handler(ev)

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
