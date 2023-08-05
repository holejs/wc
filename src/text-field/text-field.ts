import {
  PropertyValueMap,
  CSSResultGroup,
  unsafeCSS,
  LitElement,
  html,
  css
} from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import styles from './text-field.css?inline'

import {
  maxlength,
  minlength,
  required,
  email
} from './validations'
import { generateHash, getDataAttributes, isValidColorFormat } from '../utils'
import { Feedback, ValidationControl } from './validation-controller'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-text-field': TextField;
  }
}

export type TextFieldType = 'hidden' | 'text' | 'search' | 'tel' | 'url' | 'email' | 'password' | 'datetime' | 'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'number' | 'range' | 'color' | 'checkbox' | 'radio' | 'file' | 'submit' | 'image' | 'reset' | 'button'

export type TextFieldAppearance = 'underline' | 'outlined'

export type TextFieldStatusFeedback = 'completed' | 'invalid'

const validationMap = new Map([
  ['required', required],
  ['minlength', minlength],
  ['maxlength', maxlength],
  ['email', email]
])

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

  @property({ type: Boolean }) autofocus!: boolean

  @property({ type: String }) placeholder!: string

  @property({ type: String }) color!: string

  @property({ type: String }) hint!: string

  @property({ type: String }) rules!: string

  private _validator = new ValidationControl(this)

  @state() private readonly uniqueId = `text-field-${generateHash()}`

  @state() private _feedback: Partial<Feedback> | null = null

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.$control.addEventListener('click', () => this.$input.focus())

    this.setValue(this.value)

    const rules = this.rules.split('|')

    const ruleItems = rules.map((rule) => {
      const [key, value = null] = rule.split(':')
      return { key, value }
    })

    // Set all data attributes.
    const dataAttrMap = getDataAttributes(this)

    ruleItems.forEach(({ key, value }) => this.$input.setAttribute(key, value || ''))

    ruleItems.forEach(({ key }) => {
      const validator = validationMap.get(key)

      if (!validator) return

      const message = dataAttrMap.get(`data-error-message-${key}`)

      this._validator.setValidator(validator({ message }))
    })
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

  private async _onValidation (ev: InputEvent): Promise<void> {
    const errors = await this._validator.validate(ev)

    if (!errors.length) {
      this._feedback = null
      this.internals.setValidity({})
      return
    }

    const $input = ev.target as HTMLInputElement

    const [error] = errors

    this._feedback = error

    this.internals.setValidity(
      { ...$input.validity, customError: true },
      error.message,
      $input
    )
  }

  private async _onInput (ev: InputEvent): Promise<void> {
    const $input = ev.target as HTMLInputElement

    const value = $input.value

    this._onValidation(ev)

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
      <div class="text-field ${this._feedback ? 'error' : null}">
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
                id=${this.uniqueId}
                autocomplete=${this.autocomplete}
                placeholder=${this.placeholder}
                ?autofocus=${this.autofocus}
                .value=${this.value}
                type=${this.type}
                name=${this.name}
                @input=${this._onInput}
                @keydown=${this._onKeydown}
                @blur=${this._onValidation}
              >
            </div>
          </div>

          <!-- Details -->
          <div class="text-field__details">
            <span>${this._feedback?.message || this.hint}</span>
          </div>
        </div>
      </div>
    `
  }
}

export class HWCTextField extends TextField {}
