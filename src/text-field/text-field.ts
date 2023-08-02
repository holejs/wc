import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import styles from './text-field.css?inline'

import { generateHash, isValidColorFormat } from '../utils'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-text-field': TextField;
  }
}

export type TextFieldType = 'hidden' | 'text' | 'search' | 'tel' | 'url' | 'email' | 'password' | 'datetime' | 'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'number' | 'range' | 'color' | 'checkbox' | 'radio' | 'file' | 'submit' | 'image' | 'reset' | 'button'

@customElement('hwc-text-field')
export default class TextField extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @query('input') $input!: HTMLInputElement

  @query('.text-field__control') $control!: HTMLDivElement

  @property({ type: String, reflect: true }) type: TextFieldType = 'text'

  @property({ type: String }) name!: string

  @property({ type: String, reflect: true }) autocomplete: 'on' | 'off' = 'on'

  @property({ type: String }) label: string | null = null

  @property({ type: Boolean }) autofocus: boolean = false

  @property({ type: String }) placeholder!: string

  @property({ type: String }) color!: string

  @state() private uniqueId = `text-field-${generateHash()}`

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.$control.addEventListener('click', () => this.$input.focus())
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-text-field-focused-color', color)
    }
  }

  protected render (): unknown {
    return html`
      <div class="text-field">
        <div class="text-field__wrapper">
          <!-- Main content -->
          <div class="text-field__content">
            <div>
              <!-- Label -->
              ${when(
                this.label,
                () => html`<label
                  for=${this.uniqueId}
                  class="text-field__label"
                >${this.label}</label>`
              )}
            </div>

            <div class="text-field__control">
              <!-- Input -->
              <input
                class="text-field__input"
                ?autofocus=${this.autofocus}
                placeholder=${this.placeholder}
                autocomplete=${this.autocomplete}
                id=${this.uniqueId}
                type=${this.type}
                name=${this.name}
              >
            </div>
          </div>

          <!-- Details -->
          <div class="text-field__details">
            <!--  -->
          </div>
        </div>
      </div>
    `
  }
}

export class HWCTextField extends TextField {}
