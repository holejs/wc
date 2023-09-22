/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import styles from './select.css?inline'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-select': HWCSelect;
    'hwc-option': HWCOption;
  }
}

@customElement('hwc-select')
export class HWCSelect extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @property({ attribute: false }) selectedOption!: Node

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.$options.forEach((option) => {
      option.addEventListener('click', () => {
        this.$options.forEach((option) => option.removeAttribute('selected'))
        option.setAttribute('selected', '')

        console.log('Selected!')
        this.selectedOption = option.cloneNode(true)
      })
    })
  }

  get $options () {
    return this?.querySelectorAll('hwc-option')
  }

  protected render (): unknown {
    return html`
      <div class="select">
        <div class="select__wrapper">
          <div class="select__content">
            <button class="select__control">
              ${this.selectedOption}
            </button>
          </div>

          <div class="select__suggestions">
            <ul class="select-suggestions__wrapper">
              <slot></slot>
            </ul>
          </div>
        </div>
      </div>
    `
  }
}

@customElement('hwc-option')
export class HWCOption extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  protected render (): unknown {
    return html`
      <li class="select-suggestions__item">
        <button class="select-suggestion__button">
          <slot></slot>
        </button>
      </li>
    `
  }
}
