import {
  PropertyValueMap,
  CSSResultGroup,
  unsafeCSS,
  LitElement,
  html,
  css
} from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import styles from './text-field.css?inline'

import { Feedback, Validation, ValidationFn, createValidationControl, validationsMap } from './validations'
import { generateHash, getDataAttributes, isValidColorFormat } from '../utils'
import { TextFieldError } from './error'
import { parseRules } from './utils'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-text-field': TextField;
  }
}

export type TextFieldType = 'date' | 'datetime' | 'datetime-local' | 'email' | 'hidden' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'

export type TextFieldAppearance = 'underline' | 'outlined'

const ALLOWED_TEXTFIELD_TYPES = [
  'date',
  'datetime',
  'datetime-local',
  'email',
  'hidden',
  'month',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'time',
  'url'
]

@customElement('hwc-text-field')
export default class TextField extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @query('input') $input!: HTMLInputElement

  @query('.text-field__control') $control!: HTMLDivElement

  @query('.prepend-inner__control') $prependInner!: HTMLDivElement

  @query('.append-inner__control') $appendInner!: HTMLDivElement

  readonly internals = this.attachInternals()

  // More information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
  static formAssociated = true

  @property({ type: String, reflect: true }) appearance: TextFieldAppearance = 'outlined'

  @property({
    type: String,
    reflect: true,
    converter: (value) => {
      const message = `The type "${value}" is invalid. Use the following values: ${ALLOWED_TEXTFIELD_TYPES.join(', ')}.`

      if (!ALLOWED_TEXTFIELD_TYPES.includes(value || '')) {
        throw new TextFieldError(message)
      }

      return value
    }
  })
    type: TextFieldType = 'text'

  @property({ type: String }) name!: string

  @property({ type: String }) value: string = ''

  @property({ type: String, reflect: true }) autocomplete: 'on' | 'off' = 'on'

  @property({ type: String }) label: string | null = null

  @property({ type: Boolean }) autofocus!: boolean

  @property({ type: String }) placeholder!: string

  @property({ type: String }) color!: string

  @property({ type: String }) hint!: string

  @property({ type: String }) rules!: string

  @state() private readonly _uniqueId = `text-field-${generateHash()}`

  @state() private _feedback: Partial<Feedback> | null = null

  @state() _hasDirty = false

  @state() _hasBlur = false

  private readonly _validator = createValidationControl()

  connectedCallback (): void {
    super.connectedCallback()

    const ruleItems = parseRules(this.rules)

    ruleItems.forEach(({ key }) => this._applyValidation(key))
  }

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (this._hasElementSlot('slot[name="prepend-inner"]')) this.$prependInner.remove()

    if (this._hasElementSlot('slot[name="append-inner"]')) this.$appendInner.remove()

    this.$control.addEventListener('click', () => this.$input.focus())

    this.internals.form?.addEventListener('reset', () => this.reset())

    this._setValue(this.value)

    this._configureRules()

    this._onValidation()
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-text-field-focused-color', color)
    }

    if (_changedProperties.has('value')) {
      this._setValue(this.value)

      this._onValidation()
    }
  }

  /**
   * Indicates if the field has lost focus.
   */
  get hasBlur (): boolean {
    return this._hasBlur
  }

  /**
   * Indicates if the field has been modified.
   */
  get hasDirty (): boolean {
    return (this._hasDirty || !!this.value) && !this.hasBlur
  }

  /**
   * Retrieves an array of all registered validation functions.
   *
   * @returns {Array<{ name: string, handler: ValidationFn }>} An array containing objects with `name` and `handler` properties representing registered validation functions.
   */
  get validations (): { name: string; handler: ValidationFn }[] {
    return this._validator.getAllValidations()
  }

  /**
   * Reset the text field
   */
  reset (): void {
    this._setValue('')

    this._feedback = null

    this._hasBlur = false

    this._hasDirty = false

    this._onValidation()
  }

  /**
   * Sets a validation function for a specific name.
   *
   * @param {string} name - The name associated with the validation function.
   * @param {ValidationFn} validation - The validation function to set.
   * @returns {void}
   */
  setValidation (name: string, validation: ValidationFn): void {
    this._validator.setValidation(name, validation)
  }

  /**
   * Gets the validation function associated with a specific name.
   *
   * @param {string} name - The name associated with the validation function to retrieve.
   * @returns {Validation|undefined} The validation function corresponding to the name, or undefined if not found.
   */
  getValidation (name: string): Validation | undefined {
    return this._validator.getValidation(name)
  }

  private _hasElementSlot (query: string): boolean {
    const $slot = this.shadowRoot?.querySelector(query) as HTMLSlotElement | null

    return !($slot && $slot.assignedNodes().length > 0)
  }

  private _setValue (value: string): void {
    this.value = value

    this.$input.value = value

    this.internals.setFormValue(value)
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

    // Set data attributes (data-*) in the native input.
    this._applyDataAttributes(this)

    ruleItems.forEach(({ key, value }) => {
      // Set attribute native input.
      this._applyInputAttribute(key, value)
    })
  }

  private _applyValidation (key: string): void {
    const validation = validationsMap.get(key)

    if (!validation) return

    this._validator.setValidation(key, validation)
  }

  private _applyDataAttributes (el: HTMLElement): void {
    getDataAttributes(el).forEach((value, key) => this._applyInputAttribute(key, value))
  }

  private _applyInputAttribute (key: string, value: string | null): void {
    this.$input.setAttribute(key, value || '')
  }

  /**
   * Handle validation on input events.
   */
  private async _onValidation (): Promise<void> {
    // Validate the input event using the _validator.
    const errors = await this._validator.validate({
      input: this.$input
    })

    // Check if there are any errors.
    const hasError = errors.length

    // If there are no errors, reset the feedback and validity.
    if (!hasError) {
      this._feedback = null
      this.internals.setValidity({})
      return
    }

    const $input = this.$input

    // Get the first error from the errors array.
    const [error] = errors

    // Update the feedback based on _hasBlur and _hasDirty flags.
    this._feedback = this.hasBlur || this.hasDirty ? errors[0] : null

    // Set the validity on the input element with the error message and customError flag.
    this.internals.setValidity(
      { ...$input.validity, customError: true },
      error.message,
      $input
    )
  }

  /**
   * Handle the onBlur event on the input element.
   *
   * @private
   * @param {InputEvent} _ev - The input event triggered.
   */
  private _onBlur (_ev: InputEvent): void {
    this._hasBlur = true
    this._onValidation()
  }

  /**
   * Handle the onInput event on the input element.
   *
   * @private
   * @param {InputEvent} ev - The input event triggered.
   */
  private async _onInput (ev: InputEvent): Promise<void> {
    const $input = ev.target as HTMLInputElement

    this._setValue($input.value)

    this._hasDirty = true

    this._onValidation()
  }

  /**
   * Handle the onKeydown event on the input element.
   * If the key pressed is Enter, the form will be submitted if available.
   *
   * @private
   * @param {KeyboardEvent} ev - The keyboard event triggered.
   */
  private _onKeydown (ev: KeyboardEvent): void {
    if (ev.code !== 'Enter') return

    const $form = this.internals.form

    if (!$form) return

    $form.requestSubmit()
  }

  protected render (): unknown {
    return html`
      <div class="text-field ${this._feedback ? 'error' : null}">
        <div class="text-field__wrapper">
          <!-- Main content -->
          <div class="text-field__content">
            <div>
              <!-- Label -->
              ${when(
                this.label,
                () => html`<label
                  for=${this._uniqueId}
                  class="text-field__label"
                >${this.label}</label>`
              )}
            </div>

            <div class="text-field__control">
              <!-- Prepend inner -->
              <div class="prepend-inner__control">
                <slot name="prepend-inner"></slot>
              </div>

              <!-- Input -->
              <input
                class="text-field__input"
                id=${this._uniqueId}
                autocomplete=${this.autocomplete}
                placeholder=${this.placeholder}
                ?autofocus=${this.autofocus}
                .value=${this.value}
                type=${this.type}
                name=${this.name}
                @input=${this._onInput}
                @keydown=${this._onKeydown}
                @blur=${this._onBlur}
              >

              <!-- Append inner -->
              <div class="append-inner__control">
                <slot name="append-inner"></slot>
              </div>
            </div>
          </div>

          <!-- Details -->
          <div class="text-field__details">
            <span>${this._feedback?.message || this.hint}</span>
          </div>
        </div>
      </div>
    `
  }
}

export class HWCTextField extends TextField {}
