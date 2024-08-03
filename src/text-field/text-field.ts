import { customElement, property, query } from 'lit/decorators.js'
import IMask, { FactoryArg, InputMask } from 'imask'
import { when } from 'lit/directives/when.js'
import { PropertyValueMap, html } from 'lit'

import styles from './text-field.css'

import { TextFieldError } from '../error.js'

import { isValidColorFormat } from '../utils/isValidColorFormat.js'
import { generateHash } from '../utils/generateHash.js'
import { delayFn } from '../utils/delay.js'

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
export class HWCTextField extends InputField<string> {
  static styles = styles

  @query('.text-field__control')
  private $control!: HTMLDivElement

  @query('.prepend-inner__control')
  private $prependInner!: HTMLDivElement

  @query('.append-inner__control')
  private $appendInner!: HTMLDivElement

  /**
   * The appearance of the text field.
   * The values available are `underline` and `outlined`.
   *
   * @default 'outlined'
   */
  @property({ reflect: true })
    appearance: TextFieldAppearance = 'outlined'

  /**
   * The type of the text field.
   * The values available are `text`, `email`, `password`, `number`, `search`, `tel`, `url`, `date`, `time`, `datetime-local`, `month`, `hidden`, `datetime`.
   *
   * @default 'text'
   */
  @property({ converter: _validateType, reflect: true })
    type: TextFieldType = 'text'

  @property()
    value = ''

  /**
   * The autocomplete attribute of the text field, indicating whether
   * the input can be automatically completed by the browser.
   * The values available are `on` and `off`.
   *
   * @default 'on'
   */
  @property()
    autocomplete: 'on' | 'off' = 'on'

  /**
   * The label of the text field.
   */
  @property()
    label = ''

  /**
   * Indicates whether the text field is focused when the page is loaded.
   *
   * @default false
   */
  @property({ type: Boolean })
    autofocus = false

  /**
   * The placeholder text displayed when the text field is empty.
   */
  @property()
    placeholder = ''

  @property({ reflect: true })
    role = 'textbox'

  /**
   * The color of the text field. You can set the color using different formats:
   *
   * - HEX: `#ff0000`
   * - RGB: `rgb(255, 0, 0)`
   * - RGBA: `rgba(255, 0, 0, 0.5)`
   * - HSL: `hsl(0, 100%, 50%)`
   * - Palette: For more information, see the [Color Palette](https://github.com/holejs/wc/blob/main/src/assets/colors.css)
   *
   * @example
   * ```html
   * <hwc-text-field color="#ff0000"></hwc-text-field>
   *
   * <hwc-text-field color="rgb(255, 0, 0)"></hwc-text-field>
   *
   * <hwc-text-field color="rgba(255, 0, 0, 0.5)"></hwc-text-field>
   *
   * <hwc-text-field color="hsl(0, 100%, 50%)"></hwc-text-field>
   *
   * <hwc-text-field color="blue-darken-2"></hwc-text-field>
   * ```
   */
  @property()
    color = ''

  /**
   * The hint text displayed below the text field to provide additional information.
   */
  @property()
    hint = ''

  /**
   * Indicates whether the text field is clearable.
   * When the text field is clearable, a button is displayed to clear the text field.
   *
   * @default false
   */
  @property({ type: Boolean })
    clearable = false

  /**
   * The mask of the text field. The mask are supported by the [IMask](https://imask.js.org/) library.
   *
   * @example
   * ```html
   * <hwc-text-field mask="00/00/0000"></hwc-text-field>
   * ```
   *
   * Or you can use the object format:
   *
   * ```js
   * const $textField = document.querySelector('hwc-text-field')
   *
   * $textField.mask = {
   *   mask: '00/00/0000'
   * }
   * ```
   */
  @property()
    mask!: string | FactoryArg

  private readonly _uniqueId = `text-field-${generateHash()}`

  private _imask: InputMask<any> | null = null

  protected firstUpdated (changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.firstUpdated(changedProperties)

    this.$control.addEventListener('click', this._onFocus.bind(this))
    this.form?.addEventListener('reset', this.reset.bind(this))

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
      this.internals.setFormValue(this.value ?? null)
      this.triggerValidation()
    }

    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label || '')
    }

    if (changedProperties.has('mask')) {
      this._configureMask()
    }
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()

    // Remove event listeners
    this.$control.removeEventListener('click', this._onFocus.bind(this))
    this.form?.removeEventListener('reset', this.reset.bind(this))
    this._imask?.off('accept', this._onInput)
  }

  /**
   * Reset the text field
   */
  reset (): void {
    this.touched = false
    this.dirty = false

    this.value = ''
    ;(this.$input as HTMLInputElement).value = ''

    this._imask?.updateValue()
    this.setValidity(null)
    this.triggerValidation()
  }

  private _configureMask (): void {
    if (!this.$input || !this.mask) {
      return
    }

    const options = typeof this.mask === 'string'
      ? { mask: this.mask }
      : this.mask

    this._imask = IMask(this.$input, options)

    this._imask.on('accept', this._onInput)

    delayFn().then(() => {
      this.value = this._imask?.value || ''
    })
  }

  private _hasElementSlot (query: string): boolean {
    const $slot = this.shadowRoot?.querySelector(query) as HTMLSlotElement | null

    return !($slot && $slot.assignedNodes().length > 0)
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
  private _onInput = (ev?: Event): void => {
    this.dirty = true

    this._imask
      ? this.value = this._imask.value
      : this.value = (ev?.target as HTMLInputElement).value

    this.requestUpdate('value')
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
    this.value = ''

    this.dispatchEvent(new CustomEvent('change'))
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
                @input=${this._onInput}
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
