import { CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'

import styles from './select.css?inline'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-select': HWCSelect;
  }
}

@customElement('hwc-select')
export default class Select extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  protected render (): unknown {
    return html`
      <div>Select!</div>
    `
  }
}

export class HWCSelect extends Select {}
