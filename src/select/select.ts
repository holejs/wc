/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { map } from 'lit/directives/map.js'

import styles from './select.css?inline'

import { isValidColorFormat } from '../utils'

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

  @query('button') $button!: HTMLButtonElement

  // eslint-disable-next-line no-undef
  private readonly internals = this.attachInternals()

  // More information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
  static formAssociated = true

  @property({ type: String }) name!: string

  @property({ type: String }) color!: string

  @property({ type: Boolean }) multiple!: Boolean

  @property({ attribute: false }) options: string[] = []

  @property({ type: Boolean, attribute: false }) expanded = false

  connectedCallback (): void {
    super.connectedCallback()

    this.setAttribute('role', 'combobox')
    this.setAttribute('aria-haspopup', 'listbox')
    this.setAttribute('aria-expanded', 'false')

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

    if (_changedProperties.has('expanded')) {
      this._toggleAriaExpanded()
    }

    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-select-primary-color', color)
    }
  }

  disconnectedCallback (): void {
    super.disconnectedCallback()

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

  close (): void {
    if (this.expanded === false) return

    this.expanded = false

    this.requestUpdate('expanded')
  }

  open (): void {
    if (this.expanded === true) return

    this.expanded = true

    this.requestUpdate('expanded')
  }

  private _getOptionsNode (): NodeListOf<HWCOption> {
    return this.querySelectorAll('hwc-select-option')
  }

  private _toggleAriaExpanded (_state?: boolean): void {
    this.setAttribute('aria-expanded', String(this.expanded))
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
            <button
              type="button"
              class="select__control"
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
      </div>
    `
  }
}

@customElement('hwc-select-option')
export class HWCOption extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @property({ type: String }) value!: string

  @property({ type: Boolean, reflect: true }) selected = false

  private _root: ParentNode | null = null

  connectedCallback (): void {
    super.connectedCallback()

    this._root = this.getRootNode() as ParentNode
  }

  protected firstUpdated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (this.selected) {
      this._getSelectNode()?.appendOption(this.value)
    }
  }

  private _getSelectOptionsNode (): HWCOption[] {
    return Array.from(this._root?.querySelectorAll('hwc-select-option') as NodeListOf<HWCOption>)
  }

  private _unselectOptions (): void {
    const $select = this._getSelectNode()

    this._getSelectOptionsNode().forEach(($option) => {
      $option.selected = false
      $select?.removeOption($option.value)
    })
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

    if (!$select) {
      throw new Error('The option must be inside a select.')
    }

    const isSingleSelect = !$select.multiple

    if (isSingleSelect) {
      this._unselectOptions()
    }

    if (this.selected) {
      this.selected = false
      $select?.removeOption(this.value)
    } else {
      this.selected = true
      $select?.appendOption(this.value)
    }

    if (isSingleSelect) {
      $select?.close()
    }
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
