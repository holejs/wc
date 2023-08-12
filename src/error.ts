export class ValidationError extends Error {
  constructor (message: string) {
    super(message)

    this.name = 'ValidationError'
  }
}

export class TextFieldError extends Error {
  constructor (message: string) {
    super(message)

    this.name = 'TextFieldError'
  }
}
