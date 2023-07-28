import {
  PropertyValueMap,
  CSSResultGroup,
  LitElement,
  unsafeCSS,
  html,
  css
} from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import styles from './button.css?inline'

import { ElevationNameMap } from '../declarations'

import { getAllAriaProps, getElevation, isValidColorFormat } from '../utils'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-button': Button;
  }
}

export type ButtonType = 'button' | 'submit' | 'reset' | 'menu'

export type ButtonAppearance = 'outlined' | 'text' | 'fab' | 'icon'

export type ButtonElevation = 0 | 1 | 2 | 3 | 4 | 5;

@customElement('hwc-button')
export default class Button extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @property({ type: String }) appearance!: ButtonAppearance

  @property({ type: String }) type: ButtonType = 'button'

  @property({ type: String }) color!: string

  @property({ type: Number, reflect: true }) elevation: ButtonElevation = 0

  @property({ type: Boolean }) lowercase: boolean = false

  @property({ type: Boolean }) uppercase: boolean = false

  @property({ type: Boolean }) capitalize: boolean = false

  @property({ type: Boolean }) rounded: boolean = false

  @property({ type: Boolean }) fullwidth: boolean = false

  @query('.button') $button!: HTMLButtonElement

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    getAllAriaProps(this).forEach((attr) => this.$button.setAttribute(attr.name, attr.value))
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--${this.color})` : this.color

      this.style.setProperty('--hwc-button-color', color)
    }

    if (_changedProperties.has('elevation')) {
      const elevation = getElevation(`elevation${this.elevation}` as ElevationNameMap) || null

      this.style.setProperty('--hwc-button-box-shadow', elevation)
    }
  }

  protected render (): unknown {
    return html`
      <button type=${this.type} class="button">
        <div class="button__wrapper">
          <slot></slot>
        </div>
      </button>
    `
  }
}

export class HWCButton extends Button {}
