import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import styles from './checkbox.css?inline'

import {
  generateHash,
  getDataAttributes,
  isValidColorFormat,
  parseRules
} from '../utils'
import { Feedback, createValidationControl, validationsMap } from '../validations'
import { when } from 'lit/directives/when.js'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-checkbox': Checkbox;
  }
}

@customElement('hwc-checkbox')
export default class Checkbox extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @query('input') $input!: HTMLInputElement

  readonly internals = this.attachInternals()

  /**
   * More information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
   */
  static formAssociated = true

  @property({ type: String }) color!: string

  @property({ type: String }) name!: string

  /**
   * For more information visit: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#additional_attributes
   */
  @property({ type: String }) value: string = 'on'

  @property({ type: Boolean }) checked = false

  @property({ type: Boolean }) disabled = false

  @property({ type: String }) rules!: string

  @state() uniqueId = `checkbox-${generateHash()}`

  @state() private _hasBlur = false

  @state() private _hasDirty = false

  @state() private _errorFeedback: Feedback | null = null

  private _validator = createValidationControl()

  connectedCallback (): void {
    super.connectedCallback()

    const ruleItems = parseRules(this.rules)

    ruleItems.forEach(({ key }) => this._applyValidation(key))
  }

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.internals.form?.addEventListener('reset', () => this.reset())

    this._setValue(this.value)

    this._configureRules()

    this._onValidation()
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-checkbox-color', color)
    }

    if (_changedProperties.has('value')) {
      this._setValue(this.value)
    }

    if (_changedProperties.has('checked')) {
      this._setValue(this.value)
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
    return this._hasDirty
  }

  /**
   * Resets the state of the component.
   */
  reset (): void {
    this.checked = false

    this.$input.checked = false

    this._hasBlur = false

    this._hasDirty = false

    this._onValidation()
  }

  private _setValue (value: string): void {
    this.value = value

    this.$input.value = value

    this.internals.setFormValue(this.checked ? value : null)
  }

  private _configureRules (): void {
    const ruleItems = parseRules(this.rules)

    this._applyDataAttributes(this)

    ruleItems.forEach(({ key, value }) => {
      this._applyInputAttribute(key, value)
    })
  }

  private _applyDataAttributes (el: HTMLElement): void {
    getDataAttributes(el).forEach((value, key) => this._applyInputAttribute(key, value))
  }

  private _applyInputAttribute (key: string, value: string | null): void {
    this.$input.setAttribute(key, value || '')
  }

  private _applyValidation (key: string): void {
    const validation = validationsMap.get(key)

    if (!validation) return

    this._validator.setValidation(key, validation)
  }

  /**
   * Handle validation on input events.
   */
  private async _onValidation (): Promise<void> {
    const $input = this.$input

    // Validate the input event using the _validator.
    const errors = await this._validator.validate({
      input: $input
    })

    // Check if there are any errors.
    const hasError = errors.length

    // If there are no errors, reset the feedback and validity.
    if (!hasError) {
      this._errorFeedback = null
      return this.internals.setValidity({})
    }

    // Get the first error from the errors array.
    const [error] = errors

    this._errorFeedback = error

    // Set the validity on the input element with the error message and customError flag.
    this.internals.setValidity(
      { customError: true },
      error.message,
      $input
    )
  }

  private _handleChange (_ev: Event): void {
    const $input = this.$input

    this._hasDirty = true

    this.checked = $input.checked

    this._setValue(this.$input.value)

    this._onValidation()
  }

  private _handleBlur (): void {
    this._hasBlur = true

    this._onValidation()
  }

  protected render (): unknown {
    const showError = (this.hasBlur || this.hasDirty) && this._errorFeedback

    return html`
      <div class="checkbox ${showError ? 'error' : null}">
        <div class="checkbox__wrapper">
          <!-- Main content -->
          <div class="checkbox__content">
            <input
              id=${this.uniqueId}
              type="checkbox"
              name=${this.name}
              .value=${this.value}
              ?checked=${this.checked}
              ?disabled=${this.disabled}
              @change=${this._handleChange}
              @blur=${this._handleBlur}
            >
            <label class="checkbox__label" for=${this.uniqueId}>
              <slot></slot>
            </label>
          </div>

          <!-- Details -->
          ${
            when(
              showError,
              () => html`
                <div class="checkbox__details">
                  <span>${showError ? this._errorFeedback?.message : null}</span>
                </div>
              `
            )
          }
        </div>
      </div>
    `
  }
}

export class HWCCheckbox extends Checkbox {}
