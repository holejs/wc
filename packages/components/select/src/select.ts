/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { customElement, property, query } from 'lit/decorators.js'
import { PropertyValueMap, html } from 'lit'
import { when } from 'lit/directives/when.js'
import { map } from 'lit/directives/map.js'

import styles from './select.css'

import { isValidColorFormat, generateHash, parseRules } from '@holejs/utils'
import { InputField, RuleHandler, RuleMethods } from '@holejs/theme'

import { Validations } from './constants.js'

import { HWCSelectOption } from './select-option.js'

const COMPONENT_NAME = 'hwc-select'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: HWCSelect
  }
}

interface Option {
  value: string;
  text: string;
}

@customElement(COMPONENT_NAME)
export class HWCSelect extends InputField {
  static styles = styles

  @query('button') protected $input!: HTMLButtonElement

  @property({ type: String }) label!: string

  @property({ type: String }) hint!: string

  @property({ type: String }) color!: string

  @property({ type: Boolean }) multiple = false

  @property({ type: String, reflect: true }) role = 'combobox'

  @property({ type: String, reflect: true, attribute: 'aria-haspopup' })
    ariaHasPopup = 'listbox'

  @property({ attribute: false }) options: Option[] = []

  @property({ type: Boolean, attribute: false }) expanded = false

  private _uniqueId = `select-${generateHash()}`

  connectedCallback (): void {
    super.connectedCallback()

    // Initialize the event listeners.
    this.form?.addEventListener('reset', this.reset.bind(this))

    document.addEventListener('click', this._handleDocumentClick.bind(this))

    parseRules(this.rules).forEach(({ key }) => {
      // Remove the default rules.
      this.removeRule(key)

      const handler = Validations[key as RuleMethods] as RuleHandler

      this.addRule({ name: key, handler })
    })
  }

  protected updated (changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties)

    if (changedProperties.has('options')) {
      const formData = new FormData()

      this.options.forEach(({ value }) => formData.append(this.name, value))

      this.internals.setFormValue(formData)

      this.triggerValidation()

      this.dispatchEvent(new CustomEvent('change'))
    }

    if (changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-select-primary-color', color)
    }

    if (changedProperties.has('expanded')) {
      this.ariaExpanded = String(this.expanded)
    }

    if (changedProperties.has('label')) {
      this.ariaLabel = String(this.label)
    }
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()

    // Remove the event listeners.
    this.form?.removeEventListener('reset', this.reset.bind(this))

    document.removeEventListener('click', this._handleDocumentClick.bind(this))
  }

  get value (): string | string[] | null {
    const value = this.multiple
      ? this.options.map(({ value }) => value)
      : this.options[0]?.value

    return value ?? null
  }

  /**
   * Add an option.
   *
   * @param {Option} value - The value of the option to add.
   * @returns {void}
   */
  appendOption (value: Option): void {
    if (this.dirty || Boolean(value)) this.dirty = true

    this.multiple ? this.options.push(value) : this.options = [value]

    this.requestUpdate('options')
  }

  /**
   * Remove an option due to its value.
   *
   * @param {string} value - The value of the option to remove.
   * @returns {void}
   */
  removeOption (key: string): void {
    const index = this.options.findIndex(({ value }) => value === key)

    if (index < 0) return

    this.options.splice(index, 1)

    this.requestUpdate('options')
  }

  /**
   * Close the menu of the select if it is expanded.
   *
   * @returns {void}
   */
  close (): void {
    if (!this.expanded) return

    this.expanded = false
    this.requestUpdate('expanded')
  }

  /**
   * Open the menu of the select if it is not expanded.
   *
   * @returns {void}
   */
  open (): void {
    const isDisabled = this.readonly || this.disabled

    if (this.expanded || isDisabled) return

    this.expanded = true
    this.requestUpdate('expanded')
  }

  /**
   * Reset the select.
   */
  reset (): void {
    this.dirty = false
    this.touched = false
    this.options = []

    // Reset the options.
    this._getOptionsNode().forEach(($option) => {
      $option.selected = false
    })
  }

  private _getOptionsNode (): NodeListOf<HWCSelectOption> {
    return this.querySelectorAll('hwc-select-option')
  }

  private _handleDocumentClick (ev: Event): void {
    const isClickInside = this.contains(ev.target as Node)

    if (!isClickInside) this.close()
  }

  private _onHandleClick (): void {
    !this.expanded ? this.open() : this.close()

    this.triggerValidation()
  }

  private _onHandleBlur (): void {
    this.touched = true

    this.triggerValidation()
  }

  protected render (): unknown {
    const isError = this.hasError()

    return html`
      <div class="select">
        <div class="select__wrapper">
          <div class="select__content">
            <!-- Label -->
            ${
              when(
                this.label,
                () => html`
                  <label
                    for=${this._uniqueId}
                    class="select__label"
                  >${this.label}</label>
                `
              )
            }

            <button
              type="button"
              id=${this._uniqueId}
              class="select__control"
              ?disabled=${this.disabled}
              @click=${this._onHandleClick}
              @blur=${this._onHandleBlur}
            >
              ${map(this.options, ({ text }, index) => {
                return index === 0
                  ? html`<span class="select__control__label">${text}</span>`
                  : html`<span class="select__control__label">, ${text}</span>`
              })}
            </button>
          </div>

          <div class="select__options">
            <ul class="select-options__wrapper">
              <slot></slot>
            </ul>
          </div>
        </div>

        <!-- Details -->
        ${
          when(
            isError || this.hint,
            () => html`
              <div class="select__details">
                <span>${isError ? this.validationMessage : this.hint}</span>
              </div>
            `
          )
        }
      </div>
    `
  }
}
