import { property, query, state } from 'lit/decorators.js'
import { LitElement, PropertyValueMap } from 'lit'

import { TextFieldError } from '../error.js'

import { parseRules } from '../utils/parseRules.js'

import {
  ValidationContext,
  RuleHandler,
  Validations,
  RuleMethods,
  RuleEntity,
  RULES_MAP,
  Feedback
} from '../validations.js'

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
  @query('input') protected $input!: HTMLElement

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

  protected hasError (): boolean {
    return Boolean(this.validationMessage) && (this.touched || this.dirty)
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

  /**
   * Sets a custom validation message.
   *
   * @param message The validation message to set.
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
    // Parse the rules into key-value pairs.
    const ruleItems = parseRules(this.rules)

    // Set attribute native input.
    ruleItems.forEach(({ key, value }) => {
      this.$input.setAttribute(key, value || '')
    })
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
   */
  protected async triggerValidation (): Promise<void> {
    const feedback = await this.validate({
      input: this.$input as HTMLInputElement,
      el: this
    })

    this.setValidity(feedback?.message || null)
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
}
