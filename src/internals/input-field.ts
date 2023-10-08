import { property, query, state } from 'lit/decorators.js'
import { LitElement, PropertyValueMap } from 'lit'

import { TextFieldError } from '../error.js'

import { parseRules } from '../utils/parseRules.js'

import {
  VALIDATION_REQUIRED_KEY,
  ValidationContext,
  ValidationFn,
  Validations,
  RuleMethods,
  Validation,
  Feedback
} from '../validations.js'

export class InputField extends LitElement {
  @query('input') protected $input!: HTMLInputElement

  protected readonly internals = this.attachInternals()

  // More information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
  static formAssociated = true

  @property({ type: String }) name!: string

  @property({ type: Boolean }) readonly = false

  @property({ type: Boolean }) disabled = false

  @property({ type: String }) rules!: string

  @state() dirty = false

  @state() touched = false

  @state()
  private _validationMessage: string | null = null

  private _rules = new Map<string, ValidationFn>()

  connectedCallback (): void {
    super.connectedCallback()

    parseRules(this.rules).forEach(({ key }) => {
      const name = key
      const handler = Validations[key as RuleMethods]

      this.addRule({ name, handler })
    })
  }

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this._configureRules()

    this.triggerValidation()
  }

  protected updated (changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has('_validationMessage')) {
      this.setAttribute(
        'aria-invalid',
        String(Boolean(this.validationMessage) && (this.dirty || this.touched))
      )
    }

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled))
    }

    if (changedProperties.has('readonly')) {
      this.setAttribute('aria-readonly', String(this.readonly))
    }
  }

  get validationMessage (): string | null {
    return this._validationMessage
  }

  get form (): HTMLFormElement | null {
    return this.internals.form
  }

  getRules (): Validation[] {
    return [...this._rules].map(([name, handler]) => ({ name, handler }))
  }

  getRule (name: string): ValidationFn | null {
    const handler = this._rules.get(name)

    if (!handler) return null

    return handler
  }

  hasRule (name: string): boolean {
    return this._rules.has(name)
  }

  addRule (validation: Validation): void {
    if (this.hasRule(validation.name)) {
      throw new TextFieldError(`The rule "${validation.name}" already exists.`)
    }

    this._rules.set(validation.name, validation.handler)
  }

  removeRule (name: string): void {
    if (!this.hasRule(name)) {
      throw new TextFieldError(`The rule "${name}" does not exist.`)
    }

    this._rules.delete(name)
  }

  setValidity (message: string | null): void {
    if (!message) {
      this._validationMessage = null

      this.requestUpdate('_validationMessage')

      return this.internals.setValidity({})
    }

    this._validationMessage = message

    this.requestUpdate('_validationMessage')

    this.internals.setValidity(
      { customError: true },
      message,
      this.$input
    )
  }

  /**
   * Configures the validation rules for the input element.
   * Parses the rules from the component's 'rules' property,
   * sets corresponding attributes on the native input element,
   * and associates validators based on the defined rules.
   */
  private _configureRules (): void {
    // Parse the rules into key-value pairs.
    const ruleItems = parseRules(this.rules)

    // Set attribute native input.
    ruleItems.forEach(({ key, value }) => {
      this.$input.setAttribute(key, value || '')
    })
  }

  protected async validate (data: ValidationContext): Promise<Feedback | null> {
    const rules = this.getRules()

    const { input } = data

    let _feedback: Feedback | null = null

    for (const rule of rules) {
      if (rules.at(0)?.name !== VALIDATION_REQUIRED_KEY && !input.value) {
        break
      }

      const feedback = await rule.handler(data)

      if (feedback.status === 'invalid') {
        _feedback = feedback
        break
      }
    }

    return _feedback
  }

  protected async triggerValidation (): Promise<void> {
    const feedback = await this.validate({
      input: this.$input,
      el: this
    })

    this.setValidity(feedback?.message || null)
  }
}
