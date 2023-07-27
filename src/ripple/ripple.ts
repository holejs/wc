import { LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import styles from './ripple.css?inline'

import { ColorNameMap } from '../declarations'

import { getColor } from '../utils'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-ripple': Ripple;
  }
}

@customElement('hwc-ripple')
export default class Ripple extends LitElement {
  static styles = css`${unsafeCSS(styles)}`

  @property({ type: String }) color!: string

  @property({ type: String }) duration = '700ms'

  @property({ type: Number }) opacity = 0.35

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.addEventListener('click', this.createRipple)
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('duration')) {
      this.style.setProperty('--hwc-ripple-animation-duration', this.duration)
    }

    if (_changedProperties.has('opacity')) {
      this.style.setProperty('--hwc-ripple-opacity', this.opacity.toString())
    }

    if (_changedProperties.has('opacity')) {
      const color = getColor(this.color as ColorNameMap) || this.color

      this.style.setProperty('--hwc-ripple-bg', color || null)
    }
  }

  private createRipple (event: any) {
    const ripple = document.createElement('span')

    ripple.className = 'ripple'

    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)

    const x = event.pageX - rect.left - size / 2
    const y = event.pageY - rect.top - size / 2

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    this.shadowRoot?.appendChild(ripple)

    ripple.addEventListener('animationend', () => ripple.remove())
  }

  protected render (): unknown {
    return html`<slot></slot>`
  }
}

export class HWCRipple extends Ripple {}
