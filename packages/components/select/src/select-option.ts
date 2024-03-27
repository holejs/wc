/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { customElement, property } from 'lit/decorators.js'
import { LitElement, css, html, unsafeCSS } from 'lit'

import styles from './select.css?inline'

import { HWCSelect } from './select.js'

const COMPONENT_NAME = 'hwc-select-option'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: HWCSelectOption
  }
}

@customElement(COMPONENT_NAME)
export class HWCSelectOption extends LitElement {
  static styles = css`${unsafeCSS(styles)}`

  @property({ type: String }) value!: string

  @property({ type: Boolean, reflect: true }) selected = false

  @property({ type: String, reflect: true }) role = 'option'

  protected firstUpdated (): void {
    if (this.selected) {
      this._getSelectNode().appendOption({
        value: this.value,
        text: this.textContent || ''
      })
    }
  }

  private _getSelectOptionsNode (): HWCSelectOption[] {
    // Select all the options inside the select
    const $select = this._getSelectNode()

    const $options = $select.querySelectorAll('hwc-select-option') as NodeListOf<HWCSelectOption>

    return Array.from($options)
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
  private _getSelectNode (): HWCSelect {
    const $select = this.closest('hwc-select')

    if (!$select) {
      throw new Error('The option must be inside a select.')
    }

    return $select
  }

  private _onHandleClick (_ev: Event): void {
    const $select = this._getSelectNode()

    const isSingleSelect = !$select.multiple

    if (isSingleSelect) {
      this._unselectOptions()
    }

    if (this.selected) {
      this.selected = false
      $select?.removeOption(this.value)
    } else {
      this.selected = true
      $select?.appendOption({
        value: this.value,
        text: this.textContent || ''
      })
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
