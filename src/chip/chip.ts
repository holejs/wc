import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import styles from './chip.css?inline'

import { isValidColorFormat } from '../utils'

@customElement('hwc-chip')
export default class Chip extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @query('.chip') $chip!: HTMLElement

  @property({ type: String }) color: string = 'blue-lighten-1'

  @property({ type: Boolean }) rounded: boolean = false

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-chip-color', color)
    }
  }

  protected render (): unknown {
    return html`
      <div class="chip">
       <div class="chip__wrapper">
        <slot></slot>
       </div>
      </div>
    `
  }
}

export class HWCChip extends Chip {}
