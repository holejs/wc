/* eslint-disable no-undef */
import {
  PropertyValueMap,
  CSSResultGroup,
  LitElement,
  unsafeCSS,
  css,
  html
} from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import styles from './radio.css?inline'

import {
  isValidColorFormat,
  getDataAttributes,
  generateHash,
  parseRules
} from '../utils'
import { Feedback, createValidationControl, validationsMap } from '../validations'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-radio': HWCRadio;
  }
}

@customElement('hwc-radio')
export class HWCRadio extends LitElement {
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

    this.addEventListener('change', this._resetRadiosValidity)

    this._root = this.getRootNode() as ParentNode

    const ruleItems = parseRules(this.rules)

    ruleItems.forEach(({ key }) => this._applyValidation(key))

    this.addEventListener('focusout', this._handleFocusout)
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()

    this.removeEventListener('change', this._resetRadiosValidity)

    this.removeEventListener('focusout', this._handleFocusout)

    this.form?.removeEventListener('reset', this._onHandleReset)
  }

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.form?.addEventListener('reset', this._onHandleReset.bind(this))

    this._setValue(this.value)

    this._configureRules()

    this._onValidation()

    if (this.checked) {
      this._uncheckRadios()
    }
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-radio-color', color)
    }

    if (_changedProperties.has('value')) {
      this._setValue(this.value)
    }

    if (_changedProperties.has('checked')) {
      if (!this.checked) {
        return this.internals.setFormValue(null)
      }

      this._uncheckRadios()

      this._setValue(this.value)

      this._onValidation()
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

  private _onHandleReset (): void {
    this._hasBlur = false
    this._hasDirty = false
    this._errorFeedback = null

    this._uncheckRadios()
    this._onValidation()
  }

  /**
   * Handle validation on input events.
   */
  private async _onValidation (): Promise<void> {
    // Validate the input event using the _validator.
    const errors = await this._validator.validate({
      input: this.$input
    })

    const ev = new Event('change', { bubbles: true })

    // Check if there are any errors.
    const hasError = errors.length

    // If there are no errors, reset the feedback and validity.
    if (!hasError) {
      this._errorFeedback = null
      this.internals.setValidity({})

      this.dispatchEvent(ev)

      return
    }

    // Get the first error from the errors array.
    const [error] = errors

    this._errorFeedback = error

    // Set the validity on the input element with the error message and customError flag.
    this.internals.setValidity(
      { customError: true },
      error.message,
      this.$input
    )

    this.dispatchEvent(ev)
  }

  private _setValue (value: string | null): void {
    const _value = this.checked ? value : null

    this.internals.setFormValue(_value)
  }

  /**
   * Get all radios with the same name.
   * @private
   */
  private _getNamedRadios () {
    const name = this.getAttribute('name')

    if (!name || !this._root) return []

    const $radioNodes = this._root.querySelectorAll<HWCRadio>(`[name="${name}"]`)

    return Array.from($radioNodes)
  }

  /**
   * Uncheck all radios with the same name.
   * @private
   */
  private _uncheckRadios (): void {
    this._getNamedRadios()
      .filter(($radio) => $radio !== this)
      .forEach(($radio) => {
        $radio.removeAttribute('checked')
        $radio.checked = false
      })
  }

  /**
   * Reset the validity of all radios with the same name.
   * @private
   */
  private _resetRadiosValidity (): void {
    const $radios = this._getNamedRadios()

    const $checkedRadio = $radios.find(($radio) => $radio.checked)

    if (!($checkedRadio || this.checked)) return

    $radios.forEach($radio => {
      $radio.internals.setValidity({})
      $radio._errorFeedback = null
    })
  }

  private _handleChange (_ev: Event): void {
    this.checked = true

    this._hasDirty = true

    this._uncheckRadios()

    this._setValue(this.$input.value)

    this._onValidation()
  }

  private _handleFocusout (): void {
    this._hasBlur = true

    this._onValidation()
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
