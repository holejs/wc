/* eslint-disable no-undef */
import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import styles from './radio.css?inline'

import { generateHash, getDataAttributes, isValidColorFormat, parseRules } from '../utils'
import { Feedback, createValidationControl, validationsMap } from '../validations'
import { when } from 'lit/directives/when.js'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-radio': HWCRadio;
  }
}

/**
 * TODO: List of things to do:
 *
 * - [] Simplify the code.
 * - [] Change the form validation message to be displayed in the details element.
 */

@customElement('hwc-radio')
export default class Radio extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  readonly internals = this.attachInternals()

  // More information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
  static formAssociated = true

  @query('input[type="radio"]') $input!: HTMLInputElement

  @property({ type: String }) value = 'on'

  @property({ type: String }) color!: string

  @property({ type: String }) name!: string

  @property({ type: Boolean }) checked = false

  @property({ type: Boolean }) disabled = false

  @property({ type: String }) rules!: string

  @state() private _uniqueId = generateHash()

  @state() private _hasBlur = false

  @state() private _hasDirty = false

  @state() private _errorFeedback: Feedback | null = null

  private _root: ParentNode | null = null

  private _validator = createValidationControl()

  connectedCallback (): void {
    super.connectedCallback()

    // When any radio is found that is checked,
    // the form validation message is automatically removed.
    this.addEventListener('change', () => {
      const $radios = this._getNamedRadios()

      const $radio = $radios.find($radio => $radio.checked)

      if ($radio) {
        $radios.forEach($radio => {
          $radio.internals.setValidity({})
          $radio._errorFeedback = null
        })
      }
    })

    this._root = this.getRootNode() as ParentNode

    const ruleItems = parseRules(this.rules)

    ruleItems.forEach(({ key }) => this._applyValidation(key))

    this.addEventListener('focusin', this._handleFocusin)

    this.addEventListener('focusout', this._handleFocusout)
  }

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this._setValue(this.value)

    this._configureRules()

    this._onValidation()
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-radio-color', color)
    }

    if (_changedProperties.has('checked')) {
      this._setValue(this.value)
    }

    if (_changedProperties.has('value')) {
      this._setValue(this.value)
    }
  }

  get form (): HTMLFormElement | null {
    return this.internals?.form || null
  }

  get labels (): NodeList {
    return this.internals?.labels
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

    console.log(errors)

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

  private _setValue (value: string | null): void {
    this.internals.setFormValue(this.checked ? value : null)
  }

  /**
   * Get all radios with the same name.
   * @private
   */
  private _getNamedRadios () {
    const name = this.getAttribute('name')

    if (!name || !this._root) return []

    const $radioNodes = this._root.querySelectorAll<Radio>(`[name="${name}"]`)

    return Array.from($radioNodes)
  }

  /**
   * Uncheck all radios with the same name.
   * @private
   */
  private _uncheckRadios (): void {
    this._getNamedRadios()
      .filter($radio => $radio !== this)
      .forEach($radio => { $radio.checked = false })
  }

  private _handleChange (_ev: Event): void {
    const $input = this.$input

    this.checked = true

    this._hasDirty = true

    this._uncheckRadios()

    this._setValue($input.value)

    this._onValidation()

    this.dispatchEvent(new Event('change', { bubbles: true }))
  }

  private _handleFocusin (): void {
    console.log('focusin')
  }

  private _handleFocusout (): void {
    this._hasBlur = true

    this._onValidation()

    this.dispatchEvent(new Event('change', { bubbles: true }))
  }

  protected render (): unknown {
    const showError = this.hasBlur && this._errorFeedback

    return html`
      <div class="radio__wrapper ${showError ? 'error' : null}">
        <label for=${this._uniqueId} class="radio__button">
          <input
            type="radio"
            name=${this.name}
            id=${this._uniqueId}
            .value=${this.value}
            .checked=${this.checked}
            ?disabled=${this.disabled}
            @change=${this._handleChange}
          >
          <span class="radio__checkmark"></span>
          <span class="radio__label">
            <slot></slot>
          </span>
        </label>

          <!-- Details -->
          ${
            when(
              showError,
              () => html`
                <div class="radio__details">
                  <span>${showError ? this._errorFeedback?.message : null}</span>
                </div>
              `
            )
          }
      </div>
    `
  }
}

export class HWCRadio extends Radio {}
