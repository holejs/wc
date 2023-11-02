import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import styles from './card.css?inline'

import { isValidColorFormat } from '../utils/isValidColorFormat.js'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-card': HWCCard;
  }
}

export type CardElevation = '0' | '1' | '2' | '3' | '4' | '5'

@customElement('hwc-card')
export class HWCCard extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @query('.card__header') private $cardHeader!: HTMLElement

  @query('.card__footer') private $cardFooter!: HTMLElement

  @property({ type: String }) elevation: CardElevation = '1'

  @property({ type: String }) color!: string

  @property({ type: Boolean }) outlined!: boolean

  @property({ type: Boolean }) disabled!: boolean

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (this.hasElementSlot('slot[name="header"]')) this.$cardHeader.remove()

    if (this.hasElementSlot('slot[name="footer"]')) this.$cardFooter.remove()
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-card-bg', color)
    }

    if (_changedProperties.has('elevation')) {
      this.style.setProperty(
        '--hwc-card-box-shadow',
        `var(--hwc-box-shadow-${this.elevation})`
      )
    }
  }

  private hasElementSlot (query: string): boolean {
    const $slot = this.shadowRoot?.querySelector(query) as HTMLSlotElement | null

    return !($slot && $slot.assignedNodes().length > 0)
  }

  protected render (): unknown {
    return html`
      <div class="card">
        <!-- Header -->
        <div class="card__header">
          <div class="header__wrapper">
            <slot name="header"></slot>
          </div>
        </div>

        <!-- Body -->
        <div class="card__body">
          <div class="body__wrapper">
            <slot></slot>
          </div>
        </div>

        <!-- Footer -->
        <div class="card__footer">
          <div class="footer__wrapper">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `
  }
}
