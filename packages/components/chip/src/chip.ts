import { CSSResultGroup, LitElement, PropertyValueMap, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import styles from './chip.css'

import { isValidColorFormat } from '@holejs/utils'
import '@holejs/wc-button'

const COMPONENT_NAME = 'hwc-chip'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: HWCChip
  }
}

export type HWCChipAppearence = 'filled' | 'outlined' | 'text'

export type HWCChipSize = 'x-small' | 'small' | 'regular' | 'large' | 'x-large'

@customElement(COMPONENT_NAME)
export class HWCChip extends LitElement {
  static styles?: CSSResultGroup | undefined = styles

  @property({ type: String, reflect: true }) appearance: HWCChipAppearence = 'filled'

  @property({ type: String, reflect: true }) size: HWCChipSize = 'regular'

  @property({ type: String }) color!: string

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
      composed: true,
      cancelable: true
    })

    const cancelled = this.dispatchEvent(event)

    if (!cancelled) return

    this.remove()
  }

  protected render (): unknown {
    return html`
      <button class="chip">
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
                    <svg
                      class="closable__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-circle-x-filled"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" stroke-width="0" fill="currentColor"></path>
                    </svg>
                </hwc-button>
              </span>
            `
          )}
        </div>
      </button>
    `
  }
}
