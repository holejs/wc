import { property, query, state } from 'lit/decorators.js'
import { LitElement, PropertyValueMap } from 'lit'

import { TextFieldError } from '../error.js'

import {
  ValidationContext,
  RuleHandler,
  RuleEntity,
  RULES_MAP,
  Feedback
} from '../validations.js'
import { createParsingRules } from '../utils/createParsingRules.js'
import { delayFn } from '../utils/delay.js'

export const INPUT_FIELD_ATTR_ERROR_MSG = {
  Required: 'error-message-required',
  MinLength: 'error-message-minlength',
  MaxLength: 'error-message-maxlength',
  Min: 'error-message-min',
  Max: 'error-message-max',
  Email: 'error-message-email',
  Pattern: 'error-message-pattern',
  Default: 'error-message-default'
} as const

/**
 * Class responsible for adding validations to the input element.
 *
 * **Note**: When you extend this class and you need to use [Lifecycles](https://lit.dev/docs/components/lifecycle/)
 * you need to invoke the parent class.
 *
 * @example
 *
 * ```ts
 * class MyInput extends InputField {
 *   // Your code here.
 * }
 * ```
 */
export abstract class InputField<T> extends LitElement {
  @query('input')
  protected $input!: HTMLElement

  /**
   * For more information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals
   */
  protected readonly internals = this.attachInternals()

  /**
   * For more information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals
   */
  static formAssociated = true

  /**
   * The name of the input field.
   */
  @property()
    name = ''

  /**
   * Indicates whether the input field is read-only.
   */
  @property({ type: Boolean })
    readonly = false

  /**
   * Indicates whether the input field is disabled.
   */
  @property({ type: Boolean })
    disabled = false

  /**
   * The rules or validations applied to the input field.
   * The values available are:
   *
   * - `required`: The input field is required.
   * - `minlength`: The minimum length of the input field.
   * - `maxlength`: The maximum length of the input field.
   * - `min`: The minimum value of the input field.
   * - `max`: The maximum value of the input field.
   * - `email`: The input field must be an email. When using this rule, the `type` attribute must be set to `email`.
   * - `pattern`: The pattern of the input field.
   *
   * **NOTE**: The rules are separated by a pipe character `|`. It's important
   * the `pattern` must be defined last, otherwise it will not work correctly.
   *
   * @example
   * ```html
   * <hwc-text-field rules="required|minlength:3|maxlength:15"></hwc-text-field>
   *
   * <hwc-text-field type="email" rules="required|email"></hwc-text-field>
   *
   * <hwc-text-field rules="required|pattern:^[a-zA-Z0-9]{3,15}$"></hwc-text-field>
   * ```
   */
  @property()
    rules = ''

  @property()
    required = false

  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Required })
    errorMessageRequired = 'This field is required'

  @property({ type: Number })
    minLength: number | null = null

  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.MinLength })
    errorMessageMinLength = 'The value must have at least {minLength} characters'

  @property({ type: Number })
    maxLength: number | null = null

  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.MaxLength })
    errorMessageMaxLength = 'The value must have at most {maxLength} characters'

  @property({ type: Number })
    min: number | null = null

  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Min })
    errorMessageMin = 'The value must be greater than or equal to {min}'

  @property({ type: Number })
    max: number | null = null

  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Max })
    errorMessageMax = 'The value must be less than or equal to {max}'

  @property()
    pattern = ''

  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Pattern })
    errorMessagePattern = 'The value does not match the pattern'

  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Email })
    errorMessageEmail = 'The email is invalid'

  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Default })
    errorMessageDefault = 'The value is invalid'

  /**
   * Indicates whether the input field has been modified.
   */
  @property({ attribute: false })
    dirty = false

  /**
   * Indicates whether the input field has been touched.
   */
  @property({ attribute: false })
    touched = false

  @state()
  private _validationMessage: string | null = null

  private _rules = new Map<string, RuleHandler>()

  protected updated (changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (
      changedProperties.has('_validationMessage') ||
      changedProperties.has('dirty') ||
      changedProperties.has('touched')
    ) {
      this.setAttribute('aria-invalid', String(this.hasError()))
    }

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled))
    }

    if (changedProperties.has('readonly')) {
      this.setAttribute('aria-readonly', String(this.readonly))
    }

    if (changedProperties.has('rules')) {
      delayFn().then(() => {
        this._configureRules()
        this._configureErrorMessages()
        this.reportValidity()
      })
    }
  }

  protected hasError (): boolean {
    return !!this.validationMessage && (this.touched || this.dirty)
  }

  /**
   * Returns the validation message that would be shown to the user.
   */
  get validationMessage (): string | null {
    return this._validationMessage
  }

  /**
   * Returns the form element that the input is associated with.
   */
  get form (): HTMLFormElement | null {
    return this.internals.form
  }

  /**
   * Return a list of the validation rules registered to the input.
   */
  getRules (): RuleEntity[] {
    return [...this._rules].map(([name, handler]) => ({ name, handler }))
  }

  /**
   * Returns the validation rule with the given name.
   */
  getRule (name: string): RuleHandler | null {
    const handler = this._rules.get(name)

    if (!handler) return null

    return handler
  }

  /**
   * Returns true if the input has a validation rule with the given name.
   *
   * @param name The name of the rule to check.
   */
  hasRule (name: string): boolean {
    return this._rules.has(name)
  }

  /**
   * Adds a validation rule to the input.
   *
   * @param validation The validation rule to add.
   */
  addRule (validation: RuleEntity): void {
    if (this.hasRule(validation.name)) {
      throw new TextFieldError(`The rule "${validation.name}" already exists.`)
    }

    this._rules.set(validation.name, validation.handler)
  }

  /**
   * Removes a validation rule from the input.
   *
   * @param name The name of the rule to remove.
   */
  removeRule (name: string): void {
    if (!this.hasRule(name)) {
      throw new TextFieldError(`The rule "${name}" does not exist.`)
    }

    this._rules.delete(name)
  }

  setCustomValidity (message: string): void {
    this._validationMessage = message || null
    this.requestUpdate('_validationMessage')

    if (!message) {
      return this.internals.setValidity({})
    }

    if (!this.$input) {
      return
    }

    this.internals.setValidity(
      { customError: true },
      message,
      this.$input
    )
  }

  /**
   * Sets a custom validation message.
   *
   * @param message The validation message to set.
   * @deprecated
   */
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
    const parsingRules = createParsingRules(this.rules)

    this.required = parsingRules.get(RULES_MAP.Required) as boolean || false
    this.minLength = parsingRules.get(RULES_MAP.MinLength) as number || null
    this.maxLength = parsingRules.get(RULES_MAP.MaxLength) as number || null
    this.min = parsingRules.get(RULES_MAP.Min) as number || null
    this.max = parsingRules.get(RULES_MAP.Max) as number || null
    this.pattern = parsingRules.get(RULES_MAP.Pattern) as string || ''
  }

  private _configureErrorMessages (): void {
    this.errorMessageRequired = this.getAttribute(`data-${INPUT_FIELD_ATTR_ERROR_MSG.Required}`) || this.errorMessageRequired
    this.errorMessageMinLength = this.getAttribute(`data-${INPUT_FIELD_ATTR_ERROR_MSG.MinLength}`) || this.errorMessageMinLength
    this.errorMessageMaxLength = this.getAttribute(`data-${INPUT_FIELD_ATTR_ERROR_MSG.MaxLength}`) || this.errorMessageMaxLength
    this.errorMessageMin = this.getAttribute(`data-${INPUT_FIELD_ATTR_ERROR_MSG.Min}`) || this.errorMessageMin
    this.errorMessageMax = this.getAttribute(`data-${INPUT_FIELD_ATTR_ERROR_MSG.Max}`) || this.errorMessageMax
    this.errorMessagePattern = this.getAttribute(`data-${INPUT_FIELD_ATTR_ERROR_MSG.Pattern}`) || this.errorMessagePattern
    this.errorMessageEmail = this.getAttribute(`data-${INPUT_FIELD_ATTR_ERROR_MSG.Email}`) || this.errorMessageEmail
  }

  /**
   * This method is responsible for validating all the rules
   * associated with the input element.
   */
  protected async validate (data: ValidationContext): Promise<Feedback | null> {
    const rules = this.getRules()

    const { input } = data

    let _feedback: Feedback | null = null

    for (const rule of rules) {
      if (rules.at(0)?.name !== RULES_MAP.Required && !input.value) {
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

  /**
   * This method is responsible for triggering the validation.
   *
   * @deprecated
   */
  protected async triggerValidation (): Promise<void> {
    const feedback = await this.validate({
      input: this.$input as HTMLInputElement,
      el: this
    })

    this.setCustomValidity(feedback?.message || '')
  }

  /**
   * Value of the input field.
   */
  abstract value: T

  /**
   * The ARIA role of the input field.
   * For more information: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
   */
  abstract role: string

  /**
   * Reset the state of the input field.
   */
  abstract reset(): void

  /**
   * Checks the validity of the component's value.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the value is valid, `false` otherwise.
   */
  abstract checkValidity(): Promise<boolean>

  /**
   * Reports the validity of the component's value to the user.
   * This provide feedback to the user about the validation state.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the value is valid, `false` otherwise.
   */
  abstract reportValidity(): Promise<boolean>
}
