/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { map } from 'lit/directives/map.js'

import styles from './select.css?inline'

import { HWCSelectOption } from './select-option.js'

import { isValidColorFormat } from '../utils/isValidColorFormat.js'
import { generateHash } from '../utils/generateHash.js'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-select': HWCSelect;
  }
}

@customElement('hwc-select')
export class HWCSelect extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @query('button') $button!: HTMLButtonElement

  // eslint-disable-next-line no-undef
  private readonly internals = this.attachInternals()

  // More information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
  static formAssociated = true

  @property({ type: String }) name!: string

  @property({ type: String }) label!: string

  @property({ type: String }) hint!: string

  @property({ type: String }) color!: string

  @property({ type: Boolean }) multiple: Boolean = false

  @property({ type: Boolean }) disabled = false

  @property({ type: Boolean }) readonly = false

  @property({ type: String, reflect: true }) role = 'combobox'

  @property({
    type: String,
    reflect: true,
    attribute: 'aria-haspopup'
  })
    ariaHasPopup = 'listbox'

  @property({ attribute: false }) options: string[] = []

  @property({ type: Boolean, attribute: false }) expanded = false

  private _uniqueId = generateHash()

  connectedCallback (): void {
    super.connectedCallback()

    // Initialize the event listeners.
    this.form?.addEventListener('reset', this._onHandleReset.bind(this))

    document.addEventListener('click', this._handleDocumentClick.bind(this))
  }

  private _handleDocumentClick (ev: Event): void {
    const isClickInside = this.contains(ev.target as Node)

    if (!isClickInside) {
      this.close()
    }
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('options')) {
      const formData = new FormData()

      this.options.forEach((_option) => formData.append(this.name, _option))

      this.internals.setFormValue(formData)
    }

    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-select-primary-color', color)
    }

    if (_changedProperties.has('expanded')) {
      this.ariaExpanded = String(this.expanded)
    }

    if (_changedProperties.has('disabled')) {
      this.ariaDisabled = String(this.disabled)
    }
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()

    // Remove the event listeners.
    this.form?.removeEventListener('reset', this._onHandleReset.bind(this))

    document.removeEventListener('click', this._handleDocumentClick.bind(this))
  }

  get form (): HTMLFormElement | null {
    return this.internals.form
  }

  /**
   * Add an option.
   *
   * @param {string} value - The value of the option to add.
   * @returns {void}
   */
  appendOption (value: string): void {
    this.multiple
      ? this.options.push(value)
      : this.options = [value]

    this.requestUpdate('options')
  }

  /**
   * Remove an option due to its value.
   *
   * @param {string} value - The value of the option to remove.
   * @returns {void}
   */
  removeOption (value: string): void {
    this.options.splice(this.options.indexOf(value), 1)
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

  private _getOptionsNode (): NodeListOf<HWCSelectOption> {
    return this.querySelectorAll('hwc-select-option')
  }

  private _onHandleReset (): void {
    this._getOptionsNode().forEach(($option) => {
      $option.selected = false
    })

    this.options = []
  }

  private _onHandleClick (): void {
    this.expanded === false
      ? this.open()
      : this.close()
  }

  protected render (): unknown {
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
            >
              ${map(this.options, (option, index) => {
                return index === 0
                  ? html`<span class="select__control__label">${option}</span>`
                  : html`<span class="select__control__label">, ${option}</span>`
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
            this.hint,
            () => html`
              <div class="select__details">
                <span>${this.hint}</span>
              </div>
            `
          )
        }
      </div>
    `
  }
}
