import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import styles from './text-field.css?inline'

import { isValidColorFormat } from '../utils'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-text-field': TextField;
  }
}

export type TextFieldType = 'hidden' | 'text' | 'search' | 'tel' | 'url' | 'email' | 'password' | 'datetime' | 'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'number' | 'range' | 'color' | 'checkbox' | 'radio' | 'file' | 'submit' | 'image' | 'reset' | 'button'

export type TextFieldAppearance = 'underline' | 'outlined'

@customElement('hwc-text-field')
export default class TextField extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @query('input') $input!: HTMLInputElement

  @query('.text-field__control') $control!: HTMLDivElement

  readonly internals = this.attachInternals()

  // More information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
  static formAssociated = true

  @property({ type: String, reflect: true }) appearance: TextFieldAppearance = 'outlined'

  @property({ type: String, reflect: true }) type: TextFieldType = 'text'

  @property({ type: String }) name!: string

  @property({ type: String }) value: string = ''

  @property({ type: String, reflect: true }) autocomplete: 'on' | 'off' = 'on'

  @property({ type: String }) label: string | null = null

  @property({ type: Boolean }) autofocus: boolean = false

  @property({ type: String }) placeholder!: string

  @property({ type: String }) color!: string

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.$control.addEventListener('click', () => this.$input.focus())

    this.setValue(this.value)
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-text-field-focused-color', color)
    }

    if (_changedProperties.has('value')) {
      this.setValue(this.value)
    }
  }

  setValue (value: string = ''): void {
    this.internals.setFormValue(value)
  }

  private _onInput (ev: InputEvent): void {
    const $input = ev.target as HTMLInputElement

    const value = $input.value

    this.setValue(value)
  }

  private _onKeydown (ev: KeyboardEvent): void {
    if (!(ev.code === 'Enter')) return

    const $form = this.internals.form

    if (!$form) return

    $form.requestSubmit()
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
                  for="text-field"
                  class="text-field__label"
                >${this.label}</label>`
              )}
            </div>

            <div class="text-field__control">
              <!-- Input -->
              <input
                class="text-field__input"
                id="text-field"
                autocomplete=${this.autocomplete}
                placeholder=${this.placeholder}
                ?autofocus=${this.autofocus}
                .value=${this.value}
                type=${this.type}
                name=${this.name}
                @input=${this._onInput}
                @keydown=${this._onKeydown}
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
