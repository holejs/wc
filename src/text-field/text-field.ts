import { CSSResultGroup, LitElement, css, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'

import styles from './text-field.css?inline'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'hwc-text-field': TextField;
  }
}

@customElement('hwc-text-field')
export default class TextField extends LitElement {
  static styles?: CSSResultGroup | undefined = css`${unsafeCSS(styles)}`

  protected render (): unknown {
    return html`<p>Text field</p>`
  }
}

export class HWCTextField extends TextField {}
