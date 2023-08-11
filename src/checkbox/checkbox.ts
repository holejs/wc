import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

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

  @property({ type: String }) color!: string

  @property({ type: String }) name!: string

  @property({ type: Boolean }) checked = false

  @property({ type: Boolean }) disabled = false

  @state() uniqueId = `checkbox-${generateHash()}`

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-checkbox-color', color)
    }
  }

  protected render (): unknown {
    return html`
      <div class="checkbox">
        <input
          id=${this.uniqueId}
          type="checkbox"
          name=${this.name}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
        >
        <label class="checkbox__label" for=${this.uniqueId}>
          <slot></slot>
        </label>
      </div>
    `
  }
}

export class HWCCheckbox extends Checkbox {}
