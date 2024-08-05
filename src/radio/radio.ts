/* eslint-disable no-undef */
import { customElement, property, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { PropertyValueMap, html } from 'lit'

import styles from './radio.css'

import { isValidColorFormat } from '../utils/isValidColorFormat.js'
import { generateHash } from '../utils/generateHash.js'
import { delayFn } from '../utils/delay.js'

import { INPUT_FIELD_ATTR_ERROR_MSG, InputField } from '../internals/input-field.js'

const COMPONENT_NAME = 'hwc-radio'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: HWCRadio
  }
}

@customElement(COMPONENT_NAME)
export class HWCRadio extends InputField<string> {
  static styles = styles

  @property()
    value = 'on'

  /**
   * The color of the radio. You can set the color using different formats:
   *
   * - HEX: `#ff0000`
   * - RGB: `rgb(255, 0, 0)`
   * - RGBA: `rgba(255, 0, 0, 0.5)`
   * - HSL: `hsl(0, 100%, 50%)`
   * - Palette: For more information, see the [Color Palette](https://github.com/holejs/wc/blob/main/src/assets/colors.css)
   *
   * @example
   * ```html
   * <hwc-radio color="#ff0000"></hwc-radio>
   *
   * <hwc-radio color="rgb(255, 0, 0)"></hwc-radio>
   *
   * <hwc-radio color="rgba(255, 0, 0, 0.5)"></hwc-radio>
   *
   * <hwc-radio color="hsl(0, 100%, 50%)"></hwc-radio>
   *
   * <hwc-radio color="blue-darken-2"></hwc-radio>
   * ```
   */
  @property()
    color = ''

  @property({ reflect: true })
    role = 'radio'

  /**
   * Indicates whether the radio is checked or not.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
    checked = false

  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Required })
    errorMessageRequired = 'Please select an option'

  @state()
  private _uniqueId = `radio-${generateHash()}`

  private _root: ParentNode | null = null

  connectedCallback (): void {
    super.connectedCallback()

    this.addEventListener('focusout', this._handleFocusout)
    this.form?.addEventListener('reset', this.reset)

    this._root = this.getRootNode() as ParentNode
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()

    this.removeEventListener('focusout', this._handleFocusout)
    this.form?.removeEventListener('reset', this.reset)
  }

  protected updated (changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties)

    if (changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-radio-color', color)
    }

    if (changedProperties.has('value') || changedProperties.has('checked')) {
      (this.$input as HTMLInputElement).value = this.value || ''
      this.internals.setFormValue(this.checked ? this.value : null)
    }

    if (changedProperties.has('checked')) {
      if (this.checked) {
        this._uncheckRadios()
      }

      this.ariaChecked = String(this.checked)
    }
  }

  async reportValidity (): Promise<boolean> {
    const $checkedRadio = this._getCheckedRadio()

    if ($checkedRadio && $checkedRadio !== this) {
      return true
    }

    if (this.required && !this.checked) {
      this.setCustomValidity(this.errorMessageRequired)
      return false
    }

    this.setCustomValidity('')
    return true
  }

  async checkValidity (): Promise<boolean> {
    const $checkedRadio = this._getCheckedRadio()

    if ($checkedRadio && $checkedRadio !== this) {
      return true
    }

    if (this.required && !this.checked) {
      return false
    }

    return true
  }

  reset = (): void => {
    this.checked = false
    this.dirty = false
    this.touched = false

    this.setCustomValidity('')
    delayFn().then(() => this.reportValidity())
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

  private _getCheckedRadio (): HWCRadio | null {
    return this._getNamedRadios().find(($radio) => $radio.checked) || null
  }

  /**
   * Uncheck all radios with the same name.
   * @private
   */
  private _uncheckRadios (): void {
    this._getNamedRadios()
      .filter(($radio) => $radio !== this)
      .forEach(($radio) => {
        $radio.checked = false
        $radio.setCustomValidity('')
      })
  }

  private _onHandleChange (_ev: Event): void {
    this.dirty = true
    this.checked = true

    this.reportValidity()
    this.dispatchEvent(new Event('change'))
  }

  private _handleFocusout = (): void => {
    this.touched = true
    this.reportValidity()
  }

  protected render (): unknown {
    return html`
      <div class="radio__wrapper">
        <label for=${this._uniqueId} class="radio__button">
          <input
            type="radio"
            name=${this.name}
            id=${this._uniqueId}
            .value=${this.value}
            .checked=${this.checked}
            ?disabled=${this.disabled}
            @change=${this._onHandleChange}
          >
          <span class="radio__checkmark"></span>
          <span class="radio__label">
            <slot></slot>
          </span>
        </label>

          <!-- Details -->
          ${when(
            this.hasError(),
            () => html`
              <div class="radio__details">
                <span>${this.validationMessage}</span>
              </div>
            `
          )}
      </div>
    `
  }
}
