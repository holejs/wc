/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { map } from 'lit/directives/map.js'

import styles from './select.css?inline'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-select': HWCSelect;
    'hwc-select-option': HWCOption;
  }
}

@customElement('hwc-select')
export class HWCSelect extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  // eslint-disable-next-line no-undef
  private readonly internals = this.attachInternals()

  // More information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
  static formAssociated = true

  @property({ type: String }) name!: string

  @property({ attribute: false }) options: string[] = []

  connectedCallback (): void {
    super.connectedCallback()

    this.form?.addEventListener('reset', this._onHandleReset.bind(this))
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('options')) {
      const formData = new FormData()

      this.options.forEach((_option) => formData.append(this.name, _option))

      this.internals.setFormValue(formData)
    }
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()

    this.form?.removeEventListener('reset', this._onHandleReset.bind(this))
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
    this.options.push(value)
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

  private _getOptionsNode (): NodeListOf<HWCOption> {
    return this.querySelectorAll('hwc-select-option')
  }

  private _onHandleReset (): void {
    this._getOptionsNode().forEach(($option) => {
      $option.selected = false
    })

    this.options = []
  }

  protected render (): unknown {
    return html`
      <div class="select">
        <div class="select__wrapper">
          <div class="select__content">
            <button class="select__control">
              ${map(this.options, (option, index) => {
                return index === 0
                  ? html`<span class="select__control__label">${option}</span>`
                  : html`<span class="select__control__label">, ${option}</span>`
              })}
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

@customElement('hwc-select-option')
export class HWCOption extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @property({ type: String }) value!: string

  @property({ type: Boolean, reflect: true }) selected = false

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (this.selected) {
      this._getSelectNode()?.appendOption(this.value)
    }
  }

  /**
   * This method is used to get the parent node of the option.
   * In this case, the parent node is the `<hwc-select>`.
   */
  private _getSelectNode (): HWCSelect | null {
    return this.closest('hwc-select')
  }

  private _onHandleClick (_ev: Event): void {
    const $select = this._getSelectNode()

    if (this.selected) {
      this.selected = false
      return $select?.removeOption(this.value)
    }

    this.selected = true
    $select?.appendOption(this.value)
  }

  protected render (): unknown {
    return html`
      <li @click=${this._onHandleClick} class="select-suggestions__item">
        <button class="select-suggestion__button">
          <slot></slot>
        </button>
      </li>
    `
  }
}
