import { customElement, property } from 'lit/decorators.js'
import { LitElement, PropertyValueMap, html } from 'lit'
import { when } from 'lit/directives/when.js'

import styles from './avatar.css'

import { isValidColorFormat, randomHexColor } from '@holejs-ui/utils'

const COMPONENT_NAME = 'hwc-avatar'

declare global {
  // eslint-disable-next-line no-unused-vars
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

  @property({ type: String }) color: string = randomHexColor()

  @property({ type: String, reflect: true }) appearance: HWCAvatarAppearance = 'circle'

  @property({ type: String }) size: HWCAvatarSize = 'medium'

  @property({ type: String }) src!: string

  protected updated (changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has('color')) {
      const color = isValidColorFormat(this.color)
        ? `var(--hwc-${this.color})`
        : this.color

      this.style.setProperty('--hwc-avatar-color', color)
    }
  }

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
