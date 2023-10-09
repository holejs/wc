import { PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import styles from './checkbox.css?inline'

import { isValidColorFormat } from '../utils/isValidColorFormat.js'
import { generateHash } from '../utils/generateHash.js'

import { InputField } from '../internals/input-field.js'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-checkbox': HWCCheckbox;
  }
}

@customElement('hwc-checkbox')
export class HWCCheckbox extends InputField {
  static styles = css`${unsafeCSS(styles)}`

  @property({ type: String }) color!: string

  @property({ type: String }) value: string = 'on'

  @property({ type: String, reflect: true }) role = 'checkbox'

  @property({ type: Boolean, reflect: true }) checked = false

  @property({ type: Boolean }) disabled = false

  private readonly _uniqueId = `checkbox-${generateHash()}`

  connectedCallback (): void {
    super.connectedCallback()

    this.form?.addEventListener('reset', this._onHandleReset.bind(this))
  }

  protected updated (changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties)

    if (changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-checkbox-color', color)
    }

    if (changedProperties.has('value') || changedProperties.has('checked')) {
      this._setValue(this.checked ? this.value : null)
    }

    if (changedProperties.has('checked')) {
      this.ariaChecked = String(this.checked)
    }

    if (changedProperties.has('disabled')) {
      this.ariaDisabled = String(this.disabled)
    }
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()

    this.form?.removeEventListener('reset', this._onHandleReset.bind(this))
  }

  private _hasError (): boolean {
    return Boolean(this.validationMessage) && (this.touched || this.dirty)
  }

  /**
   * Resets the state of the component.
   */
  reset (): void {
    this.checked = false

    this.$input.checked = false

    this.touched = false

    this.dirty = false

    this.triggerValidation()
  }

  private _setValue (value: string | null): void {
    this.$input.value = value || ''

    this.internals.setFormValue(value)
  }

  private _onHandleChange (_ev: Event): void {
    this.checked = this.$input.checked
    this.dirty = true

    this.triggerValidation()
  }

  private _onHandleBlur (): void {
    this.touched = true

    this.triggerValidation()
  }

  private _onHandleReset (): void {
    this.reset()
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
            this._hasError(),
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
