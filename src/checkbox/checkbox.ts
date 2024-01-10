import { PropertyValueMap, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import styles from './checkbox.css'

import { isValidColorFormat } from '../utils/isValidColorFormat.js'
import { generateHash } from '../utils/generateHash.js'

import { InputField } from '../internals/input-field.js'

const COMPONENT_NAME = 'hwc-checkbox'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: HWCCheckbox
  }
}

@customElement(COMPONENT_NAME)
export class HWCCheckbox extends InputField {
  static styles = styles

  @property({ type: String }) color!: string

  @property({ type: String }) value: string = 'on'

  @property({ type: String, reflect: true }) role = 'checkbox'

  @property({ type: Boolean, reflect: true }) checked = false

  @property({ type: Boolean }) disabled = false

  private readonly _uniqueId = `checkbox-${generateHash()}`

  connectedCallback (): void {
    super.connectedCallback()

    this.form?.addEventListener('reset', this.reset.bind(this))
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

    this.form?.removeEventListener('reset', this.reset.bind(this))
  }

  /**
   * Resets the state of the component.
   */
  reset (): void {
    if (this.disabled) return

    this.checked = false;

    (this.$input as HTMLInputElement).checked = false

    this.touched = false
    this.dirty = false

    setTimeout(() => this.triggerValidation(), 0)
  }

  private _setValue (value: string | null): void {
    (this.$input as HTMLInputElement).value = value || ''

    this.internals.setFormValue(value)
  }

  private _onHandleChange (_ev: Event): void {
    this.checked = (this.$input as HTMLInputElement).checked
    this.dirty = true

    this.triggerValidation()

    this.dispatchEvent(new Event('change'))
  }

  private _onHandleBlur (): void {
    this.touched = true

    this.triggerValidation()
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
