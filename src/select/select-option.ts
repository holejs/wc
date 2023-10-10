/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { CSSResultGroup, LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import styles from './select.css?inline'

import { HWCSelect } from './select.js'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-select-option': HWCSelectOption;
  }
}

@customElement('hwc-select-option')
export class HWCSelectOption extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  @property({ type: String }) value!: string

  @property({ type: Boolean, reflect: true }) selected = false

  @property({ type: String, reflect: true }) role = 'option'

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

  private _getSelectOptionsNode (): HWCSelectOption[] {
    return Array.from(this._root?.querySelectorAll('hwc-select-option') as NodeListOf<HWCSelectOption>)
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
