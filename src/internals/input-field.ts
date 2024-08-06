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
 * The `InputField` class is an abstract class that serves as the base class
 * for all input field components. It provides a set of properties and methods
 * that are common to all input field components.
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
   * @deprecated
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

  /**
   * Indicates whether the input field is required.
   *
   * @default false
   */
  @property({ type: Boolean })
    required = false

  /**
   * The error message displayed when the input field is required but not filled.
   *
   * @default 'This field is required'
   */
  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Required })
    errorMessageRequired = 'This field is required'

  /**
   * The minimum number of characters allowed in the input field.
   *
   * @default null
   */
  @property({ type: Number, attribute: 'minlength' })
    minLength: number | null = null

  /**
   * The error message displayed when the input value has fewer characters than the specified minimum length.
   *
   * @default 'The value must have at least {minLength} characters'
   */
  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.MinLength })
    errorMessageMinLength = 'The value must have at least {minLength} characters'

  /**
   * The maximum number of characters allowed in the input field.
   *
   * @default null
   */
  @property({ type: Number, attribute: 'maxlength' })
    maxLength: number | null = null

  /**
   * The error message displayed when the input value has more characters than the specified maximum length.
   *
   * @default 'The value must have at most {maxLength} characters'
   */
  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.MaxLength })
    errorMessageMaxLength = 'The value must have at most {maxLength} characters'

  /**
   * The minimum numerical value allowed in the input field.
   *
   * @default null
   */
  @property({ type: Number })
    min: number | null = null

  /**
   * The error message displayed when the input value is less than the specified minimum value.
   *
   * @default 'The value must be greater than or equal to {min}'
   */
  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Min })
    errorMessageMin = 'The value must be greater than or equal to {min}'

  /**
   * The maximum numerical value allowed in the input field.
   *
   * @default null
   */
  @property({ type: Number })
    max: number | null = null

  /**
   * The error message displayed when the input value is greater than the specified maximum value.
   *
   * @default 'The value must be less than or equal to {max}'
   */
  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Max })
    errorMessageMax = 'The value must be less than or equal to {max}'

  /**
   * A regular expression pattern that the input value must match.
   *
   * @default ''
   */
  @property()
    pattern = ''

  /**
   * The error message displayed when the input value does not match the specified pattern.
   *
   * @default 'The value does not match the pattern'
   */
  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Pattern })
    errorMessagePattern = 'The value does not match the pattern'

  /**
   * The error message displayed when the input value is an invalid email address.
   *
   * @default 'The email is invalid'
   */
  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Email })
    errorMessageEmail = 'The email is invalid'

  /**
   * The default error message displayed when the input value is invalid for any other reason not covered by specific rules.
   *
   * @default 'The value is invalid'
   */
  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Default })
    errorMessageDefault = 'The value is invalid'

  /**
   * Indicates whether the input field has been modified.
   *
   * @default false
   */
  @property({ attribute: false })
    dirty = false

  /**
   * Indicates whether the input field has been touched.
   *
   * @default false
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

    if (
      changedProperties.has('required') ||
      changedProperties.has('minLength') ||
      changedProperties.has('maxLength') ||
      changedProperties.has('min') ||
      changedProperties.has('max') ||
      changedProperties.has('pattern')
    ) {
      delayFn().then(() => this.reportValidity())
    }
  }

  /**
   * Determines if the component has a validation error.
   * The method checks if there is a validation message and whether the component
   * has been touched or is dirty.
   *
   * @protected
   * @returns {boolean} `true` if the component has an error, `false` otherwise.
   */
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
   *
   * @returns {RuleEntity[]} The list of validation rules.
   */
  getRules (): RuleEntity[] {
    return [...this._rules].map(([name, handler]) => ({ name, handler }))
  }

  /**
   * Returns the validation rule with the given name.
   *
   * @param name The name of the rule to get.
   * @returns {RuleHandler | null} The rule handler if it exists, `null` otherwise.
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
   * @returns {boolean} `true` if the rule exists, `false` otherwise.
   */
  hasRule (name: string): boolean {
    return this._rules.has(name)
  }

  /**
   * Adds a validation rule to the input.
   *
   * @param validation The validation rule to add.
   * @returns {void}
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
   * @returns {void}
   */
  removeRule (name: string): void {
    if (!this.hasRule(name)) {
      throw new TextFieldError(`The rule "${name}" does not exist.`)
    }

    this._rules.delete(name)
  }

  /**
   * Sets a custom validation message for the component.
   *
   * This method allows setting a custom validation message that will be used to
   * indicate an error state. If a message is provided, it sets the custom validity
   * and the corresponding validation state. If no message is provided, it clears
   * the custom validity.
   *
   * @param {string} message The custom validation message to set. If empty, the custom
   * validation state is cleared.
   * @returns {void}
   */
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
   * @returns {void}
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
   * Configures the validation rules for the component.
   *
   * This method parses the validation rules provided in the `rules` property
   * to set the corresponding properties such as `required`, `minLength`,
   * `maxLength`, `min`, `max`, and `pattern`. This implementation ensures
   * backward compatibility with the previous method of defining rules via
   * a string (e.g., `required|minlength:3|maxlength:10`).
   *
   * @private
   * @returns {void}
   */
  private _configureRules (): void {
    const parsingRules = createParsingRules(this.rules)

    this.required = parsingRules.get<boolean>(RULES_MAP.Required) || this.required
    this.minLength = parsingRules.get<number>(RULES_MAP.MinLength) || this.minLength
    this.maxLength = parsingRules.get<number>(RULES_MAP.MaxLength) || this.maxLength
    this.min = parsingRules.get<number>(RULES_MAP.Min) || this.min
    this.max = parsingRules.get<number>(RULES_MAP.Max) || this.max
    this.pattern = parsingRules.get<string>(RULES_MAP.Pattern) || this.pattern
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
   *
   * @param data The data to validate.
   * @returns {Promise<Feedback | null>} A promise that resolves to a feedback object if the validation fails, `null` otherwise.
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
   * @returns {Promise<void>}
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
   *
   * @returns {void}
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
