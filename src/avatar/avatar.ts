import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
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

  @property({ type: String, reflect: true }) role = 'img'

  @property({ type: String }) alt!: string

  @property({ type: String }) name = ''

  @property({ type: String, reflect: true }) appearance: HWCAvatarAppearance = 'circle'

  @property({ type: String }) size: HWCAvatarSize = 'medium'

  @property({ type: String }) src!: string

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
        ${when(
          this.src,
          () => html`
            <img
              class="avatar__image"
              src=${this.src}
              alt=${this.alt || this.name}
            />
          `,
          () => html`
            <span class="avatar__text">
              ${this.extractInitialsName(this.name)}
            </span>
          `
        )}
      </div>
    `
  }
}
