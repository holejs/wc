import { Feedback, Validator } from './validation-controller'

export interface ValidationOptions {
  message?: string;
}

export interface ValidationMinlengthOptions extends ValidationOptions {
  length: number;
}

export interface ValidationMaxlengthOptions extends ValidationOptions {
  length: number;
}

export function required ({ message }: ValidationOptions = {}): Validator {
  const name = 'required'

  const _message = message || 'This field is required.'

  const handler = async (ev: InputEvent): Promise<Feedback> => {
    const $input = ev.target as HTMLInputElement

    const { valueMissing } = $input.validity

    if (valueMissing) return { status: 'invalid', message: _message }

    return { status: 'complete' }
  }

  return { name, handler }
}

export function email ({ message }: ValidationOptions = {}): Validator {
  const name = 'email'

  const _message = message || 'Email is invalid.'

  const handler = async (ev: InputEvent): Promise<Feedback> => {
    const $el = ev.target as HTMLInputElement

    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test($el.value)

    if (!isValid) return { status: 'invalid', message: _message }

    return { status: 'complete', message: 'Completed' }
  }

  return { name, handler }
}

export function minlength ({ message }: ValidationOptions): Validator {
  const name = 'minlength'

  const handler = async (ev: InputEvent): Promise<Feedback> => {
    const $el = ev.target as HTMLInputElement

    const length = $el.minLength

    const _message = message || `It must contain at least ${length} characters.`

    const { tooShort } = $el.validity

    if (tooShort) return { status: 'invalid', message: _message }

    return { status: 'complete' }
  }

  return { name, handler }
}

export function maxlength ({ message }: ValidationOptions): Validator {
  const name = 'maxlength'

  const handler = async (ev: InputEvent): Promise<Feedback> => {
    const $el = ev.target as HTMLInputElement

    const length = $el.maxLength

    const _message = message || `It must contain a maximum of ${length} characters.`

    const { tooLong } = $el.validity

    if (tooLong) return { status: 'invalid', message: _message }

    return { status: 'complete' }
  }

  return { name, handler }
}
