import { customElement, property } from 'lit/decorators.js'
import { LitElement, html } from 'lit'

import styles from './avatar.css'

const COMPONENT_NAME = 'hwc-avatar'

declare global {
  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: HWCAvatar
  }
}

export type HWCAvatarAppearance = 'circle' | 'square'

export type HWCAvatarSize = 'small' | 'medium' | 'large'

@customElement(COMPONENT_NAME)
export class HWCAvatar extends LitElement {
  static styles = styles

  @property({ type: String }) name = ''

  @property({ type: String, reflect: true }) appearance: HWCAvatarAppearance = 'circle'

    @property({ type: String }) size: HWCAvatarSize = 'medium'

  private extractInitialsName (name: string): string {
    const chunks = name.trim().split(' ')

    if (chunks.length === 1) {
      return chunks.at(0)?.slice(0, 2).toUpperCase() as string
    }

    return chunks
      .slice(0, 2)
      .map((chunk) => chunk.charAt(0))
      .join('')
      .toUpperCase()
  }

  protected render (): unknown {
    return html`
      <div class="avatar">
        <span class="avatar__text">${this.extractInitialsName(this.name)}</span>
      </div>
    `
  }
}
