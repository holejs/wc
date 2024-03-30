import type { StoryObj } from '@storybook/web-components'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { html } from 'lit'

import { HWCAvatar } from './avatar.js'

type Story = StoryObj<HWCAvatar>;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Example/Avatar',
  tags: ['autodocs'],
  render: ({ appearance, name, src, size, color }: any) => html`
    <hwc-avatar
      appearance=${appearance}
      name=${name}
      src=${src}
      size=${size}
      color=${color}
    ></hwc-avatar>
  `,
  argTypes: {
    name: {
      control: 'text',
      description: 'The name to be displayed in the avatar. Only the first two initials will be displayed.'
    },
    appearance: {
      control: 'inline-radio',
      options: ['circle', 'square'],
      description: 'The appearance of the avatar. The default value is `circle`.'
    },
    color: {
      control: 'color',
      description: 'The color of the avatar. The default value is a random color.'
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'The size of the avatar. The default value is `medium`.'
    },
    src: {
      control: 'text',
      description: 'The URL of the image to be displayed in the avatar. If this property is set, the `name` property will be ignored.'
    },
    alt: {
      control: 'text',
      description: 'The alt text for the image. When you not provide a `alt` attribute, the `name` property will be used.'
    }
  }
}

export default meta

const _removeWhitespace = (text: string | undefined | null) => (text || '').replace(/\s/g, '')

export const Basic: Story = {
  args: {
    name: 'Ivan Guevara',
    appearance: 'circle'
  },
  play: ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    const $avatar = canvas.getByRole('img')

    step('The avatar should have the initials IG', () => {
      expect($avatar).toBeInTheDocument()
      expect(_removeWhitespace($avatar.shadowRoot?.textContent)).toBe('IG')
    })
  }
}
