import { ReactiveController, ReactiveControllerHost } from 'lit'

export interface Feedback {
  status: 'complete' | 'invalid';
  message?: string;
}

export interface Context<T = unknown> {
  value: T;
  [key: string]: unknown;
}

export interface Validator {
  name: string;
  handler(ev: InputEvent): Promise<Feedback>;
}

export class ValidationControl implements ReactiveController {
  private _host: ReactiveControllerHost

  private _validators: Validator[] = []

  constructor (host: ReactiveControllerHost) {
    this._host = host

    host.addController(this as any)
  }

  getValidator (name: string): Validator | undefined {
    return this._validators.find((validator) => validator.name === name)
  }

  setValidator (validator: Validator): void {
    if (this.getValidator(validator.name)) {
      console.warn('The validator already exist.')
      return
    }

    this._validators.push(validator)
  }

  async validate (ev: InputEvent): Promise<Feedback[]> {
    const feedbacks: Feedback[] = []

    for (const validator of this._validators) {
      const result = await validator.handler(ev)

      if (result.status === 'invalid') {
        feedbacks.push(result)
      }
    }

    return feedbacks
  }
}
