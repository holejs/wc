import { TextFieldFeedback, TextFieldValidation } from './text-field'

function createFeedback (status: 'completed' | 'invalid', message: string): (el: HTMLInputElement) => TextFieldFeedback {
  return ($el: HTMLInputElement): TextFieldFeedback => {
    return {
      status,
      message,
      name: $el.name,
      type: $el.type,
      el: $el
    }
  }
}

export function required (): TextFieldValidation {
  const name = 'required'

  const handler = async ($el: HTMLInputElement): Promise<TextFieldFeedback> => {
    const isValid = !!$el.value

    return isValid
      ? createFeedback('completed', 'Completed.')($el)
      : createFeedback('invalid', 'This field is required.')($el)
  }

  return { name, handler }
}

export function email (): TextFieldValidation {
  const name = 'email'

  const handler = async ($el: HTMLInputElement): Promise<TextFieldFeedback> => {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test($el.value)

    return isValid
      ? createFeedback('completed', 'Completed.')($el)
      : createFeedback('invalid', 'Email is invalid.')($el)
  }

  return { name, handler }
}

export function minlength (length: number): TextFieldValidation {
  const name = 'minlength'

  const handler = async ($el: HTMLInputElement): Promise<TextFieldFeedback> => {
    const isValid = $el.value.length >= length

    return isValid
      ? createFeedback('completed', 'Completed.')($el)
      : createFeedback('invalid', `It must contain at least ${length} characters.`)($el)
  }

  return { name, handler }
}

export function maxlength (length: number): TextFieldValidation {
  const name = 'maxlength'

  const handler = async ($el: HTMLInputElement): Promise<TextFieldFeedback> => {
    const isValid = $el.value.length <= length

    return isValid
      ? createFeedback('completed', 'Completed.')($el)
      : createFeedback('invalid', `It must contain a maximum of ${length} characters.`)($el)
  }

  return { name, handler }
}

export function min (value: number): TextFieldValidation {
  const name = 'min'

  const handler = async ($el: HTMLInputElement): Promise<TextFieldFeedback> => {
    const isValid = Number($el.value) >= value

    return isValid
      ? createFeedback('completed', 'Completed.')($el)
      : createFeedback('invalid', `Must be greater than or equal to ${value}`)($el)
  }

  return { name, handler }
}

export function max (value: number): TextFieldValidation {
  const name = 'max'

  const handler = async ($el: HTMLInputElement): Promise<TextFieldFeedback> => {
    const isValid = Number($el.value) <= value

    return isValid
      ? createFeedback('completed', 'Completed.')($el)
      : createFeedback('invalid', `Must be less than or equal to ${value}`)($el)
  }

  return { name, handler }
}

export async function processValidationSequentially (validators: TextFieldValidation[], $el: HTMLInputElement): Promise<TextFieldFeedback[]> {
  const validationResults: TextFieldFeedback[] = []

  for (const validator of validators) {
    const result = await validator.handler($el)

    validationResults.push(result)

    if (result.status === 'invalid') break
  }

  return validationResults
}
