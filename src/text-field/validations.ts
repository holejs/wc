import { Feedback, Validator } from './validation-controller'

export interface ValidationOptions {
  message?: string;
}

const createValidator = (name: string, handler: (ev: InputEvent, options: ValidationOptions) => Promise<Feedback>) => {
  return ({ message }: ValidationOptions = {}): Validator => {
    const _message = message

    const validatorHandler: Validator['handler'] = async (ev) => {
      return handler(ev, { message: _message })
    }

    return { name, handler: validatorHandler }
  }
}

export const required = createValidator('required', async (ev) => {
  const $input = ev.target as HTMLInputElement
  const { valueMissing } = $input.validity

  if (valueMissing) return { status: 'invalid', message: 'This field is required.' }

  return { status: 'complete' }
})

export const email = createValidator('email', async (ev) => {
  const $el = ev.target as HTMLInputElement
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test($el.value)

  if (!isValid) return { status: 'invalid', message: 'Email is invalid.' }

  return { status: 'complete', message: 'Completed' }
})

export const minlength = createValidator('minlength', async (ev) => {
  const $el = ev.target as HTMLInputElement

  const _message = `It must contain at least ${$el.minLength} characters.`

  const { tooShort } = $el.validity

  if (tooShort) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const maxlength = createValidator('maxlength', async (ev) => {
  const $el = ev.target as HTMLInputElement

  const _message = `It must contain a maximum of ${$el.maxLength} characters.`

  const { tooLong } = $el.validity

  if (tooLong) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const min = createValidator('min', async (ev) => {
  const $el = ev.target as HTMLInputElement

  const _message = `The value must be greater than or equal to ${$el.min}.`

  const { rangeUnderflow } = $el.validity

  if (rangeUnderflow) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const max = createValidator('max', async (ev) => {
  const $el = ev.target as HTMLInputElement

  const _message = `The value must be less than or equal to ${$el.max}.`

  const { rangeOverflow } = $el.validity

  if (rangeOverflow) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const pattern = createValidator('pattern', async (ev) => {
  const $el = ev.target as HTMLInputElement

  const _message = 'The value does not comply with the valid format.'

  const { patternMismatch } = $el.validity

  if (patternMismatch) return { status: 'invalid', message: _message }

  return { status: 'complete' }
})

export const validationsMap = new Map([
  ['required', required],
  ['minlength', minlength],
  ['maxlength', maxlength],
  ['email', email],
  ['min', min],
  ['max', max],
  ['pattern', pattern]
])
