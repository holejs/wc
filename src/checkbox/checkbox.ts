import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import styles from './checkbox.css?inline'

import { generateHash, isValidColorFormat } from '../utils'

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

  // More information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
  static formAssociated = true

  @property({ type: String }) color!: string

  @property({ type: String }) name!: string

  /**
   * For more information visit: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#additional_attributes
   */
  @property({ type: String }) value: string = 'on'

  @property({ type: Boolean }) checked = false

  @property({ type: Boolean }) disabled = false

  @state() uniqueId = `checkbox-${generateHash()}`

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this._setValue(this.value)
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-checkbox-color', color)
    }
  }

  private _setValue (value: string): void {
    this.value = value

    this.$input.value = value

    this.internals.setFormValue(this.checked ? value : null)
  }

  private _handleChange (_ev: Event) {
    const $input = this.$input

    this.checked = $input.checked

    this._setValue(this.$input.value)
  }

  protected render (): unknown {
    return html`
      <div class="checkbox">
        <input
          id=${this.uniqueId}
          type="checkbox"
          name=${this.name}
          .value=${this.value}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
        >
        <label class="checkbox__label" for=${this.uniqueId}>
          <slot></slot>
        </label>
      </div>
    `
  }
}

export class HWCCheckbox extends Checkbox {}
