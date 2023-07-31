import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import styles from './chip.css?inline'

import { isValidColorFormat } from '../utils'

import '../button/button'

export type ChipAppearence = 'filled' | 'outlined'

@customElement('hwc-chip')
export default class Chip extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @query('.chip') $chip!: HTMLElement

  @property({ type: String, reflect: true }) appearance: ChipAppearence = 'filled'

  @property({ type: String }) color: string = 'blue-lighten-1'

  @property({ type: Boolean }) rounded: boolean = false

  @property({ type: Boolean }) closable: boolean = false

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-chip-color', color)
    }
  }

  /**
   * Closes the element and performs actions associated with the 'close' event.
   */
  close (): void {
    const event = new CustomEvent('close', {
      bubbles: true,
      cancelable: true
    })

    const cancelled = this.dispatchEvent(event)

    if (!cancelled) return

    this.remove()
  }

  protected render (): unknown {
    return html`
      <div class="chip">
        <div class="chip__wrapper">
          <span class="chip__content">
            <slot></slot>
          </span>

          ${when(
            this.closable,
            () => html`
              <span class="chip__actions">
                <hwc-button
                  class="chip-button__closable"
                  appearance="icon"
                  @click=${() => this.close()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                  </svg>
                </hwc-button>
              </span>
            `
          )}
        </div>
      </div>
    `
  }
}

export class HWCChip extends Chip {}
