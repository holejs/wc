/* eslint-disable no-undef */
import { PropertyValueMap, unsafeCSS, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import styles from './radio.css?inline'

import { isValidColorFormat } from '../utils/isValidColorFormat.js'
import { generateHash } from '../utils/generateHash.js'

import { InputField } from '../internals/input-field.js'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-radio': HWCRadio;
  }
}

@customElement('hwc-radio')
export class HWCRadio extends InputField {
  static styles = css`${unsafeCSS(styles)}`

  @property({ type: String }) value = 'on'

  @property({ type: String }) color!: string

  @property({ type: String, reflect: true }) role = 'radio'

  @property({ type: Boolean, reflect: true }) checked = false

  @state() private _uniqueId = `radio-${generateHash()}`

  private _root: ParentNode | null = null

  connectedCallback (): void {
    super.connectedCallback()

    this.addEventListener('focusout', this._handleFocusout)

    this.form?.addEventListener('reset', this._onHandleReset.bind(this))

    this._root = this.getRootNode() as ParentNode
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()

    this.removeEventListener('focusout', this._handleFocusout)

    this.form?.removeEventListener('reset', this._onHandleReset)
  }

  protected updated (changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties)

    if (changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-radio-color', color)
    }

    if (changedProperties.has('value') || changedProperties.has('checked')) {
      this._setValue(this.checked ? this.value : null)
    }

    if (changedProperties.has('checked')) {
      if (this.checked) this._uncheckRadios()

      this.ariaChecked = String(this.checked)
    }
  }

  reset (): void {
    this.checked = false
    this.dirty = false
    this.touched = false

    this.setValidity(null)
    this.triggerValidation()
  }

  private _setValue (value: string | null): void {
    (this.$input as HTMLInputElement).value = value || ''

    this.internals.setFormValue(value)
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
        $radio.setValidity(null)
      })
  }

  private _onHandleReset (): void {
    this.reset()
  }

  // This method has been overridden to prevent the validation from being triggered.
  protected async triggerValidation (): Promise<void> {
    const $checkedRadio = this._getCheckedRadio()

    if ($checkedRadio && $checkedRadio !== this) return

    return super.triggerValidation()
  }

  private _onHandleChange (_ev: Event): void {
    this.dirty = true

    this.checked = true

    this.triggerValidation()
  }

  private _handleFocusout (): void {
    this.touched = true

    this.triggerValidation()
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
