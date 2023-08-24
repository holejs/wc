import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import styles from './radio.css?inline'

import { isValidColorFormat } from '../utils'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-radio': HWCRadio;
  }
}

@customElement('hwc-radio')
export default class Radio extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @property({ type: String }) color!: string

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-radio-color', color)
    }
  }

  protected render (): unknown {
    return html`
      <div class="radio-wrapper">
        <label class="radio-button">
          <input id="option1" name="radio-group" type="radio">
          <span class="radio-checkmark"></span>
          <span class="radio-label">
            <slot></slot>
          </span>
        </label>
      </div>
    `
  }
}

export class HWCRadio extends Radio {}
