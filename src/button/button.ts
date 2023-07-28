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

import { getAllAriaProps, isValidColorFormat } from '../utils'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-button': Button;
  }
}

export type ButtonType = 'button' | 'submit' | 'reset' | 'menu'

export type ButtonAppearance = 'outlined' | 'text' | 'fab' | 'icon'

export type ButtonElevation = '1' | '2' | '3' | '4' | '5';

@customElement('hwc-button')
export default class Button extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @property({ type: String }) appearance!: ButtonAppearance

  @property({ type: String }) type: ButtonType = 'button'

  @property({ type: String }) color!: string

  @property({ type: String, reflect: true }) elevation!: ButtonElevation

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
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-button-color', color)
    }

    if (_changedProperties.has('elevation')) {
      this.style.setProperty(
        '--hwc-button-box-shadow',
        `var(--hwc-box-shadow-${this.elevation})`
      )
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
