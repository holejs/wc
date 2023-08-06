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

import { Feedback, createValidationControl, validationsMap } from './validations'
import { generateHash, getDataAttributes, isValidColorFormat } from '../utils'
import { parseRules } from './utils'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-text-field': TextField;
  }
}

export type TextFieldType = 'hidden' | 'text' | 'search' | 'tel' | 'url' | 'email' | 'password' | 'datetime' | 'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'number' | 'range' | 'color' | 'checkbox' | 'radio' | 'file' | 'submit' | 'image' | 'reset' | 'button'

export type TextFieldAppearance = 'underline' | 'outlined'

@customElement('hwc-text-field')
export default class TextField extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @query('input') $input!: HTMLInputElement

  @query('.text-field__control') $control!: HTMLDivElement

  readonly internals = this.attachInternals()

  // More information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
  static formAssociated = true

  @property({ type: String, reflect: true }) appearance: TextFieldAppearance = 'outlined'

  @property({ type: String, reflect: true }) type: TextFieldType = 'text'

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

  private _validator = createValidationControl()

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.$control.addEventListener('click', () => this.$input.focus())

    this._setValue(this.value)

    this._configureRules()

    this._onValidation({ target: this.$input } as any)
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-text-field-focused-color', color)
    }

    if (_changedProperties.has('value')) {
      this._setValue(this.value)
    }
  }

  private _setValue (value: string = ''): void {
    if (value) this._hasDirty = true
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

    // Get all data attributes.
    const dataAttrMap = getDataAttributes(this)

    ruleItems.forEach(({ key, value }) => {
      // Set attribute native input.
      this.$input.setAttribute(key, value || '')

      // Get the corresponding validator function based on the rule key.
      const validator = validationsMap.get(key)

      if (!validator) return

      // Get the custom error message from the data attributes, if available.
      const message = dataAttrMap.get(`data-error-message-${key}`)

      // Set the validator with the custom message in the validation controller.
      this._validator.setValidation(key, validator({ message }))
    })
  }

  /**
   * Handle validation on input events.
   *
   * @private
   * @param {InputEvent} ev - The input event triggered.
   */
  private async _onValidation (ev: InputEvent): Promise<void> {
    // Validate the input event using the _validator.
    const errors = await this._validator.validate(ev)

    // Check if there are any errors.
    const hasError = errors.length

    // If there are no errors, reset the feedback and validity.
    if (!hasError) {
      this._feedback = null
      this.internals.setValidity({})
      return
    }

    // Extract the input element from the event target.
    const $input = ev.target as HTMLInputElement

    // Get the first error from the errors array.
    const [error] = errors

    // Update the feedback based on _hasBlur and _hasDirty flags.
    this._feedback = this._hasBlur || this._hasDirty ? errors[0] : null

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
   * @param {InputEvent} ev - The input event triggered.
   */
  private _onBlur (ev: InputEvent): void {
    this._hasBlur = true
    this._onValidation(ev)
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

    this._onValidation(ev)
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
