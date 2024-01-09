import { customElement, property, query } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { PropertyValueMap, html } from 'lit'
import IMask, { InputMask } from 'imask'

import styles from './text-field.css'

import { TextFieldError } from '../error.js'

import { isValidColorFormat } from '../utils/isValidColorFormat.js'
import { generateHash } from '../utils/generateHash.js'

import { InputField } from '../internals/input-field.js'

import '../button/button.js'

const COMPONENT_NAME = 'hwc-text-field'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: HWCTextField
  }
}

const ALLOWED_TEXTFIELD_TYPES = [
  'text',
  'email',
  'password',
  'number',
  'search',
  'tel',
  'url',
  'date',
  'time',
  'datetime-local',
  'month',
  'hidden',
  'datetime'
] as const

export type TextFieldType = typeof ALLOWED_TEXTFIELD_TYPES[number]

export type TextFieldAppearance = 'underline' | 'outlined'

const _validateType = (value: string | null) => {
  const message = `The type "${value}" is invalid. Use the following values: ${ALLOWED_TEXTFIELD_TYPES.join(', ')}.`

  if (!ALLOWED_TEXTFIELD_TYPES.includes((value || '') as TextFieldType)) {
    throw new TextFieldError(message)
  }

  return value
}

@customElement(COMPONENT_NAME)
export class HWCTextField extends InputField {
  static styles = styles

  @query('.text-field__control') $control!: HTMLDivElement

  @query('.prepend-inner__control') $prependInner!: HTMLDivElement

  @query('.append-inner__control') $appendInner!: HTMLDivElement

  @property({ type: String, reflect: true }) appearance: TextFieldAppearance = 'outlined'

  @property({ type: String, converter: _validateType, reflect: true })
    type: TextFieldType = 'text'

  @property({ type: String }) value = ''

  @property({ type: String }) autocomplete: 'on' | 'off' = 'on'

  @property({ type: String }) label!: string

  @property({ type: Boolean }) autofocus!: boolean

  @property({ type: String }) placeholder!: string

  @property({ type: String, reflect: true }) role = 'textbox'

  @property({ type: String }) color!: string

  @property({ type: String }) hint!: string

  @property({ type: Boolean }) clearable = false

  @property({ type: String }) mask!: string

  private readonly _uniqueId = `text-field-${generateHash()}`

  private _imask: InputMask<any> | null = null

  protected firstUpdated (changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.firstUpdated(changedProperties)

    if (this.$input && this.mask) {
      this._configureMask()
    }

    this.$control.addEventListener('click', this._onFocus.bind(this))

    this.form?.addEventListener('reset', this._onReset.bind(this))

    // The reason for adding the event listener this way and not from the template of LIT (@input)
    // is because whe configured the mask a desynchronization of the value occurs.
    this.$input.addEventListener('input', this._onInput.bind(this))

    // The elements found in the slot are removed to avoid rendering unnecessary elements that
    // affect the design of the element.
    if (this._hasElementSlot('slot[name="prepend-inner"]')) {
      this.$prependInner.remove()
    }

    if (this._hasElementSlot('slot[name="append-inner"]')) {
      this.$appendInner.remove()
    }
  }

  protected updated (changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties)

    if (changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-text-field-primary-color', color)
    }

    if (changedProperties.has('value')) {
      this._setValue(this.value)

      this.triggerValidation()
    }

    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label || '')
    }
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()

    // Remove event listeners
    this.$control.removeEventListener('click', this._onFocus.bind(this))

    this.form?.removeEventListener('reset', this._onReset.bind(this))

    this.$input.removeEventListener('input', this._onInput.bind(this))
  }

  /**
   * Reset the text field
   */
  reset (): void {
    this.touched = false

    this.dirty = false

    this._setValue('')

    this._imask?.updateValue()

    this.setValidity(null)

    this.triggerValidation()
  }

  private _configureMask (): void {
    this._imask = IMask(this.$input, { mask: this.mask })
  }

  private _hasElementSlot (query: string): boolean {
    const $slot = this.shadowRoot?.querySelector(query) as HTMLSlotElement | null

    return !($slot && $slot.assignedNodes().length > 0)
  }

  private _setValue (value: string): void {
    this.value = value;

    (this.$input as HTMLInputElement).value = value

    this.internals.setFormValue(value)
  }

  /**
   * Handle the onBlur event on the input element.
   *
   * @private
   * @param {InputEvent} _ev - The input event triggered.
   */
  private _onBlur (_ev: InputEvent): void {
    this.touched = true

    this.triggerValidation()
  }

  /**
   * Handle the onInput event on the input element.
   *
   * @private
   * @param {InputEvent} ev - The input event triggered.
   */
  private async _onInput (ev: Event): Promise<void> {
    const $input = ev.target as HTMLInputElement

    this._setValue($input.value)

    this.dirty = true

    this.triggerValidation()

    this.dispatchEvent(new CustomEvent('change'))
  }

  /**
   * Handle the onKeydown event on the input element.
   * If the key pressed is Enter, the form will be submitted if available.
   *
   * @private
   * @param {KeyboardEvent} ev - The keyboard event triggered.
   */
  private _onKeydown (ev: KeyboardEvent): void {
    if (ev.code !== 'Enter') return

    const $form = this.internals.form

    if (!$form) return

    $form.requestSubmit()
  }

  private _onHandleClearable (): void {
    this._setValue('')

    this.dispatchEvent(new CustomEvent('change'))
  }

  private _onReset (): void {
    this.reset()
  }

  private _onFocus (): void {
    this.$input.focus()
  }

  protected render (): unknown {
    const isError = this.hasError()

    const showClearableButton = this.clearable &&
      this.value &&
      !this.disabled &&
      !this.readonly

    return html`
      <div class="text-field">
        <div class="text-field__wrapper">
          <!-- Main content -->
          <div class="text-field__content">
            <!-- Label -->
            ${when(
              this.label,
              () => html`
                <label for=${this._uniqueId} class="text-field__label">
                  ${this.label}
                </label>
              `
            )}

            <div class="text-field__control">
              <!-- Prepend inner -->
              <div class="prepend-inner__control">
                <slot name="prepend-inner"></slot>
              </div>

              <!-- Input -->
              <input
                class="text-field__input"
                id=${this._uniqueId}
                autocomplete=${this.autocomplete}
                placeholder=${this.placeholder}
                ?autofocus=${this.autofocus}
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                .value=${this.value}
                type=${this.type}
                name=${this.name}
                @keydown=${this._onKeydown}
                @blur=${this._onBlur}
              >

              <!-- Append inner -->
              <div class="append-inner__control">
                <slot name="append-inner"></slot>
              </div>

              <!-- Clear button -->
              ${when(
                showClearableButton,
                () => html`
                  <hwc-button
                    appearance="icon"
                    class="text-field__clearable"
                    @click=${this._onHandleClearable}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-circle-x-filled"
                      width="22"
                      height="22"
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
                `
              )}
            </div>
          </div>

          <!-- Details -->
          ${when(
            isError || this.hint,
            () => html`
              <div class="text-field__details">
                <span>${isError ? this.validationMessage : this.hint}</span>
              </div>
            `
          )}
        </div>
      </div>
    `
  }
}
