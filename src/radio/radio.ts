/* eslint-disable no-undef */
import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import styles from './radio.css?inline'

import { generateHash, isValidColorFormat } from '../utils'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-radio': HWCRadio;
  }
}

@customElement('hwc-radio')
export default class Radio extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  readonly internals = this.attachInternals()

  // More information: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
  static formAssociated = true

  @property({ type: String }) value = 'on'

  @property({ type: String }) color!: string

  @property({ type: String }) name!: string

  @property({ type: Boolean }) checked = false

  @property({ type: Boolean }) disabled = false

  @state() private _uniqueId = generateHash()

  private _root: ParentNode | null = null

  connectedCallback () {
    super.connectedCallback()

    this._root = this.getRootNode() as ParentNode
  }

  protected updated (_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('color')) {
      const color = isValidColorFormat(this.color) ? `var(--hwc-${this.color})` : this.color

      this.style.setProperty('--hwc-radio-color', color)
    }

    if (_changedProperties.has('checked')) {
      this._setValue(this.value)
    }

    if (_changedProperties.has('value')) {
      this._setValue(this.value)
    }
  }

  get form () {
    return this.internals?.form || null
  }

  get labels () {
    return this.internals?.labels || null
  }

  private _setValue (value: string | null) {
    this.internals.setFormValue(this.checked ? value : null)
  }

  private _getNamedRadios () {
    const name = this.getAttribute('name')

    if (!name || !this._root) return []

    return Array.from(this._root?.querySelectorAll<Radio>(`[name="${name}"]`))
  }

  private _uncheckRadios () {
    const $radios = this._getNamedRadios()

    for (const $radio of $radios) {
      if ($radio !== this) {
        $radio.checked = false
      }
    }
  }

  private _handleChange (_ev: Event) {
    this.checked = true

    this._uncheckRadios()

    this.dispatchEvent(new Event('change', { bubbles: true }))
  }

  protected render (): unknown {
    return html`
      <div class="radio-wrapper">
        <label for=${this._uniqueId} class="radio-button">
          <input
            id=${this._uniqueId}
            name=${this.name}
            type="radio"
            .value=${this.value}
            .checked=${this.checked}
            ?disabled=${this.disabled}
            @change=${this._handleChange}
          >
          <span class="radio-checkmark"></span>
          <span class="radio-label">
            <slot></slot>
          </span>
        </label>
      </div>
    `
  }
}

export class HWCRadio extends Radio {}
