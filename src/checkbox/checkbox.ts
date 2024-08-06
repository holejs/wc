import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { PropertyValueMap, html } from 'lit'

import styles from './checkbox.css'

import { isValidColorFormat } from '../utils/isValidColorFormat.js'
import { generateHash } from '../utils/generateHash.js'
import { delayFn } from '../utils/delay.js'

import { INPUT_FIELD_ATTR_ERROR_MSG, InputField } from '../internals/input-field.js'

const COMPONENT_NAME = 'hwc-checkbox'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: HWCCheckbox
  }
}

@customElement(COMPONENT_NAME)
export class HWCCheckbox extends InputField<string> {
  static styles = styles

  /**
   * The color of the checkbox. You can set the color using different formats:
   *
   * - HEX: `#ff0000`
   * - RGB: `rgb(255, 0, 0)`
   * - RGBA: `rgba(255, 0, 0, 0.5)`
   * - HSL: `hsl(0, 100%, 50%)`
   * - Palette: For more information, see the [Color Palette](https://github.com/holejs/wc/blob/main/src/assets/colors.css)
   *
   * @example
   * ```html
   * <hwc-checkbox color="#ff0000"></hwc-checkbox>
   *
   * <hwc-checkbox color="rgb(255, 0, 0)"></hwc-checkbox>
   *
   * <hwc-checkbox color="rgba(255, 0, 0, 0.5)"></hwc-checkbox>
   *
   * <hwc-checkbox color="hsl(0, 100%, 50%)"></hwc-checkbox>
   *
   * <hwc-checkbox color="blue-darken-2"></hwc-checkbox>
   * ```
   */
  @property()
    color = ''

  @property()
    value = 'on'

  @property({ reflect: true })
    role = 'checkbox'

  /**
   * Indicates whether the checkbox is checked or not.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
    checked = false

  @property({ attribute: INPUT_FIELD_ATTR_ERROR_MSG.Required })
    errorMessageRequired = 'Please select this checkbox'

  private readonly _uniqueId = `checkbox-${generateHash()}`

  connectedCallback (): void {
    super.connectedCallback()
    this.form?.addEventListener('reset', this.reset)
  }

  protected updated (changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties)

    if (changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-checkbox-color', color)
    }

    if (changedProperties.has('value') || changedProperties.has('checked')) {
      (this.$input as HTMLInputElement).value = this.value || ''
      this.internals.setFormValue(this.checked ? this.value : null)
    }

    if (changedProperties.has('checked')) {
      this.ariaChecked = String(this.checked)
    }
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()

    this.form?.removeEventListener('reset', this.reset)
  }

  async reportValidity (): Promise<boolean> {
    if (this.required && !this.checked) {
      this.setCustomValidity(this.errorMessageRequired)
      return false
    }

    this.setCustomValidity('')
    return true
  }

  async checkValidity (): Promise<boolean> {
    if (this.required && !this.checked) {
      this.setCustomValidity(this.errorMessageRequired)
      return false
    }

    this.setCustomValidity('')
    return true
  }

  reset = (): void => {
    if (this.disabled) {
      return
    }

    this.checked = false;
    (this.$input as HTMLInputElement).checked = false

    this.touched = false
    this.dirty = false

    delayFn().then(() => this.reportValidity())
  }

  private _onHandleChange (_ev: Event): void {
    this.checked = (this.$input as HTMLInputElement).checked
    this.dirty = true

    this.reportValidity()
    this.dispatchEvent(new Event('change'))
  }

  private _onHandleBlur (): void {
    this.touched = true
    this.reportValidity()
  }

  protected render (): unknown {
    return html`
      <div class="checkbox">
        <div class="checkbox__wrapper">
          <!-- Main content -->
          <div class="checkbox__content">
            <input
              id=${this._uniqueId}
              type="checkbox"
              name=${this.name}
              .value=${this.value}
              ?checked=${this.checked}
              ?required=${this.required}
              ?disabled=${this.disabled}
              @change=${this._onHandleChange}
              @blur=${this._onHandleBlur}
            >
            <label class="checkbox__label" for=${this._uniqueId}>
              <slot></slot>
            </label>
          </div>

          <!-- Details -->
          ${when(
            this.hasError(),
            () => html`
              <div class="checkbox__details">
                <span>${this.validationMessage}</span>
              </div>
            `
          )}
        </div>
      </div>
    `
  }
}
