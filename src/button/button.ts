import { LitElement, html, css, unsafeCSS, CSSResultGroup, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from './button.css?inline'

import { ColorNameMap, ElevationNameMap } from "../declarations";

import { getColor, getElevation, hexToRgba, isHexColor } from "../utils";

declare global {
  interface HTMLElementTagNameMap {
    'hwc-button': Button;
  }
}

export type ButtonType = "button" | "submit" | "reset" | "menu"

export type ButtonAppearance = "outlined" | "text" | "fab" | "icon"

export type ButtonElevation = 0 | 1 | 2 | 3 | 4 | 5;

@customElement('hwc-button')
export class Button extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @property({ type: String }) appearance!: ButtonAppearance

  @property({ type: String }) type: ButtonType = 'button'

  @property({ type: String }) color: string = ''

  @property({ type: Number, reflect: true }) elevation: ButtonElevation = 1

  @property({ type: Boolean }) lowercase: boolean = false

  @property({ type: Boolean }) uppercase: boolean = false

  @property({ type: Boolean }) capitalize: boolean = false

  @property({ type: Boolean }) rounded: boolean = false

  @property({ type: Boolean }) fullwidth: boolean = false

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = (getColor(this.color as ColorNameMap) || this.color).trim()

      this.style.setProperty('--hwc-button-bg', color)

      const hoverColor = isHexColor(color) ? hexToRgba(color, 0.1) : color

      this.style.setProperty('--hwc-button-hover-bg-color', hoverColor)
    }

    if (_changedProperties.has('elevation')) {
      const elevation = getElevation(`elevation${this.elevation}` as ElevationNameMap) || null

      this.style.setProperty('--hwc-button-elevation', elevation)
    }
  }

  protected render(): unknown {
    return html`
      <button type=${this.type} class="button" role="button">
        <div class="button__wrapper">
          <slot></slot>
        </div>
      </button>
    `
  }
}
