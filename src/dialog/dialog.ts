import { customElement, property, query } from 'lit/decorators.js'
import { LitElement, html } from 'lit'

import styles from './dialog.css'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-dialog': HWCDialog
  }
}

@customElement('hwc-dialog')
export class HWCDialog extends LitElement {
  static styles = styles

  @query('dialog') _$dialog!: HTMLDialogElement

  @property({ type: Boolean }) persistent = false

  @property({ type: String, reflect: true }) role = 'dialog'

  /**
   * Show the dialog.
   */
  open (): void {
    const ev = new CustomEvent('open', {
      bubbles: true,
      composed: true
    })

    const cancelled = !this.dispatchEvent(ev)

    if (cancelled) return

    this._$dialog.showModal()
  }

  /**
   * Close the dialog.
   */
  close (): void {
    const ev = new CustomEvent('close', {
      bubbles: true,
      composed: true
    })

    const cancelled = !this.dispatchEvent(ev)

    if (cancelled) return

    this._$dialog.close()
  }

  private _onHandleClick (ev: MouseEvent): void {
    const { target } = ev

    if (!(target instanceof HTMLDialogElement)) {
      return
    }

    if (this.persistent) return

    this.close()
  }

  protected render (): unknown {
    return html`
      <dialog class="dialog" @click=${this._onHandleClick}>
        <slot></slot>
      </dialog>
    `
  }
}
