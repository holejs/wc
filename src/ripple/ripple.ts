import { LitElement, PropertyValueMap, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './ripple.css?inline'

@customElement('hwc-ripple')
export class Ripple extends LitElement {
  static styles = css`${unsafeCSS(styles)}`;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.addEventListener('click', this.createRipple);
  }

  private createRipple(event: any) {
    const ripple = document.createElement('span');

    ripple.className = 'ripple';

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const x = event.pageX - rect.left - size / 2;
    const y = event.pageY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    this.shadowRoot?.appendChild(ripple);

    ripple.addEventListener('animationend', () => ripple.remove());
  }

  protected render (): unknown {
    return html`<slot></slot>`;
  }
}
